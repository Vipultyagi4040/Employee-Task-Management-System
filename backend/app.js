const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config({ path: __dirname + '/.env' });
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Routes Imports
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const employeeRoute = require('./routes/employee');
const projectRoute = require('./routes/project');
const taskRoute = require('./routes/task');
const timesheetRoute = require('./routes/timesheet');
const attendanceRoute = require('./routes/attendance');

const app = express();
const PORT = process.env.PORT || 6000;
connectDB();

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API Routes
app.use('/api', authRoute);
app.use('/api', dashboardRoute);
app.use('/api', employeeRoute);
app.use('/api', projectRoute);
app.use('/api', taskRoute);
app.use('/api', timesheetRoute);
app.use('/api', attendanceRoute);

// Serve React app for any unknown API request
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Server Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});