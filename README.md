# 🛡️ Gear-Guard: The Ultimate Maintenance Tracker

Gear-Guard is a professional-grade **Computerized Maintenance Management System (CMMS)** designed to bridge the gap between technical assets and workforce execution. It tracks machines, vehicles, and computers while managing the full lifecycle of maintenance requests.

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
| **1** | **Landing & Entry** | High-conversion entry point for the Gear-Guard ecosystem. | ![Landing](ss/ss-1.png) ![Landing2](ss/ss-2.png) |
| **2** | **User Access** | Public routes (Signup/Login) secured via Auth Guards. | ![Signup](ss/ss-3.png) |
| **3** | **Control Center** | Centralized dashboard for real-time asset monitoring. | ![Dashboard](ss/ss-4.png) |
| **4** | **Task Management** | Kanban board featuring drag-and-drop stages. | ![Kanban](ss/ss-5.png) |
| **5** | **Request Flow** | Structured form for creating maintenance logs with Auto-Fill. | ![Request](ss/ss-6.png) |
| **6** | **Scheduling** | Monthly grid visualization showing priority-coded tasks. | ![Calendar](ss/ss-7.png) |
| **7** | **Asset Tracking** | Detailed inventory grid with expanding dropdowns for specs. | ![Inventory](ss/ss-8.png) |
| **8** | **Infrastructure** | Work Center master list management. | ![WorkCenter](ss/ss-9.png) |
| **9** | **Workforce** | Team directory for human resource allocation. | ![Teams](ss/ss-10.png) |
| **10** | **Data Modeling** | Database schema and document relationships. | ![Database](ss/ss-11.png) |

---

## ✨ Key Features & Business Logic

### ⚙️ The Maintenance Workflow
The system is built to handle two primary operational flows based on industrial standards:

#### Flow 1: The Breakdown (Corrective Maintenance)
1. **Request Creation:** Any user can report an issue (e.g., "Leaking Oil").
2. **Auto-Fill Logic:** * When a user selects an Equipment (e.g., "CNC Lathe 04"), the system executes a background lookup.
   * It automatically populates the **Equipment Category** and the **Responsible Maintenance Team** (e.g., "Mechanical Team B") into the form.
3. **Stage Management:** Tasks move through a state machine: `New` ➡️ `In Progress` ➡️ `Repaired`.
4. **Duration Tracking:** Technicians record actual labor hours (Duration) upon completion for ROI reporting.

#### Flow 2: The Routine Checkup (Preventive Maintenance)
1. **Scheduling:** Managers create **Preventive** requests for routine checkups.
2. **Date Setting:** Tasks are assigned to specific future dates.
3. **Calendar Visibility:** These requests populate the **Calendar View** ensuring technicians are prepared for upcoming work.

### 💻 User Interface & Views
* **Kanban Board:** The primary technician workspace. 
    * **Drag & Drop:** Move cards between columns: `New`, `In Progress`, `Repaired`, and `Scrap`.
    * **Visual Indicators:** Cards display a **Red Strip** if the current date is past the `Scheduled Date` without completion (Overdue).
* **Equipment Inventory:** A grid layout with **Expanding Card** logic to reveal maintenance history and precise work-center location.
* **Pivot/Graph Reports:** Real-time analytics showing the "Number of Requests per Team" or "Total Downtime per Category."

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
cd Back-end   # Configure your own .env file with MONGODB_URI and JWT_SECRET credentials.
npm install
node server.js # Backend starts on: http://localhost:3021

3️⃣ Frontend Setup
cd Front-end
npm run dev
npm start # Frontend runs on: http://localhost:5173

