// Get events data from booking.js (in a real application, this would come from a backend)
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

// DOM Elements
const categoryButtons = document.querySelectorAll('.category-btn');
const eventsGrid = document.querySelector('.events-grid');

// Initialize page
function init() {
    displayEvents();
    setupEventListeners();
}

// Display events in the grid
function displayEvents(category = null) {
    const filteredEvents = category 
        ? events.filter(event => event.category === category)
        : events;
    
    eventsGrid.innerHTML = filteredEvents.map(event => `
        <div class="event-card">
            <div class="event-image">
                <img src="${event.image}" alt="${event.name}"
                    onerror="this.src='https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'">
                <div class="event-category">${event.category}</div>
            </div>
            <div class="event-details">
                <h3>${event.name}</h3>
                <p>${event.description}</p>
                <div class="event-meta">
                    <p><i class="far fa-calendar"></i> ${event.date}</p>
                    <p><i class="far fa-clock"></i> ${event.time}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    <p><i class="fas fa-ticket-alt"></i> $${event.price.toFixed(2)}</p>
                </div>
                <div class="event-footer">
                    <div class="event-price">$${event.price.toFixed(2)}</div>
                    <button class="book-btn" onclick="bookEvent(${event.id})">
                        Book Now <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup Event Listeners
function setupEventListeners() {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter events
            const category = button.dataset.category;
            displayEvents(category === 'all' ? null : category);
        });
    });
}

// Book Event Function
function bookEvent(eventId) {
    window.location.href = `booking.html?event=${eventId}`;
}

// Initialize the page
init(); 