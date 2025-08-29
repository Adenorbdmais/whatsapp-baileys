import React, { useEffect, useState } from "react";

function Dashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/sessions`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setSessions(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Painel</h2>
      <ul>
        {sessions.map((s) => (
          <li key={s.id}>
            {s.name} - {s.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

