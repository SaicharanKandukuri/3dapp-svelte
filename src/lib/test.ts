import { Loader } from '@googlemaps/js-api-loader';
import { ThreeJSOverlayView } from "@googlemaps/three";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

var coords = [
  { lng: 126.9108135, lat: 37.61399168 },
  { lng: 126.9126067, lat: 37.61336021 },
  { lng: 126.9143072, lat: 37.61274979 },
  { lng: 126.9178395, lat: 37.61086107 },
  { lng: 126.9201833, lat: 37.60934572 },
];
var stops = [];

const apiOptions = {
  apiKey: 'API_KEY',
  version: "beta"
};

const mapOptions = {
  "tilt": 0,
  "heading": 0,
  "zoom": 18,
  "center": { lat: 37.5234, lng: 126.9234 },
  "mapId": "MAP_ID"
}

async function initMap() {
  const mapDiv = document.getElementById("map");
  const apiLoader = new Loader(apiOptions);
  await apiLoader.load();
  return new google.maps.Map(mapDiv, mapOptions);
}


function initWebGLOverlayView(map) {
  let scene, renderer, camera, loader;

  const webGLOverlayView = new google.maps.WebGLOverlayView();

  const overlay = new ThreeJSOverlayView();
  overlay.setAnchor(mapOptions.center);

  webGLOverlayView.onAdd = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
    directionalLight.position.set(0.5, -1, 0.5);
    scene.add(directionalLight);

    loader = new GLTFLoader();
    console.log(loader)
    const source = "original.glb";
    loader.load(
      source,
      gltf => {
        for (const _ of coords) {
          gltf.scene.scale.set(8,8,8);
          gltf.scene.rotation.x = 90 * Math.PI / 180;
          stops.push(gltf.scene.clone());
        }

        for (const [i, coord] of coords.entries()) {
          stops[i].position.copy(overlay.latLngAltitudeToVector3({ lat: coord.lat, lng: coord.lng }));
          scene.add(stops[i]);
        }
      }
    );
  }


  webGLOverlayView.onContextRestored = ({ gl }) => {
    // create the three.js renderer, using the
    // maps's WebGL rendering context.
    renderer = new THREE.WebGLRenderer({
      canvas: gl.canvas,
      context: gl,
      ...gl.getContextAttributes(),
    });
    renderer.autoClear = false;

    // wait to move the camera until the 3D model loads    
    loader.manager.onLoad = () => {
      renderer.setAnimationLoop(() => {
        for (const stop of stops) {
          stop.rotation.y += 0.02
        }
      });
    }
  }

  webGLOverlayView.onDraw = ({ gl, transformer }) => {
    // update camera matrix to ensure the model is georeferenced correctly on the map
    const latLngAltitudeLiteral = {
      lat: mapOptions.center.lat,
      lng: mapOptions.center.lng,
      altitude: 50
    }

    const matrix = transformer.fromLatLngAltitude(latLngAltitudeLiteral);
    camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix);

    webGLOverlayView.requestRedraw();
    renderer.render(scene, camera);

    // always reset the GL state
    renderer.resetState();
  }

  webGLOverlayView.setMap(map);
}

(async () => {
  const map = await initMap();
  initWebGLOverlayView(map);
})();
