import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";

import CreateRequestModal from "./CreateRequestModal";
import "./MaintenancePage.css";

export default function MaintenancePage() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const [requests, setRequests] = useState({
    new: [
      { id: "1", name: "Printer Issue", title: "Printer not working", equipment: "Printer 01", status: "new" },
      { id: "2", name: "Oil Leak", title: "Oil leakage check", equipment: "CNC 02", status: "new" }
    ],
    in_progress: [
      { id: "3", name: "Internet Fix", title: "Network Issue", equipment: "Router", status: "in_progress" }
    ],
    repaired: [
      { id: "4", name: "AC Service", title: "AC serviced", equipment: "Lab AC", status: "repaired" }
    ],
    scrap: [
      { id: "5", name: "Old Monitor", title: "Disposed", equipment: "Monitor", status: "scrap" }
    ]
  });

  const handleCreateRequest = (data) => {
    const newCard = {
      id: Date.now().toString(),
      name: data.name,
      title: data.subject,
      equipment: data.equipment,
      status: "new"
    };

    setRequests(prev => ({
      ...prev,
      new: [...prev.new, newCard]
    }));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceCol = result.source.droppableId;
    const destCol = result.destination.droppableId;

    const sourceItems = Array.from(requests[sourceCol]);
    const destItems = Array.from(requests[destCol]);

    const [movedItem] = sourceItems.splice(result.source.index, 1);
    movedItem.status = destCol;
    destItems.splice(result.destination.index, 0, movedItem);

    setRequests({
      ...requests,
      [sourceCol]: sourceItems,
      [destCol]: destItems
    });
  };

  const columns = [
    { key: "new", label: "New" },
    { key: "in_progress", label: "In Progress" },
    { key: "repaired", label: "Repaired" },
    { key: "scrap", label: "Scrap" }
  ];

  return (
    <div className="maintenance-wrapper">

      {/* HEADER */}
      <div className="top-bar">
        <div>
          <h2>Maintenance Requests</h2>
          <p className="subtitle">
            Manage equipment issues across their lifecycle
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="primary-btn"
        >
          + Create Request
        </button>
      </div>

      {/* KANBAN */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-container">

          {columns.map(col => (
            <Droppable key={col.key} droppableId={col.key}>
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h4 className="column-title">{col.label}</h4>

                  {requests[col.key].map((req, index) => (
                    <Draggable key={req.id} draggableId={req.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          className="kanban-card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => {
                            if (!snapshot.isDragging) {
                              navigate(`/maintenance/${req.id}`);
                            }
                          }}
                        >
                          <p className="req-title">{req.name}</p>
                          <p className="req-meta">{req.title}</p>
                          <p className="req-meta">Equipment: {req.equipment}</p>

                          <span className={`status-badge ${req.status}`}>
                            {req.status.replace("_", " ")}
                          </span>
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

      {/* MODAL */}
      <CreateRequestModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleCreateRequest}
      />

      {/* FOOTER */}
      <div className="back-footer">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
