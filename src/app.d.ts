// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Window {
			initMap: () => void;
			global_model: any;
			job_load: () => void;
			model_hook: any;
			scene_hook: any;
		}
	}
	
}

export {};
