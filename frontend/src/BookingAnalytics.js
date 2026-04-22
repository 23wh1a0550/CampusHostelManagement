import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookingAnalytics() {
  const [stats, setStats] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/booking-stats")
      .then((res) => {
        setStats(res.data.stats);
        setBookings(res.data.bookings);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Hostel Booking Analytics</h1>

      {/* 🔙 Back Button */}
      <button style={styles.btn} onClick={() => navigate("/home")}>
        ⬅ Back to Dashboard
      </button>

      {/* 🏨 HOSTEL-WISE STATS */}
      <h2>Bookings by Hostel</h2>
      <div style={styles.grid}>
        {stats.map((s, index) => (
          <div key={index} style={styles.card}>
            <h3>{s.hostel}</h3>
            <p>Total Bookings: {s.count}</p>
            <p>{s.percent}</p>
          </div>
        ))}
      </div>

      {/* 📋 BOOKINGS LIST */}
      <h2>All Bookings</h2>
      <div style={styles.grid}>
        {bookings.map((b) => (
          <div key={b._id} style={styles.card}>
            <h3>{b.name}</h3>
            <p>Hostel: {b.hostelName}</p>
            <p>Room: {b.roomType}</p>
            <p>Status: {b.status}</p>
          </div>
        ))}
      </div>

      {/* 📊 TABLE */}
      <h2>Recent Bookings</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Student</th>
            <th style={styles.th}>Hostel</th>
            <th style={styles.th}>Room</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b, i) => (
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

// 🎨 GOOD UI
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #11998e, #38ef7d)",
    color: "#fff"
  },
  title: {
    fontSize: "30px"
  },
  btn: {
    padding: "10px",
    margin: "10px",
    background: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
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
    padding: "15px",
    borderRadius: "10px",
    width: "220px",
    boxShadow: "0 5px 10px rgba(0,0,0,0.2)"
  },
  table: {
    margin: "20px auto",
    width: "80%",
    background: "#fff",
    color: "#000",
    borderCollapse: "collapse"
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
export default BookingAnalytics;