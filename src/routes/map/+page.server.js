import { MAPBOX_TOKEN } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
      mapbox_token: MAPBOX_TOKEN
    }
  };