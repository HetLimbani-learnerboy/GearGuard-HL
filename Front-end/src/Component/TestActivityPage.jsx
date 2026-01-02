import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./TestActivityPage.css";

export default function TestActivityPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3021/api/requests/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error(`Status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                const fetchedItem = Array.isArray(data) ? data[0] : data;
                const storedTeam = localStorage.getItem("selectedTeam");
                const pendingUpdateId = localStorage.getItem("pendingUpdateId");

                if (storedTeam && pendingUpdateId === id) {
                    const newTeam = JSON.parse(storedTeam);
                    setItem({
                        ...fetchedItem,
                        team: newTeam.team_name,
                        technician: newTeam.team_members.join(", "),
                        isDirty: true
                    });
                } else {
                    setItem(fetchedItem);
                }
            })
            .catch((err) => setError(err.message));
    }, [id]);

    const handleRedirectToTeams = () => {
        localStorage.setItem("pendingUpdateId", id);
        navigate("/teams");
    };

    const handleUpdateTeam = async () => {
        if (!window.confirm("Are you sure you want to update the assigned team for this request?")) return;

        setIsUpdating(true);
        try {
            const res = await fetch(`http://localhost:3021/api/requests/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    team: item.team,
                    technician: item.technician
                })
            });

            if (res.ok) {
                alert("Team and Technicians updated successfully!");
                localStorage.removeItem("selectedTeam");
                localStorage.removeItem("pendingUpdateId");
                setItem({ ...item, isDirty: false });
            } else {
                throw new Error("Failed to update team in backend");
            }
        } catch (err) {
            alert(err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    if (error) return <div className="ta-error-state">Error: {error}</div>;
    if (!item) return <div className="ta-loader-state">Initializing View...</div>;

    return (
        <div className="ta-page-container">
            <Sidebar />
            <div className="ta-main-content">

                <header className="ta-header-card">
                    <button className="ta-back-control" onClick={() => navigate(-1)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                        <span>Back</span>
                    </button>

                    <div className="ta-title-center">
                        <h1 className="ta-main-heading">Activity Details</h1>
                        <p className="ta-id-badge">ID: {item._id}</p>
                    </div>

                    <div className="ta-header-actions">
                        {item.isDirty && (
                            <button className="ta-confirm-btn" onClick={handleUpdateTeam} disabled={isUpdating}>
                                {isUpdating ? "Saving..." : "Confirm Team Update"}
                            </button>
                        )}
                        <div className={`ta-status-pill ta-status-${item.status || 'new'}`}>
                            STATUS: {item.status ? item.status.toUpperCase() : "NEW"}
                        </div>
                    </div>
                </header>

                <div className="ta-details-grid">

                    <section className="ta-info-card ta-ani-1">
                        <h3 className="ta-card-title">General Information</h3>
                        <div className="ta-data-row">
                            <label className="ta-data-label">Requester</label>
                            <p className="ta-data-value ta-highlight">{item.name}</p>
                        </div>
                        <div className="ta-data-row">
                            <label className="ta-data-label">Maintenance For</label>
                            <p className="ta-data-value">{item.maintenanceFor.replace("_", " ")}</p>
                        </div>
                        <div className="ta-data-row">
                            <label className="ta-data-label">Equipment</label>
                            <p className="ta-data-value">{item.subject}</p>
                        </div>
                        <div className="ta-data-row">
                            <label className="ta-data-label">Category</label>
                            <p className="ta-data-value">{item.category}</p>
                        </div>
                        <div className="ta-data-row">
                            <label className="ta-data-label">Request Date</label>
                            <p className="ta-data-value">{new Date(item.requestDate).toLocaleDateString()}</p>
                        </div>
                        <div className="ta-data-row">
                            <label className="ta-data-label">Maintenance Type</label>
                            <p className="ta-data-value ta-type-text">{item.type}</p>
                        </div>
                    </section>

                    <section className="ta-info-card ta-ani-2">
                        <div className="ta-card-header-flex">
                            <h3 className="ta-card-title">Assignment & Location</h3>
                            <button className="ta-edit-link" onClick={handleRedirectToTeams}>Change Team</button>
                        </div>
                        <div className="ta-data-row">
                            <label className="ta-data-label">Assigned Team</label>
                            <p className="ta-data-value">{item.team}</p>
                        </div>
                        <div className="ta-data-row">
                            <label className="ta-data-label">Technicians</label>
                            <p className="ta-data-value">{item.technician}</p>
                        </div>
                        <div className="ta-data-row">
                            <label className="ta-data-label">Scheduled Date</label>
                            <p className="ta-data-value">{new Date(item.scheduledDate).toLocaleString()}</p>
                        </div>
                        <div className="ta-data-row">
                            <label className="ta-data-label">Duration (hrs)</label>
                            <p className="ta-data-value">{item.duration || "N/A"}</p>
                        </div>
                        <div className="ta-data-row">
                            <label className="ta-data-label">Priority</label>
                            <div className={`ta-priority-box ta-prio-${item.priority}`}>
                                Level {item.priority}
                            </div>
                        </div>
                        <div className="ta-data-row">
                            <label className="ta-data-label">Company / Location</label>
                            <p className="ta-data-value">{item.company || "N/A"}</p>
                        </div>
                    </section>

                    <section className="ta-info-card ta-full-row ta-ani-3">
                        <h3 className="ta-card-title">Instructions & Notes</h3>
                        <div className="ta-instruction-block">
                            <h4 className="ta-sub-label">Step-by-Step Repair Instructions</h4>
                            <p className="ta-text-paragraph">{item.instructions || "No instructions provided."}</p>
                        </div>
                        <div className="ta-instruction-block">
                            <h4 className="ta-sub-label">Additional Observations (Notes)</h4>
                            <p className="ta-text-paragraph ta-note-style">{item.notes || "No internal notes recorded."}</p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}