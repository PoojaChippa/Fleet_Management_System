const supabase = require("../config/supabase");

exports.createUser = async (req, res) => {
  try {
    const {
      customer_id,
      vehicle_id,
      start_date,
      end_date,
      location,
      distance_km,
      passengers,
    } = req.body;

    const { data: vehicle } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", vehicle_id)
      .single();

    if (!vehicle || !vehicle.isAvailable) {
      return res.status(400).json({ message: "Vehicle not available" });
    }

    if (passengers > vehicle.allowed_passengers) {
      return res.status(400).json({ message: "Passenger limit exceeded" });
    }

    const tripCost = distance_km * vehicle.rate_per_km;
    await supabase.from("trips").insert([
      {
        customer_id,
        vehicle_id,
        start_date,
        end_date,
        location,
        distance_km,
        passengers,
        tripCost,
      },
    ]);
    await supabase
      .from("vehicles")
      .update({ isAvailable: false })
      .eq("id", vehicle_id);

    res.status(201).json({ message: "Trip created", data });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.endTrip = async (req, res) => {
  const { tripId } = req.params;

  const { data: trip } = await supabase
    .from("trips")
    .select("*")
    .eq("id", tripId)
    .single();

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicle_id)
    .single();

  const cost = trip.distance_km * vehicle.rate_per_km;
  await supabase
    .from("trips")
    .update([
      {
        isCompleted: true,
        tripCost: cost,
      },
    ])
    .eq("id", tripId);

  await supabase
    .from("vehicles")
    .update({ isAvailable: true })
    .eq("id", trip.vehicle_id);

  res.json({ message: "Trip ended", tripCost: cost });
};
