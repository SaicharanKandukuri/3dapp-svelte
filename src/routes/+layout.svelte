<slot><!-- optional fallback --></slot>
<script>
    import { config } from "../utils";
    import { isMapsloaded } from "../store";
    
    // Your selected Skeleton theme:
    import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

    // This contains the bulk of Skeletons required styles:
    import '@skeletonlabs/skeleton/styles/skeleton.css';

    // Finally, your application's global stylesheet (sometimes labeled 'app.css')
    import '../app.css';
    
    
    const api_key = config.maps_api_key;

    function init() {
        isMapsloaded.update((value) => value = true);
    }
    
    //@ts-ignore
    window.initMap = init;
    
</script>

<svelte:head>
    <script defer async
	src="https://maps.googleapis.com/maps/api/js?key={api_key}&callback=initMap">
	</script>
</svelte:head>
