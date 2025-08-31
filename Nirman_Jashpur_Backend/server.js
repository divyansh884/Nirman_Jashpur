require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./utils/database');
const config = require('./config/config');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const typeOfWorkRoutes = require("./routes/admin.typeOfWork");
const workAgencyRoutes = require("./routes/admin.workAgency");
const schemeRoutes = require("./routes/admin.scheme");
const sdoRoutes = require("./routes/admin.sdo");
const wardRoutes = require("./routes/admin.ward");
const typeOfLocationRoutes = require("./routes/admin.typeOfLocation");
const cityRoutes = require("./routes/admin.city");
const workDepartmentRoutes = require("./routes/admin.department");



const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());
app.use(cors(config.cors));

// Rate limiting
const limiter = rateLimit(config.rateLimit);
app.use(limiter);

// Middleware
app.use(morgan("combined"));
app.use(express.json({ limit: process.env.MAX_FILE_SIZE || "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/work-proposals', require('./routes/workProposals'));
app.use('/api/work-proposals', require('./routes/tenders')); // Tender routes for work proposals
app.use('/api/work-proposals', require('./routes/workOrders')); // Work order routes for work proposals
app.use('/api/work-proposals', require('./routes/workProgress')); // Progress routes for work proposals
app.use('/api/tenders', require('./routes/tenders')); // General tender routes
app.use('/api/work-orders', require('./routes/workOrders')); // General work order routes
app.use('/api/work-progress', require('./routes/workProgress')); // General progress routes
app.use('/api/reports', require('./routes/reports'));
app.use('/api/upload', require('./routes/upload')); // Upload routes (images + documents)

app.use('/api/admin/user', require('./routes/admin.users'))
app.use('/api/admin/department', require('./routes/admin.department'))

// Sub-schema admin routes
app.use("/api/admin/type-of-work", typeOfWorkRoutes);
app.use("/api/admin/work-agency", workAgencyRoutes);
app.use("/api/admin/scheme", schemeRoutes);
app.use("/api/admin/sdo", sdoRoutes);
app.use("/api/admin/ward", wardRoutes);
app.use("/api/admin/type-of-location", typeOfLocationRoutes);
app.use("/api/admin/city", cityRoutes);
app.use("/api/admin/work-department", workDepartmentRoutes);


// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

module.exports = app;
