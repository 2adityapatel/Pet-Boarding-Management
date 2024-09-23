require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const User = require("./models/User");
const Pet = require("./models/Pet");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const verifyTokenAndRole = require("./middlewares/authMiddleware");
const UserProfile = require("./models/userData");
const Booking = require('./models/Booking');
const Facility = require('./models/Facility');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use(checkForAuthenticationCookie("token"))

const PORT = process.env.PORT || 5000;
// 
mongoose
  .connect("mongodb://127.0.0.1:27017/petboarding")
  .then(() => console.log("Mongodb Connected"))
  .catch((e) => console.log("Error connecting to db."));


  app.post("/signup", async (req, res) => {
    const {  email, password ,role} = req.body;
    console.log(req.email + "email");
    console.log(role + "role");
    
    const username = email.split("@")[0]
    try {
      const user = await User.create({
        email,
        password,
        role
      });

  
      // create user profile
      if (role === 'USER'){
        await UserProfile.create(
                 {email,username : username,firstName:"",lastName:"",phoneNumber:"",address:""}
        )                                               
      }
  
      console.log(user);
      return res.status(201).send({ msg: "User created successfully", user });
    } catch (error) {
      console.log(error.message + "hiii");
      return res.status(500).send({ msg: "Error creating user", error: error.message });
    }
  });
  
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email + " " + password);
    try {
      const {token,role} = await User.matchPasswordAndGenerateToken(email, password);
      // console.log(token);
      return res.cookie("token", token).status(200).send({ msg: "Login successful", token ,role});
    } catch (error) {
      console.log(error);
      return res.status(400).send({ msg: "Incorrect Email or Password" });
    }
  });
  

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/home",verifyTokenAndRole("USER"), async (req,res)=>{
  try {
    const email = req.user.email;
    const userData = await UserProfile.findOne({email});
    
    res.json(userData);
} catch (error) {
    res.status(500).json({ message: 'Error fetching user profile details', error: error.message });
}
})

app.get('/user/user-profile',verifyTokenAndRole("USER"), async (req, res) => {
  try {
    const userEmail = req.user.email;
    console.log("userEmail : " + userEmail);
    
    const userProfile = await UserProfile.find({email:userEmail});
    console.log(userProfile);
    
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.put('/user/user-profile',verifyTokenAndRole("USER") ,async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { username, firstName, lastName, phoneNumber, address } = req.body;

    const updatedProfile = await UserProfile.updateOne(
      {email : userEmail},
      {$set : { username, firstName, lastName, phoneNumber, address } },
      { new: true, runValidators: true }
    );
    console.log(updatedProfile);
    
    if (!updatedProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.json(updatedProfile);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/medical_records/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype.startsWith("image/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDFs and images are allowed"), false);
    }
  },
});

app.post("/pets", verifyTokenAndRole("USER") , async (req, res) => {
  console.log(req.body);
  console.log("new Pet");
  
  try {
    const newPet = new Pet(req.body);
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message, errors: error.error });
  }
});

app.get("/pets/:id",verifyTokenAndRole("USER"),  async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/pets/:id", verifyTokenAndRole("USER"),async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPet) return res.status(404).json({ message: "Pet not found" });
    res.json(updatedPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/pets/:petId",verifyTokenAndRole("USER"), async (req, res) => {
  try {
    
    console.log(req.params.petId);
    const petId = req.params.petId
    const pet = await Pet.findByIdAndDelete(petId);
    console.log(pet);
    
    if (!pet) return res.status(404).json({ message: "Pet not found" });

     // Delete associated bookings
     await Booking.deleteMany({ petId })
 
     res.json({ message: "Pet and associated bookings deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/users/:userId/pets', verifyTokenAndRole("USER"), async (req, res) => {
    try { 
      const pets = await Pet.find({ userId: req.params.userId });
      res.json(pets);
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ message: error.message });
    }
  });

//   app.post('/pets/:id/medical-records', upload.single('file'), async (req, res) => {
//     try {
//       const pet = await Pet.findById(req.params.id);
//       if (!pet) return res.status(404).json({ message: 'Pet not found' });
  
//       const newRecord = {
//         recordType: req.body.recordType,
//         date: req.body.date,
//         description: req.body.description,
//         veterinarian: req.body.veterinarian,
//         filePath: req.file ? req.file.path : undefined
//       };
  
//       pet.medicalRecords.push(newRecord);
//       await pet.save();
  
//       res.status(201).json(pet);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });

// app.put('/pets/:petId/medical-records/:recordId', upload.single('file'), async (req, res) => {
//     try {
//       const pet = await Pet.findById(req.params.petId);
//       if (!pet) return res.status(404).json({ message: 'Pet not found' });
  
//       const record = pet.medicalRecords.id(req.params.recordId);
//       if (!record) return res.status(404).json({ message: 'Medical record not found' });
  
//       record.recordType = req.body.recordType || record.recordType;
//       record.date = req.body.date || record.date;
//       record.description = req.body.description || record.description;
//       record.veterinarian = req.body.veterinarian || record.veterinarian;
//       if (req.file) {
//         record.filePath = req.file.path;
//       }
  
//       await pet.save();
//       res.json(pet);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });


// Booking

// Create a new booking
app.post('/booking', verifyTokenAndRole("USER") ,async (req, res) => {
  try {
    const { petId, userId, startDate, endDate, specialRequirements, facilityId } = req.body;
    const newBooking = new Booking({
      petId,
      userId,
      startDate,
      endDate,
      specialRequirements,
      facilityId
    });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});




// Get user's bookings
app.get('/bookings/:userId', verifyTokenAndRole("USER") , async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate('petId facilityId');
    res.json(bookings);
  } catch (error) {
    console.log("Fetch Booking error ");
    
    res.status(500).json({ message: error.message });
  }
});

// Update booking status
app.patch('/booking/:id', verifyTokenAndRole("USER") ,async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Check availability
app.get('/booking/availability',verifyTokenAndRole("USER") ,async (req, res) => {
  try {
    const { facilityId, startDate, endDate } = req.query;
    const facility = await Facility.findById(facilityId);
    const bookings = await Booking.find({
      facilityId,
      $or: [
        { startDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
        { endDate: { $lte: new Date(endDate), $gte: new Date(startDate) } }
      ],
      status: { $in: ['pending', 'confirmed'] }
    });
    const isAvailable = bookings.length < facility.capacity;
    res.json({ isAvailable, availableSpots: facility.capacity - bookings.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/facilities",async (req, res) => {
  try {
    const facilities = await Facility.find({});
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
} )



// 1. Fetch all bookings (admin only)
app.get('/admin/bookings', verifyTokenAndRole("ADMIN"), async (req, res) => {
  try {
    const bookings = await Booking.find().populate('petId').populate('userId').populate('facilityId');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err });
  }
});

// 2. Fetch all facilities (admin only)
app.get('/admin/facilities', verifyTokenAndRole("ADMIN"), async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.status(200).json(facilities);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching facilities', error: err });
  }
});

// 3. Fetch all user profiles (admin only)
app.get('/admin/users', verifyTokenAndRole("ADMIN"), async (req, res) => {
  try {
    const users = await UserProfile.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
});

// 4. Fetch all pets (admin only)
app.get('/admin/pets', verifyTokenAndRole("ADMIN"), async (req, res) => {
  try {
    const pets = await Pet.find().populate('userId');
    console.log(pets);
    
    res.status(200).json(pets);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error fetching pets', error: err });
  }
});

app.put('/admin/bookings/update-status',verifyTokenAndRole("ADMIN"), async (req,res)=> {
  try {
    const { bookingId, status } = req.body;

    if (!['confirmed', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be "confirmed" or "rejected".' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      { _id : bookingId },
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking status updated successfully', booking: updatedBooking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'An error occurred while updating the booking status' });
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
