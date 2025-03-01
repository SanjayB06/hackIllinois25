import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Switch
} from 'react-native';
import {
  ArrowLeft,
  CreditCard,
  Edit2,
  LogOut,
  Settings,
  Shield,
  Star,
  User,
  X,
  Check,
  ChevronRight,
  Bell,
  DollarSign,
  Briefcase
} from 'react-native-feather';

// Sample data
const userData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  memberSince: 'March 2022',
  totalBalance: 3245.00,
  savingsGoal: 5000,
  savingsProgress: 0.65, // 65% of goal
};

const accounts = [
  {
    id: '1',
    name: 'Chase Checking',
    type: 'Checking',
    balance: 1245.67,
    lastFour: '4582',
    institution: 'Chase',
    icon: 'Briefcase'
  },
  {
    id: '2',
    name: 'Citi Credit Card',
    type: 'Credit',
    balance: 450.33,
    lastFour: '7891',
    institution: 'Citibank',
    icon: 'CreditCard'
  },
  {
    id: '3',
    name: 'Savings Account',
    type: 'Savings',
    balance: 1549.00,
    lastFour: '3214',
    institution: 'Bank of America',
    icon: 'DollarSign'
  }
];

const completedChallenges = [
  {
    id: '1',
    title: 'Coffee Budget Master',
    description: 'Reduced coffee spending by 20%',
    savedAmount: 45.50,
    completedDate: '2023-08-15',
  },
  {
    id: '2',
    title: 'Grocery Optimizer',
    description: 'Kept grocery spending under $300',
    savedAmount: 75.25,
    completedDate: '2023-09-01',
  }
];

const failedChallenges = [
  {
    id: '1',
    title: 'Dining Out Reduction',
    description: 'Failed to reduce dining expenses by 15%',
    targetAmount: 200,
    actualAmount: 275.50,
    failedDate: '2023-09-10',
  }
];

const getIconComponent = (iconName) => {
  const iconMap = {
    'CreditCard': CreditCard,
    'DollarSign': DollarSign,
    'Briefcase': Briefcase
  };
  
  const IconComponent = iconMap[iconName] || CreditCard;
  return IconComponent;
};

export default function ProfileScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(previousState => !previousState);
  };

  const toggleBiometric = () => {
    setBiometricEnabled(previousState => !previousState);
  };

  const handleGoBack = () => {
    // In a real app, this would navigate back to the dashboard
    // navigation.goBack();
    console.log('Go back to dashboard');
  };

  const renderAccount = (account) => {
    const IconComponent = getIconComponent(account.icon);
    
    return (
      <View key={account.id} style={styles.accountItem}>
        <View style={styles.accountIconContainer}>
          <IconComponent stroke="#F8FAFC" width={20} height={20} />
        </View>
        <View style={styles.accountDetails}>
          <Text style={styles.accountName}>{account.name}</Text>
          <Text style={styles.accountInfo}>
            {account.institution} •••• {account.lastFour}
          </Text>
        </View>
        <View style={styles.accountBalance}>
          <Text style={styles.balanceText}>${account.balance.toFixed(2)}</Text>
          <ChevronRight stroke="#94A3B8" width={16} height={16} />
        </View>
      </View>
    );
  };

  const renderCompletedChallenge = (challenge) => {
    return (
      <View key={challenge.id} style={styles.challengeItem}>
        <View style={[styles.challengeIconContainer, styles.successIcon]}>
          <Check stroke="#F8FAFC" width={16} height={16} />
        </View>
        <View style={styles.challengeDetails}>
          <Text style={styles.challengeName}>{challenge.title}</Text>
          <Text style={styles.challengeDescription}>{challenge.description}</Text>
          <Text style={styles.challengeDate}>
            Completed on {new Date(challenge.completedDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.challengeAmount}>
          <Text style={styles.savedAmount}>+${challenge.savedAmount.toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  const renderFailedChallenge = (challenge) => {
    return (
      <View key={challenge.id} style={styles.challengeItem}>
        <View style={[styles.challengeIconContainer, styles.failedIcon]}>
          <X stroke="#F8FAFC" width={16} height={16} />
        </View>
        <View style={styles.challengeDetails}>
          <Text style={styles.challengeName}>{challenge.title}</Text>
          <Text style={styles.challengeDescription}>{challenge.description}</Text>
          <Text style={styles.challengeDate}>
            Failed on {new Date(challenge.failedDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.challengeAmount}>
          <Text style={styles.failedAmount}>-${(challenge.actualAmount - challenge.targetAmount).toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <ArrowLeft stroke="#F8FAFC" width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings stroke="#F8FAFC" width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image 
              source={{ uri: userData.avatar }} 
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <Edit2 stroke="#F8FAFC" width={16} height={16} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <Text style={styles.memberSince}>Member since {userData.memberSince}</Text>
          
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>${userData.totalBalance.toFixed(2)}</Text>
          </View>
          
          <View style={styles.savingsContainer}>
            <View style={styles.savingsHeader}>
              <Text style={styles.savingsLabel}>Savings Goal</Text>
              <Text style={styles.savingsTarget}>${userData.savingsGoal.toFixed(0)}</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${userData.savingsProgress * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.savingsProgress}>
              ${(userData.savingsGoal * userData.savingsProgress).toFixed(2)} saved
            </Text>
          </View>
        </View>
        
        {/* Linked Accounts */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Linked Accounts</Text>
            <TouchableOpacity>
              <Text style={styles.addButton}>+ Add New</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.accountsList}>
            {accounts.map(renderAccount)}
          </View>
        </View>
        
        {/* Completed Challenges */}
        {completedChallenges.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Completed Challenges</Text>
            <View style={styles.challengesList}>
              {completedChallenges.map(renderCompletedChallenge)}
            </View>
          </View>
        )}
        
        {/* Failed Challenges */}
        {failedChallenges.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Failed Challenges</Text>
            <View style={styles.challengesList}>
              {failedChallenges.map(renderFailedChallenge)}
            </View>
          </View>
        )}
        
        {/* Settings */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Bell stroke="#6366F1" width={20} height={20} />
              </View>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Switch
                trackColor={{ false: "#334155", true: "#6366F1" }}
                thumbColor={notificationsEnabled ? "#F8FAFC" : "#94A3B8"}
                ios_backgroundColor="#334155"
                onValueChange={toggleNotifications}
                value={notificationsEnabled}
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Shield stroke="#6366F1" width={20} height={20} />
              </View>
              <Text style={styles.settingLabel}>Biometric Authentication</Text>
              <Switch
                trackColor={{ false: "#334155", true: "#6366F1" }}
                thumbColor={biometricEnabled ? "#F8FAFC" : "#94A3B8"}
                ios_backgroundColor="#334155"
                onValueChange={toggleBiometric}
                value={biometricEnabled}
              />
            </View>
            
            <TouchableOpacity style={[styles.settingItem, styles.logoutItem]}>
              <View style={[styles.settingIconContainer, styles.logoutIcon]}>
                <LogOut stroke="#F43F5E" width={20} height={20} />
              </View>
              <Text style={styles.logoutLabel}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    backgroundColor: '#1E293B',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    color: '#F8FAFC',
    fontWeight: '700',
  },
  settingsButton: {
    padding: 4,
  },
  scrollContent: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileHeader: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#6366F1',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6366F1',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1E293B',
  },
  userName: {
    fontSize: 24,
    color: '#F8FAFC',
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 20,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    color: '#F8FAFC',
    fontWeight: '700',
  },
  savingsContainer: {
    width: '100%',
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
  },
  savingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  savingsLabel: {
    fontSize: 14,
    color: '#F8FAFC',
    fontWeight: '500',
  },
  savingsTarget: {
    fontSize: 14,
    color: '#F8FAFC',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#475569',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  savingsProgress: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'right',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#F8FAFC',
    fontWeight: '600',
    marginBottom: 16,
  },
  addButton: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '500',
  },
  accountsList: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    overflow: 'hidden',
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  accountIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  accountDetails: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    color: '#F8FAFC',
    fontWeight: '500',
    marginBottom: 4,
  },
  accountInfo: {
    fontSize: 12,
    color: '#94A3B8',
  },
  accountBalance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 16,
    color: '#F8FAFC',
    fontWeight: '600',
    marginRight: 8,
  },
  challengesList: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    overflow: 'hidden',
  },
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  challengeIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  successIcon: {
    backgroundColor: '#4ADE80',
  },
  failedIcon: {
    backgroundColor: '#F43F5E',
  },
  challengeDetails: {
    flex: 1,
  },
  challengeName: {
    fontSize: 16,
    color: '#F8FAFC',
    fontWeight: '500',
    marginBottom: 2,
  },
  challengeDescription: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 2,
  },
  challengeDate: {
    fontSize: 10,
    color: '#64748B',
  },
  challengeAmount: {
    alignItems: 'flex-end',
  },
  savedAmount: {
    fontSize: 16,
    color: '#4ADE80',
    fontWeight: '600',
  },
  failedAmount: {
    fontSize: 16,
    color: '#F43F5E',
    fontWeight: '600',
  },
  settingsList: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    color: '#F8FAFC',
    fontWeight: '500',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutIcon: {
    backgroundColor: 'rgba(244, 63, 94, 0.2)',
  },
  logoutLabel: {
    flex: 1,
    fontSize: 16,
    color: '#F43F5E',
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 50,
  },
});
