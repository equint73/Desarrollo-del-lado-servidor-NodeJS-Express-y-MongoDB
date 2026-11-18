const mapa=L.map('mapa').setView([14.1010,-87.2040],15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap'}).addTo(mapa);
const pins=L.layerGroup().addTo(mapa);
async function cargar(){const msg=document.getElementById('mensaje'),lista=document.getElementById('lista');lista.innerHTML='';pins.clearLayers();
try{const r=await fetch('/api/bicicletas');if(!r.ok)throw Error('No se pudo consultar la API');const datos=await r.json();msg.textContent=`${datos.length} bicicleta(s) encontradas.`;
datos.forEach(b=>{const {lat,lng}=b.ubicacion;L.marker([lat,lng]).addTo(pins).bindPopup(`<b>${b.codigo}</b><br>${b.color}`);
const c=document.createElement('article');c.className='bici';const t=document.createElement('strong');t.textContent=b.codigo;const s=document.createElement('span');s.textContent=`${b.color} - ${b.disponible?'Disponible':'No disponible'}`;c.append(t,s);lista.appendChild(c);});
}catch(e){msg.textContent=e.message;}}
document.getElementById('recargar').addEventListener('click',cargar);cargar();
