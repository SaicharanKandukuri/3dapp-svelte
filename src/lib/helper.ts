// let map: google.maps.Map;

function setCenter(map: google.maps.Map, lat: number, lng: number, title = "") {
  map.setCenter({ lat, lng })

  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 style="color:black;" id="firstHeading" class="firstHeading">' + title + '</h1>' +
    "</div>";

  // console.log(contentString(title))

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
    ariaLabel: "Info Window"
  })

  const marker = new google.maps.Marker({
    position: { lat, lng },
    map,
    title,
    animation: google.maps.Animation.DROP
  })

  infowindow.open({
    anchor: marker,
    map: map
  })
}

function locateMe(map: google.maps.Map) {
  // ask for permission
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter(map, position.coords.latitude, position.coords.longitude, "📍 you are here (may be)")
      },
      (error) => {
        console.log(error)
      },
      { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
    )
  }
}

function placeObject(map: google.maps.Map, lat: number, long: number) {

}

const theme = [
  {
    "featureType": "administrative.province",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels",
    "stylers": [
      {
        "lightness": "-8"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "all",
    "stylers": [
      {
        "color": "#acacac"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#484848"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ff0000"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "all",
    "stylers": [
      {
        "lightness": "-3"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      {
        "saturation": -100
      },
      {
        "lightness": "72"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "labels",
    "stylers": [
      {
        "lightness": "23"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "saturation": -100
      },
      {
        "lightness": "30"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      {
        "lightness": "-19"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "lightness": "2"
      },
      {
        "gamma": "1.21"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "off"
      },
      {
        "saturation": "15"
      },
      {
        "hue": "#ff0000"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "lightness": "-43"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "lightness": "22"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "weight": "0.12"
      },
      {
        "lightness": "-23"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "off"
      },
      {
        "lightness": "71"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [
      {
        "saturation": -100
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "all",
    "stylers": [
      {
        "saturation": -100
      },
      {
        "lightness": 30
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "all",
    "stylers": [
      {
        "saturation": -100
      },
      {
        "lightness": 40
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      {
        "saturation": -100
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "saturation": "5"
      },
      {
        "visibility": "on"
      },
      {
        "lightness": "5"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "hue": "#ffff00"
      },
      {
        "lightness": "-24"
      },
      {
        "saturation": -97
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "saturation": "-88"
      },
      {
        "lightness": "-23"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "lightness": -25
      },
      {
        "saturation": -100
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "weight": "0.01"
      },
      {
        "lightness": "9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "lightness": "-32"
      },
      {
        "gamma": "2.99"
      }
    ]
  }
]

export { setCenter, locateMe, theme }
