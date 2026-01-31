require("dotenv").config();
const app = require("./server");

const userRoutes = require("./routes/user.routes");
const vehicleRoutes = require("./routes/vehicle.routes");
const tripRoutes = require("./routes/trip.routes");
const analyticsRoutes = require("./routes/analytics.routes");

app.use("/users", userRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/trips", tripRoutes);
app.use("/analytics", analyticsRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "This Request Is Not Found",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.loh(`Server running on port ${PORT}`);
});
