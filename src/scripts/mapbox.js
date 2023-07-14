import mapbox from 'mapbox-gl';

mapbox.accessToken = import.meta.env.PUBLIC_MAPBOX_TOKEN;

const key = Symbol();

export { mapbox, key };