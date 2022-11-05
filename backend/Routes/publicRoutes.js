const express = require('express');
const router = express.Router()

const {
    getAllEvents,
    getSearchEvents,
    getEvent,
} = require('../controllers/eventController')
const { getCreator } = require('../controllers/userController')

router.route('/').get(getAllEvents)

router.route('/creator/:uid').get(getCreator)

router.route('/search/:q').get(getSearchEvents)

router.route('/:id').get(getEvent)

module.exports = router