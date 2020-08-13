const express = require("express");
const app = express();
const PORT = 3002;
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(PORT, (_) => console.log(`Listening on port ${PORT}`));
