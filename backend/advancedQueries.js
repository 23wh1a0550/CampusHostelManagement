const mongoose = require('mongoose');

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/CampusHostelDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ✅ User Schema
const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: String,
    role: String
})); 

// ✅ Hostel Schema
const Hostel = mongoose.model('Hostel', new mongoose.Schema({
    name: String,
    totalBeds: Number,
    availableBeds: Number,
    type: String
}));

async function advancedQueries() {
    try {

        // ✅ Most recent user
        const currentUser = await User.findOne().sort({ _id: -1 });

        console.log("Current User:");
        console.log(`Name: ${currentUser.name}, Email: ${currentUser.email}, Role: ${currentUser.role}`);

        // ✅ Most recent hostel
        const currentHostel = await Hostel.findOne().sort({ _id: -1 });

        console.log("\nCurrent Hostel:");
        console.log(`Name: ${currentHostel.name}, Total Beds: ${currentHostel.totalBeds}, Available Beds: ${currentHostel.availableBeds}, Type: ${currentHostel.type}`);

        // ✅ Example: Filter AC hostels
        const acHostels = await Hostel.find({ type: "AC" }).limit(1);

        console.log("\nMost Recent AC Hostel:");
        if (acHostels.length > 0) {
            console.log(acHostels[0].name);
        }

    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
}

advancedQueries();