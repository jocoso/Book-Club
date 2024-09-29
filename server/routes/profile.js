const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
    res.send('Profile Route');
});

module.exports = router;
