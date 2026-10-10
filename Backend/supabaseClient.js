// Creates ONE Supabase connection that the whole backend shares.
require("dotenv").config(); // loads the values from your .env file

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

// Stop immediately, with a clear message, if .env is missing or incomplete
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_SECRET_KEY in backend/.env");
  console.error("   Copy .env.example to .env and fill in both values.");
  process.exit(1);
}

// The backend is a server, so it has no "logged-in browser session" to remember.
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

module.exports = supabase;