const centro = [14.1010, -87.2040];
const mapa = L.map('mapa').setView(centro, 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19, attribution: '&copy; OpenStreetMap'
}).addTo(mapa);
const marcadores = L.layerGroup().addTo(mapa);

async function cargarBicicletas() {
  const mensaje = document.getElementById('mensaje');
  const lista = document.getElementById('lista');
  mensaje.textContent = 'Cargando bicicletas...';
  lista.innerHTML = '';
  marcadores.clearLayers();
  try {
    const respuesta = await fetch('/api/bicicletas');
    if (!respuesta.ok) throw new Error('No fue posible consultar la API');
    const bicicletas = await respuesta.json();
    if (!bicicletas.length) { mensaje.textContent = 'No hay bicicletas registradas.'; return; }
    mensaje.textContent = `Se encontraron ${bicicletas.length} bicicleta(s).`;
    bicicletas.forEach(bici => {
      const {lat,lng} = bici.ubicacion;
      L.marker([lat,lng]).addTo(marcadores).bindPopup(
        `<strong>${bici.codigo}</strong><br>Color: ${bici.color}<br>Disponible: ${bici.disponible ? 'Sí' : 'No'}`
      );
      const tarjeta = document.createElement('article'); tarjeta.className = 'bici';
      const titulo = document.createElement('strong'); titulo.textContent = bici.codigo;
      const color = document.createElement('span'); color.textContent = `Color: ${bici.color}`;
      const estado = document.createElement('span'); estado.textContent = `Estado: ${bici.disponible ? 'Disponible' : 'No disponible'}`;
      const coordenadas = document.createElement('span'); coordenadas.textContent = `Ubicación: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      tarjeta.append(titulo,color,estado,coordenadas); lista.appendChild(tarjeta);
    });
  } catch (error) { mensaje.textContent = `${error.message}. Comprueba que el servidor esté iniciado.`; }
}
document.getElementById('recargar').addEventListener('click', cargarBicicletas);
cargarBicicletas();
