const Employee = require("../models/employee.js");

const Query = {
  employees: async (
    _,
    { page = 1, limit = 10, sortBy = "name", name, role, age, attendance }
  ) => {
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    if (role) {
      filter.role = { $regex: role, $options: "i" };
    }
    if (age) {
      filter.age = age;
    }
    if (attendance) {
      filter.attendance = attendance;
    }

    // filters , sorting and pagination
    const employees = await Employee.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sortBy);

    const totalCount = await Employee.countDocuments(filter); // Count of employees documents for filter

    return {
      employees,
      totalCount,
    };
  },

  employee: async (_, { id }) => {
    return await Employee.findById(id);
  },
};

module.exports = Query;
