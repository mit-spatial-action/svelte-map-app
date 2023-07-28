
<script>
// function sourceify(geojson, id = 'result') {
//     if (map.getLayer(id)) {
//         map.removeLayer(id);
//     }
//     if (map.getSource(id)) {
//         map.removeSource(id);
//     }
//     map.addSource(id, {
//         'type': 'geojson',
//         'data': geojson
//     })
//     map.addLayer({
//         'id': id,
//         'type': 'fill',
//         'source': id,
//         'layout': {},
//         'paint': {
//         'fill-color': '#0080ff',
//         'fill-opacity': 0.5
//         }
//     });
// }



// async function getIntersecting() {
// 	await fetch('https://public.carto.com/api/v2/sql?format=GeoJSON&q=select%20*%20from%20public.us_states%20where%20%22name%22=%27Massachusetts%27')
//         .then((data) => {
//             return data.json();
//         })
//         .then((data) => {
//             sourceify(data);
//         })
//         .then(() => {
//             toggleLoading();
//         })
// }
</script>