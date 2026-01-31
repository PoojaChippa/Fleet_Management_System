const supabase = require("../config/supabse");

exports.getAnalytics = async (req, res) => {
  const { count: customers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("role", "customer");

  const { count: owners } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("role", "owner");

  const { count: drivers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("role", "driver");

  const { count: vehicles } = await supabase
    .from("vehicles")
    .select("*", { count: "exact", head: true });

  const { count: trips } = await supabase
    .from("trips")
    .select("*", { count: "exact", head: true });

  res.json({
    totalCustomers: customers,
    totalOwners: owners,
    totalDrivers: drivers,
    totalVehicles: vehicles,
    totalTrips: trips,
  });
};
