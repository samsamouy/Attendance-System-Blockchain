const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define the /submit_attendance endpoint
app.post('/submit_attendance', (req, res) => {
  const attendanceData = req.body;
  console.log('Attendance data received:', attendanceData);
  res.status(200).send('Attendance submitted successfully');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
