import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/analytics")
      .then((res) => setAnalytics(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!analytics) {
    return <h2 style={{ textAlign: "center" }}>Loading Analytics...</h2>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Hostel Analytics Dashboard</h1>

      {/* 🔙 Back Button */}
      <button style={styles.btn} onClick={() => navigate("/home")}>
        ⬅ Back to Dashboard
      </button>

      {/* 📦 SUMMARY CARDS */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Total Bookings</h3>
          <p>{analytics.totalBookings}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Students</h3>
          <p>{analytics.totalStudents}</p>
        </div>

        <div style={styles.card}>
          <h3>Available Beds</h3>
          <p>{analytics.availableBeds}</p>
        </div>

        <div style={styles.card}>
          <h3>Top Hostel</h3>
          <p>{analytics.topHostel}</p>
        </div>
      </div>

      {/* 📋 BOOKINGS TABLE */}
      <h2 style={{ marginTop: "40px" }}>📋 Recent Bookings</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Hostel</th>
            <th style={styles.th}>Room</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>

        <tbody>
          {analytics.recentBookings.map((b, i) => (
            <tr key={i}>
              <td style={styles.td}>{b.name}</td>
              <td style={styles.td}>{b.hostelName}</td>
              <td style={styles.td}>{b.roomType}</td>
              <td style={styles.td}>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Analytics;
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
    color: "#fff"
  },

  title: {
    fontSize: "32px",
    marginBottom: "20px"
  },

  btn: {
    padding: "10px 20px",
    background: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px"
  },

  grid: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px"
  },

  card: {
    background: "#fff",
    color: "#000",
    padding: "20px",
    borderRadius: "10px",
    width: "200px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
  },

  table: {
    margin: "20px auto",
    borderCollapse: "collapse",
    width: "80%",
    background: "#fff",
    color: "#000"
  },

  th: {
    padding: "10px",
    background: "#333",
    color: "#fff"
  },

  td: {
    padding: "10px",
    borderBottom: "1px solid #ccc"
  }
};