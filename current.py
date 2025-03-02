import openai

# Set your API key (replace with your actual API key)
openai.api_key = "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"

def get_response(prompt):
    try:
        # Create a chat completion using the gpt-3.5-turbo model
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # or "gpt-4" if available
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error: {e}"

if __name__ == "__main__":
    # Define two prompts
    prompt1 = "Tell me a funny joke."
    prompt2 = "Share an interesting fact about space."

    # Get responses for each prompt
    response1 = get_response(prompt1)
    response2 = get_response(prompt2)

    # Print out the responses
    print("Response 1:", response1)
    print("Response 2:", response2)
