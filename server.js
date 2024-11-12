require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/typeDefs");
const Query = require("./resolvers/query.js");
const Mutation = require("./resolvers/mutation.js");
const cors = require("cors");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const connectDB = require("./config/db.js");
const authMiddleware = require("./middlewares/auth.js");
const employee = require("./models/employee.js");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: { Query, Mutation },
});

const app = express();
// cors for development
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(authMiddleware);

const startServer = async () => {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      console.log("req", req);
    },
  });

  try {
    await server.start();
    console.log("Apollo Server started successfully");
  } catch (error) {
    console.error("Apollo Server start error:", error.message);
  }
  server.applyMiddleware({ app, path: "/graphql" });

  connectDB();
  app.listen(process.env.PORT, () => {
    console.log(
      `Server running on http://localhost:${process.env.PORT}/graphql`
    );
  });
};

// error handling middlewares
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).send("Internal Server Error");
});

startServer();
