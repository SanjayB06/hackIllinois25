# UnSpend Frontend

SpendBoost is a gamified budgeting and savings accelerator app built with React Native using Expo. It aggregates user transaction data, displays active challenges, and simulates real‑time notifications.

## Prerequisites

- **Node.js:** We recommend using Node LTS (v16 or v18).
- **npm or Yarn:** Your package manager.
- **Git:** For cloning the repository.
- **Expo CLI:** Use the local Expo CLI bundled with the project (via npx).

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/spendboost-frontend.git
   cd UnSpend
   ```

2. **Install Dependencies:**

   Install the core dependencies by running:

   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Install Additional Packages:**

   The project uses `react-native-feather` for icons. If you get an error stating that "react-native-feather" cannot be resolved, install it:

   ```bash
   npm install react-native-feather
   ```
   or
   ```bash
   yarn add react-native-feather
   ```

   If you plan to run the app on the web, install these dependencies as well:

   ```bash
   npx expo install react-dom react-native-web @expo/metro-runtime
   ```

## Running the App

### Mobile (Using Expo Go)

1. **Start the Project:**

   Run the following command:

   ```bash
   npx expo start
   ```

2. **Launch on a Device/Emulator:**

   - **On a Device:**  
     Scan the QR code that appears in the Expo Dev Tools (or in the terminal) using the Expo Go app on your iOS or Android device.
   - **On an Emulator:**  
     Press **i** (for iOS) or **a** (for Android) in the Expo Dev Tools to launch the corresponding emulator.

### Web

1. **Start the Project for Web:**

   Run:

   ```bash
   npx expo start --web
   ```

2. **View in Browser:**

   Your app will open in your default web browser. (If you previously saw only the JSON manifest, installing the web dependencies and running with `--web` should now display your actual UI from App.js.)