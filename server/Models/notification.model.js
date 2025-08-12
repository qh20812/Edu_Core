const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    tenant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    recipient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 255 },
    content: { type: String, required: true },
    type: { type: String, enum: ["email", "sms", "in_app"], required: true },
    sent_at: { type: Date, required: true },
    read_at: { type: Date, required: false },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
notificationSchema.index({ recipient_id: 1, read_at: 1 }); // Tối ưu tìm thông báo chưa đọc của người dùng
