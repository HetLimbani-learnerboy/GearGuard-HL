# 🛡️ Gear-Guard: Maintenance Management System

Gear-Guard is a professional-grade **Computerized Maintenance Management System (CMMS)** designed to streamline industrial maintenance, track technical assets, and manage workforce scheduling efficiently.

---

## 👥 Meet the Team
Developed with passion by:
- **Het Limbani**   
- **Anuj Raval** 
- **Sahil Dobaria**  
- **Tirth Panchal**  

---

## 🚀 Tech Stack

### Frontend
- **React.js** (Hooks, Context API, Functional Components)
- **React Router DOM (v6)** with Protected Route implementation
- **Modern CSS3** with high-performance animations  

### Backend
- **Node.js**
- **Express.js**

### Database
- **MongoDB**
- **Mongoose ODM**

---

## ✨ Key Features

### 💻 Intelligent Equipment Inventory
- **Image Table View:** Modern grid layout showing equipment name, serial number, and assigned technician.
- **Dropdown Detail Logic:** Click **“View More”** on any card to reveal extended details such as:
  - Used By  
  - Maintenance Team  
  - Work Center  
- **Smooth Animations:** Height-based expand/collapse transitions.
- **Live Search:** Instantly filter 60+ records by **Name**, **Serial Number**, or **Technician**.

---

### 📅 Maintenance Calendar
- **Date-wise Scheduling:** Monthly grid visualization of maintenance requests.
- **Priority Color Coding:**
  - 🔴 **Red:** High Priority (Level 3)
  - 🟠 **Orange:** Medium Priority (Level 2)
  - 🔵 **Blue:** Low Priority (Level 1)
- **Quick Preview Panel:** Clicking a date reveals requester name and location.

---

### 📝 Smart Request Creation
- **Session Persistence:** Form data is cached in `localStorage` to prevent data loss when navigating between pages.
- **Dynamic Assignment:** Seamless selection of Maintenance Teams and Work Centers from master lists.

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
├── App.jsx                     # Routing Logic
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
git clone https://github.com/yourusername/gear-guard.git
cd gear-guard

2️⃣ Backend Setup
cd backend
npm install
npm start


Backend will start on:
http://localhost:3021

3️⃣ Frontend Setup
cd client
npm install
npm start

Frontend will run on:
http://localhost:3000

