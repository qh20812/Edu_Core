const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tenantSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 255 },
    address: { type: String, required: false },
    contact_email: {
      type: String,
      required: false,
      trim: true,
      maxlength: 255,
    },
    contact_phone: { type: String, required: false, trim: true, maxlength: 20 },
    is_active: { type: Boolean, default: true },
    
    // Subscription and Plan Information
    plan: { 
      type: String, 
      enum: ['small', 'medium', 'large'], 
      default: 'small' 
    },
    subscription_status: { 
      type: String, 
      enum: ['trial', 'active', 'inactive', 'expired', 'pending'], 
      default: 'trial' 
    },
    billing_cycle: { 
      type: String, 
      enum: ['monthly', 'yearly'],
      default: 'monthly'
    },
    subscription_start_date: { type: Date },
    subscription_end_date: { type: Date },
    max_students: { type: Number, default: 300 },
    
    // Payment Information
    last_payment_date: { type: Date },
    last_payment_amount: { type: Number },
    payment_method: { type: String },
    paypal_subscription_id: { type: String },
    
    // Trial Information
    trial_start_date: { type: Date, default: Date.now },
    trial_end_date: { 
      type: Date, 
      default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days trial
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Tenant", tenantSchema);
