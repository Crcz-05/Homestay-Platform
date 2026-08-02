require("dotenv").config();

const aiRoutes = require("./routes/ai");
const rateLimit = require("express-rate-limit");
const authMiddleware = require("./middleware/authMiddleware");
const express = require("express");
const cors = require("cors");
const supabase = require("./config/supabase");
const authRoutes = require("./routes/auth");
//const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 5,

  message: {
    message: "Too many requests. Please try again after 15 minutes.",
  },

  standardHeaders: true,

  legacyHeaders: false,
});
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

// Home Route
app.get("/", (req, res) => {
  res.json({ message: "Backend Running Successfully!" });
});


// =============================
// 1. GET ALL HOMESTAYS
// =============================
app.get("/api/homestays",  async (req,res)=>{
  const { data, error } = await supabase
    .from("homestays")
    .select("*");

  if (error) {
    return res.status(500).json(error);
  }

  res.status(200).json(data);
});


// =============================
// 2. GET SINGLE HOMESTAY
// =============================
app.get("/api/homestays/:id", async (req, res) => {

    const { data, error } = await supabase
        .from("homestays")
        .select("*")
        .eq("id", req.params.id)
        .single();

    if (error) {
        return res.status(404).json(error);
    }

    res.status(200).json(data);
});


// =============================
// 3. CREATE HOMESTAY
// =============================
app.post("/api/homestays", authMiddleware, async (req, res) => {

    const { data, error } = await supabase
        .from("homestays")
        .insert([
            {
                name: req.body.name,
                location: req.body.location,
                price: req.body.price
            }
        ])
        .select();

    if (error) {
        return res.status(400).json(error);
    }

    res.status(201).json(data);
});


// =============================
// 4. UPDATE HOMESTAY
// =============================
app.put("/api/homestays/:id", authMiddleware, async (req, res) => {

    const { data, error } = await supabase
        .from("homestays")
        .update({
            name: req.body.name,
            location: req.body.location,
            price: req.body.price
        })
        .eq("id", req.params.id)
        .select();

    if (error) {
        return res.status(400).json(error);
    }

    res.status(200).json(data);
});

// =============================
// 5. DELETE HOMESTAY
// =============================
app.delete("/api/homestays/:id", authMiddleware,async (req, res) => {

    const { error } = await supabase
        .from("homestays")
        .delete()
        .eq("id", req.params.id);

    if (error) {
        return res.status(400).json(error);
    }

    res.status(200).json({
        message: "Homestay deleted successfully"
    });
});

// =============================
// 6. SEARCH HOMESTAYS
// =============================
app.get("/api/search", async (req, res) => {

    const q = req.query.q || "";

    const { data, error } = await supabase
        .from("homestays")
        .select("*")
        .ilike("name", `%${q}%`);

    if (error) {
        return res.status(400).json(error);
    }

    res.status(200).json(data);
});

// =============================
// PROTECTED PROFILE ROUTE
// =============================
app.get("/api/profile", authMiddleware, (req, res) => {

    res.status(200).json({
        message: "Welcome!",
        user: req.user
    });

});

// =============================
// START SERVER
// =============================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});