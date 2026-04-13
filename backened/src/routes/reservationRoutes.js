const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, reservationController.createReservation);
router.get('/user/:userId', authMiddleware,       reservationController.getUserReservations);
router.put('/:id/cancel', authMiddleware, reservationController.cancelReservation);

module.exports = router;