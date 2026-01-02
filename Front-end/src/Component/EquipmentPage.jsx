import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./EquipmentDetails.css";

export default function EquipmentPage() {
  const [equipmentList, setEquipmentList] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3021/api/equipment`)
      .then((res) => res.json())
      .then((data) => setEquipmentList(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error:", err));
  }, []);

  const filteredData = equipmentList.filter((item) => {
    const term = search.toLowerCase();
    return (
      item.equipmentName?.toLowerCase().includes(term) ||
      item.employee?.toLowerCase().includes(term) ||
      item.department?.toLowerCase().includes(term) ||
      item.serialNumber?.toLowerCase().includes(term) ||
      item.technician?.toLowerCase().includes(term) ||
      item.equipmentCategory?.toLowerCase().includes(term) ||
      item.company?.toLowerCase().includes(term) ||
      item.responsible?.toLowerCase().includes(term)
    );
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="eq-layout-wrapper">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="eq-main-container">
        <header className="eq-header">
          <div className="eq-header-left">
            <button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(true)}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </button>

            <div className="eq-title-section">
              <h1>Equipment Inventory</h1>
              <p>{filteredData.length} Assets Tracked Globally</p>
            </div>
          </div>

          <div className="eq-search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            <input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="back-buttton" onClick={() => window.history.back()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            <span>Back</span>
          </button>

        </header>

        <div className="eq-grid">
          {filteredData.map((item) => (
            <div key={item._id} className={`eq-card ${expandedId === item._id ? 'is-expanded' : ''}`}>
              <div className="eq-card-primary">
                <div className="eq-card-head">
                  <div className="eq-name-group">
                    <h3>{item.equipmentName}</h3>
                    <span className="eq-cat-tag">{item.equipmentCategory}</span>
                  </div>
                  <button className="eq-expand-btn" onClick={() => toggleExpand(item._id)}>
                    {expandedId === item._id ? "Close" : "View More"}
                    <svg className={expandedId === item._id ? 'rotate' : ''} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6" /></svg>
                  </button>
                </div>

                <div className="eq-info-row">
                  <div className="eq-cell"><span>Serial Number</span><p className="mono">{item.serialNumber}</p></div>
                  <div className="eq-cell"><span>Employee</span><p>{item.employee}</p></div>
                </div>

                <div className="eq-info-row">
                  <div className="eq-cell"><span>Department</span><p>{item.department}</p></div>
                  <div className="eq-cell"><span>Responsible</span><p>{item.responsible}</p></div>
                </div>

                <div className="eq-info-row">
                  <div className="eq-cell"><span>Technician</span><p>{item.technician}</p></div>
                  <div className="eq-cell"><span>Company</span><p>{item.company}</p></div>
                </div>
              </div>

              <div className="eq-card-secondary">
                <div className="eq-divider"></div>
                <div className="eq-info-row">
                  <div className="eq-cell"><span>Used By</span><p>{item.usedBy}</p></div>
                  <div className="eq-cell"><span>Maintenance Team</span><p>{item.maintenanceTeam}</p></div>
                </div>
                <div className="eq-info-row">
                  <div className="eq-cell"><span>Location</span><p>{item.usedInLocation}</p></div>
                  <div className="eq-cell"><span>Work Center</span><p>{item.workCenter}</p></div>
                </div>
                <div className="eq-full-cell">
                  <span>Description</span>
                  <p>{item.description || "No description provided."}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}