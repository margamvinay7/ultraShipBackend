const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Int!
    role: String!
  }

  type EmployeePage {
    employees: [Employee]
    totalCount: Int!
  }

  type AuthPayload {
    accessToken: String!
    employee: Employee!
  }

  type Query {
    employees(
      page: Int
      limit: Int
      sortBy: String
      name: String
      role: String
      age: Int
      attendance: Int
    ): EmployeePage
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(
      name: String!
      age: Int!
      role: String!
      class: String!
      subjects: [String!]!
      attendance: Int!
      password: String!
    ): Employee

    updateEmployee(
      id: ID!
      name: String
      age: Int
      role: String
      class: String
      subjects: [String]
      attendance: Int
    ): Employee

    deleteEmployee(id: ID!): String

    login(name: String!, password: String!): AuthPayload!
  }
`;

module.exports = typeDefs;
