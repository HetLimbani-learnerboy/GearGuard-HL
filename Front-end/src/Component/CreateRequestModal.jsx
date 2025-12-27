import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateRequestModal.css";

export default function CreateRequestModal({ open, onClose, onCreate }) {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        subject: "",
        maintenanceFor: "equipment",
        selectedTarget: "", // Equipment or Work Center Name
        address: "",
        category: "",
        requestDate: "",
        type: "corrective",
        team: "",
        technician: "",
        scheduledDate: "",
        duration: "",
        priority: 0,
        company: "My Company",
        notes: "",
        instructions: ""
    });

    // Load external selections (Teams & Work Centers) from LocalStorage
    useEffect(() => {
        if (!open) return;

        // 1. Load Team Data
        const storedTeam = localStorage.getItem("selectedTeam");
        if (storedTeam) {
            const team = JSON.parse(storedTeam);
            setForm((prev) => ({
                ...prev,
                team: team.team_name,
                technician: team.team_members.join(", ")
            }));
        }

        // 2. Load Work Center Selection
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

    if (!open) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2 className="modal-header">Create Maintenance Request</h2>

                <div className="form-grid">
                    {/* LEFT SIDE: Identification & Type */}
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
                                // Only readOnly if Work Center is selected (because WC auto-fills it)
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
                                placeholder="e.g. Mechanical, Electrical"
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

                    {/* RIGHT SIDE: Logistics & Scheduling */}
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
                            <label>Estimated Duration (Hrs)</label>
                            <input
                                className="modal-input"
                                type="number"
                                value={form.duration}
                                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                            />
                        </div>

                        <div className="form-row">
                            <label>Priority (0=Low, 3=Critical)</label>
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

                {/* FULL WIDTH: Text Areas */}
                <div className="full-width-section">
                    <div className="form-row">
                        <label>Notes / Observations</label>
                        <textarea
                            className="modal-input"
                            rows="2"
                            value={form.notes}
                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        />
                    </div>

                    <div className="form-row">
                        <label>Detailed Instructions</label>
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
                    <button
                        className="create-btn"
                        onClick={() => {
                            onCreate(form); // This calls the fetch in MaintenancePage
                            onClose();
                        }}
                    >
                        Submit Request
                    </button>
                </div>
            </div>
        </div>
    );
}