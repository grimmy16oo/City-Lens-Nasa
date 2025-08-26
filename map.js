// ------------------- Initialize Map -------------------
var map = L.map('map').setView([23.6850, 90.3563], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '',
    subdomains: ['a', 'b', 'c']
}).addTo(map);

// ------------------- Divisions Data -------------------
const divisions = [
  {
    name: "Dhaka",
    coords: [23.8103, 90.4125],
    regions: [
      { name: "Mirpur", coords:[23.8223,90.3654], popup:"mirpur-popup" },
      { name: "Gulshan", coords:[23.7925,90.4078], popup:"gulshan-popup" },
      { name: "Motijheel", coords:[23.7336,90.4141], popup:"motijheel-popup" },
      { name: "Dhanmondi", coords:[23.7461,90.3733], popup:"dhanmondi-popup" },
      { name: "Uttara", coords:[23.8759,90.3795], popup:"uttara-popup" }
    ]
  },
  { name: "Chattogram", coords:[22.3569,91.7832] },
  { name: "Khulna", coords:[22.8456,89.5403] },
  { name: "Barishal", coords:[22.7010,90.3535] },
  { name: "Sylhet", coords:[24.8949,91.8687] },
  { name: "Rangpur", coords:[25.7439,89.2752] },
  { name: "Mymensingh", coords:[24.7471,90.4203] },
  { name: "Rajshahi", coords:[24.3745,88.6042] }
];

// ------------------- Add Division Markers -------------------
divisions.forEach(div => {
  const marker = L.marker(div.coords).addTo(map)
    .bindTooltip(div.name, { permanent:true, direction:"top" });

  // If division has regions (like Dhaka)
  if(div.regions) {
    marker.on("click", async () => {
      map.flyTo(div.coords, 12, { duration:0.8 });
      
      // Remove all other division markers
      divisions.forEach(d => map.eachLayer(l => {
        if(l instanceof L.Marker && l.getLatLng().lat === d.coords[0] && l.getLatLng().lng === d.coords[1]) {
          map.removeLayer(l);
        }
      }));

      // Add region markers
      div.regions.forEach(async r => {
        const popupContent = document.getElementById(r.popup)?.innerHTML || r.name;
        const regionMarker = L.marker(r.coords).addTo(map)
          .bindTooltip(r.name, { permanent:true, direction:"top" })
          .on('click', ()=> {
            L.popup().setLatLng(r.coords).setContent(popupContent).openOn(map);
          });
      });
    });
  }
});
