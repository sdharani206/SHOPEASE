// Controllers hold the LOGIC: they talk to the database and send the response.
const supabase = require("../supabaseClient");

// GET /api/products  ->  every product, oldest first
exports.getAllProducts = async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase error:", error.message); // details stay in YOUR terminal
    return res.status(500).json({ message: "Could not load products" });
  }

  res.json(data);
};

// GET /api/products/5  ->  one product
exports.getProductById = async (req, res) => {
  const id = Number(req.params.id); // URL parts are always text, so convert

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ message: "Product id must be a positive whole number" });
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle(); // gives the row, or null if there is none (no error)

  if (error) {
    console.error("Supabase error:", error.message);
    return res.status(500).json({ message: "Could not load the product" });
  }
  if (!data) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(data);
};