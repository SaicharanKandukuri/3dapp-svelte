
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

interface ModelProps {
    position: position;
    rotation: rotation;
}

function gen_ModelProps(
    position: position, rotation: rotation
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
        }
    }
}

// CLASSES | PU Administrative Block
import ADMIN_BLOCK from '$lib/assets/ab-block.glb?url';
let ADMIN_BLOCK_PROPS = gen_ModelProps({x: 7, y: 0, z: -10}, {x: 0, y: 0, z: 0});

// HOSTEL  | TAGORE BHAWAN A BLOCK
import TAGORE_A from '$lib/assets/Tagore Bhavan - A.glb?url';

// HOSTEL  | TAGORE BHAWAN B BLOCK
import TAGORE_B from '$lib/assets/Tagore Bhavan-B.glb?url';


const MODELS = {
    /// all models in one array
    "ALL_MODELS": [ADMIN_BLOCK, TAGORE_A],

    "PARUL ADMISSION CELL": {
        model: ADMIN_BLOCK,
        props: ADMIN_BLOCK_PROPS
    },
    
    "TAGORE BHAWAN - A": TAGORE_A,
    "TAGORE BHAWAN - B": TAGORE_B
}

export { MODELS };
