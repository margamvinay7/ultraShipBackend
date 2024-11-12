const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

// employeeSchema
const employeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  class: String,
  subjects: [String],
  attendance: Number,
  role: { type: String, enum: ["admin", "employee"], default: "employee" },
  password: { type: String, required: true },
});

employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("Employee", employeeSchema);
