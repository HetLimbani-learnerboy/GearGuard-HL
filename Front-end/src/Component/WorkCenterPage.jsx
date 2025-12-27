import React, { useEffect, useState } from "react";
import "./WorkCenterPage.css";

const WorkCenterPage = () => {
  const [workCenters, setWorkCenters] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3021/api/workcenters?search=${search}`)
      .then((res) => res.json())
      .then((data) => setWorkCenters(data))
      .catch((err) => console.error(err));
  }, [search]);

  return (
    <div className="workcenter-page">
      <h2 className="page-title">Work Center Master</h2>

      {/* SEARCH */}
      <input
        className="search-input"
        placeholder="Search by state / electronic / mechanical"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="workcenter-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Work Center</th>
              <th>Code</th>
              <th>Tag</th>
              <th>Alternative Work Center</th>
              <th>Cost / Hour (₹)</th>
              <th>Time Efficiency</th>
              <th>OEE Target</th>
            </tr>
          </thead>

          <tbody>
            {workCenters.map((wc) => (
              <tr
                key={wc._id}
                className={selectedId === wc._id ? "active-row" : ""}
              >
                <td>
                  <input
                    type="radio"
                    name="workcenter"
                    checked={selectedId === wc._id}
                    onChange={() => setSelectedId(wc._id)}
                  />
                </td>
                <td>{wc.work_center}</td>
                <td>{wc.code}</td>
                <td className={`tag ${wc.tag}`}>
                  {wc.tag}
                </td>
                <td>{wc.alternative_work_center}</td>
                <td>{wc.cost_per_hour}</td>
                <td>{wc.cost_time_efficiency}</td>
                <td>{wc.oee_target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkCenterPage;
