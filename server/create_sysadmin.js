const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
require('./Models/user.model');
const User = mongoose.model('User');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const createSysAdmin = async () => {
  try {
    await connectDB();

    // Check if sys_admin already exists
    const existingSysAdmin = await User.findOne({ role: 'sys_admin' });
    
    if (existingSysAdmin) {
      console.log('Sys admin already exists:', existingSysAdmin.email);
      console.log('Sys admin ID:', existingSysAdmin._id);
      process.exit(0);
    }

    // Create sys_admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const sysAdmin = new User({
      email: 'sysadmin@educore.com',
      password: hashedPassword,
      full_name: 'System Administrator',
      role: 'sys_admin',
      is_active: true,
      email_verified: true
    });

    await sysAdmin.save();
    console.log('Sys admin created successfully!');
    console.log('Email: sysadmin@educore.com');
    console.log('Password: admin123');
    console.log('ID:', sysAdmin._id);

  } catch (error) {
    console.error('Error creating sys admin:', error);
  } finally {
    process.exit(0);
  }
};

createSysAdmin();
