<script lang="ts">
	import { isMapsloaded } from '../store';
	import { mapConfig } from '../utils';
	import { onMount } from 'svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { RangeSlider } from '@skeletonlabs/skeleton';

	let api_loaded = false;
	let map_view: HTMLElement;
	let tilt_amount: number = 20;
	let heading_amount: number = 20;
	let max = 360;
	let max_tilt = 66;
	let map: google.maps.Map;
	let center = {
		lat: mapConfig.center!.lat,
		lng: mapConfig.center!.lng,
	}

	function handleTilt() {
		map.setTilt(tilt_amount);
	}

	function handleHover() {
		map.setHeading(heading_amount);
	}

	onMount(async () => {
		isMapsloaded.subscribe((value) => {
			api_loaded = value;
			console.log(api_loaded);
			if (api_loaded) {
				if (map_view != undefined) {
					map_view.style.height = '60vh';
					map_view.style.width = '90%';
					loadMap().then((value) => {
						console.log(value);
					});

					map.addListener('center_changed', () => {
						center.lat = map.getCenter()!.lat();
						center.lng = map.getCenter()!.lng();
					});

					map.addListener('tilt_changed', () => {
											tilt_amount = map.getTilt()!;
					});
					map.addListener('heading_changed', () => {
                                            heading_amount = map.getHeading()!;
                    });

				} else {
					console.warn('map_view is not defined | reload could fix');
				}
			}
		});

		async function loadMap() {
			map = new google.maps.Map(map_view, mapConfig);
		}
	});
</script>

<AppBar>
	<svelte:fragment slot="headline">
		<h1 class="h3">
			<span
				class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
				>🛰️ PU 3D MAP</span
			>
			<span class="badge variant-filled">Dev </span>
		</h1>
	</svelte:fragment>
</AppBar>

<div class="flex flex-col h-full w-full items-center">
	<div class="p-2 m-2 mt-10 rounded-md border-dashed border-4" id="map" bind:this={map_view} />
	<div class="w-full m-3 p-10">
		<div class="text-center">
			<p class="h4">🛰️ LANG: {center.lat} LAT: {center.lng}</p>
			<p class="h4">📐 {heading_amount} | ↕️ {tilt_amount}</p>
		</div>
		<RangeSlider
			name="range-slider"
			bind:value={heading_amount}
			{max}
			step={2}
			on:change={handleHover}
			ticked
		>
			<div class="flex justify-between items-center">
				<div class="font-bold">Heading</div>
				<div class="text-xs">{heading_amount} / {max}</div>
			</div>
		</RangeSlider>

		<RangeSlider
			name="range-slider"
			bind:value={tilt_amount}
			max={max_tilt}
			step={2}
			on:change={handleTilt}
			ticked
		>
			<div class="flex justify-between items-center">
				<div class="font-bold">Tilt</div>
				<div class="text-xs">{tilt_amount} / {max_tilt}</div>
			</div>
		</RangeSlider>
	</div>
</div>
