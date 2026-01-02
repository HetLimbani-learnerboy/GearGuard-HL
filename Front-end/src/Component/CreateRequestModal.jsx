import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./CreateRequestPage.css";

export default function CreateRequestPage() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [form, setForm] = useState(() => {
        const savedDraft = localStorage.getItem("maintenanceDraft");
        if (savedDraft) {
            return JSON.parse(savedDraft);
        }
        return {
            name: localStorage.getItem("username") ? localStorage.getItem("username").replace(/"/g, "") : "",
            subject: "",
            maintenanceFor: "equipment",
            selectedTarget: "",
            address: "",
            category: "",
            requestDate: new Date().toISOString().split('T')[0],
            type: "corrective",
            team: "",
            technician: "",
            scheduledDate: "",
            duration: "",
            priority: 0,
            company: "",
            notes: "",
            instructions: ""
        };
    });

    useEffect(() => {
        localStorage.setItem("maintenanceDraft", JSON.stringify(form));
    }, [form]);

    useEffect(() => {
        const storedTeam = localStorage.getItem("selectedTeam");
        if (storedTeam) {
            const team = JSON.parse(storedTeam);
            setForm((prev) => ({
                ...prev,
                team: team.team_name,
                technician: team.team_members.join(", "),
                company: team.company_location
            }));
        }

        const storedWC = localStorage.getItem("selectedWorkCenter");
        if (storedWC) {
            const wc = JSON.parse(storedWC);
            setForm((prev) => ({
                ...prev,
                maintenanceFor: "work_center",
                selectedTarget: wc.work_center,
                address: prev.address || `${wc.work_center} / ${wc.code}`,
                category: prev.category || wc.category
            }));
        }
    }, []);

    const handleMaintenanceForChange = (val) => {
        setForm({ ...form, maintenanceFor: val, selectedTarget: "", address: "" });
        if (val === "equipment") {
            localStorage.removeItem("selectedWorkCenter");
        }
    };

    const handleCleanup = () => {
        localStorage.removeItem("maintenanceDraft");
        localStorage.removeItem("selectedWorkCenter");
        localStorage.removeItem("selectedTeam");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.team) {
            alert("Please assign a team before submitting.");
            return;
        }
        try {
            const res = await fetch("http://localhost:3021/api/maintenance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                alert("Maintenance Request Published!");
                handleCleanup();
                navigate("/maintenance");
            }
        } catch (err) {
            console.error("Submission failed:", err);
        }
    };

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="form-page-layout">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="form-page-content">
                <header className="form-page-header">
                    <button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(true)}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </button>
                    <h1>New Maintenance Request</h1>
                </header>

                <form className="request-form-card" onSubmit={handleSubmit}>
                    <div className="form-grid-container">

                        <section className="form-column">
                            <h3 className="section-label">General & Target Information</h3>

                            <div className="field-group">
                                <label>Requester Name <span className="req-star">*</span></label>
                                <input required value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="e.g. John Doe" />
                            </div>

                            <div className="field-group">
                                <label>Subject / Title <span className="req-star">*</span></label>
                                <input required value={form.subject} onChange={(e) => updateField('subject', e.target.value)} placeholder="Short description of the issue" />
                            </div>

                            <div className="field-group">
                                <label>Maintenance For <span className="req-star">*</span></label>
                                <select
                                    value={form.maintenanceFor}
                                    onChange={(e) => handleMaintenanceForChange(e.target.value)}
                                >
                                    <option value="equipment">Equipment Only</option>
                                    <option value="work_center">Work Center</option>
                                </select>
                            </div>

                            {form.maintenanceFor === "work_center" && (
                                <div className="field-group">
                                    <label>Associated Work Center <span className="req-star">*</span></label>
                                    <div className="input-with-action">
                                        <input
                                            required
                                            readOnly
                                            value={form.selectedTarget}
                                            placeholder="Select from Master List"
                                        />
                                        <button
                                            type="button"
                                            className="browse-btn"
                                            onClick={() => navigate("/workcenterpage")}
                                        >
                                            Browse
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="field-group">
                                <label>Location Details / Address <span className="req-star">*</span></label>
                                <input required value={form.address} onChange={(e) => updateField('address', e.target.value)} placeholder="Building/Floor/Line" />
                            </div>

                            <div className="field-group">
                                <label>Category <span className="req-star">*</span></label>
                                <input required value={form.category} onChange={(e) => updateField('category', e.target.value)} placeholder="e.g. Mechanical, Electrical" />
                            </div>

                            <div className="field-group">
                                <label>Request Date <span className="req-star">*</span></label>
                                <input required type="date" value={form.requestDate} onChange={(e) => updateField('requestDate', e.target.value)} />
                            </div>
                        </section>

                        <section className="form-column">
                            <h3 className="section-label">Assignment & Scheduling</h3>

                            <div className="field-group">
                                <label>Assigned Team <span className="req-star">*</span></label>
                                <div className="input-with-action">
                                    <input required readOnly value={form.team} placeholder="Assign a team" />
                                    <button type="button" className="browse-btn" onClick={() => navigate("/teams")}>Find Team</button>
                                </div>
                            </div>

                            <div className="field-group">
                                <label>Technicians <span className="req-star">*</span></label>
                                <input required readOnly value={form.technician} className="readonly-input" placeholder="Team members will appear here" />
                            </div>

                            <div className="field-group">
                                <label>Scheduled Start <span className="req-star">*</span></label>
                                <input required type="datetime-local" value={form.scheduledDate} onChange={(e) => updateField('scheduledDate', e.target.value)} />
                            </div>

                            <div className="field-group">
                                <label>Duration (Hrs) <span className="req-star">*</span></label>
                                <input required type="number" value={form.duration} onChange={(e) => updateField('duration', e.target.value)} placeholder="e.g. 2" />
                            </div>

                            <div className="field-group">
                                <label>Priority (0-3) <span className="req-star">*</span></label>
                                <input required type="number" min="0" max="3" value={form.priority} onChange={(e) => updateField('priority', e.target.value)} />
                            </div>

                            <div className="field-group">
                                <label>Company / Location <span className="req-star">*</span></label>
                                <input required readOnly value={form.company} className="readonly-input" placeholder="Company location" />
                            </div>
                        </section>
                    </div>

                    <div className="form-full-width">
                        <div className="field-group">
                            <label>Maintenance Type <span className="req-star">*</span></label>
                            <div className="radio-selection">
                                <label><input type="radio" value="corrective" checked={form.type === "corrective"} onChange={(e) => updateField('type', e.target.value)} /> Corrective</label>
                                <label><input type="radio" value="preventive" checked={form.type === "preventive"} onChange={(e) => updateField('type', e.target.value)} /> Preventive</label>
                            </div>
                        </div>
                        <div className="field-group">
                            <label>Repair Instructions <span className="req-star">*</span></label>
                            <textarea required value={form.instructions} onChange={(e) => updateField('instructions', e.target.value)} rows="3" placeholder="Step-by-step instructions for the technician..." />
                        </div>
                        <div className="field-group">
                            <label>Notes & Observations</label>
                            <textarea value={form.notes} onChange={(e) => updateField('notes', e.target.value)} rows="2" placeholder="Additional context (Optional)" />
                        </div>
                    </div>

                    <footer className="form-footer">
                        <button type="button" className="btn-cancel" onClick={() => { handleCleanup(); navigate("/maintenance"); }}>Discard</button>
                        <button type="submit" className="btn-submit">Publish Request</button>
                    </footer>
                </form>
            </div>
        </div>
    );
}