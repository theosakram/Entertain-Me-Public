const express = require("express");
const app = express();
const PORT = 3001;
const routes = require("./routes");
const { connecting } = require("./config");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(PORT, (_) => console.log(`Listening on port ${PORT}`));
