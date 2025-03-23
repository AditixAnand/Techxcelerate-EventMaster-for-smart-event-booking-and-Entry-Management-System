const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Booking must belong to an Event']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to a User']
    },
    ticketQuantity: {
        type: Number,
        required: [true, 'Number of tickets is required'],
        min: 1
    },
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    paymentId: {
        type: String
    },
    ticketCode: {
        type: String,
        unique: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Generate ticket code before saving
bookingSchema.pre('save', function(next) {
    if (this.isNew) {
        this.ticketCode = `TKT-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-6)}`;
    }
    next();
});

// Update available tickets after booking
bookingSchema.post('save', async function() {
    if (this.status === 'confirmed') {
        await mongoose.model('Event').findByIdAndUpdate(this.event, {
            $inc: { availableTickets: -this.ticketQuantity }
        });
    }
});

module.exports = mongoose.model('Booking', bookingSchema); 