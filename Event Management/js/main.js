// Sample events data (in a real application, this would come from a backend)
const events = [
    {
        id: 1,
        name: "Tech Conference 2024",
        date: "2024-06-15",
        time: "09:00 AM",
        location: "Convention Center",
        price: 199.99,
        availableTickets: 100,
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.",
        category: "Technology"
    },
    {
        id: 2,
        name: "Music Festival",
        date: "2024-07-20",
        time: "04:00 PM",
        location: "Central Park",
        price: 89.99,
        availableTickets: 500,
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Experience an unforgettable evening of live music under the stars with top artists and emerging talents.",
        category: "Entertainment"
    },
    {
        id: 3,
        name: "Food & Wine Expo",
        date: "2024-08-10",
        time: "11:00 AM",
        location: "Exhibition Hall",
        price: 75.00,
        availableTickets: 200,
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Discover culinary excellence with master chefs and premium wine tastings from around the world.",
        category: "Food & Drink"
    }
];

// DOM Elements
const eventsGrid = document.querySelector('.events-grid');
const eventSelect = document.getElementById('eventSelect');
const ticketBookingForm = document.getElementById('ticketBookingForm');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'var(--shadow-sm)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = 'var(--shadow-md)';
    }
    lastScroll = currentScroll;
});

// Populate Events Grid with animation
function displayEvents() {
    eventsGrid.innerHTML = events.map((event, index) => `
        <div class="event-card" style="animation: fadeInUp ${0.3 + index * 0.1}s ease-out">
            <img src="${event.image}" alt="${event.name}" 
                onerror="this.src='https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'">
            <div class="event-details">
                <div class="event-category">${event.category}</div>
                <h3>${event.name}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-meta">
                    <p><i class="far fa-calendar"></i> ${event.date}</p>
                    <p><i class="far fa-clock"></i> ${event.time}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    <p class="tickets-left"><i class="fas fa-users"></i> ${event.availableTickets} tickets left</p>
                </div>
                <p class="event-price"><i class="fas fa-ticket-alt"></i> $${event.price.toFixed(2)}</p>
                <button onclick="openBooking(${event.id})" class="book-btn">
                    <span>Book Now</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Populate Event Select Dropdown with animation
function populateEventSelect() {
    eventSelect.innerHTML = '<option value="">Choose an event...</option>' +
        events.map(event => `
            <option value="${event.id}">${event.name} - ${event.date} ($${event.price.toFixed(2)})</option>
        `).join('');
}

// Smooth scroll to booking section with highlight effect
function openBooking(eventId) {
    window.location.href = `booking.html?event=${eventId}`;
}

// Update total price based on quantity
function updatePriceDisplay() {
    const quantity = document.getElementById('ticketQuantity').value;
    const eventId = eventSelect.value;
    const event = events.find(e => e.id === parseInt(eventId));
    
    if (event) {
        const total = event.price * quantity;
        document.getElementById('totalPrice').textContent = `Total: $${total.toFixed(2)}`;
    }
}

// Handle Ticket Booking with animation
ticketBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        eventId: eventSelect.value,
        quantity: document.getElementById('ticketQuantity').value,
        attendeeName: document.getElementById('attendeeName').value,
        attendeeEmail: document.getElementById('attendeeEmail').value
    };

    // Animate submit button
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('Booking submitted:', formData);
        
        // Show success message with animation
        const successMessage = document.createElement('div');
        successMessage.className = 'booking-success';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Booking successful!</p>
            <p>Check your email for confirmation.</p>
        `;
        
        ticketBookingForm.appendChild(successMessage);
        
        // Reset form
        setTimeout(() => {
            ticketBookingForm.reset();
            successMessage.remove();
            submitBtn.innerHTML = 'Book Now';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
});

// Enhanced Ticket Validation with animation
function validateTicket() {
    const ticketCode = document.getElementById('ticketCode');
    const validationResult = document.getElementById('validationResult');
    const validateBtn = document.querySelector('.validate-btn');
    
    // Disable button and show loading
    validateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Validating...';
    validateBtn.disabled = true;
    
    // Simulate API validation
    setTimeout(() => {
        if (ticketCode.value.length === 10) {
            validationResult.className = 'validation-result validation-success';
            validationResult.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Valid ticket! Entry granted.</p>
                <p>Welcome to the event!</p>
            `;
            ticketCode.style.borderColor = '#86efac';
        } else {
            validationResult.className = 'validation-result validation-error';
            validationResult.innerHTML = `
                <i class="fas fa-times-circle"></i>
                <p>Invalid ticket code.</p>
                <p>Please try again.</p>
            `;
            ticketCode.style.borderColor = '#fca5a5';
        }
        
        // Reset button
        validateBtn.innerHTML = 'Validate Ticket';
        validateBtn.disabled = false;
        
        // Clear validation after 3 seconds
        setTimeout(() => {
            validationResult.className = 'validation-result';
            validationResult.textContent = '';
            ticketCode.style.borderColor = '';
        }, 3000);
    }, 1000);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add scroll animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('2024-07-15T10:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('countdown-days').textContent = days;
    document.getElementById('countdown-hours').textContent = hours;
    document.getElementById('countdown-minutes').textContent = minutes;
    document.getElementById('countdown-seconds').textContent = seconds;
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
        dots[i].classList.toggle('active', i === index);
    });
}

// Initialize testimonials
showTestimonial(currentTestimonial);

// Auto-slide testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Click handlers for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayEvents();
    populateEventSelect();
    
    // Add event listeners for price updates
    document.getElementById('ticketQuantity').addEventListener('input', updatePriceDisplay);
    eventSelect.addEventListener('change', updatePriceDisplay);
}); 