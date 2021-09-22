const express = require("express");

const app = express();

require("./routes/userRoutes");

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running`);
});