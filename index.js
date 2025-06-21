require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 🔗 Import routes
const leadRoutes = require('./routes/leadRoutes');     // 🟢 Lead API
const authRoutes = require('./auth/authRoutes');       // 🟢 Auth API
const taskRoutes = require('./routes/taskRoutes');     // 🟡 Task API ✅ NEW
const activityRoutes = require('./routes/activityRoutes'); // 🟡 Activity API ✅ NEW

// 🚀 Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// ⚙️ Constants
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

// 🔌 Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 🔍 Health check route
app.get('/', (req, res) => {
  res.send('🚀 CRM backend is running');
});

// 🛣️ Route middleware
app.use('/api/leads', leadRoutes);    // 📂 Lead management
app.use('/api/auth', authRoutes);     // 🔐 Auth (login, register, etc.)
app.use('/api/tasks', taskRoutes);    // 📌 Task management ✅ NEW
app.use('/api/activities', activityRoutes); // 📅 Activity management


// 🏁 Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
