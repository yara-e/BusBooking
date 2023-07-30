// ==================== INITIALIZE EXPRESS APP ====================
const express = require("express"); //express عشان نقوم على السيرفر كله

const cors = require("cors");

const app = express(); //call to express

// ====================  GLOBAL MIDDLEWARE ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TO ACCESS URL FORM ENCODED ==> based on bofy parser to be jason
app.use(express.static("upload"));
// const cors = require("cors");
// app.use(cors()); // ALLOW HTTP REQUESTS LOCAL HOSTS

// ====================  Required Module ====================
const auth = require("./routes/Auth");
const appointments = require("./routes/Appointments");
const request = require("./routes/Request");
const travelers = require("./routes/Traveler");

// ====================  API ROUTES [ ENDPOINTS ]  ====================
app.use(
  cors({
    origin: "*",
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

app.use("/auth", auth);
app.use("/appointments", appointments);
app.use("/traveler", travelers);
app.use("/request", request);

// ====================  RUN THE APP  ====================
app.listen(4000, "localhost", () => {
  console.log("SERVER IS RUNNING ");
});
