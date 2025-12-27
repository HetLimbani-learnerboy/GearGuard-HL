import React from "react";
import Navbar from "./Navbar";
import "./MaintenancePage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreateRequestModal from "./CreateRequestModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


export default function MaintenancePage() {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [requests, setRequests] = useState({
        new: [
            { id: "1", title: "Printer not working", equipment: "Printer 01", type: "corrective" },
            { id: "2", title: "Oil leakage check", equipment: "CNC 02", type: "preventive" }
        ],
        in_progress: [
            { id: "3", title: "Network Issue", equipment: "Router", type: "corrective" }
        ],
        repaired: [
            { id: "4", title: "AC Service", equipment: "Lab AC", type: "preventive" }
        ],
        scrap: [
            { id: "5", title: "Old Monitor", equipment: "", type: "scrap" }
        ]
    });
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const sourceCol = result.source.droppableId;
        const destCol = result.destination.droppableId;

        const sourceItems = Array.from(requests[sourceCol]);
        const destItems = Array.from(requests[destCol]);

        const [movedItem] = sourceItems.splice(result.source.index, 1);
        destItems.splice(result.destination.index, 0, movedItem);

        setRequests({
            ...requests,
            [sourceCol]: sourceItems,
            [destCol]: destItems
        });
    };
   
    const handleCreateRequest = (data) => {
  const newCard = {
  id: Date.now().toString(),
  title: data.subject,
  equipment: data.equipment,
  type: data.type,
  status: "new"
};

  setRequests((prev) => ({
    ...prev,
    new: [...prev.new, newCard]
  }));
};

    return (
        <div className="dashboard-wrapper">

            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">GearGuard</div>

                <div className="sidebar-item" onClick={() => navigate("/")}>
                    Dashboard
                </div>

                <div className="sidebar-item active" onClick={() => navigate("/maintenance")}>
                    Maintenance
                </div>

                <div className="sidebar-item">Equipment</div>
                <div className="sidebar-item">Calendar</div>
                <div className="sidebar-item">Teams</div>
                <div className="sidebar-item">Reports</div>
            </aside>


            {/* Main */}
            <div className="main-area">
                <Navbar title="Maintenance Requests" />

                <main className="content">
                    {/* Create Button */}
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
                        <button
                            onClick={() => setOpenModal(true)}
                            style={{
                                background: "#4f46e5",
                                color: "white",
                                padding: "8px 14px",
                                borderRadius: "10px",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            + Create Request
                        </button>
                    </div>

                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div className="kanban-container">

                            {/* NEW */}
                            <Droppable droppableId="new">
                                {(provided) => (
                                    <div
                                        className="kanban-column"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <h4>New</h4>

                                        {requests.new.map((req, index) => (
                                            <Draggable key={req.id} draggableId={req.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        className="kanban-card"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <p className="req-title">{req.title}</p>
                                                        <p className="req-meta">Equipment: {req.equipment}</p>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            {/* IN PROGRESS */}
                            <Droppable droppableId="in_progress">
                                {(provided) => (
                                    <div
                                        className="kanban-column"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <h4>In Progress</h4>

                                        {requests.in_progress.map((req, index) => (
                                            <Draggable key={req.id} draggableId={req.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        className="kanban-card"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <p className="req-title">{req.title}</p>
                                                        <p className="req-meta">Equipment: {req.equipment}</p>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            {/* REPAIRED */}
                            <Droppable droppableId="repaired">
                                {(provided) => (
                                    <div
                                        className="kanban-column"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <h4>Repaired</h4>

                                        {requests.repaired.map((req, index) => (
                                            <Draggable key={req.id} draggableId={req.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        className="kanban-card"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <p className="req-title">{req.title}</p>
                                                        <p className="req-meta">Equipment: {req.equipment}</p>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            {/* SCRAP */}
                            <Droppable droppableId="scrap">
                                {(provided) => (
                                    <div
                                        className="kanban-column"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <h4>Scrap</h4>

                                        {requests.scrap.map((req, index) => (
                                            <Draggable key={req.id} draggableId={req.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        className="kanban-card scrap-card"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <p className="req-title">{req.title}</p>
                                                        <p className="req-meta">{req.equipment}</p>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                        </div>
                    </DragDropContext>

                    <CreateRequestModal
  open={openModal}
  onClose={() => setOpenModal(false)}
  onCreate={handleCreateRequest}
/>

                </main>
            </div>
        </div>
    );
}
