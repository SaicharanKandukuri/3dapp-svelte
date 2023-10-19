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
// [x] Atal Bhavan - A
// [X] Atal Bhavan - B
// [-] Azad - A
// [-] Azad - B
// [x] N_L - Block
// [x] Old Architure Block
// [x] Parul Institute of Homoeopathy
// [ ] Parul Institute of Nursing
// [x] PIMSR Library
// [ ] Savitri Bhavan
// [ ] Subhash chandra Bose Bhavan
// [x] SHAKUNTALA BHAWAN
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
import ATAL_A       from '$lib/assets/Atal Bhavan - A.glb?url'
import ATAL_B       from '$lib/assets/Atal Bhavan - B.glb?url'
import SHAKUNTALA   from '$lib/assets/SHAKUNTALA BHAWAN.glb?url'
import OLD_ARCH_BLK from '$lib/assets/Old Architure Block.glb?url'
import PI_O_HOMEO   from '$lib/assets/Parul Institute of Homoeopathy.glb?url'

let ADMIN_BLOCK_PROPS   = gen_ModelProps([40, 40, 40], data['PARUL ADMISSION CELL']);
let TAGORE_A_PROPS      = gen_ModelProps([24, 24, 24], data['TAGORE BHAWAN - A']);
let TAGORE_B_PROPS      = gen_ModelProps([15, 15, 15], data['TAGORE BHAWAN - B']);
let PIMSR_LIB_PROPS     = gen_ModelProps([15, 15, 15], data['PIMSR LIBRARY']);
let AZAD_A_PROPS        = gen_ModelProps([15, 15, 15], data['AZAD - A']);
let AZAD_B_PROPS        = gen_ModelProps([15, 15, 15], data['AZAD - B']);
let N_L_BLOCK_PROPS     = gen_ModelProps([15, 15, 15], data['N-BLOCK']);
let TERESSA_A_PROPS     = gen_ModelProps([15, 15, 15], data['TERESA - A']);
let ATAL_A_PROPS        = gen_ModelProps([30, 30, 30], data['ATAL - A']);
let ATAL_B_PROPS        = gen_ModelProps([25, 25, 25], data['ATAL - B']);
let SHAKUNTALA_PROPS    = gen_ModelProps([30, 30, 30], data['SHAKUNTALA BHAWAN']);
let OLD_ARCH_BLK_PROPS  = gen_ModelProps([30, 30, 30], data['PARUL INSTITUTE OF ARCHITECTURE AND RESEARCH NEAR N-BLOCK']);
let PI_O_HOMEO_PROPS    = gen_ModelProps([30, 30, 30], data['PARUL INSTITUTE OF HOMOEOPATHY AND RESEARCH']);

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
    },
    "ATAL - A": {
        model: ATAL_A,
        props: ATAL_A_PROPS
    },
    "ATAL - B": {
        model: ATAL_B,
        props: ATAL_B_PROPS
    },
    "SHAKUNTALA BHAWAN": {
        model: SHAKUNTALA,
        props: SHAKUNTALA_PROPS
    },
    "PARUL INSTITUTE OF ARCHITECTURE AND RESEARCH NEAR N-BLOCK": {
        model: OLD_ARCH_BLK,
        props: OLD_ARCH_BLK_PROPS
    },
    "PARUL INSTITUTE OF HOMOEOPATHY AND RESEARCH": {
        model: PI_O_HOMEO,
        props: PI_O_HOMEO_PROPS
    }
}

export { MODELS, type ModelProps };
