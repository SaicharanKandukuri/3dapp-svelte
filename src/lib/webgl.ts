import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MODELS } from '$lib/assets';
import { ThreeJSOverlayView } from '@googlemaps/three';
import * as THREE from 'three';
import { mapConfig } from '../utils';

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
		model,
		clock,
		loader: GLTFLoader;

	const webGLOverlayView = new google.maps.WebGLOverlayView();
	const overlay = new ThreeJSOverlayView();
	overlay.setAnchor(mapConfig.center);

	webGLOverlayView.onAdd = () => {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera();
		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		scene.add(ambientLight);

		context.camera = camera;
		context.scene = scene;
		context.overlay = overlay;

		loader = new GLTFLoader();
		// const source = "https://raw.githubusercontent.com/googlemaps/js-samples/main/assets/pin.gltf";
		const source = MODELS["PARUL ADMISSION CELL"].model;
		console.log(MODELS["PARUL ADMISSION CELL"].props)

		loader.load(source, (gltf) => {
			let SROT = scene.rotation
			let GROT = gltf.scene.rotation
			// 22.288767104666025, 73.36381817128154
			let latlong = {
				lat: 22.2886582,
				lng: 73.363734,
				altitude: 10
			};

			gltf.scene.scale.set(50, 50, 50);
			scene.position.copy(overlay.latLngAltitudeToVector3(latlong));
			scene.rotation.x = Math.PI / 2;
			gltf.scene.position.x = 7;
			gltf.scene.position.y = 0;
			gltf.scene.position.z = -10;

			//@ts-ignore
			window.global_model = gltf.scene;

			// adjust position
			console.log(SROT)
			console.log(GROT)

			scene.add(gltf.scene);
		});
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
