import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";

import CreateRequestModal from "./CreateRequestModal";
import "./MaintenancePage.css";

export default function MaintenancePage() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [requests, setRequests] = useState({
    new: [],
    in_progress: [],
    repaired: [],
    scrap: []
  });

  /* FETCH FROM BACKEND */
  useEffect(() => {
    fetch("http://localhost:3021/api/maintenance")
      .then((res) => res.json())
      .then((data) => {
        const grouped = {
          new: [],
          in_progress: [],
          repaired: [],
          scrap: []
        };

        data.forEach((r) => {
          grouped[r.status].push(r);
        });

        setRequests(grouped);
      });
  }, []);

  /* CREATE REQUEST */
  const handleCreateRequest = async (data) => {
    const res = await fetch("http://localhost:3021/api/maintenance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        title: data.subject,
        equipment: data.equipment,
        type: data.type,
        status: "new"
      })
    });

    const saved = await res.json();

    setRequests((prev) => ({
      ...prev,
      new: [saved, ...prev.new]
    }));
  };

  /* DRAG & DROP */
  const handleDragEnd = async (result) => {
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

    /* UPDATE BACKEND */
    await fetch(
      `http://localhost:3021/api/maintenance/${movedItem._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: destCol })
      }
    );
  };

  const columns = [
    { key: "new", label: "New" },
    { key: "in_progress", label: "In Progress" },
    { key: "repaired", label: "Repaired" },
    { key: "scrap", label: "Scrap" }
  ];

  return (
    <div className="maintenance-wrapper">

      <div className="top-bar">
        <h2>Maintenance Requests</h2>
        <button className="primary-btn" onClick={() => setOpenModal(true)}>
          + Create Request
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-container">
          {columns.map((col) => (
            <Droppable key={col.key} droppableId={col.key}>
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h4>{col.label}</h4>

                  {requests[col.key].map((req, index) => (
                    <Draggable
                      key={req._id}
                      draggableId={req._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="kanban-card"
                          onClick={() =>
                            navigate(`/maintenance/${req._id}`)
                          }
                        >
                          <p className="req-title">{req.name}</p>
                          <p className="req-meta">{req.title}</p>
                          <p className="req-meta">
                            Equipment: {req.equipment}
                          </p>

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

      <CreateRequestModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleCreateRequest}
      />
    </div>
  );
}
