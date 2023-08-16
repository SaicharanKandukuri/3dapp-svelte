import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import testModel from '$lib/assets/test.glb?url';
import { ThreeJSOverlayView } from '@googlemaps/three';
import * as THREE from 'three';
import { mapConfig } from '../utils';

function initWebGLOverlay(map: google.maps.Map) {
    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, model, clock, loader: GLTFLoader;
    
    const webGLOverlayView = new google.maps.WebGLOverlayView();
    const overlay = new ThreeJSOverlayView();
    overlay.setAnchor(mapConfig.center)
    
    webGLOverlayView.onAdd = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera();
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        loader = new GLTFLoader();
        // const source = "https://raw.githubusercontent.com/googlemaps/js-samples/main/assets/pin.gltf";
        const source = testModel;
        
        loader.load(source, (gltf) => {
            gltf.scene.scale.set(0.4,0.4,0.4);
            gltf.scene.rotation.x = Math.PI;
            scene.add(gltf.scene);
        })
    }

    webGLOverlayView.onContextRestored = ({ gl }) => {
        renderer = new THREE.WebGLRenderer({ 
            canvas: gl.canvas,
            context: gl, ...gl.getContextAttributes()
        });

        renderer.autoClear = false;

        loader.manager.onLoad = () => {
            webGLOverlayView.requestRedraw();
        }
    }

    webGLOverlayView.onDraw = ({ gl, transformer }) => {
        const latlng: google.maps.LatLngAltitude = {
            //@ts-ignore
            lat: mapConfig.center.lat,
            //@ts-ignore
            lng: mapConfig.center.lng,
            altitude: 0
        }

        const matrix = transformer.fromLatLngAltitude(latlng);
        camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix);

        webGLOverlayView.requestRedraw();
        renderer.render(scene, camera);
        renderer.resetState();
    }

    webGLOverlayView.setMap(map);
}

export { initWebGLOverlay }
