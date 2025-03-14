const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); 
const User = require("./my-app/models/user");  
const Listing = require("./my-app/models/listing");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "my-app", "public")));


app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "my-app", "public", "register.html"));
});

//Route to handle form submission
app.post("/register", async (req, res) => {
  try {
    const { fullName, dlsuEmail, studentId, password } = req.body;

    //Create a new user document
    const newUser = new User({ fullName, dlsuEmail, studentId, password });

    //Save to MongoDB
    await newUser.save();

    console.log("✅ User registered:", newUser);
    res.send("✅ Registration successful!");
  } catch (error) {
    console.error("❌ Error saving user:", error);
    res.status(500).send("❌ Registration failed.");
  }
});


app.post('/login', async (req, res) => {
    const { dlsuEmail, password } = req.body;
    console.log("Login Attempt:", req.body);

    try {
        const user = await User.findOne({ dlsuEmail });

        if (!user) {
            return res.status(401).json({ message: '❌ User not found' });
        }

        if (user.password !== password) { 
            return res.status(401).json({ message: '❌ Incorrect password' });
        }

        res.json({ user: { name: user.fullName, email: user.dlsuEmail } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: '❌ Server error' });
    }
});

app.get("/api/listings", async (req, res) => {
    try {
      const listings = await Listing.find(); // Fetch listings from MongoDB
      res.json(listings);
    } catch (error) {
      console.error("❌ Error fetching listings:", error);
      res.status(500).json({ message: "❌ Server error" });
    }
  });


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
