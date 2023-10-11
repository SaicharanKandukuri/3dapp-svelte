import data from '$lib/data_f.json';

interface position {
    x: number;
    y: number;
    z: number;
}

interface rotation {
    x: number;
    y: number;
    z: number;
}

interface LatLongLiteral {
    lat: number;
    lng: number;
    altitude?: number;
}

type ModelProps = {
    position: position;
    rotation: rotation;
    LatLongLiteral?: LatLongLiteral;
}

function gen_ModelProps(
    position: position, rotation: rotation, latlong: LatLongLiteral
    ): ModelProps {
    
    return {
        position: {
            x: position.x,
            y: position.y,
            z: position.z
        },
        rotation: {
            x: rotation.x,
            y: rotation.y,
            z: rotation.z
        },
        LatLongLiteral: {
            lat: latlong.lat,
            lng: latlong.lng,
            altitude: 10,
        }
    }
}

import ADMIN_BLOCK from '$lib/assets/ab-block.glb?url';
import TAGORE_A from '$lib/assets/Tagore Bhavan - A.glb?url';
import TAGORE_B from '$lib/assets/Tagore Bhavan-B.glb?url';

let ADMIN_BLOCK_PROPS   = gen_ModelProps({x: 7, y: 0, z: -10}, {x: 0, y: 0, z: 0}, data['PARUL ADMISSION CELL']);
let TAGORE_A_PROPS      = gen_ModelProps({x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, data['TAGORE BHAWAN - A']);
let TAGORE_B_PROPS      = gen_ModelProps({x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, data['TAGORE BHAWAN - B']);

const MODELS = {
    /// all models in one array
    "ALL_MODELS": [ADMIN_BLOCK, TAGORE_A],

    "PARUL ADMISSION CELL": {
        model: ADMIN_BLOCK,
        props: ADMIN_BLOCK_PROPS
    },
    "TAGORE BHAWAN - A": {
        model: TAGORE_A,
        props: TAGORE_A_PROPS
    },
    "TAGORE BHAWAN - B": {
        model: TAGORE_B,
        props: TAGORE_B_PROPS
    }
}

export { MODELS };
