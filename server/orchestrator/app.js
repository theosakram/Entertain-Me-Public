const express = require("express");
const server = require("./schema");

const app = express();
server.applyMiddleware({ app });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
