import { writable, get } from "svelte/store";
const isMapsloaded = writable(false);

export { isMapsloaded };
