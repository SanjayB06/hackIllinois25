"use client"

import { useState, useEffect } from "react"
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Calendar,
  CreditCard,
  DollarSign,
  Home,
  Menu,
  ShoppingBag,
  Utensils,
  User,
  X,
} from "react-native-feather"

import ProfileScreen from './profile';

// Sample data: In a real app, these will be fetched via APIs or through WebSocket events
const sampleTransactions = [
  {
    id: "1",
    category: "Dining",
    description: "Indian Food",
    amount: 50,
    date: "2023-09-15",
    icon: "Utensils",
    type: "expense",
  },
  {
    id: "2",
    category: "Groceries",
    description: "Supermarket",
    amount: 75,
    date: "2023-09-14",
    icon: "ShoppingBag",
    type: "expense",
  },
  {
    id: "3",
    category: "Transport",
    description: "Uber Ride",
    amount: 20,
    date: "2023-09-14",
    icon: "CreditCard",
    type: "expense",
  },
  {
    id: "4",
    category: "Income",
    description: "Salary Deposit",
    amount: 2500,
    date: "2023-09-01",
    icon: "DollarSign",
    type: "income",
  },
]

const activeChallenge = {
  id: "challenge1",
  title: "Chill on Indian Food",
  description: "Your spending on Indian Food is high. This week, try to cut it down by $15!",
  currentAmount: 50,
  targetAmount: 35,
  progress: 0,
  daysLeft: 3,
}

const getIconComponent = (iconName) => {
  const iconMap = {
    Utensils: Utensils,
    ShoppingBag: ShoppingBag,
    CreditCard: CreditCard,
    DollarSign: DollarSign,
  }

  const IconComponent = iconMap[iconName] || DollarSign
  return IconComponent
}

export default function App() {
  const [transactions, setTransactions] = useState(sampleTransactions)
  const [challenge, setChallenge] = useState(activeChallenge)
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [activeScreen, setActiveScreen] = useState('home');

  // Calculate challenge progress
  useEffect(() => {
    const savedAmount = challenge.currentAmount - challenge.targetAmount
    const totalToSave = challenge.currentAmount - challenge.targetAmount
    const progress = savedAmount / totalToSave

    setChallenge((prev) => ({
      ...prev,
      progress: progress > 0 ? progress : 0,
    }))
  }, [challenge.currentAmount, challenge.targetAmount])

  // Simulate receiving real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real scenario, you'd receive these from a WebSocket server
      const newNotification = {
        id: Date.now().toString(),
        title: "Spending Alert",
        message: "You're on track with your weekly budget!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      }

      setNotifications((prev) => [newNotification, ...prev.slice(0, 4)])
    }, 10000) // every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const renderTransaction = ({ item }) => {
    const IconComponent = getIconComponent(item.icon)

    return (
      <View style={styles.transactionItem}>
        <View style={[styles.iconContainer, item.type === "income" ? styles.incomeIcon : styles.expenseIcon]}>
          <IconComponent stroke="#fff" width={16} height={16} />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionDescription}>{item.description}</Text>
          <Text style={styles.transactionCategory}>
            {item.category} • {item.date}
          </Text>
        </View>
        <View style={styles.transactionAmount}>
          <Text style={[styles.amountText, item.type === "income" ? styles.incomeText : styles.expenseText]}>
            {item.type === "income" ? "+" : "-"}${item.amount}
          </Text>
        </View>
      </View>
    )
  }

  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationIcon}>
        <Bell stroke="#6366F1" width={16} height={16} />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      <TouchableOpacity style={styles.notificationDismiss}>
        <X stroke="#94A3B8" width={16} height={16} />
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.menuButton}>
            <Menu stroke="#F8FAFC" width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>UnSpend</Text>
          <TouchableOpacity style={styles.notificationButton} onPress={() => setShowNotifications(!showNotifications)}>
            <Bell stroke="#F8FAFC" width={24} height={24} />
            {notifications.length > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>{notifications.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Conditional rendering based on active screen */}
      {activeScreen === 'profile' ? (
        <ProfileScreen navigation={{ goBack: () => setActiveScreen('home') }} />
      ) : (
        <ScrollView 
          contentContainerStyle={styles.dashboardContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Balance Summary */}
          <View style={styles.balanceSummary}>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <Text style={styles.balanceAmount}>$3,245.00</Text>
              <Text style={styles.balanceChange}>+$250 this month</Text>
            </View>

            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <ArrowDown stroke="#fff" width={16} height={16} />
                </View>
                <Text style={styles.actionText}>Income</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={[styles.actionIcon, styles.expenseAction]}>
                  <ArrowUp stroke="#fff" width={16} height={16} />
                </View>
                <Text style={styles.actionText}>Expense</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Active Challenge */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Active Challenge</Text>
            <View style={styles.challengeCard}>
              <View style={styles.challengeHeader}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <View style={styles.challengeBadge}>
                  <Text style={styles.challengeBadgeText}>{challenge.daysLeft} days left</Text>
                </View>
              </View>

              <Text style={styles.challengeDescription}>{challenge.description}</Text>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${challenge.progress * 100}%` }]} />
                </View>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressStart}>${challenge.targetAmount}</Text>
                  <Text style={styles.progressEnd}>${challenge.currentAmount}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Transactions List */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllButton}>See All</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={renderTransaction}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <View style={styles.notificationsPanel}>
          <View style={styles.notificationsHeader}>
            <Text style={styles.notificationsPanelTitle}>Notifications</Text>
            <TouchableOpacity onPress={() => setShowNotifications(false)}>
              <X stroke="#F8FAFC" width={20} height={20} />
            </TouchableOpacity>
          </View>

          {notifications.length > 0 ? (
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
              renderItem={renderNotification}
              contentContainerStyle={styles.notificationsList}
            />
          ) : (
            <View style={styles.emptyNotifications}>
              <Text style={styles.emptyNotificationsText}>No notifications yet</Text>
            </View>
          )}
        </View>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveScreen('home')}
        >
          <Home stroke={activeScreen === 'home' ? "#F8FAFC" : "#94A3B8"} width={20} height={20} />
          <Text style={[styles.navText, activeScreen === 'home' && styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveScreen('calendar')}
        >
          <Calendar stroke={activeScreen === 'calendar' ? "#F8FAFC" : "#94A3B8"} width={20} height={20} />
          <Text style={[styles.navText, activeScreen === 'calendar' && styles.activeNavText]}>Calendar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveScreen('cards')}
        >
          <CreditCard stroke={activeScreen === 'cards' ? "#F8FAFC" : "#94A3B8"} width={20} height={20} />
          <Text style={[styles.navText, activeScreen === 'cards' && styles.activeNavText]}>Cards</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveScreen('profile')}
        >
          <User stroke={activeScreen === 'profile' ? "#F8FAFC" : "#94A3B8"} width={20} height={20} />
          <Text style={[styles.navText, activeScreen === 'profile' && styles.activeNavText]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A", // Darker blue background
  },
  header: {
    backgroundColor: "#1E293B", // Slightly lighter than background
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    color: "#F8FAFC",
    fontWeight: "700",
  },
  notificationButton: {
    padding: 4,
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#EF4444",
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  dashboardContainer: {
    padding: 20,
    paddingBottom: 80, // Extra padding for bottom nav
  },
  balanceSummary: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceContainer: {
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    color: "#F8FAFC",
    fontWeight: "700",
    marginBottom: 4,
  },
  balanceChange: {
    fontSize: 14,
    color: "#4ADE80",
    fontWeight: "500",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#334155",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "48%",
  },
  actionIcon: {
    backgroundColor: "#6366F1",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  expenseAction: {
    backgroundColor: "#F43F5E",
  },
  actionText: {
    color: "#F8FAFC",
    fontSize: 14,
    fontWeight: "600",
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#F8FAFC",
    fontWeight: "600",
    marginBottom: 16,
  },
  seeAllButton: {
    color: "#6366F1",
    fontSize: 14,
    fontWeight: "500",
  },
  challengeCard: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  challengeTitle: {
    fontSize: 18,
    color: "#F8FAFC",
    fontWeight: "600",
  },
  challengeBadge: {
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  challengeBadgeText: {
    color: "#6366F1",
    fontSize: 12,
    fontWeight: "500",
  },
  challengeDescription: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 16,
    lineHeight: 20,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#334155",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#6366F1",
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressStart: {
    color: "#4ADE80",
    fontSize: 12,
    fontWeight: "500",
  },
  progressEnd: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "500",
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  expenseIcon: {
    backgroundColor: "#F43F5E",
  },
  incomeIcon: {
    backgroundColor: "#4ADE80",
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    color: "#F8FAFC",
    fontWeight: "500",
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 12,
    color: "#94A3B8",
  },
  transactionAmount: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "600",
  },
  expenseText: {
    color: "#F43F5E",
  },
  incomeText: {
    color: "#4ADE80",
  },
  notificationsPanel: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: width * 0.8,
    backgroundColor: "#1E293B",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    zIndex: 1000,
  },
  notificationsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  notificationsPanelTitle: {
    fontSize: 18,
    color: "#F8FAFC",
    fontWeight: "600",
  },
  notificationsList: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#334155",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  notificationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    color: "#F8FAFC",
    fontWeight: "600",
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 12,
    color: "#94A3B8",
    marginBottom: 4,
    lineHeight: 18,
  },
  notificationTime: {
    fontSize: 10,
    color: "#64748B",
  },
  notificationDismiss: {
    padding: 4,
  },
  emptyNotifications: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyNotificationsText: {
    color: "#94A3B8",
    fontSize: 14,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1E293B",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navText: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
  },
  activeNavText: {
    color: "#F8FAFC",
    fontWeight: "500",
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E293B',
  },
  profileTitle: {
    fontSize: 24,
    color: '#F8FAFC',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '500',
  },
})