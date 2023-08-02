<slot><!-- optional fallback --></slot>
<script>
    import { config } from "../utils";
    import { isMapsloaded } from "../store";
    import '../app.css'
    
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
