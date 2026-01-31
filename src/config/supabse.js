const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  Process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

module.exports = supabase;
