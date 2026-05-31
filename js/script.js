const minimoCompra = 50000; 
const ENVIO_MDP = 8900;
const ENVIO_GENERAL = 14900;
const ENVIO_LEJANO = 15900;
const ENVIO_SANTACRUZ = 16900;
const ENVIO_MIRAMAR= 0;
const ENVIO_GRATIS = 0;
const minimoRegalo = 60000;   
const REGALO_NOMBRE = "Gomitas Monstruo (30 u)👾";
const PROMO_ACTIVA = "ninguna"; 
// "envio"  → envío gratis
// "regalo" → regalo 
// "ninguna" → sin promo

let productos = [];
let productoIndex = 0;
let currentVariantes = null;
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const STOCK_PRODUCTOS = {
  "Mogul Extreme Twist Max Mundial 600g (24 u)": 1,
  "Gomita Helado (30 u)": 0,
  "Ring Pop Barbie (30 u)": 1,
  "Saca lenguas (30 u)": 1,
  "Sapito Mundial 252 g (24 u)": 4,
  "Pastillas Alka sabor Cherry Mentol (caja x 12 u)": 0,
  "Pastillas Alka sabor Menta (caja x 12 u)": 7,
  "Chupetines con polvo ácido Bob Esponja (30 u)": 1,
  "Monedas de Chocolate (290 u)": 0,
  "Mechas mágicas Mario Bros (30 u)" : 10,
  "Chicle Fierita Recargado - Mundial (50 u)": 0,
  "Chupetines con led Oreo (30 u)": 2,
  "Gomitas Selección (30 u)": 24,
  "Gomitas Pokemón (30 u)": 12,
  "Galletitas Oreo 118 g": 45,
  "Galletitas Chocolinas 170 g": 45,
  "Galletitas Pepitos 119 g": 45,
  "Latitas con chicles (30 latitas)": 98,
  "Chicle por metro Barbie con Tatoo (30 u)": 20,
  "Chocolates Surtido Especial Arcor 223g": 50,
  "Gomitas Mogul Frutilla con Crema 500 g": 4,
  "Gomitas Yummy ácidas 500 g": 50,
  "Gomitas Mogul Dientes 500 g": 2,
  "Caramelos masticables Lheritier 300 g": 20,
  "Chupetines Kuromy con led (30 u)": 11,
  "Autito con pastillitas (30 u)": 15,
  "Chupetines Merlina (30 u)": 21,
  "Gomitas de Gelatinas Candy Loka (10 u)": 3,
  "Gomitas Mogul Moritas 500 g": 10,
  "Chupetines masticables Baby Dolls (40 u)": 52,
  "Chupetines masticables Baby Dolls ácidos (40 u)": 52,
  "Turrón Billiken Sin T.A.C.C (10 u)": 50,
  "Oblita de Chocolate (48 u)": 30,
  "Oblita de DDL (48 u)": 30,
  "Oblita de Frutilla (48 u)": 30,
  "Oblita Chocolate Blanco (48 u)": 30,
  "Oblita de Marroc (48 u)": 30,
  "Gomitas Kuromy (30 u)": 24,
  "Chicles WhatsApp con tatoo capibara (36 paquetes de 5 chicles)": 0,
  "Caramelo masticable relleno Tnt pinta lengua (60 u)": 10,
  "Chupetines con led Unicornio (30 u)": 48,
  "Billiken Tutti-frutti 800 g": 1,
  "Gomitas Lilo y Stitch (60 u)": 2,
  "Llaveros láser Capibara (12 u)": 2,
  "Caramelos Osi Osi (50 u)": 50,
  "Bocaditos Bel (50 u)": 56,
  "Fierita Super Tatoo Tutti Frutti 600g": 53,
  "Botellitas con chicles (30 botellitas)": 60,
  "Fierita Super Tatoo Frutilla 600g": 12,
  "Chupetines Cremosito Fierita - Frutilla y Crema (50 u)": 50,
  "Alfajor Guaymallén simple de Membrillo (10 u)": 10,
  "Alfajor Guaymallén simple de Chocolate Blanco (10 u)": 50,
  "Lenguetazo Pinta Lengua (32 u)": 2,
  "Lenguetazo Tropical Punch (32 u)": 1,
  "Lenguetazo (32 u)": 1,
  "Camión dispenser + caramelos rosa (1 unidad)": 0,
  "Alcancía Tigre Amarillo (con 12 gelatinas en su interior)": 12,
  "Alcancía Tigre Rojo (con 12 gelatinas en su interior)": 1,
  "Alcancía Lechuza Rosa (con 12 gelatinas en su interior)": 1,
  "Alcancía Pollito Rojo (con 12 gelatinas en su interior)": 1,
  "Gomitas Super Mario (30 u)": 23,
  "Chupetines Hongos (30 u)": 1,
  "Chicle Fierita Recargado - Menta (50 u)": 30,
  "Chicle Fierita Recargado - Tutti Frutti (50 u)": 30,
  "Chicle Fierita Globo sabor Banana (95 u)": 20,
  "Chicle Fierita Globo sabor Menta (95 u)": 20,
};

const alka = [

  {
    nombre: "Pastillas Alka sabor Menta (caja x 12 u)",
    precio: 6900,
    img: "img/alkamenta.jpeg"
  },
    {
    nombre: "Pastillas Alka sabor Cherry Mentol (caja x 12 u)",
    precio: 6900,
    img: "img/alkacherry.jpeg"
  },
];

const globos = [
  {
    nombre: "Chicle Fierita Globo sabor Banana (95 u)",
    precio: 7900,
    img: "img/globobanana.jpg"
  },
  {
    nombre: "Chicle Fierita Globo sabor Frutilla (95 u)",
    precio: 7900,
    img: "img/gobofrutilla.jpg"
  },
  {
    nombre: "Chicle Fierita Globo sabor Menta (95 u)",
    precio: 7900,
    img: "img/globomenta.jpg"
  }
];

const alcancias = [

  {
    nombre: "Alcancía Oso Café (con 12 gelatinas en su interior)",
    precio: 6900,
    img: "img/osocafe.png"
  },

 {
    nombre: "Alcancía Tigre Rojo (con 12 gelatinas en su interior)",
    precio: 6900,
    img: "img/tigrerojo.png"
  },

  {
    nombre: "Alcancía Pollito Rojo (con 12 gelatinas en su interior)",
    precio: 6900,
    img: "img/alcanciapinguinorojo.jpg"
  },
/*
  {
    nombre: "Alcancía Pingüino Negro (con 12 gelatinas en su interior)",
    precio: 6900,
    img: "img/pinguino2.jpg"
  },
 
  {
    nombre: "Alcancía Lechuza Marrón (con 12 gelatinas en su interior)",
    precio: 6900,
    img: "img/lechuza.jpg"
  },
 
  {
    nombre: "Alcancía Lechuza Rosa (con 12 gelatinas en su interior)",
    precio: 6900,
    img: "img/lechuzarosa.jpg.png"
  },
  */

  {
    nombre: "Alcancía Oso Rosa (con 12 gelatinas en su interior)",
    precio: 6900,
    img: "img/osorosa2.png"
  },
/*
      {
    nombre: "Alcancía Pingüino Rosa (con 12 gelatinas en su interior)",
    precio: 6900,
    img: "img/alcanciapinguinorosa.jpg"
  },
  */

  {
    nombre: "Alcancía Tigre Amarillo (con 12 gelatinas en su interior)",
    precio: 6900,
    img: "img/alcanciaojoamarillo.png"
  },
];

const recargados = [
    {
    nombre: "Chicle Fierita Recargado - Menta (50 u)",
    precio: 6900,
    img: "img/fieritarecargadomenta.jpg"
  },
 {
    nombre: "Chicle Fierita Recargado - Tutti Frutti (50 u)",
    precio: 6900,
    img: "img/fieritarecargado.jpg"
  },
  {
    nombre: "Chicle Fierita Recargado - Frutilla (50 u)",
    precio: 6900,
    img: "img/fieritarecargadofrutilla.png"
  },

];

const oblita = [
  {
    img: "img/oblita_blanco.jpg",
    nombre: "Oblita Chocolate Blanco (48 u)",
    precio: 6500
  },

  {
    img: "img/oblita_nougat.jpeg",
    nombre: "Oblita Nougat (48 u)",
    precio: 6500
  },

  {
    img: "img/oblita_chocolate.jpg",
    nombre: "Oblita de Chocolate (48 u)",
    precio: 6500
  },

  {
    img: "img/oblita_marroc.jpg",
    nombre: "Oblita de Marroc (48 u)",
    precio: 6500
  },

  {
    img: "img/oblita_ddl.jpg",
    nombre: "Oblita de DDL (48 u)",
    precio: 6500
  },

  {
    img: "img/oblitafrutilla.jpg",
    nombre: "Oblita de Frutilla (48 u)",
    precio: 6500
  },

];

const cartera = [
    {
    nombre: "🛍️ Carteritas Stitch",
    precio: 4500,
    img: "img/carterastitch.jpeg"
  },
 {
    nombre: "🛍️ Carteritas Kuromy",
    precio: 4500,
    img: "img/carterakuromy.jpeg"
  },
      {
    nombre: "🛍️ Carteritas Hello Kitty",
    precio: 4500,
    img: "img/carterakitty.jpeg"
  },
 {
    nombre: "🛍️ Carteritas Labubu",
    precio: 4500,
    img: "img/carteralabubu.jpeg"
  },

];

const drf   = [
    {
    nombre: "Pastillas D.R.F Sabor Anis (caja x 12 u)",
    precio: 6200,
    img: "img/drfanis.jpeg"
  },
 {
    nombre: "Pastillas D.R.F Sabor Menta (caja x 12 u)",
    precio: 6200,
    img: "img/drfmenta.jpeg"
  },

];

const globosgrandes   = [
    {
    nombre: "Globo Unicornio 24 pulgdas (1 unidad)(1 unidad)",
    precio: 2500,
    img: "img/globosgrandes1.jpeg"
  },
 {
    nombre: "Globo Unicornio Rosa 24 pulgdas (1 unidad)",
    precio: 2500,
    img: "img/globosgrandes2.jpeg"
  },
 {
    nombre: "Globo Estrella Explosiva Azul 22 pulgdas (1 unidad)",
    precio: 2500,
    img: "img/globosgrandes3.jpeg"
  },

];


const productosVariantes = {
  "card-alcancia": alcancias,
  "card-globos": globos,
  "card-recargado": recargados,
  "card-oblita": oblita,
  "card-cartera": cartera,
  "card-drf": drf,
  "card-alka": alka,
  "card-globosgrandes": globosgrandes,
};

function cambiarVariante(el, direccion) {
  const card = el.closest('.card');

  const claseVariante = Object.keys(productosVariantes)
    .find(c => card.classList.contains(c));

  if (!claseVariante) return;

  const variantes = productosVariantes[claseVariante];

  let index = parseInt(card.dataset.index || "0");

  index += direccion;

  if (index < 0) index = variantes.length - 1;
  if (index >= variantes.length) index = 0;

  card.dataset.index = index;

  const v = variantes[index];

  card.querySelector("img").src = v.img;
  card.querySelector("h3").textContent = v.nombre;
  card.querySelector("p").textContent =
  `$${v.precio.toLocaleString("es-AR")}`;

  const btn = card.querySelector(".btn-carrito");
  btn.dataset.nombre = v.nombre;
  btn.dataset.precio = v.precio;
  const stock = STOCK_PRODUCTOS[v.nombre];

  // limpiar avisos viejos
  card.querySelector(".sin-stock-label")?.remove();
  card.querySelector(".ultimo-stock")?.remove();

  if (stock === 0) {
    const aviso = document.createElement("span");
    aviso.className = "sin-stock-label";
    aviso.textContent = "❌ Sin stock";
    card.appendChild(aviso);

    btn.disabled = true;
    btn.textContent = "Sin stock ❌";
  } else if (stock === 1) {
    const aviso = document.createElement("span");
    aviso.className = "ultimo-stock";
    aviso.textContent = "🔥 Última";
    card.appendChild(aviso);

    btn.disabled = false;
    btn.textContent = "Agregar al carrito";
  } else {
    btn.disabled = false;
    btn.textContent = "Agregar al carrito";
  }
}


function validarStock(nombre, carrito) {
  const stockMax = STOCK_PRODUCTOS[nombre];
  const item = carrito.find(p => p.nombre === nombre);
  const cantidad = item ? item.cantidad : 0;

  if (stockMax !== undefined && cantidad >= stockMax) {
    if (item) item.cantidad = stockMax;
    mostrarToast("⚠️ Stock máximo disponible alcanzado", "error");
    return false;
  }

  return true;
}
const btn = document.getElementById("whatsapp-btn");


if (btn) {
  btn.addEventListener("click", () => {
    const linkGrupo = "https://chat.whatsapp.com/KLSylBrQaCt40aRp8s5gPF";
    window.open(linkGrupo, "_blank");
  });
}

function calcularCostoEnvio(cp) {
  const codigo = (cp || "").trim();

  if (!/^\d{4,8}$/.test(codigo)) {
    return { error: true, mensaje: "Código postal inválido" };
  }

  const totalProductos = carrito.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  const extraBloques = Math.floor(totalProductos / 10);
  const extraEnvio = extraBloques * 1900;

  // Miramar
  if (codigo === "7607") {
    return ENVIO_MIRAMAR;
  }

  // Santa Cruz
  const prefijos = ["9303", "4430", "8371", "3304"];

  for (const p of prefijos) {
    if (codigo.startsWith(p)) {
      return ENVIO_SANTACRUZ + extraEnvio;
    }
  }

  // Mar del Plata
  if (codigo.startsWith("7600")) {
    return ENVIO_MDP + extraEnvio;
  }

  // Zonas lejanas
  if (
    codigo.startsWith("9") ||
    codigo.startsWith("4") ||
    codigo.startsWith("3") ||
    codigo.startsWith("6") ||
    codigo.startsWith("2000") ||
    codigo.startsWith("5965") ||
    codigo.startsWith("2445") ||
    codigo.startsWith("5350") ||
    codigo.startsWith("5613") ||
    codigo.startsWith("8")
  ) {
    return ENVIO_LEJANO + extraEnvio;
  }

  // General
  return ENVIO_GENERAL + extraEnvio;
}

// ========================
// MODAL DE PRODUCTOS
// ========================
const modal = document.getElementById('modal'); 
if (modal) {
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = modal.querySelector('.modal-content');

  const prevBtn = document.createElement('div');
  const nextBtn = document.createElement('div');

  const prevProdBtn = document.createElement('div');
  const nextProdBtn = document.createElement('div');

  prevBtn.textContent = '‹';
  nextBtn.textContent = '›';
  prevProdBtn.textContent = '←';
  nextProdBtn.textContent = 'Siguiente producto →';

  prevProdBtn.classList.add('prev-producto');
  nextProdBtn.classList.add('next-producto');
  prevBtn.classList.add('prev');
  nextBtn.classList.add('next');
 

  modalContent.appendChild(prevBtn);
  modalContent.appendChild(nextBtn);
  modalContent.appendChild(prevProdBtn);
  modalContent.appendChild(nextProdBtn);


  // Productos
  const imagenesProducto = {
    "Camisetas Selección 2 curvas (10 Camisetas)": ["img/videocamisetaniño.mp4","img/camiseta1.jpeg","img/camiseta2.jpeg","img/camiseta3.jpeg"],
    "Chupetines K-pop (30 u)": ["img/kpp1.jpeg","img/kpp2.jpeg","img/kpop.jpeg"],
    "Chupetines 2 in 1 (60 u)": ["img/dosenuno6.jpeg","img/dosenuno2.jpeg","img/dosenuno3.jpeg","img/dosenuno4.jpeg","img/dosenuno5.jpeg","img/dosenuno6.jpeg"],
    "Gomitas Macarron (30 u)": ["img/macarron2.jpeg","img/macarron1.jpeg"],
    "Gomitas Ojos (30 u)": ["img/ojos.jpg","img/videoojos.mp4"],
    "Gomitas Oreo (30 u)": ["img/gomitasoreo.jpg","img/videooreo.mp4"],
    "Dinosaurio con caramelos y luces (1 unidad)": ["img/fotodinosaurio.jpg","img/videodinosaurio.mp4"],
    "Gomitas de boca (30 u)": ["img/boca.jpg","img/videoboca.mp4"],
    "Gomitas Spider-Man (60 u)": ["img/spiderman1.jpg","img/spiderman2.jpg","img/spiderman3.jpg","img/spiderman4.jpg","img/spiderman5.jpg"],
    "Llaveros láser Capibara (12 u)": ["img/laser1.jpg","img/laser2.jpg","img/laser3.jpg"],
    "Ring Pop Barbie (30 u)": ["img/ringpopbarbie.jpg","img/ringpop.jpg"],
    "Pistolitas con luz (30 u)": ["img/pistolita1.jpg","img/pistolita2.jpg","img/pistolita3.jpg","img/pistolita4.jpg"],
    "YO-YOs con luces (12 u)": ["img/yoyo1.jpg","img/yoyo3.jpg","img/yoyo4.jpg","img/yoyo2.jpg"],
    "YO-YOs con luces (24 u)": ["img/yoyo2.jpg","img/yoyo3.jpg","img/yoyo4.jpg","img/yoyo1.jpg"],
    "Agenditas surtidas (10 u)": ["img/agendita2.jpg","img/agendita1.jpg","img/agendita3.jpg","img/agendita4.jpg"],
    "Gomitas Lilo y Stitch (60 u)": ["img/stich1.jpg","img/stich2.jpg","img/stich3.jpg"],
    "Chupetines con forma de helado (30 u)": ["img/chupetineshelado1.jpg","img/chupetineshelados2.jpg"],
    "Chupetines con polvo ácido Bob Esponja (30 u)": ["img/bob1.jpg","img/bob2.jpg"],
    "Chicles WhatsApp con tatoo capibara (36 paquetes de 5 chicles)": ["img/wp1.jpg","img/wp2.jpg" ],
    "Gomitas Capibaras (30 u)": ["img/capibara.jpg","img/capibara2.jpg",],
    "Combito Surtido de Regalo 🎁": ["img/combito1.jpg","img/combito4.jpg","img/combito3.jpg","img/combito5.jpg", "img/combito2.jpg"],
    "Tractor dispenser + caramelos (1 unidad)": ["img/tractor1.jpg","img/tractor2.jpg"],
    "Camión dispenser + caramelos rosa (1 unidad)": ["img/camionrosa1.jpg","img/camionrosa2.jpg"],
    "Camión dispenser + caramelos celeste (1 unidad)": ["img/camionceleste1.jpg","img/camionceleste2.jpg"],
    "Tractor dispenser + caramelos verde (1 unidad)": ["img/tractorverde1.jpg","img/tractorverde2.jpg"],
    "Chupetines Kuromy con led (30 u)": ["img/caramelokuromy.jpg","img/caramelokuromy2.jpg", "img/mc3.jpeg"],
    "Gomita Helado (30 u)": ["img/helado.jpg","img/helado2.jpg"],
    //"Alcancía pingüino negro": ["img/pinguino2.jpg","img/pinguino5.jpg","img/pinguino3.jpg","img/pinguino4.jpg","img/pinguino6.jpg"],
    "Chupetines Merlina (30 u)": ["img/merlina1.jpg","img/merlina2.jpg","img/merlina3.jpg","img/merlina4.jpg"],
    "Chupetín con polvo ácido Brain (30 u)": ["img/braincaja.jpg","img/chupetinBrain.jpg"],
    "Camiseta pimball con pastillitas (30 u)": ["img/pimballremera.jpg","img/reversaremera.jpg","img/r1.jpg","img/r2.jpg"],
    "Chupetín Calabaza con polvo ácido y led (30 u)": ["img/cajaCalabaza.jpg","img/chupetincalabaza1.jpg","img/chupetincalabaza2.jpg"],
    "Gelatina de diferentes formas (30 u)": ["img/gelatinaDiferentesSabores4.jpg","img/gelatinaDiferentesSabores3.jpg","img/gelatinaDiferentesSabores2.jpg","img/gelatinaDiferentesSabores5.jpg","img/gelatinaDiferentesSabores1.jpg"],
    "Chupetines con led Corona (30 u)": ["img/chupetinesconled1.jpg","img/corona2.jpg"],
    "Gomitas Monstruo (30 u)": ["img/gomitablandaCara2.jpg","img/gomitacara3.png"],
    "Cool Mint sabores Frutales (30 u)": ["img/coolmint.jpg","img/coolmint2.jpg"],
    "Trompetas con chupetin y sonido (20 u)": ["img/trompeta1.jpg","img/trompetas.jpg"],
    "Huevos Sorpresa Capibara (30 u)": ["img/sorpresacapibara1.jpg","img/sorpresacapibara2.jpg", "img/sorpresacapi3.png"],
    "Huevos Sorpresa Plantas vs Zombies (30 u)": ["img/sorpresaplant2.jpg","img/sorpresaplant.jpg"],
    "Gomitas Fantasmita (30 u)": ["img/fantasmitas.jpg","img/fantasmitas2.jpg"],
    "Gomitas Batman (30 u)": ["img/batman1.jpg","img/batman2.jpg"],
    "Monedas de Chocolate (290 u)": ["img/monedas1.jpg","img/monedas2.jpg"],
    "Gomitas ojo-boca-ojo (30 u)": ["img/gomitasoh1.jpg","img/gomitasoh.jpg"],
    "Gomitas Kuromy (30 u)": ["img/gomitasblandas7.jpg","img/gomitasblandas71.jpg"],
    "Chupetines Capibara (30 u)": ["img/chupetincapibara1.jpg","img/chupetincapibara2.jpg"],
    "Chupetines con forma de Unicornio (30 u)":["img/unicornio2.jpg","img/unicornio1.jpg","img/unicornio3.jpg"],
    "Chupetines con led Unicornio (30 u)":["img/unicornioled1.jpg","img/chupetinnnuni2.jpg","img/leduni.jpg", "img/mc3.jpeg"],
    "Gomitas Super Mario (30 u)": ["img/supermario1.jpg","img/supermario2.jpg"],
    "Saca lenguas (30 u)": ["img/sacalenguas1.jpg","img/sacalenguas2.jpg"],
    "Chupetines con led Mc Donalds (30 u)": ["img/mc.jpg","img/mc2.jpg", "img/mc3.jpeg"],
    "Chupetines con led Oreo (30 u)": ["img/oreo1.jpg","img/oreo2.jpg",],
    "Chupetines led Monster (30 u)": ["img/monsterojo1.jpg","img/monsterojo.jpg",],
    "Gomitas de Gelatinas Candy Loka (10 u)": ["img/gelatinaloka2.jpg","img/gelatinaloka1.jpg","img/gelatinaloka3.jpg","img/trompo.jpg",],
    "Chupetines Hongos (30 u)": ["img/hongo1.jpg","img/hongo2.jpg"],
    "Chupetines Frutillas (30 u)": ["img/chupetinfrutilla1.jpg","img/chupetinfrutilla2.jpg", "img/chupetinnnrutilla2.jpg"],
    "Gomitas Astronauta (30 u)": ["img/astronauta2.jpg","img/astronauta1.jpg"],
  };

  let currentImages = [];
  let currentIndex = 0;
  let currentTitle = "";

  function abrirModal(card) {

  productoIndex = productos.indexOf(card);

  const titulo = card.querySelector('h3')?.textContent.trim();
  const stock = STOCK_PRODUCTOS[titulo];
  const item = carrito.find(p => p.nombre === titulo);
  const cantidad = item ? item.cantidad : 0;

  
  const img = card.querySelector('img');
  const title = card.querySelector('h3');
  const price = card.querySelector('p');

 currentTitle = title ? title.textContent : "Producto";

  const claseVariante = Object.keys(productosVariantes)
  .find(c => card.classList.contains(c));

  if (claseVariante) {
    currentVariantes = productosVariantes[claseVariante];
    currentIndex = parseInt(card.dataset.index || "0");
    currentImages = currentVariantes.map(v => v.img);
    currentTitle = currentVariantes[currentIndex].nombre;
  } else {
    currentVariantes = null;
    currentImages = imagenesProducto[currentTitle] || [img?.src || ''];
  }

  modal.style.display = 'flex';
  actualizarModal();

  modalTitle.textContent = currentTitle;
  document.getElementById('modal-precio').textContent = price ? price.textContent : '';

  const modalAgregarBtn = document.getElementById('modal-agregar');

  //  SI ES PROMO → SOLO OCULTA EL BOTÓN Y AGRANDA EL MODAL
  if (card.classList.contains('promo')) {
    modalAgregarBtn.style.display = 'inline-block'; 
    modal.classList.add('fullscreen'); // ✨ clase para agrandar modal
  } else {
    modalAgregarBtn.style.display = 'inline-block';
    modalAgregarBtn.dataset.producto = currentTitle;
    modalAgregarBtn.dataset.precio = price ? price.textContent : '';
    modal.classList.remove('fullscreen'); // asegura tamaño normal para otros
  }

}

function actualizarModal() {
  const media = currentImages[currentIndex] || '';

  if (media.endsWith(".mp4")) {
    modalImg.style.display = "none";

    let video = document.getElementById("modal-video");

    if (!video) {
      video = document.createElement("video");
      video.id = "modal-video";
      video.autoplay = true;
      video.playsInline = true;
      video.controls = true;
      video.loop = true;
      video.muted = true;
      video.setAttribute("muted", "");
      video.setAttribute("autoplay", "");
      video.setAttribute("playsinline", "");
      video.controls = true;
      video.addEventListener("pointerdown", (e) => {
        e.preventDefault();

        if (video.paused) {
          video.muted = false;
          video.play();
        } else {
          video.pause();
        }
      });

      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");

      video.style.width = "100%";
      video.style.borderRadius = "10px";

      modalImg.parentElement.appendChild(video);
    }

    video.src = media;
    const esSiempreMute = media.includes("videotra1");
    video.onvolumechange = null;

    if (esSiempreMute) {
      video.muted = true;
      video.onvolumechange = () => video.muted = true;
    }
    video.classList.remove("video-ojos");

    if (media.includes("videoojos")) {
      video.classList.add("video-ojos");
    }
    video.style.display = "block";

  } else {
    modalImg.style.display = "block";
    modalImg.src = media;

    const video = document.getElementById("modal-video");
    if (video) {
      video.style.display = "none";
      video.pause();
    }
  }

  const modalAgregarBtn = document.getElementById('modal-agregar');
  document.querySelectorAll(".modal-ultimo-stock").forEach(e => e.remove());
  const titulo = modalTitle.textContent.trim();
  const stock = STOCK_PRODUCTOS[titulo];

  //  VARIANTES 
  if (currentVariantes) {
    const variante = currentVariantes[currentIndex];

    modalTitle.textContent = variante.nombre;
    document.getElementById('modal-precio').textContent =
    `$${variante.precio.toLocaleString("es-AR")}`;

    modalAgregarBtn.dataset.producto = variante.nombre;
    modalAgregarBtn.dataset.precio = variante.precio;

    // RESET SIEMPRE (CLAVE)
    modalAgregarBtn.textContent = "Agregar al carrito";
    modalAgregarBtn.disabled = false;

    const itemCarrito = carrito.find(p => p.nombre === variante.nombre);
    const stockReal = STOCK_PRODUCTOS[variante.nombre] - (itemCarrito?.cantidad || 0);

    if (stockReal === 1) {
      const aviso = document.createElement("span");
      aviso.className = "modal-ultimo-stock";
      aviso.textContent = "🔥 Última";

      modalAgregarBtn.parentElement.appendChild(aviso);
    }

    if (stockReal === 0) {
      modalAgregarBtn.textContent = "Sin stock ❌";
      modalAgregarBtn.disabled = true;
    }

  } else {
    //  PRODUCTO NORMAL
    modalTitle.textContent = currentTitle;

    modalAgregarBtn.dataset.producto = currentTitle;
    modalAgregarBtn.dataset.precio = document.getElementById('modal-precio').textContent;
    const stock = STOCK_PRODUCTOS[currentTitle];

    if (stock === 1) {
      const aviso = document.createElement("span");
      aviso.className = "modal-ultimo-stock";
      aviso.textContent = "🔥 Última";

      modalAgregarBtn.parentElement.appendChild(aviso);
    }

    if (stock === 0) {
      modalAgregarBtn.textContent = "Sin stock ❌";
      modalAgregarBtn.disabled = true;
    } else {
      modalAgregarBtn.textContent = "Agregar al carrito";
      modalAgregarBtn.disabled = false;
    }
  }

  //  Flechas 
  if (currentImages.length > 1) {
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
    
  } else {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }

  // Reset zoom 
  modalImg.classList.remove('zoomed');
}

  prevBtn.onclick = () => {
    if (currentImages.length > 1) {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      actualizarModal();
    }
  };

  nextBtn.onclick = () => {
    if (currentImages.length > 1) {
      currentIndex = (currentIndex + 1) % currentImages.length;
      actualizarModal();
    }
  };

  prevProdBtn.onclick = () => {
  productoIndex = (productoIndex - 1 + productos.length) % productos.length;
  abrirModal(productos[productoIndex]);
  };

  nextProdBtn.onclick = () => {
    productoIndex = (productoIndex + 1) % productos.length;
    abrirModal(productos[productoIndex]);
  };

  modalImg.addEventListener("pointerup", (e) => {
    e.stopPropagation();
  });

  modalImg.onclick = () => {
    if (currentImages.length > 1) {
      currentIndex = (currentIndex + 1) % currentImages.length;
      actualizarModal();
      return;
    }
    modalImg.classList.toggle('zoomed');
    if (modalImg.classList.contains("zoomed")) {
    currentX = 0;
    currentY = 0;
    modalImg.style.setProperty("--x", "0px");
    modalImg.style.setProperty("--y", "0px");
  }
  };

  const closeBtn = modal.querySelector('.close');

  let bloqueandoCierre = false;

  function cerrarModal() {
  bloqueandoCierre = true;

  modal.style.display = 'none';
  modalImg.classList.remove('zoomed');

  const cardActual = productos[productoIndex];

    if (cardActual) {
      setTimeout(() => {
        cardActual.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 50);
    }

    setTimeout(() => {
      bloqueandoCierre = false;
    }, 300);
  }

  // Botón cerrar
  if (closeBtn) {
    closeBtn.onclick = cerrarModal;
  }

  // Click afuera del contenido (en cualquier parte de la pantalla)
  document.addEventListener('click', e => {
    if (bloqueandoCierre) return;

    if (modal.style.display === 'flex' && !modalContent.contains(e.target)) {
      cerrarModal();
    }
  });

  // Tecla ESC
  document.addEventListener('keydown', e => {
    if (e.key === "Escape") {
      cerrarModal();
    }
  });

  productos = Array.from(document.querySelectorAll('.card'))
  .filter(card => card.offsetParent !== null);

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {

    const titulo = card.querySelector('h3')?.textContent || '';
    const stock = STOCK_PRODUCTOS[titulo] ?? null;
    console.log("producto:", titulo, "stock:", stock);

    //  Si el stock es 0 → ocultar producto
    if (stock === 0) {
      card.classList.add("sin-stock");

      const aviso = document.createElement('span');
      aviso.className = 'sin-stock-label';
      aviso.textContent = "❌ Sin stock";

      card.appendChild(aviso);
    }
      
    // Si queda 1 → mostrar aviso
    if (stock === 1) {
      const aviso = document.createElement('span');
      aviso.className = 'ultimo-stock';
      aviso.textContent = "🔥 Última";
      card.appendChild(aviso);
    }


    const cantidadImgs = imagenesProducto[titulo]?.length || 1;
    //  indicador visual de que hay más
    if (cantidadImgs > 1) {
      card.classList.add("tiene-mas");
    }
    
    card.addEventListener('click', (ev) => {
       ev.stopPropagation();

    const titulo = card.querySelector('h3')?.textContent.trim();
    const stock = STOCK_PRODUCTOS[titulo];

    //  
    const sinStock = stock === 0;

    if (card.classList.contains('promo')) return;
    if (ev.target.closest('button')) return;
    if (ev.target.classList.contains("flecha")) return;

    abrirModal(card);
  });
  });
}

// ========================
// BUSCADOR DE PRODUCTOS
// ========================
document.addEventListener("DOMContentLoaded", () => {
  sincronizarCarritoConHTML();

  const searchInput = document.getElementById("search");
  const cards = document.querySelectorAll(".card");
  const noResults = document.getElementById("no-results");

  if (!searchInput || cards.length === 0) return;

  function filtrarProductos() {
    const filter = searchInput.value.toLowerCase().trim();
    let matches = 0;

    cards.forEach(card => {
      const title = card.querySelector("h3")?.textContent.toLowerCase() || '';
      const desc = card.querySelector("p")?.textContent.toLowerCase() || "";

      if (title.includes(filter) || desc.includes(filter)) {
        card.style.display = "block";
        matches++;
      } else {
        card.style.display = "none";
      }
    });

    if (noResults) {
      if (matches === 0 && filter.length > 0) {
        noResults.textContent = "No encontramos tu producto, escribinos";
        noResults.style.display = "block";
      } else {
        noResults.style.display = "none";
      }
    }
  }

  searchInput.addEventListener("input", filtrarProductos);
  searchInput.addEventListener("keyup", filtrarProductos);
});

// ========================
// TOAST
// ========================
function mostrarToast(mensaje, tipo = "success") {
  const toast = document.getElementById("toast");

  toast.textContent = mensaje;
  toast.className = "toast " + tipo;

  toast.style.display = "block";
  toast.classList.add("show");

  // Cerrar al hacer click
  toast.onclick = () => {
    toast.classList.remove("show");
    setTimeout(() => toast.style.display = "none", 200);
  };

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.style.display = "none", 400);
  }, 800);
}


  function lanzarConfetti() {
  const canvas = document.createElement("canvas");

  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";

  document.body.appendChild(canvas);

  const myConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true
  });

  myConfetti({
    particleCount: 1500,
    spread: 190,
    origin: { y: 0.6 }
  });

  setTimeout(() => {
    canvas.remove();
  }, 4500);
}

// ========================
// ZOOM EN IMAGEN DEL MODAL
// ========================
const modalImgZoom = document.getElementById("modal-img");
if (modalImgZoom) {
  modalImgZoom.onclick = () => modalImgZoom.classList.toggle("zoomed");
}

// ========================
// FUNCIONES DE CARRITO
// ========================

function calcularTotal() {
  return carrito.reduce((a, i) => {
    const precio = parseFloat(
      (i.precio || "")
        .replace(/[^\d,]/g, "")
        .replace(/\./g, "")
        .replace(",", ".")
    ) || 0;

    return a + precio * i.cantidad;
  }, 0);
}

document.addEventListener("DOMContentLoaded", () => {

  const numero = "542236010443";

  const carritoBtn = document.getElementById("carrito-btn");
  const carritoDropdown = document.getElementById("carrito-dropdown");
  const carritoItemsContainer = document.getElementById("carrito-items");
  const carritoCount = document.getElementById("carrito-count");
  
  if (carritoCount) {
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    carritoCount.textContent = total;
  }

  const vaciarBtn = document.getElementById("vaciar-carrito");
  const carritoTotal = document.getElementById("carrito-total");

  const fondoModal = document.createElement("div");
  fondoModal.id = "fondo-carrito";
  Object.assign(fondoModal.style, {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
    display: "none", zIndex: "998"
  });
  document.body.appendChild(fondoModal);

  Object.assign(carritoDropdown.style, {
    zIndex: "999", position: "fixed",
    top: "50%", left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 0 15px rgba(0,0,0,0.4)",
    borderRadius: "12px", background: "white",
    display: "none", padding: "15px", width: "300px",
  });

  const parsePrecio = p => parseFloat(p.replace(/[^\d,]/g,"").replace(/\./g,"").replace(",","."))||0;


  function actualizarCarrito() {
    carrito = carrito.map(item => {
      const stock = STOCK_PRODUCTOS[item.nombre];
      if (stock !== undefined && item.cantidad > stock) {
        item.cantidad = stock;
      }
      return item;
    }).filter(i => i.cantidad > 0);
    carritoItemsContainer.innerHTML = carrito.length === 0
      ? "<p class='carrito-vacio'>Tu carrito está vacío 🛒</p>"
      : carrito.map(i=>`
        <div class='carrito-item'>
         <strong>${i.nombre}</strong> ${i.precio || "$0"}<br>
          <button class='cantidad-btn restar' data-nombre='${i.nombre}'>-</button>
          ${i.cantidad}
          <button class='cantidad-btn sumar' data-nombre='${i.nombre}'>+</button>
        </div>
      `).join("");

    const totalProductos = carrito.reduce((a,i)=>a+i.cantidad,0);
    const total = calcularTotal();

    carritoCount.textContent = totalProductos;
    localStorage.setItem("carrito", JSON.stringify(carrito));

    const envio = localStorage.getItem("codigoPostalCliente")
      ? ((PROMO_ACTIVA === "envio" && total >= 80000) || total >= 300000
          ? 0
          : calcularCostoEnvio(localStorage.getItem("codigoPostalCliente")))
      : null;

    carritoTotal.innerHTML = `
      <strong>- Cantidad de productos: ${totalProductos}</strong><br>
      <strong>- Total: $${total.toLocaleString("es-AR")}</strong><br>

     ${
        envio !== null
          ? `<strong>- ${
              envio === 0
                ? "🚚 Envío: GRATIS"
                : `Envío: $${envio.toLocaleString("es-AR")}`
            }</strong>
            <button id="calcular-envio-btn">Calcular 📍</button>`
          : `<button id="calcular-envio-btn">Calcular envío 📍</button>`
      }
    `;
    document.getElementById("calcular-envio-btn")?.addEventListener("click", () => {
    document.getElementById("menu-envio").click();
     });
    actualizarAvisoEnvioGratis(total);

    let carritoTimer;

    function iniciarTemporizadorCierre() {
      clearTimeout(carritoTimer);

      if (carritoDropdown.style.display === "block") {
        carritoTimer = setTimeout(() => {
          carritoDropdown.style.display = "none";
          fondoModal.style.display = "none";
        }, 30000); 
      }
    }

    // PRECIO
    document.querySelectorAll(".card").forEach(card => {
    const nombre = card.querySelector("h3")?.textContent.trim();
    const precio = card.querySelector("p")?.textContent.trim();
    const btn = card.querySelector(".btn-carrito");

    if (btn) {
      btn.dataset.nombre = nombre;
      btn.dataset.precio = precio;
    }
  });
    carritoDropdown.addEventListener("mouseenter", () => clearTimeout(carritoTimer));
    carritoDropdown.addEventListener("mouseleave", iniciarTemporizadorCierre);

    carritoBtn?.addEventListener("click", iniciarTemporizadorCierre);

    
    document.querySelectorAll(".card").forEach(card => {
    const titulo = card.querySelector("h3")?.textContent.trim();
    const stockMax = STOCK_PRODUCTOS[titulo];

    const item = carrito.find(p => p.nombre === titulo);
    const cantidad = item ? item.cantidad : 0;

    const btn = card.querySelector(".btn-carrito");
    
    if (!btn) return;

    if (stockMax === 0) {
      btn.disabled = true;
      btn.textContent = "Sin stock ❌";
      return;
    }

    if (stockMax !== undefined) {
      const item = carrito.find(p => p.nombre === titulo);
      const cantidadActual = item ? item.cantidad : 0;

      if (cantidadActual > stockMax) {
        item.cantidad = stockMax;
      }

      if (cantidadActual >= stockMax) {
        btn.disabled = true;
        btn.textContent = "Agotado 🛒";
      } else {
        btn.disabled = false;
        btn.textContent = "Agregar al carrito";
      }
    }

  });
  }

  carritoBtn?.addEventListener("click", () => {
     const modal = document.getElementById("modal");
      if (modal && modal.style.display === "flex") {
        modal.style.display = "none";
      }
    const visible = window.getComputedStyle(carritoDropdown).display === "block";

    carritoDropdown.style.display = visible ? "none" : "block";
    fondoModal.style.display = visible ? "none" : "block";

    const whatsappBtn = document.getElementById("whatsapp-btn");

    if (visible) {
      whatsappBtn.classList.remove("oculto");
    } else {
      whatsappBtn.classList.add("oculto");
    }
  });

  fondoModal.addEventListener("click",()=>{
    carritoDropdown.style.display="none";
    fondoModal.style.display="none";

    document.getElementById("whatsapp-btn").classList.remove("oculto");
  });

  function cerrarModal() {
    carritoDropdown.style.display = "none";
    fondoModal.style.display = "none";

    document.getElementById("whatsapp-btn").classList.remove("oculto");
  }

  document.getElementById("salir-carrito")?.addEventListener("click", cerrarModal);

  vaciarBtn?.addEventListener("click",()=>{
  carrito = [];
  actualizarCarrito();
  carritoCount.textContent = 0;
});

  document.addEventListener("click",e=>{
    if (e.target.classList.contains("sumar")) {
    const nombre = e.target.dataset.nombre;
    const item = carrito.find(p => p.nombre === nombre);

    if (!validarStock(nombre, carrito)) return;

    if (item) item.cantidad++;
    carritoCount.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    }

    if(e.target.classList.contains("restar")){

      const item=carrito.find(p=>p.nombre===e.target.dataset.nombre);
      if (item) {
        item.cantidad > 1
          ? item.cantidad--
          : carrito = carrito.filter(p => p.nombre !== item.nombre);

        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
        carritoCount.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
      }
    }
    if(e.target.classList.contains("carrito-eliminar")){
      carrito=carrito.filter(p=>p.nombre!==e.target.dataset.nombre);
    }
    actualizarCarrito();
  });

  document.querySelectorAll(".btn-carrito, #modal-agregar")
    .forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const card = btn.closest(".card");
        let nombre, precio;

        //  Si el botón tiene data → usar eso (producto dinámico)
        if (btn.dataset.nombre && btn.dataset.precio) {
          nombre = btn.dataset.nombre;
          precio = btn.dataset.precio;
        } else {
          nombre = card?.querySelector("h3")?.textContent.trim() 
                || document.getElementById("modal-title")?.textContent.trim();

          precio = card?.querySelector("p")?.innerText 
                || document.getElementById("modal-precio")?.innerText;
        }
        const texto = btn.innerText.toLowerCase();

        if (texto.includes("agregar")) {

            const stockMax = STOCK_PRODUCTOS[nombre];
            const ex = carrito.find(p => p.nombre === nombre);

            if (stockMax !== undefined) {
              const cantidadActual = ex ? ex.cantidad : 0;

              if (cantidadActual >= stockMax) {
                mostrarToast("⚠️ No hay más disponibles", "error");
                return;
              }
            }

          if (ex) {
            ex.cantidad++;
          } else {
            carrito.push({ nombre, precio, cantidad: 1 });
          }

          carritoCount.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
         
           animarCarrito();

          // detectar de dónde viene
         let img;

          if (card) {
            img = card.querySelector("img");
          } else {
            const video = document.getElementById("modal-video");

            if (video && video.style.display !== "none") {
              img = video;
            } else {
              img = document.getElementById("modal-img");
            }
          }

          if (img) volarAlCarrito(img);

          if (stockMax !== undefined) {

          const productoEnCarrito = carrito.find(p => p.nombre === nombre);
          const cantidadActual = productoEnCarrito ? productoEnCarrito.cantidad : 0;

          const modalBtn = document.getElementById("modal-agregar");

          if (cantidadActual >= stockMax) {
            modalBtn.disabled = true;
            modalBtn.textContent = "Agotado 🛒";
            document.querySelector(".modal-ultimo-stock")?.remove();
          }
        }
          actualizarCarrito();
        }
      });
    actualizarAvisoEnvioGratis(calcularTotal());
    });

document.getElementById("enviar-carrito")?.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (carrito.length === 0) {
    Swal.fire({
    icon: "info",
    title: "Carrito vacío",
    text: "La compra mínima es de $50.000 ",
    confirmButtonColor: "#000"
  });
    return;
  }

  let msg = "🛍️ *Quiero comenzar este pedido:*\n\n";
  let total = 0;
  let totalProductos = 0;
  let costoEnvio = 0;

  // Productos
  carrito.forEach(i => {
    const precioUnitario = parsePrecio(i.precio);
    const subtotal = precioUnitario * i.cantidad;
    total += subtotal;
    totalProductos += i.cantidad;

    if (i.cantidad > 1) {
      msg += `• *${i.nombre}* — *${i.cantidad}* x ${i.precio} → *$${subtotal.toLocaleString("es-AR")}*\n`;
    } else {
      msg += `• *${i.nombre}* — ${i.precio}\n`;
    }
  });

  if (PROMO_ACTIVA === "regalo" && total >= minimoRegalo) {
    msg += `• 🎁 *${REGALO_NOMBRE}* — 🎁 GRATIS\n`;
    totalProductos += 1;
  }

  //  Compra mínima
  if (total < minimoCompra) {
    Swal.fire({
    icon: "warning",
    title: "Compra mínima",
    text: `La compra mínima es de $${minimoCompra.toLocaleString("es-AR")}`,
    confirmButtonColor: "#000"
  });
    return;
  }

  //  Abrir modal de código postal
  const modalCP = document.getElementById("modal-cp");
  const inputCP = document.getElementById("cp-input");

  const cpGuardado = localStorage.getItem("codigoPostalCliente");

  if (cpGuardado) {
    inputCP.value = cpGuardado;
  } else {
    inputCP.value = "";
  }

  modalCP.style.display = "flex";

  //  Esperar confirmación del usuario

  // Botón cancelar del modal de código postal
  const cpCancelar = document.getElementById("cp-cancelar");
  if (cpCancelar) {
   cpCancelar.onclick = () => {
    document.getElementById("modal-cp").style.display = "none";
   };
  }

  // Botón confirmar código postal
  const btnRetirarMiramar = document.getElementById("retirar-miramar");

  btnRetirarMiramar?.addEventListener("click", () => {

    let costoEnvio = 0;// Igual que Miramar
    if ((PROMO_ACTIVA === "envio" && total >= 80000) || total >= 300000) {
      costoEnvio = 0;
    }
    const totalFinal = total + costoEnvio;

    let mensajeRegalo = "";

    if (PROMO_ACTIVA === "regalo" && total >= minimoRegalo) {
      mensajeRegalo = `🎁 ¡Tenés ${REGALO_NOMBRE} de regalo!`;
    }

    msg += `\n📦 *Total de productos:* ${totalProductos}`;
    msg += `\n🚚 *Envío:* $0`;
    msg += `\n💳 *Total a pagar:* $${totalFinal.toLocaleString("es-AR")}`;

    msg += `\n\n📍 *Retiro en Miramar*`;

    const numero = "542236010443";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    modalCP.style.display = "none";
  });

 const cpConfirmar = document.getElementById("cp-confirmar");
 console.log("botón cp:", cpConfirmar);

cpConfirmar.onclick = () => {
  const codigoPostalCliente = inputCP.value.trim();
if (codigoPostalCliente.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Falta el código postal",
      text: "Por favor ingresalo",
      confirmButtonColor: "#000"
    });
    return;
  }

  if (!/^\d{4,8}$/.test(codigoPostalCliente)) {
    Swal.fire({
      icon: "error",
      title: "Código postal inválido",
      text: "Ingresá solo números (4 a 8 dígitos)",
      confirmButtonColor: "#000"
    });
    return;
  }

  localStorage.setItem("codigoPostalCliente", codigoPostalCliente);

  const esMiramar = codigoPostalCliente.startsWith("7607");
    let costoEnvio;

    if (PROMO_ACTIVA === "envio" && total >= 80000) {
      costoEnvio = 0;
    } else {
      costoEnvio = calcularCostoEnvio(codigoPostalCliente);
    }

    if (total >= 300000) {
      costoEnvio = 0;
    }
    const totalFinal = total + costoEnvio;

    let mensajeRegalo = "";

    if (PROMO_ACTIVA === "regalo" && total >= minimoRegalo) {
        mensajeRegalo = `\n🎁 ¡Tenés ${REGALO_NOMBRE} de regalo!`;
    } else {
        mensajeRegalo = ""; 
    }

    msg += `\n📦 *Total de productos:* ${totalProductos}`;
    msg += `\n🚚 *Envío:* $${costoEnvio.toLocaleString("es-AR")}`;
    msg += `\n💳 *Total a pagar (con envío incluido):* $${totalFinal.toLocaleString("es-AR")}`;

    if (esMiramar) {
    msg += `\n\n📍 *Entrega en Miramar*`;
    
  } else {
    msg += `\n\n codigo postal: ${codigoPostalCliente}`;
    msg += `\n\n✨ *¡Pedido listo!*`;
    msg += `\nTocá *Enviar* y te respondemos enseguida para coordinar 💌`;
  }

    // 🔹 Abrir WhatsAppp
    const numero = "542236010443";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    // 🔹 Cerrar modal
    modalCP.style.display = "none";
  };
});
});

// ========================
// AVISO ENVÍO GRATIS
// ========================
const estadoEnvio = {
  toastMostrado: false
};

function actualizarAvisoEnvioGratis(total = 0, envioManualGratis = false) {
  const aviso = document.getElementById("aviso-envio-gratis");
  if (!aviso) {
    console.warn("No existe el elemento #aviso-envio-gratis");
    return;
  }

  aviso.style.display = "none";

  // Asegurarse de que estadoEnvio existe
  if (typeof estadoEnvio === "undefined") window.estadoEnvio = { toastMostrado: false };

  total = Number(total) || 0;

  console.log("PROMO_ACTIVA:", PROMO_ACTIVA, "total:", total);

  if (PROMO_ACTIVA === "regalo") {
  if (total >= minimoRegalo) {
    aviso.innerHTML =
  `🎁 <strong>¡Tu compra incluye:</strong><br>` +
  `${REGALO_NOMBRE} de regalo!`;

    if (!estadoEnvio.toastMostrado) {
      mostrarToast("🎁 ¡Ganaste un regalo! ✨", "fiesta");
      lanzarConfetti();
      estadoEnvio.toastMostrado = true;
        }

      } else {
        const falta = minimoRegalo - total;
        aviso.innerHTML = `🎁 Sumá <strong>$${falta.toLocaleString("es-AR")}</strong> y llevate un regalo!`;

        // reset
        estadoEnvio.toastMostrado = false;
      }

      aviso.style.display = "block";
      return;
    }

  if (PROMO_ACTIVA === "envio") {
    if (envioManualGratis || total >= 80000) {
      aviso.innerHTML = "🎉 <strong>¡Tenés envío gratis!</strong>";
      aviso.style.display = "block";

      if (!estadoEnvio.toastMostrado) {
        mostrarToast("🎉 Tenés envío gratis! ✨", "fiesta");
        lanzarConfetti();
        estadoEnvio.toastMostrado = true; 
      }
    } else {
      const falta = 80000 - total;
      aviso.innerHTML = `Sumá <strong>$${falta.toLocaleString("es-AR")}</strong> y conseguí <b>envío gratis</b>`;
      aviso.style.display = "block";
      // reset
      estadoEnvio.toastMostrado = false;
    }
    aviso.style.display = "block";
    return;
  }

  if (PROMO_ACTIVA === "ninguna") {

  if (total >= 300000) {

    aviso.innerHTML = `
      🎉 <strong>¡Tenés envío gratis!</strong><br>
    `;

  } else {

    const falta = 300000 - total;

    aviso.innerHTML = `
    🛍️ Compra mínima $${minimoCompra.toLocaleString("es-AR")}✨
    <br>
    `;
  }
  // ========================
//  🚚 Sumá <strong>$${falta.toLocaleString("es-AR")}</strong> para envío gratis<br>
// ========================
  aviso.style.display = "block";
}
}

// ========================
// SINCRONIZAR CARRITO CON PRODUCTOS DEL HTML  🚚 Sumá <strong>$${falta.toLocaleString("es-AR")}</strong> para envío gratis<br>
// ========================
function sincronizarCarritoConHTML() {

  if (carrito.length === 0) return; // nada que sincronizar

  // 🔹 Función para normalizar nombres y evitar problemas de coincidencia
  function normalizarNombre(nombre) {
    return nombre.replace(/\s+/g, " ").trim().toLowerCase();
  }

  // 🔹 Leer productos actuales del HTML
  const productosHTML = {};
  const cards = document.querySelectorAll(".card");
  if (cards.length === 0) return; // si no hay productos, no toca el carrito

  cards.forEach(card => {

    carrito = carrito.map(item => {
      const stock = STOCK_PRODUCTOS[item.nombre];

      if (stock !== undefined && item.cantidad > stock) {
        item.cantidad = stock;
      }

      return item;
    }).filter(item => item.cantidad > 0);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    const nombre = card.querySelector("h3")?.innerText || "";
    const precioTexto = card.querySelector("p")?.innerText || "";

    if (nombre && precioTexto) {
      const precio = parseFloat(
        precioTexto.replace(/[^\d,]/g, "").replace(/\./g, "").replace(",", ".")
      );
      productosHTML[normalizarNombre(nombre)] = precio;
    }
  });

  let cambios = false;

  // 🔹 Validar carrito
  carrito = carrito.filter(item => {
    const nombreItem = normalizarNombre(item.nombre);
    const precioActual = productosHTML[nombreItem];

    const stock = STOCK_PRODUCTOS[item.nombre];

    if (precioActual === undefined || stock === 0) {
      cambios = true;
      return false;
    }

    // Precio cambiado → se actualiza
    const precioCarrito = parseFloat(
      (item.precio || "").replace(/[^\d,]/g, "").replace(/\./g, "").replace(",", ".")
    ) || 0;

    if (precioCarrito !== precioActual) {
      item.precio = `$${precioActual.toLocaleString("es-AR")}`;
      cambios = true;
    }

    return true;
  });

  // Guardar carrito actualizado
  if (cambios) localStorage.setItem("carrito", JSON.stringify(carrito));
  

  // 🔹 Actualizar UI inmediatamente
  const carritoCount = document.getElementById("carrito-count");
  const carritoTotal = document.getElementById("carrito-total");

  if (carritoCount) {
    const totalProductos = carrito.reduce((a, i) => a + i.cantidad, 0);
    carritoCount.textContent = totalProductos;
  }

  if (carritoTotal) {
    const total = carrito.reduce((a, i) => {
      const precio = parseFloat(
        (i.precio || "").replace(/[^\d,]/g, "").replace(/\./g, "").replace(",", ".")
      ) || 0;
      return a + precio * i.cantidad;
    }, 0);

    carritoTotal.innerHTML = `
      <strong>- Cantidad de productos: ${carrito.reduce((a, i) => a + i.cantidad, 0)}</strong><br>
      <strong>- Total: $${total.toLocaleString("es-AR")}</strong>
    `;
  }
}
// Arrastrar zoom
let isDragging = false;
let lastX = 0;
let lastY = 0;
let currentX = 0;
let currentY = 0;

const modalImg = document.querySelector(".modal-content img");

modalImg.addEventListener("mousedown", (e) => {
  if (!modalImg.classList.contains("zoomed")) return;

  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;

  modalImg.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;

  currentX += dx;
  currentY += dy;

  lastX = e.clientX;
  lastY = e.clientY;

  // límite (opcional, ajustá si querés)
  const maxMove = 200;
  currentX = Math.max(-maxMove, Math.min(maxMove, currentX));
  currentY = Math.max(-maxMove, Math.min(maxMove, currentY));

  modalImg.style.setProperty("--x", currentX + "px");
  modalImg.style.setProperty("--y", currentY + "px");
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  modalImg.style.cursor = "grab";
});


document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {

    // mostrar flechas
    card.classList.add("mostrar-flechas");

    // ocultarlas después de 2 segundos
    setTimeout(() => {
      card.classList.remove("mostrar-flechas");
    }, 2000);
  });
});


let videoActivo = null;

document.querySelectorAll(".card-video").forEach(card => {
  const video = card.querySelector("video");
  const icon = card.querySelector(".sound-icon");

  if (!video || !icon) return;

  video.muted = true;
  video.playsInline = true;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.6 });

  observer.observe(video);

  icon.addEventListener("click", (e) => {
    e.stopPropagation();

    // apagar anterior
    if (videoActivo && videoActivo !== video) {
      videoActivo.muted = true;

      const oldCard = videoActivo.closest(".card-video");
      const oldIcon = oldCard.querySelector(".sound-icon");

      oldCard.classList.remove("audio-activo");
      oldIcon.textContent = "🔊";
    }

    // toggle actual
    if (video.muted) {
      video.muted = false;
      icon.textContent = "🔊";
      card.classList.add("audio-activo");
      videoActivo = video;
    } else {
      video.muted = true;
      icon.textContent = "🔇";
      card.classList.remove("audio-activo");
      videoActivo = null;
    }
  });
});

document.querySelectorAll(".card-video").forEach(card => {
  const video = card.querySelector("video");

  card.addEventListener("mouseenter", () => {
    video.play();
  });

  card.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});


const menuBtn = document.getElementById("menu-btn");
const menuPanel = document.getElementById("menu-panel");
const menuCatalogo = document.getElementById("menu-catalogo");

menuBtn.addEventListener("click", () => {
  menuPanel.classList.toggle("active");
});

  const menuPago = document.getElementById("menu-pago");

  menuPago.addEventListener("click", (e) => {
    e.preventDefault();
    const modalPago = document.getElementById("modal-pago");
    const cerrarPago = document.querySelector(".cerrar-pago");

      cerrarPago.addEventListener("click", () => {
        modalPago.style.display = "none";
      });
    modalPago.style.display = "flex";
    });

menuCatalogo.addEventListener("click", (e) => {
  e.preventDefault();

  if (window.location.pathname.includes("contacto.html")) {
    window.location.href = "index.html";
  } else {
    window.location.href = "contacto.html";
  }
});

function copiarAlias() {
  navigator.clipboard.writeText("ana.maria.montiel");

  const msg = document.getElementById("copiado-msg");
  msg.style.opacity = "1";

  setTimeout(() => {
    msg.style.opacity = "0";
  }, 1500);
}

function animarCarrito() {
  const btn = document.getElementById("carrito-btn");
  const count = document.getElementById("carrito-count");

  // animación botón
  btn.classList.remove("anim-agregar");
  void btn.offsetWidth; // reinicia animación
  btn.classList.add("anim-agregar");

  // animación contador
  count.classList.remove("anim");
  void count.offsetWidth;
  count.classList.add("anim");
}

function volarAlCarrito(img) {
  const carrito = document.getElementById("carrito-btn");
  const clone = img.cloneNode(true);

  const rect = img.getBoundingClientRect();
  const carritoRect = carrito.getBoundingClientRect();

  clone.style.position = "fixed";
  clone.style.left = rect.left + "px";
  clone.style.top = rect.top + "px";
  clone.style.width = rect.width + "px";
  clone.style.zIndex = 9999;
  clone.style.transition = "all 0.6s ease";

  document.body.appendChild(clone);

  setTimeout(() => {
    clone.style.left = carritoRect.left + "px";
    clone.style.top = carritoRect.top + "px";
    clone.style.width = "20px";
    clone.style.opacity = "0.5";
  }, 10);

  setTimeout(() => clone.remove(), 600);
}

function renderCarritoUI() {
  const carritoCount = document.getElementById("carrito-count");

  const totalProductos = carrito.reduce((a, i) => a + i.cantidad, 0);

  if (carritoCount) {
    carritoCount.textContent = totalProductos;
  }
}

function mostrarEnvioModal(costo) {

  let modal = document.getElementById("envio-modal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "envio-modal";

    modal.innerHTML = `
      <div class="envio-box">
        <h2>🚚 Envío</h2>

        <p class="envio-precio"></p>

        <p class="envio-info">
           📦
        </p>

        <p class="envio-gratis">
          💖 Superando los $300.000 el envío es GRATIS
        </p>

        <div class="envio-actions">
          <button id="cerrar-envio">Cerrar</button>

          <a 
            href="https://wa.me/542236010443" 
            target="_blank"
            id="hablar-envio"
          >
            WhatsApp
          </a>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
      if (e.target.id === "envio-modal") {
        modal.style.display = "none";
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target.id === "cerrar-envio") {
        modal.style.display = "none";
      }
    });
  }

  modal.querySelector(".envio-precio").innerHTML =
    costo === 0
      ? "🎉 <strong>Envío GRATIS</strong>"
      : `Costo actual: <strong>$${costo.toLocaleString("es-AR")}</strong>`;

  modal.style.display = "flex";
}

document.getElementById("menu-envio").addEventListener("click", async (e) => {
  e.stopPropagation();

  let cpGuardado = (localStorage.getItem("codigoPostalCliente") || "").trim();

    let cp = (await Swal.fire({
      title: "Ingresá el código postal de tu localidad para calcular el envío 👇🏻",
      input: "text",
      inputValue: cpGuardado,
      showCancelButton: false,
      confirmButtonText: "OK",
      confirmButtonColor: "#000"
    })).value;

  if (!cp) {
    Swal.fire({
      icon: "warning",
      title: "Falta el código postal",
      text: "Por favor ingresalo",
      confirmButtonColor: "#000"
    });
    return;
  }

  localStorage.setItem("codigoPostalCliente", cp);

  const total = calcularTotal();

  const costo =
    (PROMO_ACTIVA === "envio" && total >= 80000) || total >= 300000
      ? 0
      : calcularCostoEnvio(cp);

  // Validar error
    if (costo?.error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: costo.mensaje,
        confirmButtonColor: "#000"
      });
      return;
    }
      mostrarEnvioModal(costo);
    });


function filtrar(cat) {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const cats = (card.dataset.cat || '').split(' ').filter(Boolean);

    if (cat === 'todos' || cats.includes(cat)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  document.getElementById('menu-panel').classList.remove('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const visibles = [...document.querySelectorAll('.card')]
    .filter(c => c.style.display !== 'none');

  document.getElementById('sin-resultados').style.display =
    visibles.length ? 'none' : 'block';
}

const links = document.querySelectorAll('#menu-panel a');

links.forEach(link => {
  link.addEventListener('click', function() {
    links.forEach(l => l.classList.remove('activo'));
    this.classList.add('activo');
  });
});