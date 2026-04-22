import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [hostels, setHostels] = useState([]);
  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate(); // ✅ MUST be inside component
  const userName = localStorage.getItem("loggedUser") || "User";

  useEffect(() => {
    // Fetch Hostels
    axios.get("http://localhost:5000/hostels")
      .then((res) => setHostels(res.data))
      .catch((err) => console.log(err));

    // Fetch Bookings
    axios.get("http://localhost:5000/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏠 Campus Hostel Dashboard</h1>
      <h2>Welcome, {userName} 👋</h2>

      {/* ✅ BUTTONS INSTEAD OF LINKS */}
      <div>
        <button style={styles.btn} onClick={() => navigate("/bookings")}>
          📋 View Bookings
        </button>

        <button style={styles.btn} onClick={() => navigate("/analytics")}>
          📊 View Analytics
        </button>
        <button onClick={() => navigate("/booking-analytics")} style={styles.btn}>
  View Booking Analytics
</button>
      </div>


      {/* 🏠 HOSTELS SECTION */}
      <h2>Hostels</h2>
      <div style={styles.grid}>
        {hostels.map((h) => (
          <div key={h._id} style={styles.card}>
            <h3>{h.name}</h3>
            <p>Total Beds: {h.totalBeds}</p>
            <p>Available: {h.availableBeds}</p>
            <p>Type: {h.type}</p>
          </div>
        ))}
      </div>

      {/* 📋 BOOKINGS SECTION */}
      <h2 style={{ marginTop: "40px" }}>Recent Bookings</h2>
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
    </div>
  );
}

// 🎨 Styles (UPDATED WITH BUTTON)
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #667eea, #764ba2)", // 🌈 gradient
    color: "#fff"
  },

  title: {
    marginBottom: "10px",
    fontSize: "32px"
  },

  btn: {
    padding: "12px 20px",
    margin: "10px",
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backdropFilter: "blur(10px)",
    transition: "0.3s",
    fontWeight: "bold"
  },

  grid: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px"
  },

  card: {
    background: "rgba(255,255,255,0.15)", // glass effect
    padding: "20px",
    borderRadius: "15px",
    width: "240px",
    color: "#fff",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    transition: "transform 0.3s"
  }
};

export default Home;