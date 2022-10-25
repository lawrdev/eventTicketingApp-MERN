const express = require('express');
const router = express.Router()

const {
    getAllEvents,
    getSearchEvents,
    getEvent,
} = require('../controllers/eventController')


router.route('/').get(getAllEvents)

router.route('/search').get(getSearchEvents)

router.route('/:id').get(getEvent)

module.exports = router