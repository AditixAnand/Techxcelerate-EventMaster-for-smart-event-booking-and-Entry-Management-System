// DOM Elements
const steps = document.querySelectorAll('.step');
const bookingSteps = document.querySelectorAll('.booking-step');
const backBtn = document.querySelector('.back-btn');
const nextBtn = document.querySelector('.next-btn');
const eventSelectionGrid = document.querySelector('.event-selection-grid');
const selectedEventSummary = document.querySelector('.selected-event-summary');
const quantityInputs = document.querySelectorAll('.quantity-input');
const quantityBtns = document.querySelectorAll('.quantity-btn');
const summaryItems = document.querySelector('.summary-items');
const totalAmount = document.querySelector('.total-amount');
const paymentForm = document.getElementById('payment-form');

// State Management
let currentStep = 1;
let selectedEvent = null;
let tickets = {
    general: 0,
    vip: 0
};

// Sample events data (in a real application, this would come from a backend)
const events = [
    {
        id: 1,
        name: "Tech Conference 2024",
        date: "2024-06-15",
        time: "09:00 AM",
        location: "Convention Center",
        price: 199.99,
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
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Experience an unforgettable evening of live music under the stars.",
        category: "Music"
    },
    {
        id: 3,
        name: "Food & Wine Expo",
        date: "2024-08-10",
        time: "11:00 AM",
        location: "Exhibition Hall",
        price: 75.00,
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Discover culinary excellence with master chefs and premium wine tastings.",
        category: "Food & Drink"
    },
    {
        id: 4,
        name: "Championship Soccer Finals",
        date: "2024-08-25",
        time: "07:30 PM",
        location: "City Stadium",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Witness the thrilling finale of the soccer championship season.",
        category: "Sports"
    },
    {
        id: 5,
        name: "NBA All-Star Game",
        date: "2024-09-15",
        time: "08:00 PM",
        location: "Sports Arena",
        price: 179.99,
        image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Watch the world's best basketball players compete in this spectacular event.",
        category: "Sports"
    },
    {
        id: 6,
        name: "Tennis Grand Slam Finals",
        date: "2024-09-30",
        time: "02:00 PM",
        location: "Tennis Center",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Experience the intensity of championship tennis at its finest.",
        category: "Sports"
    },
    {
        id: 7,
        name: "International Cricket Tournament",
        date: "2024-10-10",
        time: "11:00 AM",
        location: "Cricket Ground",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Watch top cricket teams battle for international glory.",
        category: "Sports"
    },
    {
        id: 8,
        name: "Formula 1 Grand Prix",
        date: "2024-10-25",
        time: "01:00 PM",
        location: "Racing Circuit",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1515719514-9551c9c93c53?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Feel the thrill of high-speed racing at this premier motorsport event.",
        category: "Sports"
    },
    {
        id: 9,
        name: "AI & Machine Learning Summit",
        date: "2024-07-05",
        time: "10:00 AM",
        location: "Tech Hub",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Explore the future of AI and machine learning with industry experts.",
        category: "Technology"
    },
    {
        id: 10,
        name: "Symphony Orchestra Night",
        date: "2024-08-05",
        time: "07:00 PM",
        location: "Concert Hall",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "An evening of classical masterpieces performed by world-class musicians.",
        category: "Music"
    },
    {
        id: 11,
        name: "Broadway Musical Showcase",
        date: "2024-08-15",
        time: "06:30 PM",
        location: "Grand Theatre",
        price: 150.00,
        image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Experience the magic of Broadway with this spectacular musical showcase.",
        category: "Arts & Theatre"
    },
    {
        id: 12,
        name: "Contemporary Art Exhibition",
        date: "2024-09-01",
        time: "10:00 AM",
        location: "Modern Art Gallery",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Discover groundbreaking works by contemporary artists from around the world.",
        category: "Arts & Theatre"
    },
    {
        id: 13,
        name: "Culinary Masterclass Series",
        date: "2024-09-20",
        time: "02:00 PM",
        location: "Culinary Institute",
        price: 180.00,
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Learn cooking techniques from Michelin-starred chefs.",
        category: "Food & Drink"
    },
    {
        id: 14,
        name: "Startup Innovation Summit",
        date: "2024-10-05",
        time: "09:00 AM",
        location: "Business Center",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Connect with investors and entrepreneurs at this premier business event.",
        category: "Business"
    },
    {
        id: 15,
        name: "Global Business Conference",
        date: "2024-10-15",
        time: "08:30 AM",
        location: "International Convention Center",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Join industry leaders for insights on global business trends and strategies.",
        category: "Business"
    }
];

// Stripe initialization
const stripe = Stripe('your_publishable_key'); // Replace with your actual Stripe publishable key
const elements = stripe.elements();
const card = elements.create('card', {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
});

// Mount Stripe Card element
card.mount('#card-element');

// Handle real-time validation errors
card.addEventListener('change', function(event) {
    const displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

// Initialize page
function init() {
    // Get event ID from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event');

    addCategoryFilters();
    displayEvents();
    updateNavigation();
    setupEventListeners();

    // If event ID is present, select that event
    if (eventId) {
        selectEvent(parseInt(eventId));
        // Move to next step automatically
        nextStep();
    }
}

// Display events in the grid
function displayEvents(category = null) {
    // Filter events by category if specified
    const filteredEvents = category 
        ? events.filter(event => event.category === category)
        : events;
    
    // Add explore events section before the grid
    const exploreSection = `
        <div class="explore-events">
            <h2>Explore Events by Category</h2>
            <div class="explore-buttons">
                <button class="explore-btn" data-category="Music">
                    <i class="fas fa-music"></i>
                    <span>Music</span>
                </button>
                <button class="explore-btn" data-category="Technology">
                    <i class="fas fa-microchip"></i>
                    <span>Technology</span>
                </button>
                <button class="explore-btn" data-category="Arts & Theatre">
                    <i class="fas fa-theater-masks"></i>
                    <span>Arts & Theatre</span>
                </button>
                <button class="explore-btn" data-category="Food & Drink">
                    <i class="fas fa-utensils"></i>
                    <span>Food & Drink</span>
                </button>
                <button class="explore-btn" data-category="Business">
                    <i class="fas fa-briefcase"></i>
                    <span>Business</span>
                </button>
                <button class="explore-btn" data-category="Sports">
                    <i class="fas fa-running"></i>
                    <span>Sports</span>
                </button>
            </div>
        </div>
    `;
    
    // Insert explore section and update grid
    const gridContainer = eventSelectionGrid.parentElement;
    if (!document.querySelector('.explore-events')) {
        gridContainer.insertAdjacentHTML('afterbegin', exploreSection);
        
        // Add click handlers for explore buttons
        document.querySelectorAll('.explore-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                // Update active states
                document.querySelectorAll('.explore-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.querySelectorAll('.category-btn').forEach(catBtn => {
                    if (catBtn.dataset.category === category) {
                        catBtn.click();
                    }
                });
            });
        });
    }
    
    eventSelectionGrid.innerHTML = filteredEvents.map(event => `
        <div class="event-card" data-event-id="${event.id}">
            <div class="event-image-container">
                <img src="${event.image}" alt="${event.name}"
                    onerror="this.src='https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'">
                <div class="event-category-badge">${event.category}</div>
            </div>
            <div class="event-details">
                <h3>${event.name}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-meta">
                    <p><i class="far fa-calendar"></i> ${event.date}</p>
                    <p><i class="far fa-clock"></i> ${event.time}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                </div>
                <div class="event-footer">
                    <p class="event-price"><i class="fas fa-ticket-alt"></i> $${event.price.toFixed(2)}</p>
                    <button class="book-now-btn" onclick="selectEvent(${event.id})">
                        Book Now <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add category filter buttons
function addCategoryFilters() {
    const categories = [...new Set(events.map(event => event.category))];
    const filterContainer = document.createElement('div');
    filterContainer.className = 'category-filters';
    
    filterContainer.innerHTML = `
        <button class="category-btn active" data-category="all">All Events</button>
        ${categories.map(category => `
            <button class="category-btn" data-category="${category}">${category}</button>
        `).join('')}
    `;
    
    // Insert filters before the event grid
    eventSelectionGrid.parentNode.insertBefore(filterContainer, eventSelectionGrid);
    
    // Add click handlers
    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            // Update active state
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            // Filter events
            const category = e.target.dataset.category;
            displayEvents(category === 'all' ? null : category);
        }
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Event Selection
    eventSelectionGrid.addEventListener('click', (e) => {
        const eventCard = e.target.closest('.event-card');
        if (eventCard) {
            const eventId = parseInt(eventCard.dataset.eventId);
            selectEvent(eventId);
        }
    });

    // Quantity Buttons
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('.quantity-input');
            const isPlus = btn.classList.contains('plus');
            const currentValue = parseInt(input.value);
            
            if (isPlus && currentValue < 10) {
                input.value = currentValue + 1;
            } else if (!isPlus && currentValue > 0) {
                input.value = currentValue - 1;
            }
            
            updateTicketQuantities();
        });
    });

    // Navigation Buttons
    backBtn.addEventListener('click', previousStep);
    nextBtn.addEventListener('click', nextStep);

    // Payment Form
    paymentForm.addEventListener('submit', handlePayment);

    // Card Number Formatting
    const cardNumber = document.getElementById('cardNumber');
    cardNumber.addEventListener('input', formatCardNumber);

    // Expiry Date Formatting
    const expiryDate = document.getElementById('expiryDate');
    expiryDate.addEventListener('input', formatExpiryDate);
}

// Select Event
function selectEvent(eventId) {
    selectedEvent = events.find(event => event.id === eventId);
    
    // Update UI
    document.querySelectorAll('.event-card').forEach(card => {
        card.classList.remove('selected');
        if (parseInt(card.dataset.eventId) === eventId) {
            card.classList.add('selected');
        }
    });

    // Enable next button
    nextBtn.disabled = false;
}

// Update Ticket Quantities
function updateTicketQuantities() {
    const generalInput = document.querySelector('.ticket-type:first-child .quantity-input');
    const vipInput = document.querySelector('.ticket-type:last-child .quantity-input');
    
    tickets.general = parseInt(generalInput.value);
    tickets.vip = parseInt(vipInput.value);
    
    updateSummary();
}

// Update Summary
function updateSummary() {
    const generalTotal = tickets.general * 99;
    const vipTotal = tickets.vip * 199;
    const total = generalTotal + vipTotal;

    summaryItems.innerHTML = `
        ${tickets.general > 0 ? `
            <div class="summary-item">
                <span>General Admission x ${tickets.general}</span>
                <span>$${generalTotal.toFixed(2)}</span>
            </div>
        ` : ''}
        ${tickets.vip > 0 ? `
            <div class="summary-item">
                <span>VIP Access x ${tickets.vip}</span>
                <span>$${vipTotal.toFixed(2)}</span>
            </div>
        ` : ''}
    `;

    totalAmount.textContent = `$${total.toFixed(2)}`;
    updatePaymentSummary();
    
    // Enable/disable next button based on selection
    nextBtn.disabled = total === 0;
}

// Navigation Functions
function nextStep() {
    if (currentStep < 3) {
        currentStep++;
        updateSteps();
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateSteps();
    }
}

// Update Steps UI
function updateSteps() {
    steps.forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNum === currentStep) {
            step.classList.add('active');
        } else if (stepNum < currentStep) {
            step.classList.add('completed');
        }
    });

    // Show/hide booking steps with animation
    bookingSteps.forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.remove('hidden');
            step.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
            step.classList.add('hidden');
        }
    });

    // Update selected event summary when moving to step 2
    if (currentStep === 2 && selectedEvent) {
        selectedEventSummary.innerHTML = `
            <div class="selected-event">
                <img src="${selectedEvent.image}" alt="${selectedEvent.name}">
                <div class="event-info">
                    <h3>${selectedEvent.name}</h3>
                    <p><i class="far fa-calendar"></i> ${selectedEvent.date}</p>
                    <p><i class="far fa-clock"></i> ${selectedEvent.time}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${selectedEvent.location}</p>
                </div>
            </div>
        `;
    }

    // Update payment summary when moving to step 3
    if (currentStep === 3) {
        const subtotal = calculateSubtotal();
        const processingFee = calculateProcessingFee(subtotal);
        const total = subtotal + processingFee;
        
        document.querySelector('.subtotal-amount').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.fee-amount').textContent = `$${processingFee.toFixed(2)}`;
        document.querySelector('.final-amount').textContent = `$${total.toFixed(2)}`;
    }

    updateNavigation();
}

// Calculate subtotal
function calculateSubtotal() {
    const generalTotal = tickets.general * 99;
    const vipTotal = tickets.vip * 199;
    return generalTotal + vipTotal;
}

// Calculate processing fee (2.9% + $0.30)
function calculateProcessingFee(subtotal) {
    return (subtotal * 0.029) + 0.30;
}

// Update Navigation Buttons
function updateNavigation() {
    backBtn.style.display = currentStep === 1 ? 'none' : 'flex';
    nextBtn.textContent = currentStep === 3 ? 'Complete Booking' : 'Next';
    
    if (currentStep === 1) {
        nextBtn.disabled = !selectedEvent;
    } else if (currentStep === 2) {
        nextBtn.disabled = tickets.general === 0 && tickets.vip === 0;
    }
}

// Format Card Number
function formatCardNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = value;
}

// Format Expiry Date
function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
}

// Handle Payment Submission
async function handlePayment(e) {
    e.preventDefault();
    
    const submitButton = document.getElementById('submit-payment');
    const spinner = document.getElementById('spinner');
    const buttonText = document.querySelector('.button-text');

    // Disable the submit button and show spinner
    submitButton.disabled = true;
    spinner.classList.remove('hidden');
    buttonText.textContent = 'Processing...';

    try {
        // Create payment intent on your server
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: calculateTotal() * 100, // Convert to cents
                currency: 'usd',
                payment_method_types: ['card']
            })
        });

        const data = await response.json();

        // Confirm card payment
        const result = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value
                }
            }
        });

        if (result.error) {
            // Handle payment error
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
            
            // Reset button state
            submitButton.disabled = false;
            spinner.classList.add('hidden');
            buttonText.textContent = 'Pay Now';
        } else {
            // Payment successful
            showSuccessMessage();
        }
    } catch (error) {
        console.error('Error:', error);
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = 'An error occurred while processing your payment. Please try again.';
        
        // Reset button state
        submitButton.disabled = false;
        spinner.classList.add('hidden');
        buttonText.textContent = 'Pay Now';
    }
}

// Calculate total amount including processing fee
function calculateTotal() {
    const subtotal = tickets.general * 99 + tickets.vip * 199;
    const processingFee = subtotal * 0.029 + 0.30; // Example: 2.9% + $0.30
    return subtotal + processingFee;
}

// Update payment summary
function updatePaymentSummary() {
    const subtotal = tickets.general * 99 + tickets.vip * 199;
    const processingFee = subtotal * 0.029 + 0.30;
    const total = subtotal + processingFee;

    document.querySelector('.subtotal-amount').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.fee-amount').textContent = `$${processingFee.toFixed(2)}`;
    document.querySelector('.final-amount').textContent = `$${total.toFixed(2)}`;
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'payment-success';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h3>Payment Successful!</h3>
        <p>Your tickets have been booked successfully.</p>
        <p>A confirmation email has been sent to your email address.</p>
        <p>You will be redirected to the homepage shortly.</p>
    `;

    const formContainer = document.querySelector('.booking-form-container');
    formContainer.innerHTML = '';
    formContainer.appendChild(successMessage);

    // Redirect to home page after 3 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}

// Initialize the page
init();