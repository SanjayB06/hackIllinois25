import requests
from flask import jsonify
import requests
import os
from dotenv import load_dotenv
load_dotenv()
import pandas as pd
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.preprocessing import OneHotEncoder
from pprint import pprint
import numpy as np

API_KEY = os.getenv("NESSIE_KEY")
CUSTOMER_KEY = os.getenv("CUSTOMER_ID")
ACCOUNT_ID = os.getenv("ACCOUNT_ID")
BASE_URL = "http://api.nessieisreal.com"

def get_purchases(key, account, url):
    response = requests.get(f"{url}/accounts/{account}/purchases?key={key}")
    return (response.json())

def get_merchant_category(id):
    response = requests.get(f"{BASE_URL}//merchants/{id}?key={API_KEY}")
    try:
        return (response.json())['category']
    except:
        return 'no category'

def getOvrInsights(account):
    data = (get_purchases(API_KEY, account, BASE_URL))
    df = pd.DataFrame(data)

    df['purchase_date'] = pd.to_datetime(df['purchase_date'])
    # print(df)


    merchant_analysis = df.groupby('merchant_id').agg({
        'amount': ['count', 'sum', 'mean']
    }).reset_index()

    merchant_analysis.columns = ['merchant_id', 'visits', 'total_spent', 'avg_spent']

    merchant_analysis['avg_spent'] = merchant_analysis['avg_spent'].round(2)

    merchant_analysis['category'] = merchant_analysis['merchant_id'].apply(get_merchant_category)

    merchant_analysis = merchant_analysis[merchant_analysis['category'].str.startswith('Food', na=False)]
    # print(merchant_analysis)



    encoder = OneHotEncoder()
    category_encoded = encoder.fit_transform(merchant_analysis[['category']])

    # Perform K-means clustering
    n_clusters = 4  # Adjust based on the number of distinct cuisines you expect
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    merchant_analysis['cuisine_cluster'] = kmeans.fit_predict(category_encoded)

    # Map cluster numbers to most common category in each cluster
    cluster_categories = {}
    for cluster in range(n_clusters):
        cluster_data = merchant_analysis[merchant_analysis['cuisine_cluster'] == cluster]
        most_common_category = cluster_data['category'].mode().iloc[0]
        cluster_categories[cluster] = most_common_category

    # Add cluster category to merchant_analysis
    merchant_analysis['cuisine_group'] = merchant_analysis['cuisine_cluster'].map(cluster_categories)

    # print(merchant_analysis[['merchant_id', 'category', 'cuisine_cluster', 'cuisine_group']])




    def extract_key_insights(merchant_analysis):
        def softmax(x):
            e_x = np.exp(x - np.max(x))  # Subtract max for numerical stability
            return e_x / e_x.sum()

        # Group by category and calculate metrics
        cuisine_metrics = merchant_analysis.groupby('category').agg({
            'visits': 'sum',
            'total_spent': 'sum',
            'avg_spent': 'mean'
        }).reset_index()

        # Calculate additional metrics
        total_visits = cuisine_metrics['visits'].sum()
        total_spent = cuisine_metrics['total_spent'].sum()
        cuisine_metrics['frequency'] = cuisine_metrics['visits'] / total_visits
        cuisine_metrics['spend_share'] = cuisine_metrics['total_spent'] / total_spent

        # Define weights
        weights = {
            'visits': 0.25,
            'total_spent': 0.25,
            'avg_spent': 0.2,
            'frequency': 0.15,
            'spend_share': 0.15
        }

        # Calculate weighted score
        for metric, weight in weights.items():
            cuisine_metrics[f'{metric}_score'] = softmax(cuisine_metrics[metric]) * weight

        cuisine_metrics['weighted_score'] = cuisine_metrics[[f'{metric}_score' for metric in weights.keys()]].sum(axis=1)

        # Normalize the final score to sum to 1
        cuisine_metrics['final_score'] = cuisine_metrics['weighted_score'] / cuisine_metrics['weighted_score'].sum()

        # Sort by final score
        cuisine_preferences = cuisine_metrics.sort_values('final_score', ascending=False)

        # Create insights dictionary
        insights = [
            {
                'cuisine': cuisine,
                'weightage': float(data['final_score'])
            }
            for cuisine, data in cuisine_preferences.set_index('category')[['final_score']].to_dict('index').items()
        ]


        # Pretty print the results
        # print("Cuisine Preferences (weighted and normalized):")
        # for cuisine, data in insights["cuisine_preferences"].items():
        #     print(f"\n{cuisine}:")
        #     for metric, value in data.items():
        #         print(f"  {metric}: {value:.4f}")

        # print("\nTop 5 Cuisines:")
        # for i, cuisine in enumerate(insights["top_cuisines"], 1):
        #     print(f"{i}. {cuisine}")

        return insights

    # Assuming merchant_analysis is your DataFrame
    return extract_key_insights(merchant_analysis)
    # print(user_insights)
# print(getOvrInsights(ACCOUNT_ID))

