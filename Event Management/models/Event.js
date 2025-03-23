const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Event name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Event description is required']
    },
    date: {
        type: Date,
        required: [true, 'Event date is required']
    },
    time: {
        type: String,
        required: [true, 'Event time is required']
    },
    location: {
        type: String,
        required: [true, 'Event location is required']
    },
    category: {
        type: String,
        required: [true, 'Event category is required'],
        enum: ['Music', 'Technology', 'Arts & Theatre', 'Food & Drink', 'Business', 'Sports']
    },
    price: {
        type: Number,
        required: [true, 'Event price is required'],
        min: 0
    },
    image: {
        type: String,
        required: [true, 'Event image is required']
    },
    capacity: {
        type: Number,
        required: [true, 'Event capacity is required'],
        min: 1
    },
    availableTickets: {
        type: Number,
        min: 0
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming'
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual field for checking if event is sold out
eventSchema.virtual('isSoldOut').get(function() {
    return this.availableTickets === 0;
});

// Pre-save middleware to set initial available tickets
eventSchema.pre('save', function(next) {
    if (this.isNew) {
        this.availableTickets = this.capacity;
    }
    next();
});

module.exports = mongoose.model('Event', eventSchema); 