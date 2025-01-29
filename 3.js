// Simulating news updates
const newsData = [
    "New taxi services launched in your area!",
    "Reminder: Always verify taxi identification before entering.",
    "Taxi app updates available. Get the latest version for better service."
];

// Display the latest news in the 'Latest News' section
function loadLatestNews() {
    const newsContent = document.getElementById('newsContent');
    newsContent.innerHTML = newsData.map(news => `<p>${news}</p>`).join('');
}

// Simulating taxi structure information
const taxiStructure = [
    { name: "Taxi A", model: "Toyota Corolla", capacity: 4, acceptsMinors: true },
    { name: "Taxi B", model: "Honda Civic", capacity: 4, acceptsMinors: false },
    { name: "Taxi C", model: "Ford Escape", capacity: 5, acceptsMinors: true }
];

// Display taxi structure
function loadTaxiStructure() {
    const taxiInfo = document.getElementById('taxiInfo');
    taxiInfo.innerHTML = taxiStructure.map(taxi => `
        <div>
            <h3>${taxi.name} - ${taxi.model}</h3>
            <p>Capacity: ${taxi.capacity} seats</p>
            <p>Accepts Minors: ${taxi.acceptsMinors ? 'Yes' : 'No'}</p>
        </div>
    `).join('');
}

// Google Maps Integration: Show user's location
function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: userLocation
            });

            const marker = new google.maps.Marker({
                position: userLocation,
                map: map,
                title: "Your Location"
            });
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Linking adult and minor accounts
let users = [];
let parentChildLink = {};

document.getElementById('isParent').addEventListener('change', function() {
    const childDetails = document.getElementById('childDetails');
    if (this.checked) {
        childDetails.style.display = 'block';
    } else {
        childDetails.style.display = 'none';
    }
});

document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = document.getElementById('age').value;
    const location = document.getElementById('location').value;
    const isParent = document.getElementById('isParent').checked;
    let childName = '';
    let childAge = '';

    if (isParent) {
        childName = document.getElementById('childName').value;
        childAge = document.getElementById('childAge').value;
        parentChildLink[firstName + " " + lastName] = { childName, childAge };
    }

    users.push({ firstName, lastName, age, location, isParent });

    alert(`Account Created! ${isParent ? `Parent: ${firstName} ${lastName}, Child: ${childName}, Age: ${childAge}` : `User: ${firstName} ${lastName}`}`);
});

// Handle taxi request form submission
document.getElementById('taxiRequestForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const tripType = document.getElementById('tripType').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    alert(`Taxi requested! Trip: ${tripType}, Payment: ${paymentMethod}`);
});

// Handle track ride form submission
document.getElementById('trackRideForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const rideId = document.getElementById('rideId').value;
    // Simulate retrieving ride details based on the ride ID
    const rideDetails = `Ride ID: ${rideId}, Drop-off Location: [latitude, longitude]`; // Replace with actual logic
    document.getElementById('rideDetails').innerHTML = `<p>${rideDetails}</p>`;
});

// Initialize map and load sections on page load
document.addEventListener('DOMContentLoaded', function() {
    loadLatestNews();
    loadTaxiStructure();
    initMap(); // Initialize Google Map
});
