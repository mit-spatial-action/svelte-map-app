import { writable } from 'svelte/store';

export const selectedLocation = writable();
export const loadingState = writable(false);
