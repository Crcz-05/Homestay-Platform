const express = require("express");
const axios = require("axios");
const supabase = require("../config/supabase");

const router = express.Router();

router.post("/recommend", async (req, res) => {
  try {
    const { budget, preferences } = req.body;

    // Fetch homestays
    const { data: homestays, error } = await supabase
      .from("homestays")
      .select("*");

    if (error) {
      return res.status(500).json({
        message: "Failed to fetch homestays",
        error: error.message,
      });
    }

    // Filter by budget
    const filtered = homestays.filter(
      (stay) => Number(stay.price) <= Number(budget)
    );

    if (filtered.length === 0) {
      return res.json({
        recommendation: "No homestays found within your budget.",
      });
    }

    const prompt = `
You are an AI travel assistant.

User Preferences:
${preferences}

Maximum Budget: ₹${budget}

Available Homestays:
${JSON.stringify(filtered, null, 2)}

Recommend the BEST homestay.

Include:
1. Best homestay
2. Why it matches
3. Nearby tourist attractions
4. Activities nearby
5. Short travel tip

Return a clean formatted response.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nvidia/nemotron-3-ultra-550b-a55b:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({
      recommendation: response.data.choices[0].message.content,
    });

  } catch (err) {
    console.error(err.response?.data || err);

    return res.status(500).json({
      message: "AI request failed",
      error: err.response?.data || err.message,
    });
  }
});

module.exports = router;