# 📱 VISION Mobile App — React Native Interface for the Wearable Ecosystem for the Visually Impaired

**VISION (Wearable Ecosystem for the Visually Impaired)** is an integrated assistive technology platform enhancing the **mobility, autonomy, and safety** of visually impaired individuals.  
This repository hosts the **React Native–based mobile application**, serving as the **bridge between wearable devices and the API**. It enables real-time monitoring and emergency communication through an intuitive, accessible mobile interface.

---

## 🏗️ System Architecture

The VISION ecosystem operates as a **three-tier system**, where the mobile app functions as the **communication and control hub** between hardware and the API.

| Layer | Role |
|-------|------|
| **Wearable Hardware (ESP32 Devices) and Glasses** | Smart Band, Smart Shoes, smart glasses – collect biometric, system, and environmental data. |
| **Rasberry Pi** | Acts as a bridge between the wearable hardware and the mobile application |
| **Mobile App (React Native)** | Receives biometric and system data from wearables via the Rasberry Pi through Bluetooth Low Energy (BLE), displays real-time stats, triggers emergency alerts, and syncs data with the API. |
| **Backend API (Laravel)** | Manages authentication, stores data in MySQL, and provides analytics endpoints consumed by the website. |

The app and the website share a unified database, ensuring **real-time synchronization** of biometric readings and emergency notifications.

---

## ⚙️ Features

- 🔗 **Bluetooth Low Energy (BLE) Connectivity** – Pairs with the Rasberry Pi and receives biometric and system data.  
- 🧠 **Real-Time Monitoring** – Displays heart rate (BPM), SpO₂, and system battery in a simple and accessible interface.  
- 🚨 **Emergency Alerts** – Automatically detects falls or abnormal biometrics and sends instant alerts to registered caregivers.  
- ☁️ **Cloud Synchronization** – Periodically uploads readings to the Laravel API for storage and analysis.   
- ♿ **Accessibility by Design** - large touch targets, and high-contrast UI designed for visually impaired users.  
- 🔒 **Secure Authentication** – Uses Laravel Sanctum tokens for session management and data security.  
- 🧭 **Offline Functionality** – Caches recent data and syncs automatically when reconnected.  

---

## 🧰 Tech Stack

| Component | Technology |
|------------|-------------|
| Framework | React Native 0.82.1 |
| Language | JavaScript |
| Data Storage | AsyncStorage (local) + Laravel API (remote) |
| Connectivity | Bluetooth Low Energy (BLE) |
| Backend | Laravel 12.15.0 |
| Database | MySQL |
| Authentication | Laravel Sanctum |
| Version Control | Git & GitHub |

---

## 🚀 Getting Started (Local Development)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/ManarMerhiMM/VISION-MobileApp.git
cd vision-mobileapp
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start the Metro bundler
```bash
npx react-native start
```

### 4️⃣ Run the app
- **Android:**
  ```bash
  npx react-native run-android
  ```
- **iOS (macOS only):**
  ```bash
  npx react-native run-ios
  ```

> 💡 If you are on Windows and want to test on iPhone, use **Expo Go** or a **macOS cloud build** (e.g., Expo EAS).

---

## ⚙️ Configuration

### 🔧 Environment Variables (`.env`)
The app requires a few environment values for backend communication:
```
API_BASE_URL=http://127.0.0.1:8000/api
```

### 📶 Bluetooth Permissions
Make sure to enable:
- Location (Android)
- Bluetooth (iOS & Android)
- Notifications (for alerts)

---

## 🔒 Security Practices

- ✅ All API traffic uses **HTTPS** (TLS 1.2+)  
- ✅ Tokens stored securely using **encrypted AsyncStorage**  
- ✅ BLE pairing uses device whitelisting to prevent unauthorized access  
- ✅ Session tokens expire and refresh automatically via Sanctum  
- ✅ No sensitive data stored locally beyond temporary caching  

---

## 🧠 System Data Flow

1. Raspberry Pi aggregates sensor data (heart rate, SpO₂, system data, motion) from ESP32-based modules.  
2. The **Mobile App** connects to the Raspberry Pi via BLE and displays live readings.  
3. The app **uploads data** periodically to the **Laravel API** using HTTPS.  
4. The **API** stores validated readings in **MySQL**.  
5. The **React Web Dashboard** retrieves this data.  

---

## 🧩 Accessibility Features

- Large, high-contrast buttons and scalable fonts.  
- Screen reader–friendly labels (Android TalkBack, iOS VoiceOver).  
- Audio confirmations for successful actions (e.g., “Device connected”).  
- Emergency alerts include both sound and vibration feedback.  

---

## 🧪 Future Enhancements

- 🤖 **Reinforcement Learning Integration:** Adaptive feedback tuning based on user behavior and environment.  
- 🗺️ **GPS & Navigation:** Outdoor route guidance and caregiver location sharing.  
- 💬 **Voice Commands:** Full hands-free operation using speech recognition.  
- 📊 **Predictive Health Analytics:** AI-driven insights on biometric trends.  

---

## 👥 Contributors

**VISION Development Team**  
Final Year Project — Computer Engineering Department  

| Role | Name |
|------|------|
| Backend Developer | Manar Merhi |
| Frontend Developer (Web) | Malek Shibli |
| Mobile Developer (React Native) | Manar Merhi |
| Embedded Systems / Hardware | Mohammad Shaaban |
| Computer Vision & ML | Mohammad El Halabi |
| Biometric Processing | Abdulrahman Nakouzi |

---

### 📄 License
This project is developed for **academic** and **research** purposes.  
###### © 2025 VISION Project Team — All rights reserved.
