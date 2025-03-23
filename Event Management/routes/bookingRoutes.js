const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create booking
router.post('/', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.body.event);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Check if enough tickets are available
        if (event.availableTickets < req.body.ticketQuantity) {
            return res.status(400).json({
                success: false,
                message: 'Not enough tickets available'
            });
        }

        // Calculate total amount
        const totalAmount = event.price * req.body.ticketQuantity;

        // Create Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // Convert to cents
            currency: 'usd',
            metadata: {
                eventId: event._id.toString(),
                userId: req.user.id
            }
        });

        // Create booking
        const booking = new Booking({
            event: event._id,
            user: req.user.id,
            ticketQuantity: req.body.ticketQuantity,
            totalAmount,
            paymentId: paymentIntent.id
        });

        await booking.save();

        res.status(201).json({
            success: true,
            data: {
                booking,
                clientSecret: paymentIntent.client_secret
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating booking',
            error: error.message
        });
    }
});

// Confirm booking after successful payment
router.post('/confirm/:id', auth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Verify payment with Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(booking.paymentId);
        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({
                success: false,
                message: 'Payment not completed'
            });
        }

        booking.status = 'confirmed';
        await booking.save();

        res.json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error confirming booking',
            error: error.message
        });
    }
});

// Get user's bookings
router.get('/my-bookings', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('event')
            .sort('-createdAt');

        res.json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching bookings',
            error: error.message
        });
    }
});

// Get single booking
router.get('/:id', auth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('event')
            .populate('user', 'name email');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Check if user is authorized to view this booking
        if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this booking'
            });
        }

        res.json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching booking',
            error: error.message
        });
    }
});

// Cancel booking
router.put('/cancel/:id', auth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Check if user is authorized to cancel this booking
        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to cancel this booking'
            });
        }

        // Only allow cancellation of confirmed bookings
        if (booking.status !== 'confirmed') {
            return res.status(400).json({
                success: false,
                message: 'Cannot cancel this booking'
            });
        }

        // Process refund through Stripe
        if (booking.paymentId) {
            await stripe.refunds.create({
                payment_intent: booking.paymentId
            });
        }

        booking.status = 'cancelled';
        await booking.save();

        // Return tickets to event
        await Event.findByIdAndUpdate(booking.event, {
            $inc: { availableTickets: booking.ticketQuantity }
        });

        res.json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error cancelling booking',
            error: error.message
        });
    }
});

module.exports = router; 