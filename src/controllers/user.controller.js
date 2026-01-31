const supabase = require("../config/supabase");

exports.createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({ message: "Missing fields" });
    }
    if (!["customer", "owner", "driver"].includes(role)) {
      return res.status(400).json({ message: "invalid role" });
    }
    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, role }])
      .select();

    if (error) return;
    res.status(400).json({ error: error.message });

    res.status(201).json({ message: "User created", data });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  createUser,
  getUserById,
};
