import React, { useState } from "react";
import "./CreateRequestModal.css";

export default function CreateRequestModal({ open, onClose, onCreate }) {

    const [form, setForm] = useState({
        name: "",
        subject: "",
        maintenanceFor: "",
        equipment: "",
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

    if (!open) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">

                <h2>Create Maintenance Request</h2>

                {/* ================= FORM START ================= */}
                <div className="form-grid">

                    {/* LEFT SIDE */}
                    <div>
                        <div className="form-row">
                            <label>Name</label>
                            <input
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-row">
                            <label>Subject</label>
                            <input
                                value={form.subject}
                                onChange={(e) =>
                                    setForm({ ...form, subject: e.target.value })
                                }
                            />
                        </div>

                        <div className="form-row">
                            <label>Maintenance For</label>
                            <input
                                value={form.maintenanceFor}
                                onChange={(e) =>
                                    setForm({ ...form, maintenanceFor: e.target.value })
                                }
                            />
                        </div>

                        <div className="form-row">
                            <label>Equipment</label>
                            <input
                                value={form.equipment}
                                onChange={(e) =>
                                    setForm({ ...form, equipment: e.target.value })
                                }
                            />
                        </div>

                        <div className="form-row">
                            <label>Category</label>
                            <input
                                value={form.category}
                                onChange={(e) =>
                                    setForm({ ...form, category: e.target.value })
                                }
                            />
                        </div>

                        <div className="form-row">
                            <label>Request Date</label>
                            <input
                                type="date"
                                value={form.requestDate}
                                onChange={(e) =>
                                    setForm({ ...form, requestDate: e.target.value })
                                }
                            />
                        </div>

                        <div className="form-row">
                            <label>Maintenance Type</label>

                            <label>
                                <input
                                    type="radio"
                                    value="corrective"
                                    checked={form.type === "corrective"}
                                    onChange={(e) =>
                                        setForm({ ...form, type: e.target.value })
                                    }
                                />
                                Corrective
                            </label>

                            <label style={{ marginLeft: 10 }}>
                                <input
                                    type="radio"
                                    value="preventive"
                                    checked={form.type === "preventive"}
                                    onChange={(e) =>
                                        setForm({ ...form, type: e.target.value })
                                    }
                                />
                                Preventive
                            </label>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div>

                        <div className="form-row">
                            <label>Team</label>
                            <input
                                value={form.team}
                                onChange={(e) =>
                                    setForm({ ...form, team: e.target.value })
                                }
                            />
                        </div>

                        <div className="form-row">
                            <label>Technician</label>
                            <input
                                value={form.technician}
                                onChange={(e) =>
                                    setForm({ ...form, technician: e.target.value })
                                }
                            />
                        </div>

                        <div className="form-row">
                            <label>Scheduled Date</label>
                            <input
                                type="datetime-local"
                                value={form.scheduledDate}
                                onChange={(e) =>
                                    setForm({ ...form, scheduledDate: e.target.value })
                                }
                            />
                        </div>

                        <div className="form-row">
                            <label>Duration (hours)</label>
                            <input
                                type="number"
                                value={form.duration}
                                onChange={(e) =>
                                    setForm({ ...form, duration: e.target.value })
                                }
                            />
                        </div>

                        <div className="form-row">
                            <label>Priority</label>
                            <input
                                type="number"
                                min="0"
                                max="3"
                                value={form.priority}
                                onChange={(e) =>
                                    setForm({ ...form, priority: e.target.value })
                                }
                            />
                        </div>

                        <div className="form-row">
                            <label>Company</label>
                            <input
                                value={form.company}
                                onChange={(e) =>
                                    setForm({ ...form, company: e.target.value })
                                }
                            />
                        </div>
                    </div>
                </div>

               <div className="notes-container">

  <div className="form-row">
    <label>Notes</label>
    <textarea
      rows="3"
      value={form.notes}
      onChange={(e) =>
        setForm({ ...form, notes: e.target.value })
      }
    />
  </div>

  <div className="form-row">
    <label>Instructions</label>
    <textarea
      rows="3"
      value={form.instructions}
      onChange={(e) =>
        setForm({ ...form, instructions: e.target.value })
      }
    />
  </div>

</div>



                {/* BUTTONS */}
                <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>

                    <button
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
