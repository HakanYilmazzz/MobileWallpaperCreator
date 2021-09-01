function sehirAra() {
   var map= null;
   
  var value = document.getElementById("sehir").value;
  fetch(
    
    "https://nominatim.openstreetmap.org/search.php?q=" +
      value +
      "&format=jsonv2"
  )
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
     
      var container = L.DomUtil.get("map");
      if (container != null) {
        container._leaflet_id = null;
        container.outerHTML = "<div id=map></div>";
      }
     
      map = L.map("map", {
        center: [data[0].lat, data[0].lon],
        attributionControl: false,
        minZoom: 2,
        zoom: 10,
      });
     
      if($('.dark').attr('class') == "dark MapStyleSelectItem--selected"){
        L.tileLayer('https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
            subdomains: ["a", "b", "c","d"],
            minZoom: 2,
	          maxZoom: 15,
            accessToken: 'tpY0Y89pHDvfSJMVpDqT6LVIFxHERBI9s5HkDLealpldriuG0HkohVjvXbtFNqkz'
          }
        ).addTo(map);
      }else{
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          {
            subdomains: ["a", "b", "c" , "d"],
            ext: 'png'
          }
        ).addTo(map);
        L.simpleMapScreenshoter({
          screenName: function () {
              return data[1].display_name.split(",")[0]
          }
      }).addTo(map);
      }
     
      document.getElementById("city").innerHTML = data[1].display_name.split(",")[0];
      
    })
    .catch(function (err) {
      console.warn("Something went wrong.", err);
    });

    
}
