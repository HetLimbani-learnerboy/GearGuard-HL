import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./MaintenancePage.css";

export default function MaintenancePage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [requests, setRequests] = useState({
    new: [],
    in_progress: [],
    repaired: [],
    scrap: []
  });

  useEffect(() => {
    fetch("http://localhost:3021/api/maintenance")
      .then((res) => res.json())
      .then((data) => {
        const grouped = { new: [], in_progress: [], repaired: [], scrap: [] };
        data.forEach((r) => {
          if (grouped[r.status]) grouped[r.status].push(r);
        });
        setRequests(grouped);
      });
  }, []);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const sourceCol = result.source.droppableId;
    const destCol = result.destination.droppableId;

    if (sourceCol === destCol && result.source.index === result.destination.index) return;

    const sourceItems = Array.from(requests[sourceCol]);
    const destItems = Array.from(requests[destCol]);
    const [movedItem] = sourceItems.splice(result.source.index, 1);

    movedItem.status = destCol;
    destItems.splice(result.destination.index, 0, movedItem);

    setRequests({ ...requests, [sourceCol]: sourceItems, [destCol]: destItems });

    await fetch(`http://localhost:3021/api/maintenance/${movedItem._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: destCol })
    });
  };

  const columns = [
    { key: "new", label: "New Requests" },
    { key: "in_progress", label: "In Progress" },
    { key: "repaired", label: "Fixed/Repaired" },
    { key: "scrap", label: "Scrap/Archive" }
  ];

  return (
    <div className="maintenance-wrapper">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="main-content">
        <header className="maintenance-header">
          <div className="header-left">
            <button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(true)}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </button>
            <h2>Maintenance Kanban</h2>
          </div>
          <button className="primary-btn" onClick={() => navigate("/createrequest")}>
            + Create New Request
          </button>
        </header>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="kanban-container">
            {columns.map((col) => (
              <div className="kanban-column-wrapper" key={col.key}>
                <h4 className="column-title">
                  {col.label} <span className="count-pill">{requests[col.key].length}</span>
                </h4>

                <Droppable droppableId={col.key}>
                  {(provided, snapshot) => (
                    <div
                      className={`kanban-column ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {requests[col.key].map((req, index) => (
                        <Draggable key={req._id} draggableId={req._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`kanban-card priority-${req.priority} ${snapshot.isDragging ? "dragging" : ""}`}
                              onClick={() => navigate(`/test-activity/${req._id}`)}
                            >
                              <div className="card-top">
                                <span className="req-id">#{req._id.slice(-4)}</span>
                                <span className={`type-badge ${req.type}`}>{req.type}</span>
                              </div>

                              <h3 className="card-subject">{req.subject}</h3>

                              <div className="card-body">
                                <p className="info-row"><strong>By:</strong> {req.name}</p>
                                <p className="info-row"><strong>Target:</strong> {req.selectedTarget}</p>
                                <p className="info-row"><strong>Team:</strong> {req.team}</p>
                              </div>

                              <div className="card-footer">
                                <div className="date-box">
                                  <small>Scheduled:</small>
                                  <span>{new Date(req.scheduledDate).toLocaleDateString()}</span>
                                </div>
                                <span className={`priority-indicator p-${req.priority}`}>
                                  P{req.priority}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}