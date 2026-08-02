const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const supabase = require("../config/supabase");

const router = express.Router();

// ==========================
// REGISTER
// ==========================
router.post(
  "/register",
  [
    body("fullname").notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { fullname, email, password } = req.body;

    // Check if user exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          fullname,
          email,
          password: hashedPassword,
        },
      ])
      .select();

    if (error) {
      return res.status(500).json(error);
    }

    res.status(201).json({
      message: "User registered successfully",
      user: data,
    });
  }
);

// ==========================
// LOGIN
// ==========================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.json({
    token,
    user: {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    },
  });
});

module.exports = router;