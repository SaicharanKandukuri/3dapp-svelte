// let map: google.maps.Map;

function setCenter(map: google.maps.Map, lat: number, lng: number, title="") {
  map.setCenter({lat, lng})

  const contentString =
  '<div id="content">' +
  '<div id="siteNotice">' +
  "</div>" +
  '<h1 style="color:black;" id="firstHeading" class="firstHeading">'+title+'</h1>' +
  "</div>";

  // console.log(contentString(title))

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
    ariaLabel: "Info Window"
  })

  const marker = new google.maps.Marker({
    position: {lat, lng},
    map,
    title,
    animation: google.maps.Animation.DROP
  })

  infowindow.open({
    anchor: marker,
    map: map
  })
}

export {setCenter}
