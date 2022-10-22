const express = require('express');
const router = express.Router()

const {
    getAllEvents
} = require('../controllers/eventController')


router.route('/').get(getAllEvents)

module.exports = router