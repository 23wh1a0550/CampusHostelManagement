import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Analytics from "./Analytics";
import BookingAnalytics from "./BookingAnalytics";
import BookingList from "./BookingList";
import Home from "./Home";
import Login from "./Login";
import RegisterFormValidation from "./RegisterFormValidation";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterFormValidation />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/booking-analytics" element={<BookingAnalytics />} />
        <Route path="/analytics" element={<Analytics />} />

      </Routes>
    </Router>
  );
}

export default App;