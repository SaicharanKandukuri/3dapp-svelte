
<script lang="ts">
    import { isMapsloaded } from '../store';
    import { mapConfig } from '../utils';

	let api_loaded = false;
    let map_view: HTMLElement;
    
    isMapsloaded.subscribe((value) => {
        api_loaded = value;
        console.log(api_loaded);
        if (api_loaded) {
            if (map_view != undefined) {
                loadMap().then((value) => {
                    console.log(value);
                });
            }
        }
    });

    async function loadMap() {
        
        let map = new google.maps.Map(map_view, mapConfig);

        console.log(map);
    }
    
</script>

<div class="full-screen" id="map" bind:this={map_view}></div>

<style>
.full-screen {
    width: 100vw;
    height: 100vh;
}
</style>
