const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/CampusHostelDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ✅ User Schema
const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
}));
app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.json({ message: "User already exists" });
  }

  const newUser = new User({ name, email, password, role });
  await newUser.save();

  res.json({ message: "Registration successful" });
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user: user
  });
});

// ✅ Hostel Schema
const Hostel = mongoose.model('Hostel', new mongoose.Schema({
    name: String,
    totalBeds: Number,
    availableBeds: Number,
    type: String
}));

// ✅ CREATE Hostel
app.post('/hostels', async (req, res) => {
    const hostel = new Hostel(req.body);
    await hostel.save();
    res.json({ message: 'Hostel added successfully' });
});

// ✅ READ Hostels
app.get('/hostels', async (req, res) => {
    const hostels = await Hostel.find();
    res.json(hostels);
});

// ✅ UPDATE Hostel
app.put('/hostels/:id', async (req, res) => {
    await Hostel.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Hostel updated successfully' });
});

// ✅ DELETE Hostel
app.delete('/hostels/:id', async (req, res) => {
    await Hostel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hostel deleted successfully' });
});
const Booking = mongoose.model('Booking', new mongoose.Schema({
    name: String,
    hostelName: String,
    roomType: String,
    status: String
}));

// ✅ CREATE Booking
app.post('/bookings', async (req, res) => {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: 'Booking added successfully' });
});

// ✅ READ Bookings
app.get('/bookings', async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
});
app.get("/analytics", async (req, res) => {
  const bookings = await Booking.find();
  const hostels = await Hostel.find();

  res.json({
    totalBookings: bookings.length,
    totalStudents: bookings.length,
    availableBeds: hostels.reduce((sum, h) => sum + h.availableBeds, 0),
    topHostel: hostels[0]?.name || "N/A",
    recentBookings: bookings.slice(-5)
  });
});
// ✅ ANALYTICS FOR BOOKINGS (Hostel-wise)
app.get("/booking-stats", async (req, res) => {
  const bookings = await Booking.find();

  const hostelMap = {};

  bookings.forEach((b) => {
    if (!hostelMap[b.hostelName]) {
      hostelMap[b.hostelName] = 0;
    }
    hostelMap[b.hostelName] += 1;
  });

  const total = bookings.length;

  const result = Object.keys(hostelMap).map((hostel) => ({
    hostel,
    count: hostelMap[hostel],
    percent: ((hostelMap[hostel] / total) * 100).toFixed(1) + "%"
  }));

  res.json({
    stats: result,
    bookings: bookings
  });
});

// ✅ Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});