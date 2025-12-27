import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./MaintenancePage.css";
import CreateRequestModal from "./CreateRequestModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function MaintenancePage() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const [requests, setRequests] = useState({
    new: [
      { id: "1", title: "Printer not working", equipment: "Printer 01" },
      { id: "2", title: "Oil leakage check", equipment: "CNC 02" }
    ],
    in_progress: [{ id: "3", title: "Network Issue", equipment: "Router" }],
    repaired: [{ id: "4", title: "AC Service", equipment: "Lab AC" }],
    scrap: [{ id: "5", title: "Old Monitor", equipment: "" }]
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

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">GearGuard</div>

        <div
          className="sidebar-item"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </div>

        <div className="sidebar-item active">Maintenance</div>
        <div className="sidebar-item">Equipment</div>
        <div className="sidebar-item">Calendar</div>
        <div className="sidebar-item">Teams</div>
        <div className="sidebar-item">Reports</div>
      </aside>

      {/* Main */}
      <div className="main-area">
        {/* ✅ SAME NAVBAR */}
        <Navbar title="Maintenance Requests" />

        <main className="content">
          <div className="create-btn-wrapper">
            <button
              className="create-btn"
              onClick={() => setOpenModal(true)}
            >
              + Create Request
            </button>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="kanban-container">
              {Object.keys(requests).map((col) => (
                <Droppable droppableId={col} key={col}>
                  {(provided) => (
                    <div
                      className="kanban-column"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <h4 className="kanban-title">
                        {col.replace("_", " ").toUpperCase()}
                      </h4>

                      {requests[col].map((req, index) => (
                        <Draggable
                          key={req.id}
                          draggableId={req.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className={`kanban-card ${
                                col === "scrap" ? "scrap-card" : ""
                              }`}
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
              ))}
            </div>
          </DragDropContext>

          <CreateRequestModal
            open={openModal}
            onClose={() => setOpenModal(false)}
          />
        </main>
      </div>
    </div>
  );
}
