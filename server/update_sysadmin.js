const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
require('./Models/user.model');
const User = mongoose.model('User');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const updateSysAdminPassword = async () => {
  try {
    await connectDB();

    // Find the sys_admin user
    const sysAdmin = await User.findOne({ role: 'sys_admin' });
    
    if (!sysAdmin) {
      console.log('No sys_admin user found');
      process.exit(1);
    }

    console.log('Found sys_admin:', sysAdmin.email);

    // Update password to known value
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await User.findByIdAndUpdate(sysAdmin._id, {
      password: hashedPassword,
      is_active: true,
      email_verified: true
    });

    console.log('Sys admin password updated successfully!');
    console.log('Email:', sysAdmin.email);
    console.log('Password: admin123');

  } catch (error) {
    console.error('Error updating sys admin:', error);
  } finally {
    process.exit(0);
  }
};

updateSysAdminPassword();
