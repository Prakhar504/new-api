const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// POST endpoint
app.post('/', (req, res) => {
  const user_id = "Prakhar Jain 0827CY221043";
  
  try {
    if (!req.body.data || !Array.isArray(req.body.data)) {
      throw new Error("'data' array is required");
    }

    const numericData = req.body.data.map(item => {
      const num = Number(item);
      if (isNaN(num)) throw new Error("All elements must be numeric");
      return num;
    });

    res.json({
      is_success: true,
      user_id: user_id,
      odd: numericData.filter(n => n % 2 !== 0),
      even: numericData.filter(n => n % 2 === 0)
    });

  } catch (error) {
    res.status(400).json({
      is_success: false,
      user_id: user_id,
      message: error.message
    });
  }
});

// GET endpoint
app.get('/', (req, res) => {
  res.json({
    is_success: true,
    user_id: "Prakhar Jain 0827CY221043",
    operation_code: 1
  });
});

module.exports = app;
