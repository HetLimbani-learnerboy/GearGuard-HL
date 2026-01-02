import React, { useState, useEffect } from "react";
// 1. IMPORT useNavigate
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./MaintenanceCalendar.css";

export default function MaintenanceCalendar() {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDateRequests, setSelectedDateRequests] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3021/api/maintenance")
            .then((res) => res.json())
            .then((data) => setRequests(Array.isArray(data) ? data : []))
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()); i++) days.push(i);

    const handleDateClick = (day) => {
        if (!day) return;
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        const dateStr = `${year}-${month}-${d}`;

        const filtered = requests.filter(req => req.scheduledDate.startsWith(dateStr));
        setSelectedDateRequests(filtered);
    };

    const getPriorityColor = (priority) => {
        if (priority === 3) return "#ef4444";
        if (priority === 2) return "#f59e0b";
        return "#3b82f6";
    };

    return (
        <div className="cal-layout">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="cal-main">
                <header className="cal-header">
                    <button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(true)}>
                        <div className="bar"></div><div className="bar"></div><div className="bar"></div>
                    </button>
                    <div className="cal-nav">
                        <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>{"<"}</button>
                        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                        <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>{">"}</button>
                    </div>
                </header>

                <div className="cal-container">
                    <div className="cal-grid-wrapper">
                        <div className="cal-day-labels">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
                        </div>
                        <div className="cal-grid">
                            {days.map((day, idx) => {
                                const year = currentDate.getFullYear();
                                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                                const d = day ? String(day).padStart(2, '0') : null;
                                const dateStr = day ? `${year}-${month}-${d}` : null;

                                const dailyReqs = requests.filter(r => r.scheduledDate.startsWith(dateStr));

                                return (
                                    <div key={idx} className={`cal-day ${day ? 'active' : 'empty'}`} onClick={() => handleDateClick(day)}>
                                        <span className="day-num">{day}</span>
                                        <div className="event-dots">
                                            {dailyReqs.slice(0, 3).map((r, i) => (
                                                <div key={i} className="dot" style={{ backgroundColor: getPriorityColor(r.priority) }}></div>
                                            ))}
                                            {dailyReqs.length > 3 && <span className="more-plus">+{dailyReqs.length - 3}</span>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <aside className="cal-details-panel">
                        <h3>Schedule for Selected Date</h3>
                        {selectedDateRequests.length > 0 ? (
                            <div className="req-list-mini">
                                {selectedDateRequests.map(req => (
                                    <div
                                        key={req._id}
                                        className="mini-card clickable"
                                        style={{ borderLeft: `5px solid ${getPriorityColor(req.priority)}` }}
                                        onClick={() => navigate(`/test-activity/${req._id}`)}
                                    >
                                        <p className="mini-subject">{req.subject}</p>
                                        <div className="mini-meta">
                                            <span><strong>By:</strong> {req.name}</span>
                                            <span><strong>Maintenance for:</strong> {req.maintenanceFor}</span>
                                        </div>
                                        <span className="mini-prio">Priority {req.priority}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="no-req">No maintenance scheduled for this day.</p>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
}