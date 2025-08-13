const Tenant = require('../Models/tenant.model');
const User = require('../Models/user.model');
const bcrypt = require('bcryptjs');

class TenantService {
  // Create new tenant with plan information
  async createTenant(tenantData, adminData, planData = {}) {
    try {
      // Set plan defaults based on selected plan
      const planDefaults = {
        small: { max_students: 300 },
        medium: { max_students: 700 },
        large: { max_students: 900 },
      };

      const selectedPlan = planData.plan || 'small';
      const defaults = planDefaults[selectedPlan];

      // Create tenant with plan information
      const tenant = new Tenant({
        name: tenantData.name,
        address: tenantData.address,
        contact_email: tenantData.contact_email,
        contact_phone: tenantData.contact_phone,
        plan: selectedPlan,
        billing_cycle: planData.billing_cycle || 'monthly',
        max_students: defaults.max_students,
        subscription_status: 'trial', // Start with trial
        is_active: true,
      });

      const savedTenant = await tenant.save();

      // Create admin user for the tenant
      if (adminData) {
        const hashedPassword = await bcrypt.hash(adminData.password, 12);
        
        const adminUser = new User({
          tenant_id: savedTenant._id,
          email: adminData.email,
          password: hashedPassword,
          full_name: adminData.full_name,
          phone: adminData.phone,
          role: 'school_admin',
          status: 'active',
        });

        await adminUser.save();
      }

      return savedTenant;
    } catch (error) {
      console.error('Error creating tenant:', error);
      throw error;
    }
  }

  // Get tenant by ID
  async getTenantById(tenantId) {
    try {
      return await Tenant.findById(tenantId).lean();
    } catch (error) {
      console.error('Error getting tenant:', error);
      throw error;
    }
  }

  // Update tenant subscription
  async updateSubscription(tenantId, subscriptionData) {
    try {
      return await Tenant.findByIdAndUpdate(
        tenantId,
        subscriptionData,
        { new: true }
      );
    } catch (error) {
      console.error('Error updating tenant subscription:', error);
      throw error;
    }
  }

  // Get tenant statistics
  async getTenantStats(tenantId) {
    try {
      const tenant = await Tenant.findById(tenantId);
      if (!tenant) {
        throw new Error('Tenant not found');
      }

      // Count users by role
      const userStats = await User.aggregate([
        { $match: { tenant_id: tenant._id } },
        { $group: { _id: '$role', count: { $sum: 1 } } }
      ]);

      const stats = {
        totalStudents: 0,
        totalTeachers: 0,
        totalParents: 0,
        totalStaff: 0,
      };

      userStats.forEach(stat => {
        switch (stat._id) {
          case 'student':
            stats.totalStudents = stat.count;
            break;
          case 'teacher':
            stats.totalTeachers = stat.count;
            break;
          case 'parent':
            stats.totalParents = stat.count;
            break;
          case 'staff':
            stats.totalStaff = stat.count;
            break;
        }
      });

      return {
        tenant: {
          id: tenant._id,
          name: tenant.name,
          plan: tenant.plan,
          subscription_status: tenant.subscription_status,
          billing_cycle: tenant.billing_cycle,
          max_students: tenant.max_students,
          subscription_end_date: tenant.subscription_end_date,
          trial_end_date: tenant.trial_end_date,
        },
        usage: stats,
        limits: {
          maxStudents: tenant.max_students,
          studentsUsed: stats.totalStudents,
          studentsRemaining: tenant.max_students - stats.totalStudents,
          usagePercentage: Math.round((stats.totalStudents / tenant.max_students) * 100),
        }
      };
    } catch (error) {
      console.error('Error getting tenant stats:', error);
      throw error;
    }
  }

  // Check if tenant can add more students
  async canAddStudents(tenantId, additionalCount = 1) {
    try {
      const tenant = await Tenant.findById(tenantId);
      if (!tenant) {
        throw new Error('Tenant not found');
      }

      const currentStudentCount = await User.countDocuments({
        tenant_id: tenantId,
        role: 'student'
      });

      const newTotal = currentStudentCount + additionalCount;
      const canAdd = newTotal <= tenant.max_students;

      return {
        canAdd,
        currentCount: currentStudentCount,
        maxAllowed: tenant.max_students,
        newTotal,
        remaining: tenant.max_students - currentStudentCount,
      };
    } catch (error) {
      console.error('Error checking student limit:', error);
      throw error;
    }
  }

  // Get all tenants (for sys_admin)
  async getAllTenants(page = 1, limit = 10, search = '') {
    try {
      const skip = (page - 1) * limit;
      const searchQuery = search ? {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { contact_email: { $regex: search, $options: 'i' } }
        ]
      } : {};

      const tenants = await Tenant.find(searchQuery)
        .skip(skip)
        .limit(limit)
        .sort({ created_at: -1 })
        .lean();

      const total = await Tenant.countDocuments(searchQuery);

      return {
        tenants,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        }
      };
    } catch (error) {
      console.error('Error getting all tenants:', error);
      throw error;
    }
  }
}

module.exports = new TenantService();
