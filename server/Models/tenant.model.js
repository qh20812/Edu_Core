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
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Tenant", tenantSchema);
