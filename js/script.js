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
  const contador = document.createElement('span');

  prevBtn.textContent = '<';
  nextBtn.textContent = '>';
  prevBtn.classList.add('prev');
  nextBtn.classList.add('next');
  contador.classList.add('contador');

  modalContent.appendChild(prevBtn);
  modalContent.appendChild(nextBtn);
  modalContent.appendChild(contador);

  // Productos
  const imagenesProducto = {
    "Alcancía con 12 gelatinas pingüino negro": ["img/pinguino2.jpg","img/pinguino5.jpg","img/pinguino3.jpg","img/pinguino4.jpg","img/pinguino6.jpg"],
    "Chupetines Merlina (30u)": ["img/merlina1.jpg","img/merlina2.jpg","img/merlina3.jpg","img/merlina4.jpg"],
    "Chupetin con polvo acido Brain(30u)": ["img/braincaja.jpg","img/chupetinBrain.jpg"],
    "Chupetin con polvo acido skull (30u)": ["img/chupetinConAcido.jpg","img/cajaChupetinAcido.jpg"],
    "Autos de carrera con chicles(30u)": ["img/carrera.jpg","img/reversacarrera.jpg"],
    "Brochetas de ojos (30u)": ["img/brochetas2.jpg", "img/brochetas3.jpg",],
    "Camiseta pimball + pastillitas (30)": ["img/pimballremera.jpg","img/reversaremera.jpg","img/r1.jpg","img/r2.jpg"],
    "Celu + chicles(30u)": ["img/pimballip.jpg","img/reversaip.jpg"],
    "Chupetin Calabaza conpolvo ácido (30u)": ["img/chupetincalabaza1.jpg","img/chupetincalabaza2.jpg"],
    "Chupetines con formas (30u) ": ["img/chupetinesconformas1.jpg","img/chupetinesconformas2.jpg"],
    "Halloween chupetines (30u)": ["img/halloween1.jpg","img/halloween2.jpg","img/halloween3.jpg","img/halloween4.jpg"],
    "Gelatinas con formas (30u)": ["img/gelatinaDiferentesSabores4.jpg","img/gelatinaDiferentesSabores3.jpg","img/gelatinaDiferentesSabores2.jpg","img/gelatinaDiferentesSabores5.jpg","img/gelatinaDiferentesSabores1.jpg"],
    "Chupetines de Corona con con led (30u)": ["img/chupetinesconled1.jpg","img/corona2.jpg"],
    "Gomitas Monstruo (30u)": ["img/gomitablandaCara2.jpg","img/gomitablandaCara3.jpg"],
    "Cool Mint sabores frutales (30u)": ["img/coolmint.jpg","img/coolmint2.jpg"],
    "Trompetas con chupetin y sonido (30u)": ["img/trompeta1.jpg","img/trompetas.jpg"],
    "Sorpresa capibara + chicles (30u)": ["img/sorpresacapibara1.jpg","img/sorpresacapibara2.jpg"],
    "Sorpresa plantas vs Zombies y chicles (30u)": ["img/sorpresaplant2.jpg","img/sorpresaplant.jpg"],
    "Gomitas blandas Fantasmita (30u)": ["img/fantasmitas.jpg","img/fantasmitas2.jpg"],
    "Gomitas blandas Batman (30u)": ["img/batman1.jpg","img/batman2.jpg"],
    "Monedas de chocolate (250u)": ["img/monedas1.jpg","img/monedas2.jpg"],
    "Gomitas ojo-boca (30u)": ["img/gomitasoh1.jpg","img/gomitasoh.jpg"],
    "Gomitas blandas Kuromy (30u)": ["img/gomitasblandas7.jpg","img/gomitasblandas71.jpg"],
    "Chupetines Capibara (30u)": ["img/chupetincapibara1.jpg","img/chupetincapibara2.jpg"],
    "Chupetines con forma de conejo (30u)": ["img/conejos1.jpg","img/conejos3.jpg"],
    "Chupetines con forma de unicornio (30u)":["img/unicornio2.jpg","img/unicornio1.jpg","img/unicornio3.jpg"],
    "Mechas magicas (30u)":["img/mechasMario2.jpg", "img/mecha.jpg",],
    "Gomitas blandas Super Mario (30u)": ["img/supermario1.jpg","img/supermario2.jpg"],
    "Saca lenguas (30u)": ["img/sacalenguas1.jpg","img/sacalenguas2.jpg"],
    "Chupetines con led Mc Donalds (30u)": ["img/mc.jpg","img/mc2.jpg",],
    "Chupetines con led Oreo (30u)": ["img/oreo1.jpg","img/oreo2.jpg",],
    "Chupetines con led unicornio (30u)": ["img/unicornioled1.jpg","img/unicornioled2.jpg"],
    "Gomitas ojo-boca-ojo (30u)": ["img/gomitasoh1.jpg","img/gomitasoh.jpg"],
  };

  let currentImages = [];
  let currentIndex = 0;
  let currentTitle = "";

  function abrirModal(card) {
    const img = card.querySelector('img');
    const title = card.querySelector('h3');
    const price = card.querySelector('p');

    currentTitle = title ? title.textContent : "Producto";
    currentImages = imagenesProducto[currentTitle] || [img?.src || ''];
    currentIndex = 0;

    modal.style.display = 'flex';
    actualizarModal();

    modalTitle.textContent = currentTitle;
    document.getElementById('modal-precio').textContent = price ? price.textContent : '';

    const modalAgregarBtn = document.getElementById('modal-agregar');
    const modalConsultaBtn = document.getElementById('modal-consulta');
    if (modalAgregarBtn) {
      modalAgregarBtn.dataset.producto = currentTitle;
      modalAgregarBtn.dataset.precio = price ? price.textContent : '';
    }
    if (modalConsultaBtn) {
      modalConsultaBtn.dataset.producto = currentTitle;
      modalConsultaBtn.dataset.precio = price ? price.textContent : '';
    }

    if (modalAgregarBtn) {
      const textoPrecio = price ? price.textContent.toLowerCase() : '';
      if (textoPrecio.includes('sin stock')) {
        modalAgregarBtn.style.display = 'none';
      } else {
        modalAgregarBtn.style.display = 'inline-block';
      }
    }
  }

  function actualizarModal() {
    modalImg.src = currentImages[currentIndex] || '';
    modalTitle.textContent = currentTitle;

    if (currentImages.length > 1) {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
      contador.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    } else {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      contador.textContent = '';
    }
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

  modalImg.onclick = () => {
    if (currentImages.length > 1) {
      currentIndex = (currentIndex + 1) % currentImages.length;
      actualizarModal();
      return;
    }
    modalImg.classList.toggle('zoomed');
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

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const titulo = card.querySelector('h3')?.textContent || '';
    const cantidadImgs = imagenesProducto[titulo]?.length || 1;
    if (cantidadImgs > 1) {
      const overlay = document.createElement('span');
      overlay.className = 'mas-fotos';
      overlay.textContent = `+${cantidadImgs - 1} fotos`;
      card.appendChild(overlay);
    }
    card.addEventListener('click', (ev) => {
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

  // 👇 Cerrar al hacer click
  toast.onclick = () => {
    toast.classList.remove("show");
    setTimeout(() => toast.style.display = "none", 200);
  };

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.style.display = "none", 400);
  }, 2000);
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

  let envioGratisToastMostrado = false;


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

    let msg = "💳 *Pedido listo para abonar*\n\n";
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
    msg += `\n\n📩 *Datos necesarios para el Correo*`;
    msg += `\nPor favor envianos estos datos 👇`;
    msg += `\n\n- Nombre y apellido:`;
    msg += `\n- CUIL/DNI:`;
    msg += `\n- Localidad:`;
    msg += `\n- Provincia:`;
    msg += `\n- Dirección exacta:`;
    msg += `\n- Código postal:`;
    msg += `\n- Teléfono:`;
    msg += `\n- Email:`;

    msg += `\n\n💳 *Datos para abonar por Mercado Pago*`;
    msg += `\nNombre: Ana Maria Montiel`;
    msg += `\nAlias: *ana.maria.montiel*`;
    msg += `\nCVU: 0000003100012664749584`;
    msg += `\nCUIT/CUIL: 27-20845773-5`;

    msg += `\n💰 *Total a pagar:* $${total.toLocaleString("es-AR")}`;
    msg += `\n\n📸 Una vez realizado el pago, por favor envianos el comprobante para verificar y continuar con el envío 📦`;


    const numero = "542236010443";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  });



  function actualizarCarrito() {
    carritoItemsContainer.innerHTML = carrito.length === 0
      ? "<p class='carrito-vacio'>🛍️ Tu carrito está vacío</p>"
      : carrito.map(i=>`
        <div class='carrito-item'>
          <strong> ${i.nombre}</strong>  ${i.precio}<br>
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
      // Limpiamos cualquier temporizador previo
      clearTimeout(carritoTimer);

      // Solo si el carrito está abierto
      if (carritoDropdown.style.display === "block") {
        carritoTimer = setTimeout(() => {
          carritoDropdown.style.display = "none";
          fondoModal.style.display = "none";
        }, 10000); // 10 segundos
      }
    }

    // Reiniciar temporizador cuando el usuario interactúa con el carrito
    carritoDropdown.addEventListener("mouseenter", () => clearTimeout(carritoTimer));
    carritoDropdown.addEventListener("mouseleave", iniciarTemporizadorCierre);

    // Reiniciar temporizador cada vez que se abre el carrito
    carritoBtn?.addEventListener("click", iniciarTemporizadorCierre);


  }

  carritoBtn?.addEventListener("click",()=>{
    const visible = carritoDropdown.style.display==="block";
    carritoDropdown.style.display = visible?"none":"block";
    fondoModal.style.display = visible?"none":"block";
  });

  fondoModal.addEventListener("click",()=>{
    carritoDropdown.style.display="none";
    fondoModal.style.display="none";
  });

  function cerrarModal() {
    carritoDropdown.style.display = "none";
    fondoModal.style.display = "none";
  }

  document.getElementById("salir-carrito")?.addEventListener("click", cerrarModal);

  vaciarBtn?.addEventListener("click",()=>{carrito=[];actualizarCarrito();});

  document.addEventListener("click",e=>{
    if(e.target.classList.contains("sumar")){
      const item=carrito.find(p=>p.nombre===e.target.dataset.nombre);
      if(item)item.cantidad++;
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
        let nombre = card?.querySelector("h3")?.innerText || document.getElementById("modal-title")?.innerText;
        let precio = card?.querySelector("p")?.innerText || document.getElementById("modal-precio")?.innerText;
        const texto = btn.innerText.toLowerCase();

        if (texto.includes("agregar")) {
          const ex = carrito.find(p => p.nombre === nombre);
          if (ex) ex.cantidad++;
          else carrito.push({ nombre, precio, cantidad: 1 });
          actualizarCarrito();
          mostrarToast("Producto agregado al carrito 🛒", "warning");
          if (typeof modal !== "undefined" && modal?.style?.display === "flex") modal.style.display = "none";
          //carritoDropdown.style.display = "block";
          //fondoModal.style.display = "block";
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

  carrito.forEach(i => {
    const precioUnitario = parsePrecio(i.precio);
    const subtotal = precioUnitario * i.cantidad;
    total += subtotal;
    totalProductos += i.cantidad;

    // 🔹 Sin numeración
    if (i.cantidad > 1) {
      msg += `• *${i.nombre}* — *${i.cantidad}* x ${i.precio} → *$${subtotal.toLocaleString("es-AR")}*\n`;
    } else {
      msg += `• *${i.nombre}* — ${i.precio}\n`;
    }
  });
  
  // 🔴 COMPRA MÍNIMA
if (total < 50000) {
  alert("⚠️ La compra mínima es de $50.000");
  return;
}

// 🔹 Totales separados
msg += `\n📦 *Total de productos:* ${totalProductos}`;
msg += `\n💰 *Total a pagar:* $${total.toLocaleString("es-AR")}`;

// 🔹 Envío
if (total >= 80000) {
  msg += `\n\n🚚 *Envío:* GRATIS`;
  msg += `\n\n📩 *Datos necesarios para el Correo*`;
  msg += `\nPor favor envíanos estos datos 👇`;
  msg += `\n\n- Nombre y apellido:`;
  msg += `\n- Localidad:`;
  msg += `\n- Provincia:`;
  msg += `\n- Dirección exacta:`;
  msg += `\n- Código postal:`;
  msg += `\n- Teléfono:`;
  msg += `\n- Email:`;

  // 👉 SOLO SI ES ENVÍO GRATIS → DATOS DE PAGO
//  msg += `\n\n💳 *Datos para abonar por Mercado Pago*`;
 // msg += `\nNombre: Ana Maria Montiel`;
  //msg += `\nAlias: *ana.maria.montiel*`;
 // msg += `\nCVU: 0000003100012664749584`;
 // msg += `\nCUIT/CUIL: 27-20845773-5`;

 //msg += `\n💰 *Total a pagar:* $${total.toLocaleString("es-AR")}`;
  //msg += `\n\n📸 Una vez realizado el pago, por favor envianos el comprobante para verificar y continuar con el envío 📦`;
} else {
  // 👉 SI NO LLEGA A ENVÍO GRATIS
  msg += `\n\n🚚 *Envío:* a completar`;
  msg += `\n\n📩 *Datos necesarios para el Correo*`;
  msg += `\nPor favor envíanos estos datos 👇`;
  msg += `\n\n- Nombre y apellido:`;
  msg += `\n- Localidad:`;
  msg += `\n- Provincia:`;
  msg += `\n- Dirección exacta:`;
  msg += `\n- Código postal:`;
  msg += `\n- Teléfono:`;
  msg += `\n- Email:`;
}

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
});


  actualizarCarrito();
});

// ========================
// AVISO ENVÍO GRATIS
// ========================
function actualizarAvisoEnvioGratis(total) {
  const aviso = document.getElementById("aviso-envio-gratis");
  if (!aviso) return;

  const envioGratisDesde = 80000;

  if (total >= envioGratisDesde) {
    aviso.innerHTML = "🎉 <strong>¡Tenés envío gratis!</strong>";
    aviso.style.display = "block";
  if (!envioGratisToastMostrado) {
    mostrarToast("🎉 Tenés ENVÍO GRATIS 🚚✨","fiesta",1500);

    setTimeout(() => {
      lanzarConfetti();
      }, 1500);

    envioGratisToastMostrado = true;

    }
  } else {
    const falta = envioGratisDesde - total;
    aviso.innerHTML = `🚚 Sumá <strong>$${falta.toLocaleString("es-AR")}</strong> y conseguí <b>envío gratis</b>`;
    aviso.style.display = "block";

    //  Si vuelve a bajar, permitimos que vuelva a disparar
    envioGratisToastMostrado = false;
  }
}

const btn = document.getElementById("whatsapp-btn");


if (btn) {
  btn.addEventListener("click", () => {
  const numero = "542236010443";
  const mensaje = "Hola! Vengo del catálogo y tengo una consulta...";
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, "_blank");
  })
};

