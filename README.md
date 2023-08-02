# svelte-map-app

<img width="1333" alt="screenshot" src="https://github.com/Unnamed-Lab-DUSP/svelte-map-app/assets/10646361/1bb15da4-d70e-4a84-8349-9d8cb00fef13">

This is a simple templated mapping application, built using Svelte, SvelteKit, Node, Bulma, and Mapbox that can be easily customized using the fields in `src/config/instance.json`. It includes basic, but common, documentation pages, which can be written in markdown, and the map allows the user to select locations using click events or forward geocoding, which populate a bare-bones info panel.

## Configuration

### Node
Assuming you have node installed, you can install all dependencies by running `npm install` from the root directory.

### MapBox Token
For the application to run, you'll need a MapBox token. The application expects it to be stored in a `.env` file in the root directory. E.g., this file should look like...

```
MAPBOX_TOKEN='your token here`
```

Important note: the token _will be exposed to the client_! As such, before deploying, you should make sure that your token is appropriately scoped and that it has URL restrictions in place. 

## Running
Run `npm run css-build && npm run dev` from the root folder. (On subsequent runs, you can simply run `npm run dev`. This starts a vite server (`vite dev`) and a node-sass watcher that watches for changes in `src/styles/style.scss` (the latter supports rapid Bulma development). 
