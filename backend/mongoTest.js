const mongoose = require('mongoose');

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/CampusHostelDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ✅ User Collection
const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String, required: true },
    email: String,
    password: String,
    role: String   // admin or student
}));

// ✅ Hostel Collection
const Hostel = mongoose.model('Hostel', new mongoose.Schema({
    name: String,
    totalBeds: Number,
    availableBeds: Number,
    type: String   // AC / Non-AC
}));

// ✅ Insert Sample Data
async function run() {
    // Insert User
    const user = new User({
        name: "Admin User",
        email: "admin@gmail.com",
        password: "1234",
        role: "admin"
    });

    await user.save();
    console.log("User inserted");

    // Insert Hostel
    const hostel = new Hostel({
        name: "Hostel A",
        totalBeds: 100,
        availableBeds: 50,
        type: "AC"
    });

    await hostel.save();
    console.log("Hostel inserted");

    // Fetch Data
    const users = await User.find();
    const hostels = await Hostel.find();

    console.log("Users:", users);
    console.log("Hostels:", hostels);

    mongoose.connection.close();
}

run();