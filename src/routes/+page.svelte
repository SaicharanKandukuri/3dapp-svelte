<script lang="ts">
	import { isMapsloaded } from '../store';
	import { mapConfig } from '../utils';
    import { onMount } from 'svelte';
    import { AppBar } from '@skeletonlabs/skeleton';

	let api_loaded = false;
	let map_view: HTMLElement;

    onMount(async () => {
        isMapsloaded.subscribe((value) => {
		    api_loaded = value;
		    console.log(api_loaded);
		    if (api_loaded) {
		    	if (map_view != undefined) {
                    map_view.style.height = '80vh';
		    		loadMap().then((value) => {
		    			console.log(value);
		    		});
		    	} else {
                    console.warn("map_view is not defined | reload could fix")
                }
		    }
	    });

	    async function loadMap() {
	    	let map = new google.maps.Map(map_view, mapConfig);
	    }
    })

</script>

<AppBar>
	<svelte:fragment slot="headline"><h1 class="h1">PU 3D MAP</h1></svelte:fragment>
</AppBar>

<div class="grid-rows-2 h-full w-full">
	<div class="m-6 h-auto rounded-md border-dashed border-2" id="map" bind:this={map_view} />
</div>
