let container = document.getElementById("tripContainer");
let loader = document.getElementById("loader");

let allTrips = [];

const tripNames = [
  "Goa Beach Escape",
  "Manali Snow Adventure",
  "Jaipur Heritage Trip",
  "Kerala Backwaters",
  "Leh Ladakh Ride",
  "Rishikesh Adventure",
  "Andaman Islands",
  "Dubai City Tour"
];

const tripTypes = ["Solo Trip", "Group Trip"];

const images = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
];

loader.style.display = "block";

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    loader.style.display = "none";
    allTrips = data.products.map((trip, index) => ({
      name: tripNames[index % tripNames.length],
      type: tripTypes[index % tripTypes.length],
      price: trip.price,
      rating: trip.rating,
      image: images[index % images.length]
    }));

    renderTrips(allTrips);
  });

function renderTrips(trips) {
  container.innerHTML = "";

  trips.forEach(trip => {
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-img" style="background-image:url('${trip.image}')"></div>
      <div class="card-content">
        <span class="tag">${trip.type}</span>
        <h3>${trip.name}</h3>
        <p class="price">₹${Math.round(trip.price * 100)}</p>
        <p class="rating">⭐ ${trip.rating.toFixed(1)}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("filterType").addEventListener("change", applyFilters);
document.getElementById("sortPrice").addEventListener("change", applyFilters);

function applyFilters() {
  let searchValue = document.getElementById("searchInput").value.toLowerCase();
  let selectedType = document.getElementById("filterType").value;
  let sortValue = document.getElementById("sortPrice").value;

  let filtered = allTrips.filter(trip => {
    return trip.name.toLowerCase().includes(searchValue) &&
           (selectedType === "all" || trip.type === selectedType);
  });

  if (sortValue === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sortValue === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderTrips(filtered);
}