const router = require('express').Router();
const userRoute = require('./userRoute');
const thoughtRoutes = require('./thoughtRoutes');

// /api/ routing
router.use('/users', userRoute);
router.use('/thoughts', thoughtRoutes);

module.exports = router;