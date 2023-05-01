const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const models = require('./models');
const resultRoutes = require("./routes/result.routes");
const stateRoutes = require("./routes/state.routes");
const cityRoutes = require("./routes/city.routes");
const port = process.env.PORT || 8000;

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/results", resultRoutes);
app.use("/states", stateRoutes);
app.use("/cities", cityRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});