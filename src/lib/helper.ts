// let map: google.maps.Map;

function setCenter(map: google.maps.Map, lat: number, lng: number, title="") {
  map.setCenter({lat, lng})
  new google.maps.Marker({
    position: {lat, lng},
    map,
    title,
    animation: google.maps.Animation.DROP
  })
}

export {setCenter}
