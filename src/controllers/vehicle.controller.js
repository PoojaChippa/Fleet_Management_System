const supabase = require("../config/supabase");

exports.createUser = async (req, res) => {
  try {
    const { owner_id, type, rate_per_km, allowed_passengers } = req.body;
    if (!owner_id || !type || !rate_per_km || !allowed_passengers) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const { data, error } = await supabase
      .from("users")
      .insert([{ owner_id, type, rate_per_km, allowed_passengers }]);

    if (error) return;
    res.status(400).json({ error: error.message });

    res.status(201).json({ message: "Vehicles added", data });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
