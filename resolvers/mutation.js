const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const Employee = require("../models/employee.js");

// function to verify is authorize or not for a mutations
const isAuthorized = (requiredRole, employeeRole) => {
  return requiredRole === employeeRole || employeeRole === "admin";
};

const Mutation = {
  login: async (_, { name, password }) => {
    const employee = await Employee.findOne({ name });
    if (!employee || !(await bcryptjs.compare(password, employee.password))) {
      throw new Error("Invalid credentials");
    }
    const accessToken = jwt.sign(
      { id: employee.id, role: employee.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return { accessToken, employee };
  },
  addEmployee: async (_, args, context) => {
    if (!isAuthorized("admin", context.employee.role))
      throw new Error("Unauthorized");
    const employee = new Employee(args);
    console.log("args", args);
    await employee.save();
    return employee;
  },
  updateEmployee: async (_, { id, ...args }, context) => {
    if (!isAuthorized("admin", context.employee.role))
      throw new Error("Unauthorized");
    console.log("args", args);
    return await Employee.findByIdAndUpdate(id, args, { new: true });
  },
  deleteEmployee: async (_, { id }, context) => {
    if (!isAuthorized("admin", context.employee.role))
      throw new Error("Unauthorized");
    await Employee.findByIdAndDelete(id);
    return `Employee ${id} deleted`;
  },
};

module.exports = Mutation;
