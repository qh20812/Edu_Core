const User = require("../Models/user.model");

class UserService {
  /**
   * Tìm user theo email
   * @param {string} email 
   * @returns {Promise<Object|null>}
   */
  async findUserByEmail(email) {
    try {
      return await User.findOne({ email: email.toLowerCase().trim() });
    } catch (error) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  /**
   * Tạo user mới
   * @param {Object} userData 
   * @returns {Promise<Object>}
   */
  async createUser(userData) {
    try {
      const user = new User({
        ...userData,
        email: userData.email.toLowerCase().trim()
      });
      return await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("Email already exists");
      }
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  /**
   * Tìm user theo ID (không trả về password)
   * @param {string} userId 
   * @returns {Promise<Object|null>}
   */
  async findUserById(userId) {
    try {
      return await User.findById(userId).select("-password_hash");
    } catch (error) {
      throw new Error(`Error finding user by ID: ${error.message}`);
    }
  }

  /**
   * Cập nhật last_login
   * @param {string} userId 
   * @returns {Promise<Object>}
   */
  async updateLastLogin(userId) {
    try {
      return await User.findByIdAndUpdate(
        userId,
        { last_login: new Date() },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating last login: ${error.message}`);
    }
  }
}

module.exports = new UserService();
