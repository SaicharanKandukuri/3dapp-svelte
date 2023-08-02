const config = {
    maps_api_key: import.meta.env.VITE_MAPS_API_KEY.toString()
}

const mapConfig: google.maps.MapOptions = {
    center: {
        lat: 22.288070000165405,
        lng: 73.36437942384639
    },
    zoom: 18,
    mapId: "90f87356969d889c",
    heading: 10,
    tilt: 45
}

export { config, mapConfig }
