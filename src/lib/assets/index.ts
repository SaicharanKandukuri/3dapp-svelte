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

// TODO: Models
// [x] ab-block
// [ ] Atal Bhavan - A
// [x] Atal Bhavan - B
// [x] Azad - A
// [x] Azad - B
// [x] N_L - Block
// [ ] Old Architure Block
// [ ] Parul Institute of Homoeopathy
// [ ] Parul Institute of Nursing
// [x] PIMSR Library
// [ ] Savitri Bhavan
// [ ] Subhash chandra Bose Bhavan
// [x] Tagore Bhavan - A
// [x] Tagore Bhavan-B
// [x] Teresa - A
// [ ] Tilak Bhavan

import ADMIN_BLOCK  from '$lib/assets/ab-block.glb?url';
import TAGORE_A     from '$lib/assets/Tagore Bhavan - A.glb?url';
import TAGORE_B     from '$lib/assets/Tagore Bhavan-B.glb?url';
import PIMSR_LIB    from '$lib/assets/PIMSR Library.glb?url';
import AZAD_A       from '$lib/assets/Azad - A.glb?url';
import AZAD_B       from '$lib/assets/Azad - B.glb?url';
import N_L_BLOCK    from '$lib/assets/N_L - Block.glb?url';
import TERESSA_A    from '$lib/assets/Teresa - A.glb?url';

let ADMIN_BLOCK_PROPS   = gen_ModelProps([40, 40, 40], data['PARUL ADMISSION CELL']);
let TAGORE_A_PROPS      = gen_ModelProps([24, 24, 24], data['TAGORE BHAWAN - A']);
let TAGORE_B_PROPS      = gen_ModelProps([15, 15, 15], data['TAGORE BHAWAN - B']);
let PIMSR_LIB_PROPS     = gen_ModelProps([15, 15, 15], data['PIMSR LIBRARY']);
let AZAD_A_PROPS        = gen_ModelProps([15, 15, 15], data['AZAD - A']);
let AZAD_B_PROPS        = gen_ModelProps([15, 15, 15], data['AZAD - B']);
let N_L_BLOCK_PROPS     = gen_ModelProps([15, 15, 15], data['N-BLOCK']);
let TERESSA_A_PROPS     = gen_ModelProps([15, 15, 15], data['TERESA - A']);


const MODELS: Models = {
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
    },
    "PIMSR LIBRARY": {
        model: PIMSR_LIB,
        props: PIMSR_LIB_PROPS
    },
    "AZAD - A": {
        model: AZAD_A,
        props: AZAD_A_PROPS
    },
    "AZAD - B": {
        model: AZAD_B,
        props: AZAD_B_PROPS
    },
    "N-BLOCK": {
        model: N_L_BLOCK,
        props: N_L_BLOCK_PROPS
    },
    "TERESA - A": {
        model: TERESSA_A,
        props: TERESSA_A_PROPS
    }
}

export { MODELS, type ModelProps };
