import axios from 'axios';
import { useEffect, useState } from 'react';

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/bookings') // backend API
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2>Hostel Bookings</h2>

      <ul style={styles.list}>
        {bookings.map((booking) => (
          <li key={booking._id} style={styles.card}>
            <p><b>Student:</b> {booking.name}</p>
            <p><b>Hostel:</b> {booking.hostelName}</p>
            <p><b>Room Type:</b> {booking.roomType}</p>
            <p><b>Status:</b> {booking.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ✅ Styling for good UI (for screenshot)
const styles = {
  container: {
    padding: '20px',
    textAlign: 'center'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  card: {
    background: '#f9f9f9',
    margin: '10px auto',
    padding: '15px',
    width: '300px',
    borderRadius: '10px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)'
  }
};

export default BookingList;