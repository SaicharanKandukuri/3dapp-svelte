import data from '$lib/data_f.json';
import type { Vector3Tuple } from 'three';

interface LatLongLiteral {
    lat: number;
    lng: number;
    altitude?: number;
}

type ModelProps = {
    scale: Vector3Tuple;
    LatLongLiteral?: LatLongLiteral;
}

type Models = {
    [key: string]: {
        model: string;
        props: ModelProps;
    }
}

function gen_ModelProps(
    scale: Vector3Tuple,
    latlong: LatLongLiteral
    ): ModelProps {
    
    return {
        scale: scale,
        LatLongLiteral: {
            lat: latlong.lat,
            lng: latlong.lng,
            altitude: 0,
        }
    }
}

import ADMIN_BLOCK from '$lib/assets/ab-block.glb?url';
import TAGORE_A from '$lib/assets/Teresa - A.glb?url';
import TAGORE_B from '$lib/assets/Tagore Bhavan-B.glb?url';
import PIMSR_LIB from '$lib/assets/PIMSR Library.glb?url';

let ADMIN_BLOCK_PROPS   = gen_ModelProps([40, 40, 40], data['PARUL ADMISSION CELL']);
let TAGORE_B_PROPS      = gen_ModelProps([15, 15, 15], data['TAGORE BHAWAN - B']);
let PIMSR_LIB_PROPS     = gen_ModelProps([15, 15, 15], data['PIMSR LIBRARY']);

const MODELS: Models = {
    "PARUL ADMISSION CELL": {
        model: ADMIN_BLOCK,
        props: ADMIN_BLOCK_PROPS
    },
    "TAGORE BHAWAN - B": {
        model: TAGORE_B,
        props: TAGORE_B_PROPS
    },
    "PIMSR LIBRARY": {
        model: PIMSR_LIB,
        props: PIMSR_LIB_PROPS
    }
}

export { MODELS, type ModelProps };
