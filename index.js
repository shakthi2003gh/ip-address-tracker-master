let position = [43.73139828483459, 7.413944258019004];

const map = L.map("map").setView(position, 20);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

const icon = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [46, 56], // size of the icon
});

const marker = L.marker(position, { icon: icon }).addTo(map);

function search() {
  const value = document.querySelector("input").value;
  const ip = value;
  const api_key = "at_CHvX8PnxneVqBX8qbTR47tN1iPwnh";

  $(function () {
    $.ajax({
      url: "https://geo.ipify.org/api/v1",
      data: { apiKey: api_key, ipAddress: ip },
      success: function (data) {
        document.querySelector(".ip-address output").innerText = data.ip;

        document.querySelector(
          ".location output"
        ).innerText = `${data.location.region}, ${data.location.country} ${data.as.asn}`;

        document.querySelector(".timezone output").innerText =
          data.location.timezone;

        document.querySelector(".isp output").innerText = data.isp;

        position = [data.location.lat, data.location.lng];
        map.panTo(position);
        L.marker(position, { icon: icon }).addTo(map);

        console.log(data);
      },
    });
  });
  document.querySelector("input").value = "";
}
