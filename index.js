// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define the POST endpoint at "/bfhl"
app.post('/bfhl', (req, res) => {
  // Define user_id - replace this with your actual ID in format fullname_dob
  const user_id = "john_doe_17091999";
  
  // Check if the request body contains the array of numbers
  if (!req.body.data || !Array.isArray(req.body.data)) {
    return res.status(400).json({
      is_success: false,
      user_id: user_id,
      message: "Invalid request. 'data' array is required."
    });
  }
  
  // Process the array only if it's completely numeric
  const data = req.body.data;
  
  // Check if all elements are numeric (after type casting)
  const isValidData = data.every(item => {
    // Convert strings to numbers properly
    const parsed = Number(item);
    return !isNaN(parsed);
  });
  
  if (!isValidData) {
    return res.status(400).json({
      is_success: false,
      user_id: user_id,
      message: "All elements in the data array must be numeric."
    });
  }
  
  // Convert all items to numbers to ensure proper processing
  const numericData = data.map(item => Number(item));
  
  // Filter out odd and even numbers
  const oddNumbers = numericData.filter(num => num % 2 !== 0);
  const evenNumbers = numericData.filter(num => num % 2 === 0);
  
  // Prepare the response according to the specified format
  const response = {
    is_success: true,
    user_id: user_id,
    odd: oddNumbers,
    even: evenNumbers
  };
  
  // Send the response
  res.json(response);
});

app.get('/bfhl', (req, res) => {
  res.json({
    is_success: true,
    user_id: "john_doe_17091999",
    operation_code: 1
  });
});

// For Vercel deployment, we need to export the app
module.exports = app;

// Start the server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
