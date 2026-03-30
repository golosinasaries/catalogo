const minimoCompra = 50000; 
const ENVIO_MDP = 5900;
const ENVIO_GENERAL = 10900;
const ENVIO_LEJANO = 13900;
const ENVIO_SANTACRUZ = 14900;
const ENVIO_MIRAMAR= 0;
const ENVIO_GRATIS = 0;
const minimoRegalo = 60000;   
const REGALO_NOMBRE = "1 caja de Chicles Fierita Recargado - Menta (50 u) ✨"; 
const PROMO_ACTIVA = "envio"; 
// "envio"  → envío gratis
// "regalo" → regalo 
// "ninguna" → sin promo

let productos = [];
let productoIndex = 0;
let currentVariantes = null;

const STOCK_PRODUCTOS = {
  "Auto Blanco y azul (1 u)": 1,
  "Auto Blanco (1 u)": 1,
  "Camión Transformer (1 u)": 2,
  "Camión Verde Transformer (1 u)": 3,
  "Chupetines con led Simpsons (30 u)": 6,
  "Chupetines con led Unicornio (30 u)": 3,
  "Transformers varios (4 u)": 7,
  "Trompetas con chupetin y sonido (20 u)": 1,
  "Chupetín Calabaza con polvo ácido y led (30 u)": 1,
  "Billiken Congys 200 g": 3,
  "Caramelos masticables Fierita Granjero (100 u)": 1,
  "Billiken Tutti-frutti 800 g": 2,
  "Billiken redonditas 800 g": 2,
  "Gomitas blandas Lilo y Stitch (60 u)": 2,
  "Llaveros láser Capibara (12 u)": 1,
  "Autito  + pastillitas (30 u)": 15,
  "YO-YOs con luces (12 u)": 1,
  "Gomitas Selección (30 u)": 1,
  "Gomitas blandas Among Us (30 u)": 15,
  "Gomitas blandas Donas 🍩 (30 u)": 1,
  "Botellitas con chicles (30 botellitas)": 20,
  "Gomitas blandas Fantasmita (30 u)": 1,
  "Alcancía Lechuza Marrón(con 12 gelatinas en su interior)": 15,
  "Alcancía Lechuza Rosa (con 12 gelatinas en su interior)": 15,
  "Alcancía Oso Rosa (con 12 gelatinas en su interior)": 3,
  "Alcancía Oso café (con 12 gelatinas en su interior)": 5,
  "Chupetines Cremosito Fierita - Fritilla y Crema (50 u)": 2,
  "Alfajor Guaymallén simple de Membrillo (10 u)": 1,
  "Alfajor Guaymallén simple de Chocolate Blanco (10 u)": 2,
  "Lenguetazo Pinta Lengua (32 u)": 2,
  "Lenguetazo Tropical Punch (32 u)": 1,
  "Lenguetazo (32 u)": 1,
  "Chupetines con led Corona (30 u)": 1,
  "Pistolitas con luz (30 u)": 1,
  "Camión dispenser + caramelos rosa (1 unidad)": 1,
  "Pistola + caramelos rosa (1 unidad)": 1,
  "Alcancía Tigre Amarillo (con 12 gelatinas en su interior)": 15,
  "Alcancía Tigre rojo (con 12 gelatinas en su interior)": 15,
  "Alcancía Pollito rojo (con 12 gelatinas en su interior)": 5,
  "Alcancía Pingüino Rosa (con 12 gelatinas en su interior)": 6,
  "Gomitas Super Mario (30 u)": 15,
  "Chupetines con led Oreo (30 u)": 15,
  "Nutello pequeños (60 u)": 1,
  "Smack Bar (30 u)": 10,
  "Camión dispenser + caramelos rosa (1 unidad)": 1,
  "Dinosaurio con caramelos y luces (1 unidad)": 1,
  "Avión Naranja Transformer (1 u)": 1,
};

const globos = [
  {
    nombre: "Chicle Fierita Globo sabor Banana (95 u)",
    precio: "$7.900",
    img: "img/globobanana.jpg"
  },
  {
    nombre: "Chicle Fierita Globo sabor Frutilla (95 u)",
    precio: "$7.900",
    img: "img/gobofrutilla.jpg"
  },
  {
    nombre: "Chicle Fierita Globo sabor Menta (95 u)",
    precio: "$7.900",
    img: "img/globomenta.jpg"
  }
];

const alcancias = [
  {
    nombre: "Alcancía Pingüino Rosa (con 12 gelatinas en su interior)",
    precio: "$6.500",
    img: "img/alcanciapinguinorosa.jpg"
  },

  {
    nombre: "Alcancía Pollito Rojo",
    precio: "$6.500",
    img: "img/alcanciapinguinorojo.jpg"
  },
  {
    nombre: "Alcancía Lechuza Marrón",
    precio: "$6.500",
    img: "img/lechuza.jpg"
  },

  {
    nombre: "Alcancía Lechuza Rosa",
    precio: "$6.500",
    img: "img/lechuzarosa.jpg.png"
  },
  {
    nombre: "Alcancía Oso Rosa",
    precio: "$6.500",
    img: "img/osorosa1.jpg"
  },
  {
    nombre: "Alcancía Tigre Rojo",
    precio: "$6.500",
    img: "img/tigrerojo.png"
  },
  {
    nombre: "Alcancía Tigre Amarillo",
    precio: "$6.500",
    img: "img/alcanciaojoamarillo.png"
  },
];

const recargados = [
  {
    nombre: "Chicle Fierita Recargado - Tutti Frutti (50 u)",
    precio: "$6.500",
    img: "img/fieritarecargado.jpg"
  },
  {
    nombre: "Chicle Fierita Recargado - Menta (50 u)",
    precio: "$6.500",
    img: "img/fieritarecargadomenta.jpg"
  }
];

const variantesTransformer = [

 /* {
    img: "img/camiontra3.jpeg",
    nombre: "Camión Transformer (1 u)",
    precio: "$4.500"
  },
  */
  {
    img: "img/autoblancotra.jpeg",
    nombre: "Auto Blanco (1 u)",
    precio: "$4.500"
  },

   {
    img: "img/autoblancoyazul.jpeg",
    nombre: "Auto Blanco y azul(1 u)",
    precio: "$4.500"
  },

  {
    img: "img/aviontra.jpeg",
    nombre: "Avión Transformer (1 u)",
    precio: "$4.500"
  },
  {
    img: "img/camionverdetra.jpeg",
    nombre: "Camión Verde Transformer (1 u)",
    precio: "$4.500"
  },
  {
    img: "img/avionnaranjatra.jpeg",
    nombre: "Avión Naranja Transformer (1 u)",
    precio: "$4.500"
  },
 /* {
   img: "img/autorojo.jpeg",
    nombre: "Auto Rojo Transformer (1 u)",
    precio: "$4.500"
  }
    */
];

const productosVariantes = {
  "card-alcancia": alcancias,
  "card-globos": globos,
  "card-recargado": recargados,
  "card-transformers": variantesTransformer,

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
  card.querySelector("p").textContent = v.precio;

  const btn = card.querySelector(".btn-carrito");
  btn.dataset.nombre = v.nombre;
  btn.dataset.precio = v.precio;
}

function validarStock(nombre, carrito) {
  const stockMax = STOCK_PRODUCTOS[nombre];

  if (stockMax !== undefined) {
    const ex = carrito.find(p => p.nombre === nombre);
    const cantidadActual = ex ? ex.cantidad : 0;

    if (cantidadActual >= stockMax) {
      mostrarToast("⚠️ No hay más disponibles", "error");
      return false;
    }
  }

  return true;
}
const btn = document.getElementById("whatsapp-btn");


if (btn) {
  btn.addEventListener("click", () => {
    const linkGrupo = "https://chat.whatsapp.com/IOdckbjRmKR7iZJUoJpGEV?mode=gi_ts";
    window.open(linkGrupo, "_blank");
  });
}


function calcularCostoEnvio(cp) {

  const codigo = cp.trim();

  if (codigo.startsWith("7607")) {
    return ENVIO_MIRAMAR;
  }

  const prefijos = ["9303", "4430"];

  for (const p of prefijos) {
    if (codigo.startsWith(p)) {
      return ENVIO_SANTACRUZ;
    }
  }

  if (codigo.startsWith("7600")) {
    return ENVIO_MDP;
  }

  if (
    codigo.startsWith("9") ||
    codigo.startsWith("4") ||
    codigo.startsWith("3") ||
    codigo.startsWith("6") ||
    codigo.startsWith("8")
  ) {
    return ENVIO_LEJANO;
  }

  return ENVIO_GENERAL;
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
    "Camión Transformer (1 u)":[ "img/camiontra1.jpeg", "img/camiontra2.jpeg", "img/camiontra3.jpeg"],
    "Transformers varios (4 u)":  ["img/videotra1.mp4","img/tra1.jpeg","img/tra2.jpeg","img/tra3.jpeg", "img/videotra2.mp4" ],
    "Gomitas Ojos (30 u)": ["img/ojos.jpg","img/videoojos.mp4"],
    "Dinosaurio con caramelos y luces (1 unidad)": ["img/fotodinosaurio.jpg","img/videodinosaurio.mp4"],
    "Gomitas blandas de boca (30 u)": ["img/boca.jpg","img/videoboca.mp4"],
    "Alcancía": ["img/pinguino2.jpg","img/alcanciapinguinorojo.jpg","img/alcancialechuzarosa.jpg","img/tigrerojo.png" ],
    "Gomitas Spider-Man (60 u)": ["img/spiderman1.jpg","img/spiderman2.jpg","img/spiderman3.jpg","img/spiderman4.jpg","img/spiderman5.jpg"],
    "Llaveros láser Capibara (12 u)": ["img/laser1.jpg","img/laser2.jpg","img/laser3.jpg","img/laser4.jpg"],
    "Ring Pop Barbie (30 u)": ["img/ringpopbarbie.jpg","img/ringpop.jpg"],
    "Pistolitas con luz (30 u)": ["img/pistolita1.jpg","img/pistolita2.jpg","img/pistolita3.jpg","img/pistolita4.jpg"],
    "YO-YOs con luces (12 u)": ["img/yoyo1.jpg","img/yoyo3.jpg","img/yoyo4.jpg","img/yoyo2.jpg"],
    "YO-YOs con luces (24 u)": ["img/yoyo2.jpg","img/yoyo3.jpg","img/yoyo4.jpg","img/yoyo1.jpg"],
    "Agenditas surtidas (32 u)": ["img/agendita3.jpg","img/agendita2.jpg","img/agendita3.jpg","img/agendita4.jpg"],
    "Agenditas surtidas (10 u)": ["img/agendita2.jpg","img/agendita1.jpg","img/agendita3.jpg","img/agendita4.jpg"],
    "Agenditas surtidas (20 u)": ["img/agendita1.jpg","img/agendita3.jpg","img/agendita4.jpg"],
    "Gomitas blandas Lilo y Stitch (60 u)": ["img/stich1.jpg","img/stich2.jpg","img/stich3.jpg"],
    "Chupetines con forma de helado (30 u)": ["img/chupetineshelado1.jpg","img/chupetineshelados2.jpg"],
    "Chupetines con polvo ácido Bob Esponja (30 u)": ["img/bob1.jpg","img/bob2.jpg"],
    "Chicles WhatsApp con tatoo capibara (36 paquetes de 5 chicles)": ["img/wp1.jpg","img/wp2.jpg" ],
    "Gomitas Capibaras (30 u)": ["img/capibara.jpg","img/capibara2.jpg",],
    "Combito Surtido de Regalo 🎁": ["img/combito1.jpg","img/combito4.jpg","img/combito3.jpg","img/combito5.jpg", "img/combito2.jpg"],
    "Tractor dispenser + caramelos (1 unidad)": ["img/tractor1.jpg","img/tractor2.jpg"],
    "Camión dispenser + caramelos rosa (1 unidad)": ["img/camionrosa1.jpg","img/camionrosa2.jpg"],
    "Camión dispenser + caramelos celeste (1 unidad)": ["img/camionceleste1.jpg","img/camionceleste2.jpg"],
    "Tractor dispenser + caramelos verde (1 unidad)": ["img/tractorverde1.jpg","img/tractorverde2.jpg"],
    "Chupetines Kuromy con led (30 u)": ["img/caramelokuromy.jpg","img/caramelokuromy2.jpg"],
    "Gomita Blanda Helado (30 u)": ["img/helado.jpg","img/helado2.jpg"],
    "Alcancía pingüino negro (con 12 gelatinas en su interior)": ["img/pinguino2.jpg","img/pinguino5.jpg","img/pinguino3.jpg","img/pinguino4.jpg","img/pinguino6.jpg"],
    "Chupetines Merlina (30 u)": ["img/merlina1.jpg","img/merlina2.jpg","img/merlina3.jpg","img/merlina4.jpg"],
    "Chupetín con polvo ácido Brain (30 u)": ["img/braincaja.jpg","img/chupetinBrain.jpg"],
    "Camiseta pimball con pastillitas (30 u)": ["img/pimballremera.jpg","img/reversaremera.jpg","img/r1.jpg","img/r2.jpg"],
    "Chupetín Calabaza con polvo ácido y led (30 u)": ["img/cajaCalabaza.jpg","img/chupetincalabaza1.jpg","img/chupetincalabaza2.jpg"],
    "Gelatina de diferentes formas (30 u)": ["img/gelatinaDiferentesSabores4.jpg","img/gelatinaDiferentesSabores3.jpg","img/gelatinaDiferentesSabores2.jpg","img/gelatinaDiferentesSabores5.jpg","img/gelatinaDiferentesSabores1.jpg"],
    "Chupetines con led Corona (30 u)": ["img/chupetinesconled1.jpg","img/corona2.jpg"],
    "Gomitas Monstruo (30 u)": ["img/gomitablandaCara2.jpg","img/gomitablandaCara3.jpg"],
    "Cool Mint sabores frutales (30 u)": ["img/coolmint.jpg","img/coolmint2.jpg"],
    "Trompetas con chupetin y sonido (20 u)": ["img/trompeta1.jpg","img/trompetas.jpg"],
    "Huevos Sorpresa Capibara (30 u)": ["img/sorpresacapibara1.jpg","img/sorpresacapibara2.jpg"],
    "Huevos Sorpresa Plantas vs Zombies (30 u)": ["img/sorpresaplant2.jpg","img/sorpresaplant.jpg"],
    "Gomitas blandas Fantasmita (30 u)": ["img/fantasmitas.jpg","img/fantasmitas2.jpg"],
    "Gomitas blandas Batman (30 u)": ["img/batman1.jpg","img/batman2.jpg"],
    "Monedas de chocolate (290 u)": ["img/monedas1.jpg","img/monedas2.jpg"],
    "Gomitas ojo-boca-ojo (30 u)": ["img/gomitasoh1.jpg","img/gomitasoh.jpg"],
    "Gomitas blandas Kuromy (30 u)": ["img/gomitasblandas7.jpg","img/gomitasblandas71.jpg"],
    "Chupetines Capibara (30 u)": ["img/chupetincapibara1.jpg","img/chupetincapibara2.jpg"],
    "Chupetines con forma de Unicornio (30 u)":["img/unicornio2.jpg","img/unicornio1.jpg","img/unicornio3.jpg"],
    "Chupetines con led Unicornio (30 u)":["img/unicornioled1.jpg","img/unicornioled2.jpg","img/leduni.jpg"],
    "Gomitas Super Mario (30 u)": ["img/supermario1.jpg","img/supermario2.jpg"],
    "Gomitas Saca lenguas (30 u)": ["img/sacalenguas1.jpg","img/sacalenguas2.jpg"],
    "Chupetines con led Mc Donalds (30 u)": ["img/mc.jpg","img/mc2.jpg",],
    "Chupetines con led Oreo (30 u)": ["img/oreo1.jpg","img/oreoce.jpg",],
    "Chupetines led Monster (30 u)": ["img/monsterojo1.jpg","img/monsterojo.jpg",],
    "Gomitas de Gelatinas Candy Loka (10 u)": ["img/gelatinaloka.jpg","img/trompo.jpg"],
    "Gomitas de Gelatinas Candy Loka (30 u)": ["img/gelatinaloka2.jpg","img/trompo.jpg"],
    "Chupetines Hongos (30 u)": ["img/hongo1.jpg","img/hongo2.jpg"],
    "Chupetines Frutillas (30 u)": ["img/chupetinfrutilla1.jpg","img/chupetinfrutilla2.jpg"],
    "Gomitas blandas Astronauta (30 u)": ["img/astronauta2.jpg","img/astronauta1.jpg"],
    "Combo Emprendedor": ["img/boca.jpg", "img/river.jpg", "img/pelotas.jpg","img/lheritier.jpg","img/gelatinaloka.jpg","img/fieritacomefuego.jpg", "img/remerapimball.jpg","img/bombulla.jpg","img/comboemprendedor.jpg"]
  };

  function animarAgregar(btn) {
  console.log("Animado botón", btn);
  if (!btn) return;

  // Vibración (si está disponible))
  if (navigator.vibrate) {
    navigator.vibrate(40);
  }

  btn.classList.remove("animar-agregar");
  void btn.offsetWidth; 
  btn.classList.add("animar-agregar");

  setTimeout(() => {
    btn.classList.remove("animar-agregar");
  }, 400);
}

  let currentImages = [];
  let currentIndex = 0;
  let currentTitle = "";

  let productos = [];
  let productoIndex = 0;

  function abrirModal(card) {

  productoIndex = productos.indexOf(card);

  const titulo = card.querySelector('h3')?.textContent.trim();
  const stock = STOCK_PRODUCTOS[titulo];

  if (stock === 0) return;
  const img = card.querySelector('img');
  const title = card.querySelector('h3');
  const price = card.querySelector('p');

 currentTitle = title ? title.textContent : "Producto";

  const claseVariante = Object.keys(productosVariantes)
  .find(c => card.classList.contains(c));

  if (claseVariante) {
    currentVariantes = productosVariantes[claseVariante];
    currentImages = currentVariantes.map(v => v.img);
    currentTitle = currentVariantes[0].nombre;
  } else {
    currentVariantes = null;
    currentImages = imagenesProducto[currentTitle] || [img?.src || ''];
  }

  currentIndex = 0;

  modal.style.display = 'flex';
  actualizarModal();

  modalTitle.textContent = currentTitle;
  document.getElementById('modal-precio').textContent = price ? price.textContent : '';

  const modalAgregarBtn = document.getElementById('modal-agregar');

  //  SI ES PROMO → SOLO OCULTA EL BOTÓN Y AGRANDA EL MODAL
  if (card.classList.contains('promo')) {
    modalAgregarBtn.style.display = 'inline-block'; // 👈 CAMBIO
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
      video.loop = true;
      video.muted = true;
      video.controls = false;
      video.addEventListener("click", () => {
        if (video.paused) {
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

  //  VARIANTES (alcancías u otros)
  if (currentVariantes) {
    const variante = currentVariantes[currentIndex];

    modalTitle.textContent = variante.nombre;
    document.getElementById('modal-precio').textContent = variante.precio;

    modalAgregarBtn.dataset.producto = variante.nombre;
    modalAgregarBtn.dataset.precio = variante.precio;

  } else {
    //  PRODUCTO NORMAL
    modalTitle.textContent = currentTitle;

    modalAgregarBtn.dataset.producto = currentTitle;
    modalAgregarBtn.dataset.precio = document.getElementById('modal-precio').textContent;
  }

  //  Flechas (LO MISMO QUE TENÍAS)
  if (currentImages.length > 1) {
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
    // contador.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  } else {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    // contador.textContent = '';
  }

  // Reset zoom (LO MISMO QUE TENÍAS)
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
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.style.display = 'none';
      modalImg.classList.remove('zoomed');
    };
  }

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modalImg.classList.remove('zoomed');
    }
  });

  productos = Array.from(document.querySelectorAll('.card'))
  .filter(card => card.style.display !== "none");

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {

    const titulo = card.querySelector('h3')?.textContent || '';
    const stock = STOCK_PRODUCTOS[titulo] ?? null;
    console.log("producto:", titulo, "stock:", stock);

    //  Si el stock es 0 → ocultar producto
    if (stock === 0) {
      card.style.display = "none";
    } else {
      card.style.display = "block";
    }

    // Si queda 1 → mostrar aviso
    if (stock === 1) {
      const aviso = document.createElement('span');
      aviso.className = 'ultimo-stock';
      aviso.textContent = "🔥 Última";
      card.appendChild(aviso);
    }


    const cantidadImgs = imagenesProducto[titulo]?.length || 1;
    if (cantidadImgs > 1) {
      const overlay = document.createElement('span');
      overlay.className = 'mas-fotos';
      overlay.textContent = `+${cantidadImgs - 1} fotos`;
      card.appendChild(overlay);
    }
    card.addEventListener('click', (ev) => {

    const titulo = card.querySelector('h3')?.textContent.trim();
    const stock = STOCK_PRODUCTOS[titulo];

    //  No abrir modal si no hay stock
    if (stock === 0) return;

    if (card.classList.contains('promo')) return;
    if (ev.target.closest('button')) return;

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
  }, 500);
}

  function lanzarConfetti() {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
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
document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const numero = "542236010443";

  const carritoBtn = document.getElementById("carrito-btn");
  const carritoDropdown = document.getElementById("carrito-dropdown");
  const carritoItemsContainer = document.getElementById("carrito-items");
  const carritoCount = document.getElementById("carrito-count");
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
    borderRadius: "12px", background: "#f1ededff",
    display: "none", padding: "15px", width: "300px",
  });

  const parsePrecio = p => parseFloat(p.replace(/[^\d,]/g,"").replace(/\./g,"").replace(",","."))||0;
  const calcularTotal = () => carrito.reduce((a,i)=>a+parsePrecio(i.precio)*i.cantidad,0);

  const btnPagarMP = document.getElementById("btn-pagar-mp");

  btnPagarMP?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (carrito.length === 0) {
      alert("Tu carrito está vacío 🛒");
      return;
    }

    let total = 0;
    let totalProductos = 0;

    carrito.forEach(i => {
      const precioUnitario = parsePrecio(i.precio);
      const subtotal = precioUnitario * i.cantidad;
      total += subtotal;
      totalProductos += i.cantidad;

      if (i.cantidad > 1) {
        msg += `• *${i.nombre}* — ${i.cantidad} x ${i.precio} → *$${subtotal.toLocaleString("es-AR")}*\n`;
      } else {
        msg += `• *${i.nombre}* — ${i.precio}\n`;
      }
    });

    msg += `\n📦 *Total de productos:* ${totalProductos}`;
    msg += `\n💰 *Total a pagar:* $${total.toLocaleString("es-AR")}`;
    msg += `\n\n- Código postal: ${codigoPostalCliente}`;
    msg += `\n- Alguna referencia del domicilio (opcional): `;
    msg += `\n- Teléfono: `;
    msg += `\n- Email: `; 
    msg += `\n- Dirección exacta: `;
    msg += `\n- Provincia y Localidad: `;
    msg += `\n- Nombre y apellido: `;
    msg += `\n\n📩 *Datos necesarios para el envío (Si ya completaste alguna vez, podés omitirlo)👆🏻*`;


    const numero = "542236010443";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  });

  function actualizarCarrito() {
    carritoItemsContainer.innerHTML = carrito.length === 0
      ? "<p class='carrito-vacio'>🛍️ Tu carrito está vacío</p>"
      : carrito.map(i=>`
        <div class='carrito-item'>
          <strong>${i.nombre}${i.precio==0 ? " (REGALO)" : ""}</strong>  ${i.precio || "$0"}<br>
          <button class='cantidad-btn restar' data-nombre='${i.nombre}'>-</button>
          ${i.cantidad}
          <button class='cantidad-btn sumar' data-nombre='${i.nombre}'>+</button>
        </div>
      `).join("");

    const total = calcularTotal();
    carritoCount.textContent = carrito.reduce((a,i)=>a+i.cantidad,0);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    const totalProductos = carrito.reduce((a,i)=>a+i.cantidad,0);
    carritoTotal.innerHTML = `
      <strong>- Cantidad de productos: ${totalProductos}</strong><br>
      <strong>- Total: $${total.toLocaleString("es-AR")}</strong>
    `;

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

    carritoDropdown.addEventListener("mouseenter", () => clearTimeout(carritoTimer));
    carritoDropdown.addEventListener("mouseleave", iniciarTemporizadorCierre);

    carritoBtn?.addEventListener("click", iniciarTemporizadorCierre);
    document.querySelectorAll(".card").forEach(card => {
    const titulo = card.querySelector("h3")?.textContent.trim();
    const stockMax = STOCK_PRODUCTOS[titulo];

    const item = carrito.find(p => p.nombre === titulo);
    const cantidad = item ? item.cantidad : 0;

    if (stockMax !== undefined && cantidad >= stockMax) {
      card.style.display = "none";
    } else {
      card.style.display = "block";
    }
  });
  //cierre

  }

  carritoBtn?.addEventListener("click", () => {
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

  vaciarBtn?.addEventListener("click",()=>{carrito=[];actualizarCarrito();});

  document.addEventListener("click",e=>{
    if (e.target.classList.contains("sumar")) {
    const nombre = e.target.dataset.nombre;
    const item = carrito.find(p => p.nombre === nombre);

    if (!validarStock(nombre, carrito)) return;

    if (item) item.cantidad++;
  }
    if(e.target.classList.contains("restar")){
      const item=carrito.find(p=>p.nombre===e.target.dataset.nombre);
      if(item){
        item.cantidad>1?item.cantidad--:carrito=carrito.filter(p=>p.nombre!==item.nombre);
      }
    }
    if(e.target.classList.contains("carrito-eliminar")){
      carrito=carrito.filter(p=>p.nombre!==e.target.dataset.nombre);
    }
    actualizarCarrito();
  });

  document.querySelectorAll(".btn-carrito, .btn-consulta, #modal-agregar, #modal-consulta")
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

           animarAgregar(btn);
           actualizarCarrito();

          if (stockMax) {

            const productoEnCarrito = carrito.find(p => p.nombre === nombre);
            const cantidadActual = productoEnCarrito ? productoEnCarrito.cantidad : 0;

            if (cantidadActual >= stockMax) {

              document.querySelectorAll(".card").forEach(card => {
                const titulo = card.querySelector("h3")?.textContent.trim();
                console.log("carrito:", nombre);
                console.log("card:", titulo);
                if (titulo === nombre) {
                  card.style.display = "none";
                }
              });
            }
          }
          
          mostrarToast("Producto agregado al carrito 🛒", "warning");
        }
        else if (texto.includes("promo")) {
          const msg = "💬 Hola, quiero consultar sobre *" + nombre + "*.";
          window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`, "_blank");
        }
      });
    });

document.getElementById("enviar-carrito")?.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 🛒");
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

  //  Compra mínima
  if (total < minimoCompra) {
    alert(`⚠️ La compra mínima es de $${minimoCompra.toLocaleString("es-AR")}`);
    return;
  }

  //  Abrir modal de código postal
  const modalCP = document.getElementById("modal-cp");
  const inputCP = document.getElementById("cp-input");
  inputCP.value = "";
  modalCP.style.display = "flex";

  //  Esperar confirmación del usuario

  // Botón cancelar del modal de código postal
  const cpCancelar = document.getElementById("cp-cancelar");
  if (cpCancelar) {
    cpCancelar.onclick = () => {
      const modalCP = document.getElementById("modal-cp");
      if (modalCP) {
        modalCP.style.display = "none"; // cierra el modal
      }
    };
  }

  // Botón confirmar código postal
  const btnRetirarMiramar = document.getElementById("retirar-miramar");

  btnRetirarMiramar?.addEventListener("click", () => {

    const costoEnvio = 0; // Igual que Miramar
    const totalFinal = total + costoEnvio;

    let mensajeRegalo = "";

    if (PROMO_ACTIVA === "regalo" && total >= minimoRegalo) {
      mensajeRegalo = `\n🎁 ¡Tu compra incluye: ${REGALO_NOMBRE} de regalo!`;
    }

    msg += mensajeRegalo;
    totalProductos += (PROMO_ACTIVA === "regalo" && total >= minimoRegalo) ? 1 : 0;
    msg += `\n📦 *Total de productos:* ${totalProductos}`;
    msg += `\n🚚 *Envío:* $0`;
    msg += `\n\n💳 *Total a pagar:* $${totalFinal.toLocaleString("es-AR")}`;

    msg += `\n\n📍 *Retiro en Miramar*`;

    const numero = "542236010443";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    modalCP.style.display = "none";
  });

  const cpConfirmar = document.getElementById("cp-confirmar");
  cpConfirmar.onclick = () => {
    const codigoPostalCliente = inputCP.value.trim();
    const esMiramar = codigoPostalCliente.startsWith("7607");


    if (!codigoPostalCliente) {
      alert("⚠️ Por favor, ingresá tu código postal.");
      return;
    }

    //  Validación de código postal
    if (!/^\d{4,8}$/.test(codigoPostalCliente)) {
      alert("⚠️ Código postal inválido. Ingresá solo números (4 a 8 dígitos).");
      return;
    }

    let costoEnvio;

    if (PROMO_ACTIVA === "envio" && total >= 80000) {
      costoEnvio = 0;
    } else {
      costoEnvio = calcularCostoEnvio(codigoPostalCliente);
    }

    const totalFinal = total + costoEnvio;

    let mensajeRegalo = "";

    if (PROMO_ACTIVA === "regalo" && total >= minimoRegalo) {
        mensajeRegalo = `\n🎁 ¡Tu compra incluye: ${REGALO_NOMBRE} de regalo!`;
    } else {
        mensajeRegalo = ""; 
    }

    msg += mensajeRegalo;
    totalProductos += (PROMO_ACTIVA === "regalo" && total >= minimoRegalo) ? 1 : 0;
    msg += `\n📦 *Total de productos:* ${totalProductos}`;
    msg += `\n🚚 *Envío:* $${costoEnvio.toLocaleString("es-AR")}`;
    msg += `\n\n💳 *Total a pagar (con envío incluido):* $${totalFinal.toLocaleString("es-AR")}`;

    if (esMiramar) {
    msg += `\n\n📍 *Entrega en Miramar*`;
    
  } else {
    msg += `\n\n- Código postal: ${codigoPostalCliente}`;
    msg += `\n- Alguna referencia del domicilio (opcional): `;
    msg += `\n- Teléfono: `;
    msg += `\n- Email: `; 
    msg += `\n- Dirección exacta: `;
    msg += `\n- Provincia y Localidad: `;
    msg += `\n- Nombre y apellido: `;
    msg += `\n\n📩 *Datos necesarios para el envío (Si ya completaste alguna vez, podés omitirlo)👆🏻*`;
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
      aviso.innerHTML = `🎁 <strong>¡Tu compra incluye: ${REGALO_NOMBRE} de regalo!</strong>`;
    } else {
      const falta = minimoRegalo - total;
      aviso.innerHTML = `🎁 Sumá <strong>$${falta.toLocaleString("es-AR")}</strong> y llevate un regalo!`;
    }
    aviso.style.display = "block";
    return;
  }

  if (PROMO_ACTIVA === "envio") {
    if (envioManualGratis || total >= 80000) {
      aviso.innerHTML = "🎉 <strong>¡Tenés envío gratis!</strong>";
      aviso.style.display = "block";

      if (!estadoEnvio.toastMostrado) {
        mostrarToast("🎉 Tenés envío gratis! ✨", "fiesta", 1500);
        setTimeout(() => lanzarConfetti(), 1500);
        estadoEnvio.toastMostrado = true;
      }
    } else {
      const falta = 80000 - total;
      aviso.innerHTML = `Sumá <strong>$${falta.toLocaleString("es-AR")}</strong> y conseguí <b>envío gratis</b>`;
      aviso.style.display = "block";
    }
    return;
  }

  if (PROMO_ACTIVA === "ninguna") {
    if (total < minimoCompra) {
      aviso.innerHTML = `🛍️ La compra mínima es de $${minimoCompra.toLocaleString("es-AR")}`;
      aviso.style.display = "block";
    } 
    else {
      aviso.innerHTML = `🛍️ La compra mínima es de $${minimoCompra.toLocaleString("es-AR")}`;
      aviso.style.display = "block";
    }
  }
}

// ========================
// SINCRONIZAR CARRITO CON PRODUCTOS DEL HTML 
// ========================
function sincronizarCarritoConHTML() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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

    // Producto eliminado → se quita del carrito
    if (precioActual === undefined) {
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