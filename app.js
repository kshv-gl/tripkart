let container = document.getElementById("tripContainer");
let loader = document.getElementById("loader");

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
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80"
];

loader.style.display = "block";

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    loader.style.display = "none";
    renderTrips(data.products);
  });

function renderTrips(trips) {
  container.innerHTML = "";

  trips.map((trip, index) => {
    let name = tripNames[index % tripNames.length];
    let img = images[index % images.length];
    let type = tripTypes[index % tripTypes.length];

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-img" style="background-image:url('${img}')"></div>
      <div class="card-content">
        <span class="tag">${type}</span>
        <h3>${name}</h3>
        <p class="price">₹${Math.round(trip.price * 100)}</p>
        <p class="rating">⭐ ${trip.rating.toFixed(1)}</p>
      </div>
    `;

    container.appendChild(card);
  });
}