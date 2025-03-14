# 🏥CareSync - Smart Hospital Management System🏥
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.0%2B-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue?logo=typescript)](https://www.typescriptlang.org/)
[![WebSocket](https://img.shields.io/badge/WebSocket-Enabled-brightgreen?logo=websocket)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
[![Recoil](https://img.shields.io/badge/Recoil-State%20Management-blueviolet?logo=react)](https://recoiljs.org/)
[![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-yellowgreen?logo=axios)](https://axios-http.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0%2B-brightgreen?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.17%2B-black?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.0%2B-blue?logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM%20for%20Databases-lightblue?logo=prisma)](https://www.prisma.io/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.5.1-black?logo=socket.io)](https://socket.io/)
[![Flask](https://img.shields.io/badge/Flask-Python%20Microframework-lightgray?logo=flask)](https://flask.palletsprojects.com/)
[![Pandas](https://img.shields.io/badge/Pandas-Data%20Analysis-blue?logo=pandas)](https://pandas.pydata.org/)

![ReadMeBanner](https://github.com/user-attachments/assets/f58009fb-d455-4da7-aedc-155c42aa39a7)
**🚀 Revolutionizing Healthcare - Your all-in-one solution for managing OPD queues, real-time bed tracking, and inventory management.**

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

## 🌟 Why CareSync?
** Imagine a world where patients never wait endlessly in OPD queues, hospitals always know their bed availability in real-time, and inventory never runs out of essential supplies. CareSync makes this a reality by integrating AI, real-time data, and predictive analytics to create a seamless experience for patients and healthcare providers.**
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

## 🚀 Key Features
### 🏥 1. OPD Queue Management
- Real-time Tracking: Monitor patient queues and track waiting times.
- Online Appointment Scheduling: Allow patients to book appointments online.
- Patient Notifications & Alerts: Send updates to patients regarding their appointment status.
- Digital Registration: Patients can register digitally.
### 🛏️ 2. Real-time Bed Availability
- Live Monitoring: View real-time occupancy status for each bed.
- Emergency Bed Allocation: Allocate beds quickly in critical situations.
- Sorting & Filtering: Filter beds based on status (occupied, vacant, under maintenance).
### 🩺 3. Patient Admission System
- Streamlined Process: Automate and simplify patient admissions for efficient processing.
- Integrated Patient Info: Store patient history and medical information for quick access.
- Coordination Tools: Integrated tools for doctor-nurse collaboration on patient care.
### 📦 4. Inventory Management
Stock Monitoring: Track inventory levels of medicines and consumables.
- Automated Alerts: Receive notifications when stock is low or nearing expiry.
- Usage Analytics: Generate reports on inventory usage, helping with future stock forecasting.
### 🔐 5. User Roles and Authentication
- Role-Based Access: Different roles for Doctors, Patients, Receptionists, and Admins.
- Secure Authentication: Secure login and data encryption for all users.
- Admin Control: Admins can manage user roles and system settings.

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

## 🛠️ Tech Stack
### Frontend 🖥️
- React.js
- TypeScript
- WebSocket
- Recoil
- React Router
- Axios
- CSS3 / Tailwind
### Backend 💻
- Node.js
- Express.js
- PostgreSQL
- Prisma
- socket.io
- Zod
- RESTful APIs
- JWT
### AI/ML 🤖
- Flask
- Pandas
  
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">
  
## 🛠️ Installation Guide
🧩 Setup Steps
### 1. Clone the Repository
```bash
git clone https://github.com/btwshivam/Care-Sync.git
cd care-sync
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd server

# Install dependencies
npm install

# Database
npx prisma migrate dev

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Start development server
npm run dev
```
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

### ⚠️ Troubleshooting
**Common Issues**
1. Database Connection Issues
- Ensure PostgreSQL is running locally or on the specified server.
- Double-check your PostgreSQL connection string in the .env file to ensure it’s correct.
- Verify that your firewall or network settings are not blocking the connection.
2. Node Module Issues
- Try deleting node_modules and package-lock.json.
- Run npm install again.
- Port Conflicts
- Check if ports 5137, 3001 and 3000 are available.
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

### 📜 License
### This project is licensed under the  [MIT License](LICENSE).

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">
### ❤️ If you find this project helpful, please give us a ⭐ and share it with others!
