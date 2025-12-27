import "./CreateRequestModal.css";
import React, { useState } from "react";


export default function CreateRequestModal({ open, onClose, onCreate }) {

    const [form, setForm] = useState({
        subject: "",
        equipment: "",
        type: "corrective",
        date: ""
    });
    if (!open) return null;

    return (
        <div className="modal-overlay">

            <div className="modal-box">

                <h3>Create Maintenance Request</h3>

                <div className="form-row">
                    <label>Subject</label>
                    <input
                        type="text"
                        placeholder="Ex: Printer not working"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                </div>


                <div className="form-row">
                    <label>Equipment</label>
                    <input
                        type="text"
                        placeholder="Ex: Printer 01"
                        value={form.equipment}
                        onChange={(e) => setForm({ ...form, equipment: e.target.value })}
                    />
                </div>


                <div className="form-row">
                    <label>Request Type</label>
                    <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                    >
                        <option value="corrective">Corrective</option>
                        <option value="preventive">Preventive</option>
                    </select>
                </div>

                <div className="form-row">
                    <label>Scheduled Date (if preventive)</label>
                    <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>

                    <button
                        className="save-btn"
                        onClick={() => {
                            onCreate(form);
                            onClose();
                        }}
                    >
                        Create
                    </button>
                </div>


            </div>
        </div>
    );
}
