# 🛡️ Gear-Guard: Maintenance Management System

Gear-Guard is a professional-grade **Computerized Maintenance Management System (CMMS)** designed to streamline industrial maintenance, track technical assets, and manage workforce scheduling efficiently.

---

## 👥 Meet the Team
Developed with passion by:
- **Het Limbani** - **Anuj Raval** - **Sahil Dobaria** - **Tirth Panchal** ---

## 🚀 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, React Router DOM v6, Modern CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |

---

## 🖼️ System Visualization & Guides
| Step | Phase | Description | Visual Reference |
| :--- | :--- | :--- | :--- |
| **1** | **User Access** | Public routes (Login/Signup) redirecting to the secure Dashboard via Auth Guards. |  |
| **2** | **System Logic** | How the Frontend interacts with modular Backend routes and the Database. |  |
| **3** | **Data Structure** | The relationship between Equipment, Maintenance Teams, and Work Centers. |  |
| **4** | **Inventory UI** | The "Expanding Card" logic used to display 60+ equipment records. |  |
| **5** | **Scheduling** | Calendar-based visualization showing priority-coded maintenance tasks. |  |

---

## ✨ Key Features

### 💻 Intelligent Equipment Inventory
- **Image Table View:** Modern grid layout showing equipment name, serial number, and assigned technician.
- **Dropdown Detail Logic:** Click **“View More”** on any card to reveal details: *Used By, Maintenance Team, and Work Center.*
- **Live Search:** Instantly filter records by **Name**, **Serial Number**, or **Technician**.

### 📅 Maintenance Calendar
- **Priority Color Coding:** 🔴 High (L3), 🟠 Medium (L2), 🔵 Low (L1).
- **Quick Preview Panel:** Click a date to see requester info and location instantly.

### 📝 Smart Request Creation
- **Session Persistence:** Drafts are cached in `localStorage` to prevent data loss during navigation.
- **Dynamic Assignment:** Automated mapping of Teams and Technicians to requests.

---

## 📂 Project Structure

### 🎨 Frontend Architecture
```text
src/
├── Component/
│   ├── Sidebar.jsx             # Dynamic Navigation
│   ├── EquipmentPage.jsx       # Expanding Card Inventory
│   ├── MaintenanceCalendar.jsx # Priority-coded Calendar
│   ├── CreateRequestPage.jsx   # Persistent Multi-step Form
│   ├── TestActivityPage.jsx    # Detailed Request View
│   └── ProtectedRoute.jsx      # Auth Guard Wrapper
└── App.jsx                     # Routing Logic
```

###  Backend Architecture
```text
Back-end/
├── models/                     # Mongoose Schemas (Equipment, Maintenance)
├── controllers/                # Business Logic (CRUD Operations)
├── routes/                     # API Endpoints
├── app.js                      # Configuring an Express application with CORS
└── server.js                   # Entry Point & MongoDB Connection
```


### 🛠️ Setup & Installation
1️⃣ Clone the Repository
git clone https://github.com/HetLimbani-learnerboy/GearGuard-HL.git
cd GearGuard-HL

2️⃣ Backend Setup
cd Back-end  
# Configure your own .env file with MONGODB_URI and JWT_SECRET credentials.
npm install
node server.js
# Backend starts on: http://localhost:3021

3️⃣ Frontend Setup
cd Front-end
npm install
npm start
# Frontend runs on: http://localhost:3000

