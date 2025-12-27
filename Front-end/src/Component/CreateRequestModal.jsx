import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateRequestModal.css";

export default function CreateRequestModal({ open, onClose, onCreate }) {
    const navigate = useNavigate();

    // Initial state to allow for easy resetting
    const initialState = {
        name: "",
        subject: "",
        maintenanceFor: "equipment",
        selectedTarget: "", 
        address: "",
        category: "",
        requestDate: new Date().toISOString().split('T')[0], // Default to today
        type: "corrective",
        team: "",
        technician: "",
        scheduledDate: "",
        duration: "",
        priority: 0,
        company: "My Company",
        notes: "",
        instructions: ""
    };

    const [form, setForm] = useState(initialState);

    // 1. Reset form when modal opens to clear stale data
    useEffect(() => {
        if (open) {
            setForm(prev => ({...initialState, maintenanceFor: prev.maintenanceFor}));
        }
    }, [open]);

    // 2. Load external selections (Teams & Work Centers) from LocalStorage
    useEffect(() => {
        if (!open) return;

        // Load Team Data
        const storedTeam = localStorage.getItem("selectedTeam");
        if (storedTeam) {
            const team = JSON.parse(storedTeam);
            setForm((prev) => ({
                ...prev,
                team: team.team_name,
                technician: team.team_members.join(", ")
            }));
        }

        // Load Work Center Selection
        const storedWC = localStorage.getItem("selectedWorkCenter");
        if (storedWC && form.maintenanceFor === "work_center") {
            const wc = JSON.parse(storedWC);
            setForm((prev) => ({
                ...prev,
                selectedTarget: wc.work_center,
                address: `Code: ${wc.code} | Tag: ${wc.tag} | Alt: ${wc.alternative_work_center || 'N/A'}`
            }));
        }
    }, [open, form.maintenanceFor]);

    const handleMaintenanceForChange = (val) => {
        setForm({ ...form, maintenanceFor: val, selectedTarget: "", address: "" });
        if (val === "equipment") {
            localStorage.removeItem("selectedWorkCenter");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple validation to ensure data integrity
        if (!form.name || !form.subject || !form.selectedTarget) {
            alert("Please fill in Requester Name, Subject, and Target.");
            return;
        }
        onCreate(form); 
        onClose();
    };

    if (!open) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2 className="modal-header">Create Maintenance Request</h2>

                <div className="form-grid">
                    {/* LEFT SIDE */}
                    <div className="form-column">
                        <div className="form-row">
                            <label>Requester Name</label>
                            <input
                                className="modal-input"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Your Name"
                            />
                        </div>

                        <div className="form-row">
                            <label>Subject / Title</label>
                            <input
                                className="modal-input"
                                value={form.subject}
                                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                placeholder="Issue Summary"
                            />
                        </div>

                        <div className="form-row">
                            <label>Maintenance For</label>
                            <select
                                className="modal-input"
                                value={form.maintenanceFor}
                                onChange={(e) => handleMaintenanceForChange(e.target.value)}
                            >
                                <option value="equipment">Equipment</option>
                                <option value="work_center">Work Center</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <label>
                                {form.maintenanceFor === "equipment" ? "Equipment Name" : "Work Center Name"}
                            </label>
                            <div className="input-group" style={{ display: "flex", gap: "8px" }}>
                                <input
                                    className="modal-input"
                                    style={{ flex: 1 }}
                                    value={form.selectedTarget}
                                    readOnly={form.maintenanceFor === "work_center"}
                                    onChange={(e) => setForm({ ...form, selectedTarget: e.target.value })}
                                    placeholder={`Enter ${form.maintenanceFor}`}
                                />
                                {form.maintenanceFor === "work_center" && (
                                    <button
                                        className="select-btn-inline"
                                        type="button"
                                        onClick={() => navigate("/workcenter")}
                                    >
                                        Select
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="form-row">
                            <label>Location Address</label>
                            <input
                                className={`modal-input ${form.maintenanceFor === "work_center" ? "disabled-input" : ""}`}
                                value={form.address}
                                readOnly={form.maintenanceFor === "work_center"}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                placeholder={form.maintenanceFor === "work_center" ? "Auto-filled on selection" : "Enter equipment location"}
                            />
                        </div>

                        <div className="form-row">
                            <label>Category</label>
                            <input
                                className="modal-input"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                placeholder="e.g. Mechanical"
                            />
                        </div>

                        <div className="form-row">
                            <label>Request Date</label>
                            <input
                                className="modal-input"
                                type="date"
                                value={form.requestDate}
                                onChange={(e) => setForm({ ...form, requestDate: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="form-column">
                        <div className="form-row">
                            <label>Assigned Team</label>
                            <div className="input-group" style={{ display: "flex", gap: "8px" }}>
                                <input className="modal-input disabled-input" style={{ flex: 1 }} value={form.team} readOnly />
                                <button
                                    className="select-btn-inline"
                                    type="button"
                                    onClick={() => navigate("/teams")}
                                >
                                    Find
                                </button>
                            </div>
                        </div>

                        <div className="form-row">
                            <label>Technician(s)</label>
                            <input className="modal-input disabled-input" value={form.technician} readOnly />
                        </div>

                        <div className="form-row">
                            <label>Scheduled Start</label>
                            <input
                                className="modal-input"
                                type="datetime-local"
                                value={form.scheduledDate}
                                onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
                            />
                        </div>

                        <div className="form-row">
                            <label>Duration (Hrs)</label>
                            <input
                                className="modal-input"
                                type="number"
                                value={form.duration}
                                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                            />
                        </div>

                        <div className="form-row">
                            <label>Priority (0-3)</label>
                            <input
                                className="modal-input"
                                type="number"
                                min="0"
                                max="3"
                                value={form.priority}
                                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                            />
                        </div>

                        <div className="form-row">
                            <label>Maintenance Type</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        value="corrective"
                                        checked={form.type === "corrective"}
                                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    /> Corrective
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="preventive"
                                        checked={form.type === "preventive"}
                                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    /> Preventive
                                </label>
                            </div>
                        </div>

                        <div className="form-row">
                            <label>Company</label>
                            <input
                                className="modal-input"
                                value={form.company}
                                onChange={(e) => setForm({ ...form, company: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="full-width-section">
                    <div className="form-row">
                        <label>Notes</label>
                        <textarea
                            className="modal-input"
                            rows="2"
                            value={form.notes}
                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        />
                    </div>
                    <div className="form-row">
                        <label>Instructions</label>
                        <textarea
                            className="modal-input"
                            rows="2"
                            value={form.instructions}
                            onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                        />
                    </div>
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="create-btn" onClick={handleSubmit}>Submit Request</button>
                </div>
            </div>
        </div>
    );
}