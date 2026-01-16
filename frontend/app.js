/* ================= INTRO LOGIC ================= */

const intro = document.getElementById("intro");
let introGone = false;

function removeIntro() {
  if (introGone) return;
  introGone = true;
  intro.classList.add("hidden");
  document.body.classList.add("intro-done");
}

// Intro dismiss triggers
window.addEventListener("wheel", removeIntro, { passive: true });
window.addEventListener("touchstart", removeIntro, { passive: true });
window.addEventListener("click", removeIntro);


/* ================= MAIN APP ================= */

const app = document.getElementById("app");
const searchInput = document.getElementById("searchInput");
const cityFilter = document.getElementById("cityFilter");

const modal = document.getElementById("doctorModal");
const closeModal = document.getElementById("closeModal");

let allDoctors = [];

/* LOAD DATA */
fetch("doctors.json")
  .then(res => res.json())
  .then(data => {
    allDoctors = data;
    renderDoctors(allDoctors);
  })
  .catch(err => console.error("Error loading doctors:", err));


/* ================= FILTER LOGIC ================= */

searchInput.addEventListener("input", applyFilters);
cityFilter.addEventListener("change", applyFilters);

function applyFilters() {
  const searchText = searchInput.value.toLowerCase();
  const city = cityFilter.value;

  const filtered = allDoctors.filter(doc =>
    (doc.name.toLowerCase().includes(searchText) ||
     doc.specialization.toLowerCase().includes(searchText)) &&
    (city === "all" || doc.city === city)
  );

  renderDoctors(filtered);
}


/* ================= RENDER DOCTORS ================= */

function renderDoctors(doctors) {
  app.innerHTML = "";

  if (doctors.length === 0) {
    app.innerHTML = `<p style="color:#777">No doctors found.</p>`;
    return;
  }

  doctors.forEach(doc => {
    const card = document.createElement("div");
    card.className = "doctor-card";

    let locationsHTML = "";
    doc.locations.forEach(loc => {
      locationsHTML += `
        <div class="location">
          <strong>${loc.hospital}</strong>
          <span>${loc.type}</span>
        </div>
      `;
    });

    card.innerHTML = `
      <h2>${doc.name}</h2>
      <p class="spec">${doc.specialization}</p>
      <p class="city">${doc.city}</p>
      ${locationsHTML}
    `;

    /* 🔥 IMPORTANT FIX */
    card.addEventListener("click", (e) => {
      e.stopPropagation();   // prevent intro/window click
      openModal(doc);
    });

    app.appendChild(card);
  });
}


/* ================= MODAL ================= */

function openModal(doc) {
  document.getElementById("modalName").innerText = doc.name;
  document.getElementById("modalSpec").innerText = doc.specialization;

  document.getElementById("modalEdu").innerText =
    "Education: " + (doc.education || "Not available");

  document.getElementById("modalExp").innerText =
    "Experience: " + (doc.experience ? doc.experience + " years" : "Not available");

  document.getElementById("modalAbout").innerText =
    doc.about || "No additional information available.";

  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", (e) => {
  e.stopPropagation();
  modal.classList.add("hidden");
});
