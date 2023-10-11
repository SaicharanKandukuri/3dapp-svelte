import { MODELS, type ModelProps } from "./assets";
import { context } from "./webgl";
import { ThreeJSOverlayView } from '@googlemaps/three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

let stops = [];

async function addModels() {
    let overlay: ThreeJSOverlayView = context.overlay || new ThreeJSOverlayView();
    let loader: GLTFLoader = new GLTFLoader();
    let scene = context.scene || new THREE.Scene();
    const allModels = Object.keys(MODELS);
    
    for (let i = 0; i < allModels.length; i++) {
        const cur_model: string = allModels[i];

        const { model, props } = MODELS[cur_model];
        console.log(model, props);
        const latlong = props.LatLongLiteral;

        loader.load(model, (gltf) => {
            gltf.scene.scale.set(...props.scale);
            gltf.scene.rotation.x = 90 * Math.PI / 180;
            gltf.scene.position.copy(overlay.latLngAltitudeToVector3(
                latlong
            ))

            // // exp with colors
            // const material = new THREE.MeshBasicMaterial({
            //      color: 0x130E01,
            // });

            // gltf.scene.traverse((child) => {
            //     if (child.isMesh) {
            //         child.material = material;
            //     }
            // })

            scene.add(gltf.scene);
        })

    }
}

//@ts-ignore
window.job_load = addModels;
export { addModels };
