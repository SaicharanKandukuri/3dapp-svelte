import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { addModels } from './job_add_models';
import { ThreeJSOverlayView } from '@googlemaps/three';
import * as THREE from 'three';
import { mapConfig } from '../utils';
import { json } from '@sveltejs/kit';

/**
 * The AppContext interface represents the context of the 3D application.
 * It contains the webGL overlay view, camera, scene, renderer, and overlay.
 */
interface AppContext {
	webGLOverlayView?: google.maps.WebGLOverlayView;
	camera?: THREE.PerspectiveCamera;
	scene?: THREE.Scene;
	renderer?: THREE.WebGLRenderer;
	overlay?: ThreeJSOverlayView;
}

/**
 * The context variable represents the current context of the 3D application.
 * It contains the webGL overlay view, camera, scene, renderer, and overlay.
 */
let context: AppContext = {
	webGLOverlayView: undefined,
	camera: undefined,
	scene: undefined,
	renderer: undefined,
	overlay: undefined
}

function initWebGLOverlay(map: google.maps.Map) {
	let scene: THREE.Scene,
		camera: THREE.PerspectiveCamera,
		renderer: THREE.WebGLRenderer,
		loader: GLTFLoader;

	const webGLOverlayView = new google.maps.WebGLOverlayView();
	const overlay = new ThreeJSOverlayView({
		map: map,
		upAxis: "Z",
		anchor: mapConfig.center,
	});
	// overlay.setAnchor();

	webGLOverlayView.onAdd = () => {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera();
		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		scene.add(ambientLight);

		context.camera = camera;
		context.scene = scene;
		context.overlay = overlay;
		//@ts-ignore
		window.scene_hook = scene;

		loader = new GLTFLoader();
		addModels();
	};

	webGLOverlayView.onContextRestored = ({ gl }) => {
		renderer = new THREE.WebGLRenderer({
			canvas: gl.canvas,
			context: gl,
			...gl.getContextAttributes()
		});

		context.renderer = renderer;
		renderer.autoClear = false;

		loader.manager.onLoad = () => {
			webGLOverlayView.requestRedraw();
		};
	};

	webGLOverlayView.onDraw = ({ gl, transformer }) => {
		const latlng: google.maps.LatLngAltitude = {
			//@ts-ignore
			lat: mapConfig.center.lat,
			//@ts-ignore
			lng: mapConfig.center.lng,
			altitude: 0
		};

		const matrix = transformer.fromLatLngAltitude(latlng);
		camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix);

		webGLOverlayView.requestRedraw();
		renderer.render(scene, camera);
		renderer.resetState();
	};

	// context.webGLOverlayView = webGLOverlayView;
	webGLOverlayView.setMap(map);

	console.log(context)
}

export { initWebGLOverlay, context };
