const supabase = require("../config/supabase");

exports.createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, role }]);

    if (error) return;
    res.status(400).json({ error: error.message });

    res.status(201).json({ message: "User created", data });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
