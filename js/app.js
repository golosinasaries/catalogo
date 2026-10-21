function productoTieneCategoria(producto, categoria) {
  return producto.categoria === categoria ||
    (Array.isArray(producto.categoriasAdicionales) &&
      producto.categoriasAdicionales.includes(categoria));
}
"use strict";

const WHATSAPP = "542236010443";
const MINIMO_COMPRA = 50000;
const ENVIO_GRATIS_DESDE = 120000;

const REGALO_DESDE = 50000;
const REGALO_NOMBRE = "1 Alcancía";
const REGALO_IMAGEN = "img/tigrerojo.png";

// Las promociones se pueden activar o desactivar independientemente.
const PROMOS_ACTIVAS = ["envio"];


const STOCK_PRODUCTOS = {
  "Caramelos Super Acidos Lipo (454 g)": 1,
};

function obtenerStockMaximo(producto) {
  const nombre = String(producto?.nombre || "");

  if (Object.prototype.hasOwnProperty.call(STOCK_PRODUCTOS, nombre)) {
    const valor = Number(STOCK_PRODUCTOS[nombre]);
    return Number.isFinite(valor) ? Math.max(0, Math.floor(valor)) : 0;
  }

  // Compatibilidad con los productos que todavía usan "agotado".
  return producto?.agotado === true ? 0 : undefined;
}

function cantidadEnCarritoPorNombre(nombre) {
  return estado.carrito
    .filter((item) => item.nombre === nombre)
    .reduce((total, item) => total + Number(item.cantidad || 0), 0);
}

function obtenerStockRestante(producto) {
  const maximo = obtenerStockMaximo(producto);
  if (maximo === undefined) return undefined;

  return Math.max(
    0,
    maximo - cantidadEnCarritoPorNombre(String(producto?.nombre || ""))
  );
}

function mostrarAvisoStock(mensaje) {
  let aviso = document.getElementById("aviso-stock-flotante");

  if (!aviso) {
    aviso = document.createElement("div");
    aviso.id = "aviso-stock-flotante";
    aviso.className = "aviso-stock-flotante";
    aviso.setAttribute("role", "alert");
    aviso.setAttribute("aria-live", "assertive");
    document.body.append(aviso);
  }

  aviso.textContent = mensaje;
  aviso.classList.add("visible");

  if (aviso._temporizador) clearTimeout(aviso._temporizador);

  aviso._temporizador = setTimeout(() => {
    aviso.classList.remove("visible");
  }, 3000);
}

function promoActiva(nombre) {
  return PROMOS_ACTIVAS.includes(nombre);
}

function tieneRegaloGratis(subtotal) {
  return promoActiva("regalo") && subtotal >= REGALO_DESDE;
}
const estado = {
  productos: [],
  carrito: [],
  categoria: "Todas",
  busqueda: ""
};
try {
  const carritoGuardado = JSON.parse(
    localStorage.getItem("carritoCliente") || "[]"
  );

  if (Array.isArray(carritoGuardado)) {
    estado.carrito = carritoGuardado.filter(
      (item) =>
        item &&
        item.id !== undefined &&
        Number.isFinite(Number(item.precio)) &&
        Number.isFinite(Number(item.cantidad)) &&
        Number(item.cantidad) > 0
    ).map((item) => ({
      ...item,
      cantidad: Number(item.cantidad)
    }));
  }
} catch {
  estado.carrito = [];
}

const formatoPrecio = (valor) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(valor).replace(/\s/g, "");

const elementos = {
  abrir: document.querySelector("#abrir-carrito"),
  cerrar: document.querySelector("#cerrar-carrito"),
  panel: document.querySelector("#panel-carrito"),
  fondo: document.querySelector("#fondo-panel"),
  cantidad: document.querySelector("#cantidad-carrito"),
  items: document.querySelector("#items-carrito"),
  total: document.querySelector("#total-carrito"),
  finalizar: document.querySelector("#finalizar-pedido"),
  busqueda: document.querySelector("#busqueda"),
  productos: document.querySelector("#productos"),
  categorias: document.querySelector("#categorias")
};

function abrirCarrito() {
  elementos.panel.classList.add("abierto");
  elementos.fondo.classList.add("visible");
  elementos.panel.setAttribute("aria-hidden", "false");
}

function cerrarCarrito() {
  elementos.panel.classList.remove("abierto");
  elementos.fondo.classList.remove("visible");
  elementos.panel.setAttribute("aria-hidden", "true");
}

function animarImagenAlCarrito(imagen) {
  const carrito = document.getElementById("abrir-carrito");
  if (!imagen || !carrito) return;

  const origen = imagen.getBoundingClientRect();
  const destino = carrito.getBoundingClientRect();

  if (!origen.width || !origen.height) return;

  const vuelo = imagen.cloneNode(true);
  vuelo.removeAttribute("loading");

  vuelo.style.position = "fixed";
  vuelo.style.left = origen.left + "px";
  vuelo.style.top = origen.top + "px";
  vuelo.style.width = origen.width + "px";
  vuelo.style.height = origen.height + "px";
  vuelo.style.margin = "0";
  vuelo.style.zIndex = "99999";
  vuelo.style.pointerEvents = "none";
  vuelo.style.objectFit = "contain";
  vuelo.style.borderRadius = "12px";
  vuelo.style.boxShadow = "0 8px 25px rgba(80, 20, 45, 0.25)";
  vuelo.style.transition = "transform 650ms cubic-bezier(.2,.75,.25,1), opacity 650ms ease";

  document.body.appendChild(vuelo);

  const moverX = destino.left + destino.width / 2 - (origen.left + origen.width / 2);
  const moverY = destino.top + destino.height / 2 - (origen.top + origen.height / 2);

  vuelo.getBoundingClientRect();

  requestAnimationFrame(() => {
    vuelo.style.transform = `translate(${moverX}px, ${moverY}px) scale(0.15) rotate(12deg)`;
    vuelo.style.opacity = "0.25";
  });

  vuelo.addEventListener("transitionend", () => vuelo.remove(), { once: true });
  setTimeout(() => vuelo.remove(), 900);
}
function normalizarNombreProducto(nombre) {
return String(nombre || "")
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, "")
.toLocaleLowerCase("es-AR")
.replace(/[–—-]/g, " ")
.replace(/[^\p{L}\p{N}]+/gu, " ")
.trim()
.replace(/\s+/g, " ");
}
const historialModalesDetalle = [];

function cerrarDetalleProducto() {
  const fondo = document.querySelector(".modal-detalle-fondo");
  if (!fondo) return;

  if (historialModalesDetalle.length > 0) {
    const anterior = historialModalesDetalle.pop();
    fondo.replaceChildren(anterior.elemento);

    requestAnimationFrame(() => {
      const modal = fondo.querySelector(".modal-detalle");
      const lista = fondo.querySelector(".lista-incluidos");

      if (modal) modal.scrollTop = anterior.scrollModal;
      if (lista) lista.scrollTop = anterior.scrollLista;
      window.scrollTo(0, anterior.scrollVentana);
    });

    return;
  }

  fondo.remove();
}

function abrirImagenPantallaCompleta(imagenOriginal, productoInicial = null) {
  if (!imagenOriginal || !imagenOriginal.src) return;

  document.querySelector(".visor-imagen-fondo")?.remove();

  const fondoImagen = document.createElement("div");
  fondoImagen.className = "visor-imagen-fondo";
  fondoImagen.setAttribute("role", "dialog");
  fondoImagen.setAttribute("aria-modal", "true");
  fondoImagen.setAttribute("aria-label", "Imagen ampliada del producto");

  const cerrarImagen = document.createElement("button");
  cerrarImagen.type = "button";
  cerrarImagen.className = "visor-imagen-cerrar";
  cerrarImagen.textContent = "×";
  cerrarImagen.setAttribute("aria-label", "Cerrar imagen ampliada");

  const imagenAmpliada = document.createElement("img");
  imagenAmpliada.className = "visor-imagen";
  imagenAmpliada.src = imagenOriginal.src;
  imagenAmpliada.alt = imagenOriginal.alt;
  imagenAmpliada.draggable = false;

  const controles = document.createElement("div");
  controles.className = "visor-imagen-controles";

  const alejar = document.createElement("button");
  alejar.type = "button";
  alejar.textContent = "−";
  alejar.setAttribute("aria-label", "Alejar imagen");

  const nivelZoom = document.createElement("span");
  nivelZoom.className = "visor-imagen-nivel";
  nivelZoom.textContent = "100%";

  const acercar = document.createElement("button");
  acercar.type = "button";
  acercar.textContent = "+";
  acercar.setAttribute("aria-label", "Acercar imagen");

  const restablecer = document.createElement("button");
  restablecer.type = "button";
  restablecer.textContent = "Restablecer";
  restablecer.className = "visor-imagen-restablecer";


  let zoom = 1;
  let productoActual = productoInicial;
  let inicioX = 0;
  let inicioY = 0;
  let distanciaInicial = 0;
  let zoomInicial = 1;
  let gestoDePinza = false;

  function actualizarZoom(nuevoZoom) {
    zoom = Math.max(1, Math.min(5, nuevoZoom));
    imagenAmpliada.style.transform = "scale(" + zoom + ")";
    imagenAmpliada.style.cursor = zoom > 1 ? "zoom-out" : "zoom-in";
    nivelZoom.textContent = Math.round(zoom * 100) + "%";
  }

  function cerrarVisor() {
    document.removeEventListener("keydown", manejarTeclado);
    fondoImagen.remove();
  }

  function manejarTeclado(evento) {
    if (evento.key === "Escape") cerrarVisor();
    if (evento.key === "+" || evento.key === "=") actualizarZoom(zoom + 0.25);
    if (evento.key === "-") actualizarZoom(zoom - 0.25);
  }

  function productosVisibles() {
    return estado.productos.filter((p) => {
      if (p.oculto === true) return false;
      const nombre = (p.nombre || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("es-AR");

      const categoriaCoincide =
        Boolean(estado.busqueda) || estado.categoria === "Todas" || productoTieneCategoria(p, estado.categoria);

      const busquedaCoincide =
        !estado.busqueda ||
        nombre.includes(
          estado.busqueda.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase("es-AR")
        );

      return categoriaCoincide && busquedaCoincide;
    });
  }

  function cambiarProducto(direccion) {
    const lista = productosVisibles();
    if (!lista.length) return;

    let indice = lista.findIndex((p) =>
      productoActual && p.id === productoActual.id
    );

    if (indice < 0) indice = 0;

    indice = (indice + direccion + lista.length) % lista.length;
    productoActual = lista[indice];

    imagenAmpliada.src = productoActual.imagen;
    imagenAmpliada.alt = productoActual.nombre;
    imagenOriginal.src = productoActual.imagen;
    imagenOriginal.alt = productoActual.nombre;
    actualizarZoom(1);
  }

  function distanciaDedos(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  }

  fondoImagen.addEventListener("touchstart", (evento) => {
    if (evento.touches.length === 2) {
      gestoDePinza = true;
      distanciaInicial = distanciaDedos(evento.touches);
      zoomInicial = zoom;
    } else if (evento.touches.length === 1) {
      gestoDePinza = false;
      inicioX = evento.touches[0].clientX;
      inicioY = evento.touches[0].clientY;
    }
  }, { passive: true });

  fondoImagen.addEventListener("touchmove", (evento) => {
    if (evento.touches.length === 2 && distanciaInicial > 0) {
      evento.preventDefault();
      gestoDePinza = true;
      actualizarZoom(
        zoomInicial * distanciaDedos(evento.touches) / distanciaInicial
      );
    }
  }, { passive: false });

  fondoImagen.addEventListener("touchend", (evento) => {
    if (gestoDePinza) {
      if (evento.touches.length === 0) {
        gestoDePinza = false;
        distanciaInicial = 0;
      }
      return;
    }

    if (evento.changedTouches.length !== 1 || evento.touches.length !== 0 || zoom > 1 || !productoActual) return;

    const dedo = evento.changedTouches[0];
    const dx = dedo.clientX - inicioX;
    const dy = dedo.clientY - inicioY;

    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      cambiarProducto(dx < 0 ? 1 : -1);
    }
  }, { passive: true });
  acercar.addEventListener("click", () => actualizarZoom(zoom + 0.25));
  alejar.addEventListener("click", () => actualizarZoom(zoom - 0.25));
  restablecer.addEventListener("click", () => actualizarZoom(1));
  cerrarImagen.addEventListener("click", cerrarVisor);

  fondoImagen.addEventListener("click", (evento) => {
    if (evento.target === fondoImagen) cerrarVisor();
  });

  fondoImagen.addEventListener("wheel", (evento) => {
    evento.preventDefault();
    actualizarZoom(zoom + (evento.deltaY < 0 ? 0.2 : -0.2));
  }, { passive: false });

  controles.append(alejar, nivelZoom, acercar, restablecer);
  fondoImagen.append(cerrarImagen, imagenAmpliada, controles);
  document.body.append(fondoImagen);
  document.addEventListener("keydown", manejarTeclado);
  cerrarImagen.focus();
}
function abrirDetalleProducto(producto, navegar = false, apilar = false) {
  const fondoExistente = navegar ? document.querySelector(".modal-detalle-fondo") : null;

  if (!fondoExistente) {
    document.querySelector(".modal-detalle-fondo")?.remove();
    historialModalesDetalle.length = 0;
  } else if (apilar && fondoExistente.firstElementChild) {
        const modalActual = fondoExistente.querySelector(".modal-detalle");
    const listaActual = fondoExistente.querySelector(".lista-incluidos");

    historialModalesDetalle.push({
      elemento: fondoExistente.firstElementChild,
      scrollModal: modalActual?.scrollTop || 0,
      scrollLista: listaActual?.scrollTop || 0,
      scrollVentana: window.scrollY || 0
    });
  }

  const fondo = fondoExistente || document.createElement("div");
  fondo.className = "modal-detalle-fondo";

  const modal = document.createElement("section");
  modal.className = "modal-detalle";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "titulo-detalle-producto");

  const cerrar = document.createElement("button");
  cerrar.type = "button";
  cerrar.className = "cerrar-modal-detalle";
  cerrar.textContent = "×";
  cerrar.setAttribute("aria-label", "Cerrar detalle");
  cerrar.addEventListener("click", cerrarDetalleProducto);

  const zonaImagen = document.createElement("div");
  zonaImagen.className = "zona-imagen-detalle";

  const fotosMultiplesDetalle = {
    "Gomitas Fantasmita (30u)": ["img/fantasmitas.jpg", "img/fantasmitas2.jpg"],
    "iPhone Pinball con pastillitas (30u)": ["img/iphone.png", "img/iphone2.png"],
  };

  const fotosDetalle = fotosMultiplesDetalle[producto.nombre] || [producto.imagen];
  let indiceFotoDetalle = 0;
  zonaImagen.classList.add("carrusel-detalle");

  const imagen = document.createElement("img");
  imagen.className = "imagen-detalle-producto";
  imagen.src = fotosDetalle[indiceFotoDetalle];
  imagen.alt = producto.nombre;
  imagen.tabIndex = 0;
  imagen.setAttribute("role", "button");
  imagen.setAttribute("aria-label", "Ampliar imagen de " + producto.nombre);
  imagen.title = "Tocá para ampliar la imagen";
  imagen.addEventListener("click", () => abrirImagenPantallaCompleta(imagen, producto));
  imagen.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      abrirImagenPantallaCompleta(imagen, producto);
    }
  });

  zonaImagen.append(imagen);

  if (fotosDetalle.length > 1) {
    const indicadorDetalle = document.createElement("span");
    indicadorDetalle.className = "indicador-variante";
    indicadorDetalle.setAttribute("aria-live", "polite");
    indicadorDetalle.textContent = "1/" + fotosDetalle.length;

    const cambiarFotoDetalle = (direccion) => {
      indiceFotoDetalle = (indiceFotoDetalle + direccion + fotosDetalle.length) % fotosDetalle.length;
      imagen.src = fotosDetalle[indiceFotoDetalle];
      imagen.alt = producto.nombre + " - foto " + (indiceFotoDetalle + 1);
      indicadorDetalle.textContent = (indiceFotoDetalle + 1) + "/" + fotosDetalle.length;
    };

    const anteriorDetalle = document.createElement("button");
    anteriorDetalle.type = "button";
    anteriorDetalle.className = "flecha-variante izquierda";
    anteriorDetalle.textContent = "‹";
    anteriorDetalle.setAttribute("aria-label", "Foto anterior");
    anteriorDetalle.addEventListener("click", (evento) => {
      evento.stopPropagation();
      cambiarFotoDetalle(-1);
    });

    const siguienteDetalle = document.createElement("button");
    siguienteDetalle.type = "button";
    siguienteDetalle.className = "flecha-variante derecha";
    siguienteDetalle.textContent = "›";
    siguienteDetalle.setAttribute("aria-label", "Foto siguiente");
    siguienteDetalle.addEventListener("click", (evento) => {
      evento.stopPropagation();
      cambiarFotoDetalle(1);
    });

    zonaImagen.append(anteriorDetalle, siguienteDetalle, indicadorDetalle);
  }

  if (producto.agotado === true || obtenerStockRestante(producto) === 0) {
    const etiqueta = document.createElement("span");
    etiqueta.className = "etiqueta-sin-stock";
    etiqueta.textContent = "SIN STOCK";
    etiqueta.setAttribute("role", "status");
    zonaImagen.append(etiqueta);
  }

  const contenido = document.createElement("div");
  contenido.className = "contenido-detalle-producto";

  const categoria = document.createElement("span");
  categoria.className = "etiqueta-producto";
  categoria.textContent = producto.categoria || "Producto";

  const titulo = document.createElement("h2");
  titulo.id = "titulo-detalle-producto";
  titulo.textContent = producto.nombre;

  const precio = document.createElement("p");
precio.textContent = String(producto.categoria || "").toLocaleLowerCase("es-AR") === "combos"
? "Precio final del combo: " + formatoPrecio(producto.precio)
: formatoPrecio(producto.precio);
  precio.className = "precio-detalle-producto";

  contenido.append(categoria, titulo, precio);

  const coincidenciaVariantes = Object.entries(variantesPorNombre)
    .find(([nombreBase, opciones]) =>
      opciones.some((opcion) => opcion.nombre === producto.nombre)
    );

  if (coincidenciaVariantes) {
    const [nombreBase, variantesDetalle] = coincidenciaVariantes;
    const productoBase = estado.productos.find(
      (item) => item.nombre === nombreBase
    );

    if (productoBase && variantesDetalle.length > 1) {
      const selectorDetalle = document.createElement("select");
      selectorDetalle.className = "selector-variante-producto selector-variante-detalle";
      selectorDetalle.setAttribute("aria-label", "Elegir variante del producto");

      const indiceActual = variantesDetalle.findIndex(
        (opcion) => opcion.nombre === producto.nombre
      );
      const indiceSeleccionado = indiceActual >= 0
        ? indiceActual
        : (variantesSeleccionadas.get(productoBase.id) ?? 0);

      variantesDetalle.forEach((opcion, indice) => {
        const elemento = document.createElement("option");
        elemento.value = String(indice);
        elemento.textContent = opcion.nombre;
        elemento.selected = indice === indiceSeleccionado;
        selectorDetalle.append(elemento);
      });

      selectorDetalle.addEventListener("change", () => {
        const indiceElegido = Number(selectorDetalle.value);
        const varianteElegida = variantesDetalle[indiceElegido];

        variantesSeleccionadas.set(productoBase.id, indiceElegido);
        renderizarProductos();

        const agotadoElegido = Object.prototype.hasOwnProperty.call(
          varianteElegida,
          "agotado"
        )
          ? varianteElegida.agotado === true
          : indiceElegido === 0 && productoBase.agotado === true;

        const productoElegido = {
          ...productoBase,
          ...varianteElegida,
          agotado: agotadoElegido || obtenerStockMaximo({ ...productoBase, ...varianteElegida }) === 0,
          id: indiceElegido === 0
            ? productoBase.id
            : `${productoBase.id}-variante-${indiceElegido}`
        };

        abrirDetalleProducto(productoElegido);
      });

      contenido.append(selectorDetalle);
    }
  }


  if (producto.descripcion) {
    const descripcion = document.createElement("p");
    descripcion.className = "descripcion-detalle-producto";
    descripcion.textContent = producto.descripcion;
    contenido.append(descripcion);
  }

  const incluidos = producto.productosIncluidos || producto.productos || producto.contenido;
  const esComboDetalle = String(producto.categoria || "").toLocaleLowerCase("es-AR") === "combos";

  if (Array.isArray(incluidos) && incluidos.length > 0) {
    const subtitulo = document.createElement("h3");
    subtitulo.className = "titulo-incluidos";
    subtitulo.textContent = "¿Qué incluye?";

    const lista = document.createElement("ul");
    lista.className = "lista-incluidos";
    let totalSeparado = 0;

    incluidos.forEach((item) => {
      const elemento = document.createElement("li");
      elemento.className = "item-incluido-detalle";

      const nombreVisible = typeof item === "string"
        ? item
        : (item.nombre || item.producto || "Producto");

      const normalizadoVisible = normalizarNombreProducto(nombreVisible);
      const productosSinCombos = estado.productos.filter((p) =>
        String(p.categoria || "").toLocaleLowerCase("es-AR") !== "combos"
      );

      const coincidenciasExactas = productosSinCombos.filter((p) =>
        normalizarNombreProducto(p.nombre) === normalizadoVisible
      );

      let coincidencias = coincidenciasExactas;

      if (coincidencias.length === 0) {
        const normalizarPresentacion = (nombre) =>
          normalizarNombreProducto(nombre)
            .replace(/\b\d+\s*(?:u|unidades?|g|gr|gramos?|kg|ml|l)\b/gu, " ")
            .replace(/\s+/g, " ")
            .trim();

        const baseVisible = normalizarPresentacion(nombreVisible);

        coincidencias = productosSinCombos.filter((p) => {
          const nombreCatalogo = normalizarNombreProducto(p.nombre);

          // No enlazar presentaciones mayoristas con unidades individuales.
          if (/\b(caja|bulto|por pack|x10)\b/u.test(nombreCatalogo)) {
            return false;
          }

          return normalizarPresentacion(p.nombre) === baseVisible;
        });
      }

      const productoCatalogo = coincidencias.length === 1 ? coincidencias[0] : null;

      if (productoCatalogo && productoCatalogo.imagen) {
        const botonImagen = document.createElement("button");
        botonImagen.type = "button";
        botonImagen.className = "boton-imagen-incluido";
        botonImagen.setAttribute("aria-label", "Ver " + nombreVisible);

        const miniatura = document.createElement("img");
        miniatura.className = "imagen-incluido-detalle";
        miniatura.src = productoCatalogo.imagen;
        miniatura.alt = nombreVisible;
        miniatura.loading = "lazy";

        botonImagen.append(miniatura);
        botonImagen.addEventListener("click", () =>
          abrirDetalleProducto(productoCatalogo, true, true)
        );
        elemento.append(botonImagen);
      }

      const nombreItem = document.createElement(productoCatalogo ? "button" : "span");

      if (productoCatalogo) {
        nombreItem.type = "button";
        nombreItem.className = "enlace-incluido-detalle";
        nombreItem.addEventListener("click", () =>
          abrirDetalleProducto(productoCatalogo, true, true)
        );
      }

      nombreItem.textContent = nombreVisible;
      elemento.append(nombreItem);

      const precioGuardado = item && typeof item === "object" ? Number(item.precio) : NaN;
      const precioCatalogo = productoCatalogo ? Number(productoCatalogo.precio) : NaN;
      const precioActual = Number.isFinite(precioCatalogo) ? precioCatalogo : precioGuardado;

      if (Number.isFinite(precioActual)) {
        totalSeparado += precioActual;
        const precioItem = document.createElement("span");
        precioItem.className = "precio-incluido-detalle";
        precioItem.textContent = formatoPrecio(precioActual);
        elemento.append(precioItem);
      }

      lista.append(elemento);
    });

    contenido.append(subtitulo, lista);

    if (esComboDetalle) {
      const comparacion = document.createElement("div");
      comparacion.className = "ahorro-combo-detalle";

      const precioSeparado = document.createElement("p");
      precioSeparado.style.fontSize = "0.85em";
      precioSeparado.style.color = "#777";

      const etiquetaSeparado = document.createElement("span");
      etiquetaSeparado.textContent = "Productos por separado: ";

      const precioTachado = document.createElement("del");
      precioTachado.textContent = formatoPrecio(totalSeparado);
      precioSeparado.append(etiquetaSeparado, precioTachado);

      const diferencia = totalSeparado - Number(producto.precio);
      const textoAhorro = document.createElement("p");
      textoAhorro.textContent = diferencia > 0
        ? "¡Ahorrás " + formatoPrecio(diferencia) + "!"
        : diferencia === 0
          ? "Sin ahorro"
          : "El combo cuesta " + formatoPrecio(Math.abs(diferencia)) + " más que los productos por separado.";

      comparacion.append(precioSeparado, textoAhorro);
      contenido.append(comparacion);
    }
  } else if (esComboDetalle) {
    const nota = document.createElement("p");
    nota.className = "descripcion-detalle-producto";
    nota.textContent = "Este combo todavía no tiene cargada la lista de productos incluidos.";
    contenido.append(nota);
  }
  const agregar = document.createElement("button");
  agregar.type = "button";
  agregar.className = "agregar-producto boton-agregar-detalle";
  const stockDetalle = obtenerStockRestante(producto);
  agregar.textContent =
    producto.agotado === true || stockDetalle === 0
      ? "Sin stock"
      : stockDetalle === 1
        ? "\uD83D\uDD25 \u00DAltima unidad — Agregar al carrito"
        : "Agregar al carrito";
  agregar.disabled = false;
  agregar.addEventListener("click", () => {
    if (producto.agotado === true) {
      mostrarAvisoStock("Este producto figura sin stock.");
      return;
    }
    if (obtenerStockRestante(producto) === 0) {
      mostrarAvisoStock("Ya alcanzaste el stock disponible de este producto.");
      return;
    }
    animarImagenAlCarrito(imagen);
    agregarAlCarrito(producto);
  });

  contenido.append(agregar);

  const navegacion = document.createElement("div");
  navegacion.className = "navegacion-productos-detalle";

  const anterior = document.createElement("button");
  anterior.type = "button";
  anterior.className = "siguiente-producto-detalle";
  anterior.textContent = "\u2190 Producto anterior";
  anterior.addEventListener("click", () => {
    const productosVisibles = estado.productos.filter((productoCatalogo) => {
      if (productoCatalogo.oculto === true) return false;
      const coincideCategoria = Boolean(estado.busqueda) || estado.categoria === "Todas" || productoTieneCategoria(productoCatalogo, estado.categoria);
      const coincideBusqueda = productoCatalogo.nombre.toLocaleLowerCase("es-AR").includes(estado.busqueda.toLocaleLowerCase("es-AR"));
      return coincideCategoria && coincideBusqueda;
    });
    if (productosVisibles.length < 2) return;
    const indiceActual = productosVisibles.indexOf(producto);
    const indiceAnterior = indiceActual < 0 ? productosVisibles.length - 1 : (indiceActual - 1 + productosVisibles.length) % productosVisibles.length;
    abrirDetalleProducto(productosVisibles[indiceAnterior], true);
  });

  const siguiente = document.createElement("button");
  siguiente.type = "button";
  siguiente.className = "siguiente-producto-detalle";
  siguiente.textContent = "Siguiente producto \u2192";
  siguiente.addEventListener("click", () => {
    const productosVisibles = estado.productos.filter((productoCatalogo) => {
      if (productoCatalogo.oculto === true) return false;
      const coincideCategoria = Boolean(estado.busqueda) || estado.categoria === "Todas" || productoTieneCategoria(productoCatalogo, estado.categoria);
      const coincideBusqueda = productoCatalogo.nombre.toLocaleLowerCase("es-AR").includes(estado.busqueda.toLocaleLowerCase("es-AR"));
      return coincideCategoria && coincideBusqueda;
    });
    if (productosVisibles.length < 2) return;
    const indiceActual = productosVisibles.indexOf(producto);
    const indiceSiguiente = indiceActual < 0 ? 0 : (indiceActual + 1) % productosVisibles.length;
    abrirDetalleProducto(productosVisibles[indiceSiguiente], true);
  });

  navegacion.append(anterior, siguiente);
  contenido.append(navegacion);
  modal.append(cerrar, zonaImagen, contenido);
  fondo.replaceChildren(modal);

  if (!fondoExistente) {
    fondo.addEventListener("click", (evento) => {
    if (evento.target === fondo) cerrarDetalleProducto();
    });
    document.body.append(fondo);
  }
  cerrar.focus();
}
const variantesSeleccionadas = new Map();

const variantesPorNombre = {
  "Pastillas Alka sabor Menta (12u)": [
    { nombre: "Pastillas Alka sabor Menta (12u)", imagen: "img/alkamenta.jpeg", precio: 6900 },
    { nombre: "Pastillas Alka sabor Cherry Mentol (12u)", imagen: "img/alkacherry.jpeg", precio: 6900 }
  ],
  "Chicle Fierita Globo sabor Frutilla (95u)": [
    { nombre: "Chicle Fierita Globo sabor Frutilla (95u)", imagen: "img/recargadofrutilla.png", precio: 7900 },
    { nombre: "Chicle Fierita Globo sabor Menta (95u)", imagen: "img/globomenta.jpg", precio: 7900 }
  ],
  "Chicle Fierita Recargado - Menta (50u)": [
    { nombre: "Chicle Fierita Recargado - Menta (50u)", imagen: "img/recargadomenta.png", precio: 6900 },
    { nombre: "Chicle Fierita Recargado - Tutti Frutti (50u)", imagen: "img/fieritarecargado.jpg", precio: 6900 },
    { nombre: "Chicle Fierita Recargado - Frutilla (50u)", imagen: "img/fieritarecargadofrutilla.png", precio: 6900 }
  ],
  "Oblita de Frutilla (48u)": [
    { nombre: "Oblita de Frutilla (48u)", imagen: "img/oblitafrutilla.jpg", precio: 7500 },
    { nombre: "Oblita de DDL (48u)", imagen: "img/oblita_ddl.jpg", precio: 7500 },
    { nombre: "Oblita de Marroc (48u)", imagen: "img/oblita_marroc.jpg", precio: 7500 }
  ],
  "Pastillas D.R.F Sabor Menta (12u)": [
    { nombre: "Pastillas D.R.F Sabor Menta (12u)", imagen: "img/drfmenta.jpeg", precio: 6200 },
    { nombre: "Pastillas D.R.F Sabor Anís (12u)", imagen: "img/drfanis.jpeg", precio: 6200 }
  ],
  "Alfajor Guaymallen simple Blanco (10u)": [
    { nombre: "Alfajor Guaymallen simple Blanco (10u)", imagen: "img/guaysimpleblanco.jpg", precio: 4900 },
    { nombre: "Alfajor Guaymallen simple Negro (10u)", imagen: "img/guaysimplenegro.jpg", precio: 4900 }
  ],
  "Alfajor Guaymallen Triple Blanco (12u)": [
    { nombre: "Alfajor Guaymallen Triple Blanco (12u)", imagen: "img/guayblanco.jpg", precio: 8900, agotado: true },
    { nombre: "Alfajor Guaymallen Triple Negro (12u)", imagen: "img/guayddl.jpg", precio: 8900 }
  ],
  "Alcancía Tigre Rojo (con 12 gelatinas en su interior)": [
    { nombre: "Alcancía Tigre Rojo (con 12 gelatinas en su interior)", imagen: "img/tigrerojo.png", precio: 6900 },
    { nombre: "Alcancía Tigre Amarillo (con 12 gelatinas en su interior)", imagen: "img/tigreamarillo.jpg", precio: 6900 },
    { nombre: "Alcancía Pollito Rojo (con 12 gelatinas en su interior)", imagen: "img/pollito.png", precio: 6900 },
    { nombre: "Alcancía Pollito Amarillo (con 12 gelatinas en su interior)", imagen: "img/pollitoamarillo.png", precio: 6900 }
  ],
  "Cucuruchos Helado Frutilla (30u)": [
    { nombre: "Cucuruchos Helado Frutilla (30u)", imagen: "img/cucuruchohelado.png", precio: 14900 },
    { nombre: "Cucuruchos Helado Chocolate (30u)", imagen: "img/cucuruchochocolate.png", precio: 14900 },
    { nombre: "Cucuruchos Helado Arándano (30u)", imagen: "img/cucuruchovainilla.png", precio: 14900 }
  ]
};

function renderizarProductos() {
  const filtrados = estado.productos.filter((producto) => {
    if (producto.oculto === true) return false;

    const coincideCategoria =
      Boolean(estado.busqueda) || estado.categoria === "Todas" || productoTieneCategoria(producto, estado.categoria);

    const coincideBusqueda = producto.nombre
      .toLocaleLowerCase("es-AR")
      .includes(estado.busqueda.toLocaleLowerCase("es-AR"));

    return coincideCategoria && coincideBusqueda;
  });

  elementos.productos.replaceChildren();

  if (!filtrados.length) {
    const aviso = document.createElement("div");
    aviso.className = "estado-vacio";

    const titulo = document.createElement("h3");
    titulo.textContent = estado.productos.length
      ? "No encontramos productos"
      : "Estamos cargando el catálogo";

    const texto = document.createElement("p");
    texto.textContent = estado.productos.length
      ? "Probá con otra búsqueda o categoría."
      : "Enseguida vas a poder ver nuestros productos.";

    aviso.append(titulo, texto);
    elementos.productos.append(aviso);
    return;
  }

  filtrados.forEach((producto) => {
    const variantes = variantesPorNombre[producto.nombre] || null;
    const indiceGuardado = variantesSeleccionadas.get(producto.id) ?? 0;
    const indiceVariante = variantes
      ? indiceGuardado % variantes.length
      : 0;
    const variante = variantes ? variantes[indiceVariante] : producto;
    const esVarianteOriginal = variante.nombre === producto.nombre;

    const agotadoActual = Object.prototype.hasOwnProperty.call(variante, "agotado")
      ? variante.agotado === true
      : esVarianteOriginal && producto.agotado === true;

    const productoActual = {
      ...producto,
      ...variante,
      agotado: agotadoActual || obtenerStockMaximo({ ...producto, ...variante }) === 0,
      id: indiceVariante === 0
        ? producto.id
        : `${producto.id}-variante-${indiceVariante}`
    };

    const precioAnteriorValor = Number(productoActual.precioAnterior);
    const precioActualValor = Number(productoActual.precio);
    const tieneDescuento = Number.isFinite(precioAnteriorValor) &&
      Number.isFinite(precioActualValor) && precioAnteriorValor > precioActualValor;
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-producto tarjeta-interactiva";
    tarjeta.tabIndex = 0;
    tarjeta.setAttribute("role", "button");
    tarjeta.setAttribute("aria-label", "Ver detalle de " + productoActual.nombre);

    if (tieneDescuento) {
      const etiquetaOferta = document.createElement("span");
      etiquetaOferta.className = "etiqueta-oferta-producto";
      etiquetaOferta.textContent = "OFERTA";
      tarjeta.append(etiquetaOferta);
    }

    const stockRestante = obtenerStockRestante(productoActual);
    tarjeta.classList.toggle(
      "sin-stock",
      productoActual.agotado === true || stockRestante === 0
    );

    if (stockRestante === 0 || productoActual.agotado === true) {
      const sinStock = document.createElement("span");
      sinStock.className = "sin-stock-label";
      sinStock.textContent = "\u274C Sin stock";
      sinStock.setAttribute("role", "status");
      tarjeta.append(sinStock);
    } else if (stockRestante === 1) {
      const ultimaUnidad = document.createElement("span");
      ultimaUnidad.className = "ultima-stock-label";
      ultimaUnidad.textContent = "\uD83D\uDD25 \u00DAltima";
      ultimaUnidad.setAttribute("role", "status");
      tarjeta.append(ultimaUnidad);
    }

    const carrusel = document.createElement("div");
    carrusel.className = "carrusel-producto";

    const imagen = document.createElement("img");
    imagen.className = "imagen-producto";

    const fotosMultiples = {
      "Gomitas Fantasmita (30u)": ["img/fantasmitas.jpg", "img/fantasmitas2.jpg"],
      "iPhone Pinball con pastillitas (30u)": ["img/iphone.png", "img/iphone2.png"]
    };

    const fotosProducto = fotosMultiples[productoActual.nombre] || [productoActual.imagen];
    let indiceFoto = 0;

    imagen.loading = "lazy";
    imagen.decoding = "async";
    imagen.alt = productoActual.nombre;
    imagen.src = fotosProducto[indiceFoto];

    imagen.addEventListener("error", () => {
      imagen.classList.add("imagen-no-disponible");
      imagen.alt = "Imagen no disponible: " + productoActual.nombre;
    });

    carrusel.append(imagen);

    if (fotosProducto.length > 1) {
      const actualizarFoto = () => {
        imagen.classList.remove("imagen-no-disponible");
        imagen.src = fotosProducto[indiceFoto];
        imagen.alt = productoActual.nombre + " - foto " + (indiceFoto + 1);
        indicador.textContent = (indiceFoto + 1) + "/" + fotosProducto.length;
      };

      const crearFlecha = (direccion, simbolo, etiqueta) => {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "flecha-variante " + direccion;
        boton.textContent = simbolo;
        boton.setAttribute("aria-label", etiqueta);
        boton.addEventListener("click", (evento) => {
          evento.preventDefault();
          evento.stopPropagation();
          indiceFoto = (indiceFoto + (direccion === "derecha" ? 1 : -1) + fotosProducto.length) % fotosProducto.length;
          actualizarFoto();
        });
        return boton;
      };

      const indicador = document.createElement("span");
      indicador.className = "indicador-variante";
      indicador.setAttribute("aria-live", "polite");
      indicador.textContent = "1/" + fotosProducto.length;

      carrusel.append(
        crearFlecha("izquierda", "‹", "Foto anterior"),
        crearFlecha("derecha", "›", "Foto siguiente"),
        indicador
      );
    }

    let selectorVariante = null;

    if (variantes && variantes.length > 1) {
      selectorVariante = document.createElement("select");
      selectorVariante.className = "selector-variante-producto";
      selectorVariante.setAttribute("aria-label", "Elegir variante de " + producto.nombre);

      variantes.forEach((opcion, indice) => {
        const elemento = document.createElement("option");
        elemento.value = String(indice);
        elemento.textContent = opcion.nombre;
        elemento.selected = indice === indiceVariante;
        selectorVariante.append(elemento);
      });

      selectorVariante.addEventListener("click", (evento) => {
        evento.stopPropagation();
      });

      selectorVariante.addEventListener("change", (evento) => {
        evento.stopPropagation();
        variantesSeleccionadas.set(producto.id, Number(selectorVariante.value));
        renderizarProductos();
      });
    }
    const contenido = document.createElement("div");
    contenido.className = "contenido-producto";

    const categoria = document.createElement("span");
    categoria.className = "etiqueta-producto";
    categoria.textContent = productoActual.categoria;

    const nombre = document.createElement("h3");
    nombre.className = "nombre-producto";
    nombre.textContent = productoActual.nombre;

    const precio = document.createElement("p");
    precio.className = "precio-producto";

    const esCombo =
      String(productoActual.categoria || "").toLocaleLowerCase("es-AR") === "combos";

    precio.textContent = esCombo
      ? "Precio final del combo: " + formatoPrecio(productoActual.precio)
      : formatoPrecio(productoActual.precio);
    let precioVisible = precio;
    if (tieneDescuento) {
      const bloquePrecios = document.createElement("div");
      bloquePrecios.className = "precios-producto con-descuento";
      const precioTachado = document.createElement("del");
      precioTachado.className = "precio-anterior-producto";
      precioTachado.textContent = formatoPrecio(precioAnteriorValor);
      bloquePrecios.append(precioTachado, precio);
      precioVisible = bloquePrecios;
    }

    contenido.append(categoria, nombre, precioVisible);

    if (selectorVariante) {
      contenido.append(selectorVariante);
    }

    const agregar = document.createElement("button");
    agregar.type = "button";
    agregar.className = "agregar-producto";
    const stockDisponible = obtenerStockRestante(productoActual);
    agregar.textContent =
      productoActual.agotado === true || stockDisponible === 0
        ? "Sin stock"
        : "Agregar al carrito";
    agregar.disabled = false;

    agregar.addEventListener("click", (evento) => {
      evento.stopPropagation();

      if (productoActual.agotado === true) {
        mostrarAvisoStock("Este producto figura sin stock.");
        return;
      }

      if (obtenerStockRestante(productoActual) === 0) {
        mostrarAvisoStock("Ya alcanzaste el stock disponible de este producto.");
        return;
      }

      animarImagenAlCarrito(imagen);
      agregarAlCarrito(productoActual);
    });

    contenido.append(agregar);
    tarjeta.append(carrusel, contenido);

    tarjeta.addEventListener("click", (evento) => {
      if (evento.target.closest("button")) return;
      abrirDetalleProducto(productoActual);
    });

    tarjeta.addEventListener("keydown", (evento) => {
      if (evento.target !== tarjeta) return;

      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        abrirDetalleProducto(productoActual);
      }
    });

    elementos.productos.append(tarjeta);
  });
}

function agregarAlCarrito(producto) {
  const stockMaximo = obtenerStockMaximo(producto);
  const cantidadActual = cantidadEnCarritoPorNombre(producto.nombre);

  if (producto.agotado === true) {
    mostrarAvisoStock("Este producto figura sin stock.");
    return;
  }

  if (stockMaximo !== undefined && cantidadActual >= stockMaximo) {
    mostrarAvisoStock("Ya alcanzaste el stock disponible de este producto.");
    return;
  }

  const existente = estado.carrito.find((item) => item.id === producto.id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    estado.carrito.push({
      ...producto,
      cantidad: 1
    });
  }

  renderizarProductos();
  renderizarCarrito();

  const botonCarrito = document.getElementById("abrir-carrito");
  const contadorCarrito = document.getElementById("cantidad-carrito");

  if (botonCarrito) {
    botonCarrito.classList.remove("animar-carrito");
    void botonCarrito.offsetWidth;
    botonCarrito.classList.add("animar-carrito");
  }

  if (contadorCarrito) {
    contadorCarrito.classList.remove("animar-contador");
    void contadorCarrito.offsetWidth;
    contadorCarrito.classList.add("animar-contador");
  }
}

function calcularCostoEnvio(cp) {
  const codigo = String(cp || "").trim();

  if (!/^\d{4,8}$/.test(codigo)) {
    return { error: true, mensaje: "Código postal inválido. Ingresá entre 4 y 8 números." };
  }

  const totalProductos = estado.carrito.reduce(
    (acc, item) => acc + item.cantidad, 0
  );

  if (codigo === "7607") return 0;
  if (totalProductos > 25) return 25900;

  const extraEnvio = Math.floor(totalProductos / 13) * 1500;
  const prefijosSantaCruz = ["9303", "4430", "8371", "3304", "4449"];

  if (prefijosSantaCruz.some((prefijo) => codigo.startsWith(prefijo))) {
    return 14400 + extraEnvio;
  }

  if (codigo.startsWith("7600") || codigo.startsWith("7601")) {
    return 8900;
  }

  if (
    codigo.startsWith("9") ||
    codigo.startsWith("4") ||
    codigo.startsWith("3") ||
    codigo.startsWith("6") ||
    codigo.startsWith("8") ||
    codigo.startsWith("2000") ||
    codigo.startsWith("5965") ||
    codigo.startsWith("2445") ||
    codigo.startsWith("5350") ||
    codigo.startsWith("5613")
  ) {
    return 12400 + extraEnvio;
  }

  return 10900 + extraEnvio;
}

function obtenerCostoEnvio() {
  const cp = localStorage.getItem("codigoPostalCliente") || "";
  const total = estado.carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

  if (total >= ENVIO_GRATIS_DESDE) return 0;
  if (!cp) return null;

  return calcularCostoEnvio(cp);
}

function actualizarResumenEnvio() {
  const resumen = document.querySelector("#resumen-envio");
  const campo = document.querySelector("#codigo-postal");
  if (!resumen || !campo) return;

  const cp = campo.value.trim();
  const total = estado.carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

  if (total >= ENVIO_GRATIS_DESDE) {
    resumen.textContent = "¡Tu compra tiene envío gratis!";
    return;
  }

  if (!cp) {
    resumen.textContent = "Ingresá tu código postal para calcular el envío.";
    return;
  }

  const costo = calcularCostoEnvio(cp);
  resumen.textContent = costo && costo.error
    ? costo.mensaje
    : costo === 0
      ? "Envío: GRATIS"
      : `Envío: ${formatoPrecio(costo)} · Total con envío: ${formatoPrecio(total + costo)}`;
}

// Aviso original de envío, con prioridad visual para la promoción de regalo.
let avisoEnvioGratisAnterior = false;
let avisoRegaloAnterior = false;

function actualizarAvisoEnvioGratis(subtotal = 0) {
  const aviso = document.querySelector("#aviso-envio");
  const texto = document.querySelector("#texto-aviso-envio");
  const barra = document.querySelector("#barra-progreso-envio");
  if (!aviso || !texto || !barra) return;

  const regaloActivo = promoActiva("regalo");
  const envioActivo = promoActiva("envio");
  const tieneRegalo = tieneRegaloGratis(subtotal);
  const objetivo = regaloActivo ? REGALO_DESDE : ENVIO_GRATIS_DESDE;
  const tieneEnvio = subtotal >= ENVIO_GRATIS_DESDE;
  const progreso = regaloActivo && tieneRegalo && envioActivo
    ? Math.min(100, ((subtotal - REGALO_DESDE) / (ENVIO_GRATIS_DESDE - REGALO_DESDE)) * 100)
    : Math.min(100, (subtotal / objetivo) * 100);

  barra.style.width = `${progreso}%`;
  barra.parentElement.hidden = !regaloActivo && !envioActivo;

  // Si el regalo está activo, el aviso muestra únicamente esa promoción.
  if (regaloActivo) {
    if (tieneRegalo) {
      if (envioActivo && !tieneEnvio) {
        texto.textContent = `🎁 ¡Tu compra incluye un regalo! 🚚 Te faltan ${formatoPrecio(ENVIO_GRATIS_DESDE - subtotal)} para conseguir envío gratis.`;
      } else if (envioActivo && tieneEnvio) {
        texto.textContent = "🎁 ¡Tu compra incluye un regalo! 🚚 ¡También tenés envío gratis!";
      } else {
        texto.textContent = "🎁 ¡Tu compra incluye un regalo!";
      }
    } else if (subtotal > 0) {
      texto.textContent = `🎁 Sumá ${formatoPrecio(REGALO_DESDE - subtotal)} más para conseguir un regalo.`;
    } else {
      texto.textContent = `🎁 Regalo en compras desde ${formatoPrecio(REGALO_DESDE)}.`;
    }
  } else if (envioActivo) {
    if (tieneEnvio) {
      texto.textContent = "¡Lo lograste! Tenés envío gratis 🎉";
    } else if (subtotal > 0) {
      texto.textContent = `¡Te faltan ${formatoPrecio(Math.max(0, ENVIO_GRATIS_DESDE - subtotal))} para conseguir envío gratis!`;
    } else {
      texto.textContent = `¡Envío gratis en compras desde ${formatoPrecio(ENVIO_GRATIS_DESDE)}!`;
    }
  } else {
    texto.textContent = "";
  }

  aviso.classList.toggle(
    "aviso-envio-logrado",
    regaloActivo ? tieneRegalo : (envioActivo && tieneEnvio)
  );

  const acabaDeConseguirRegalo = regaloActivo && tieneRegalo && !avisoRegaloAnterior;
  const acabaDeConseguirEnvio = envioActivo && tieneEnvio && !avisoEnvioGratisAnterior;

  if ((acabaDeConseguirRegalo || acabaDeConseguirEnvio) && subtotal > 0) {
    const reduceMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduceMovimiento) {
      const colores = ["#f4c542", "#e85d8e", "#72c9a2", "#9b82db", "#ff9866"];

      for (let i = 0; i < 60; i++) {
        const confeti = document.createElement("span");
        confeti.className = "confeti-envio";
        confeti.style.left = `${Math.random() * 100}%`;
        confeti.style.backgroundColor = colores[i % colores.length];
        confeti.style.animationDelay = `${Math.random() * 0.35}s`;
        document.body.append(confeti);
        setTimeout(() => confeti.remove(), 3000);
      }
    }
  }

  avisoRegaloAnterior = tieneRegalo;
  avisoEnvioGratisAnterior = tieneEnvio;
}

function actualizarPreciosCarrito() {
  if (!estado.productos.length) return;

  estado.carrito = estado.carrito.filter((item) => {
   const productoBase = estado.productos.find(
      (producto) =>
        producto.nombre === item.nombre ||
        variantesPorNombre[producto.nombre]?.some(
          (variante) => variante.nombre === item.nombre
        )
    );

    if (!productoBase) return false;

    const variante = variantesPorNombre[productoBase.nombre]?.find(
      (opcion) => opcion.nombre === item.nombre
    );

    const productoActual = {
      ...productoBase,
      ...(variante || {}),
      nombre: item.nombre
    };

    const esVarianteOriginal =
      !variante || variante.nombre === productoBase.nombre;

    const agotadoActual =
      variante && Object.prototype.hasOwnProperty.call(variante, "agotado")
        ? variante.agotado === true
        : esVarianteOriginal && productoBase.agotado === true;

    if (
      agotadoActual ||
      obtenerStockMaximo(productoActual) === 0
    ) {
      return false;
    }

    if (Number.isFinite(Number(productoActual.precio))) {
      item.precio = Number(productoActual.precio);
    }

    return true;
  });
}

function renderizarCarrito() {
  actualizarPreciosCarrito();
  try {
    localStorage.setItem(
      "carritoCliente",
      JSON.stringify(estado.carrito)
    );
  } catch (error) {
    console.error("No se pudo guardar el carrito:", error);
  }
  const unidades = estado.carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const subtotal = estado.carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  actualizarAvisoEnvioGratis(subtotal);
  const costoEnvio = obtenerCostoEnvio();
  const total = costoEnvio === null || costoEnvio.error ? subtotal : subtotal + costoEnvio;

  elementos.cantidad.textContent = unidades + (tieneRegaloGratis(subtotal) ? 1 : 0);

  const totalProductosVisible = document.querySelector("#total-productos-carrito");
  if (totalProductosVisible) {
    totalProductosVisible.textContent =
      `Total productos: ${unidades + (tieneRegaloGratis(subtotal) ? 1 : 0)}`;
  }
  elementos.total.textContent = formatoPrecio(total);

  const subtotalVisible = document.querySelector("#subtotal-carrito");
  if (subtotalVisible) subtotalVisible.textContent = formatoPrecio(subtotal);

  const envioVisible = document.querySelector("#costo-envio-carrito");
  if (envioVisible) {
    envioVisible.textContent =
      costoEnvio === null ? "Ingresá tu código postal" :
      costoEnvio.error ? "Código postal inválido" :
      costoEnvio === 0 ? "GRATIS" :
      formatoPrecio(costoEnvio);
  }
  elementos.finalizar.disabled = false;
  elementos.items.replaceChildren();

  if (!estado.carrito.length) {
    const vacio = document.createElement("p");
    vacio.className = "carrito-vacio";
    vacio.textContent = "La compra mínima es de $50.000";
    elementos.items.append(vacio);
    actualizarResumenEnvio();
    return;
  }

  estado.carrito.forEach((item) => {
    const fila = document.createElement("div");
    fila.className = "item-carrito";

    const imagen = document.createElement("img");
    imagen.className = "imagen-item-carrito";
    imagen.src = item.imagen || "";
    imagen.alt = item.nombre;
    imagen.setAttribute("role", "button");
    imagen.setAttribute("tabindex", "0");
    imagen.setAttribute("aria-label", `Ver detalle de ${item.nombre}`);
    imagen.addEventListener("click", () => abrirDetalleProducto(item));
    imagen.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        abrirDetalleProducto(item);
      }
    });
    imagen.loading = "lazy";
    imagen.decoding = "async";
    imagen.addEventListener("error", () => {
      imagen.classList.add("imagen-item-carrito-error");
    });

    const info = document.createElement("div");
    info.className = "info-item-carrito";

    const nombre = document.createElement("button");
    nombre.type = "button";
    nombre.className = "nombre-producto-carrito";
    nombre.textContent = item.nombre;
    nombre.addEventListener("click", () => abrirDetalleProducto(item));

    const precio = document.createElement("p");
    precio.className = "precio-unitario-carrito";
    precio.textContent = `${formatoPrecio(item.precio)} c/u`;

    const subtotalProducto = document.createElement("p");
    subtotalProducto.className = "subtotal-producto-carrito";
    subtotalProducto.textContent = `Subtotal: ${formatoPrecio(item.precio * item.cantidad)}`;

    const controles = document.createElement("div");
    controles.className = "controles-cantidad";

    const menos = document.createElement("button");
    menos.type = "button";
    menos.className = "boton-cantidad";
    menos.textContent = "−";
    menos.setAttribute("aria-label", "Restar una unidad");
    menos.addEventListener("click", () => {
      if (item.cantidad > 1) item.cantidad -= 1;
      else estado.carrito = estado.carrito.filter((p) => p.id !== item.id);

      renderizarProductos();
      renderizarCarrito();
    });

    const cantidad = document.createElement("span");
    cantidad.className = "numero-cantidad";
    cantidad.textContent = item.cantidad;

    const mas = document.createElement("button");
    mas.type = "button";
    mas.className = "boton-cantidad";
    mas.textContent = "+";
    mas.setAttribute("aria-label", "Sumar una unidad");
    mas.disabled = false;
    mas.addEventListener("click", () => {
      const maximo = obtenerStockMaximo(item);

      if (item.agotado === true) {
        mostrarAvisoStock("Este producto figura sin stock.");
        return;
      }

      if (maximo !== undefined && item.cantidad >= maximo) {
        mostrarAvisoStock("Ya alcanzaste el stock disponible de este producto.");
        return;
      }

      item.cantidad += 1;
      renderizarCarrito();
      renderizarProductos();
    });

    const eliminar = document.createElement("button");
    eliminar.type = "button";
    eliminar.className = "boton-eliminar";
    eliminar.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 7h16M9 7V4h6v3m3 0-.8 13H6.8L6 7m4 4v5m4-5v5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    eliminar.setAttribute("aria-label", "Eliminar producto");
    eliminar.addEventListener("click", () => {
      estado.carrito = estado.carrito.filter((p) => p.id !== item.id);

      renderizarCarrito();
      renderizarProductos();
    });

    controles.append(menos, cantidad, mas);
    info.append(nombre, precio, subtotalProducto, controles);
    fila.append(imagen, info, eliminar);
    elementos.items.append(fila);
  });
  if (tieneRegaloGratis(subtotal)) {
    const filaRegalo = document.createElement("div");
    filaRegalo.className = "item-carrito regalo-item";

    const imagenRegalo = document.createElement("img");
    imagenRegalo.className = "imagen-item-carrito";
    imagenRegalo.src = REGALO_IMAGEN;
    imagenRegalo.alt = REGALO_NOMBRE;
    imagenRegalo.loading = "lazy";
    imagenRegalo.decoding = "async";

    const infoRegalo = document.createElement("div");
    infoRegalo.className = "info-item-carrito";

    const nombreRegalo = document.createElement("strong");
    nombreRegalo.textContent = `🎁 ${REGALO_NOMBRE}`;

    const precioRegalo = document.createElement("p");
    precioRegalo.className = "precio-unitario-carrito";
    precioRegalo.textContent = "GRATIS";

    infoRegalo.append(nombreRegalo, precioRegalo);
    filaRegalo.append(imagenRegalo, infoRegalo);
    elementos.items.append(filaRegalo);
  }


  actualizarResumenEnvio();
}
function mostrarAvisoCompraMinima(faltante) {
const overlay = document.createElement("div");
overlay.className = "aviso-minimo-overlay";
overlay.setAttribute("role", "presentation");

overlay.innerHTML = `     <section class="aviso-minimo-card" role="dialog" aria-modal="true" aria-labelledby="aviso-minimo-titulo">       <button class="aviso-minimo-cerrar" type="button" aria-label="Cerrar aviso">&times;</button>       <div class="aviso-minimo-icono" aria-hidden="true">🛍️</div>       <p class="aviso-minimo-etiqueta">¡Ya casi está!</p>       <h2 id="aviso-minimo-titulo">Tu pedido necesita un poquito más</h2>       <p class="aviso-minimo-texto">La compra mínima para continuar es de <strong>${formatoPrecio(MINIMO_COMPRA)}</strong>.</p>       <div class="aviso-minimo-faltante">         <span>Te falta agregar</span>         <strong>${formatoPrecio(faltante)}</strong>       </div>       <p class="aviso-minimo-ayuda">Sumá tus golosinas favoritas y volvé a intentarlo. ¡Tu pedido te está esperando!</p>       <button class="aviso-minimo-aceptar" type="button">Seguir comprando</button>     </section>
  `;

const cerrar = () => {
document.removeEventListener("keydown", alPresionarEscape);
document.body.classList.remove("aviso-minimo-abierto");
overlay.remove();
};

const alPresionarEscape = (evento) => {
if (evento.key === "Escape") cerrar();
};

overlay.querySelector(".aviso-minimo-cerrar").addEventListener("click", cerrar);
overlay.querySelector(".aviso-minimo-aceptar").addEventListener("click", cerrar);
overlay.addEventListener("click", (evento) => {
if (evento.target === overlay) cerrar();
});

document.addEventListener("keydown", alPresionarEscape);
document.body.classList.add("aviso-minimo-abierto");
document.body.append(overlay);
overlay.querySelector(".aviso-minimo-cerrar").focus();
}
function finalizarPedido() {
  actualizarPreciosCarrito();

  const subtotalCompra = estado.carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  if (subtotalCompra < MINIMO_COMPRA) {
    mostrarAvisoCompraMinima(MINIMO_COMPRA - subtotalCompra);
    return;
}


  const cp = document.querySelector("#codigo-postal")?.value.trim() ||
    localStorage.getItem("codigoPostalCliente") || "";

  if (!/^\d{4,8}$/.test(cp)) {
    const campo = document.querySelector("#codigo-postal");
    campo?.focus();
    campo?.setCustomValidity("Ingresá un código postal válido para calcular el envío.");
    campo?.reportValidity();
    return;
  }
  localStorage.setItem("codigoPostalCliente", cp);

  const subtotal = estado.carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  const unidades = estado.carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const envio = subtotal >= ENVIO_GRATIS_DESDE ? 0 : calcularCostoEnvio(cp);

  if (envio.error) {
    alert(envio.mensaje);
    return;
  }

  const total = subtotal + envio;
  const emojiCarrito = String.fromCodePoint(0x1F6D2);
  const emojiCaja = String.fromCodePoint(0x1F4E6);
  const emojiEnvio = String.fromCodePoint(0x1F69A);
  const emojiPago = String.fromCodePoint(0x1F4B3);
  const emojiUbicacion = String.fromCodePoint(0x1F4CD);

  let mensaje = `${emojiCarrito} *Quiero comenzar este pedido:*\n\n`;

  estado.carrito.forEach((item) => {
    const precioUnitario = item.precio;
    const subtotalItem = precioUnitario * item.cantidad;

    mensaje += item.cantidad > 1
      ? `\u2022 *${item.cantidad}* ${item.nombre} \u2014 ${formatoPrecio(precioUnitario)} x${item.cantidad} \u2192 ${formatoPrecio(subtotalItem)}\n`
      : `\u2022 ${item.nombre} \u2192 ${formatoPrecio(subtotalItem)}\n`;
  });

  if (tieneRegaloGratis(subtotalCompra)) {
    mensaje += `  * 🎁 *Regalo:* ${REGALO_NOMBRE}\n\n`;
  }
  mensaje += `\n${emojiCaja} Total productos: ${unidades + (tieneRegaloGratis(subtotalCompra) ? 1 : 0)}`;
  mensaje += `\n${emojiEnvio} Envío: ${envio === 0 ? "GRATIS" : formatoPrecio(envio)}`;
  mensaje += `\n`;
  mensaje += `${emojiPago} *El total a abonar con envío incluido es de: ${formatoPrecio(total)}*\n`;
  mensaje += `${emojiUbicacion} Código Postal: ${cp}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`, "_blank", "noopener,noreferrer");
}

elementos.abrir.addEventListener("click", abrirCarrito);
elementos.cerrar.addEventListener("click", cerrarCarrito);
elementos.fondo.addEventListener("click", cerrarCarrito);
elementos.finalizar.addEventListener("click", finalizarPedido);

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") cerrarCarrito();
});

elementos.busqueda.addEventListener("input", () => {
  estado.busqueda = elementos.busqueda.value.trim();
  renderizarProductos();

  if (!estado.busqueda) return;

  requestAnimationFrame(() => {
    const primerProducto = elementos.productos.querySelector(".tarjeta-producto");
    if (!primerProducto) return;

    const posicion = primerProducto.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: posicion - window.innerHeight * 0.42,
      behavior: "smooth"
    });
  });
});

let botonTodas = elementos.categorias.querySelector('.categoria[data-categoria="Todas"]');

if (!botonTodas) {
  botonTodas = document.createElement("button");
  botonTodas.type = "button";
  botonTodas.className = "categoria";
  botonTodas.dataset.categoria = "Todas";
}

botonTodas.textContent = "Todos";
elementos.categorias.append(botonTodas);
elementos.categorias.querySelectorAll(".categoria").forEach((boton) => {
  boton.setAttribute(
    "aria-pressed",
    boton.classList.contains("activa") ? "true" : "false"
  );

  boton.addEventListener("click", () => {
    estado.categoria = boton.dataset.categoria;
    estado.busqueda = "";
    elementos.busqueda.value = "";

    elementos.categorias.querySelectorAll(".categoria").forEach((otro) => {
      const activa = otro === boton;
      otro.classList.toggle("activa", activa);
      otro.setAttribute("aria-pressed", activa ? "true" : "false");
    });

    renderizarProductos();
    elementos.productos.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

async function iniciarCatalogo() {
  try {
    const respuesta = await fetch("js/productos.json");

    if (!respuesta.ok) {
      throw new Error(`No se pudo cargar el catálogo (${respuesta.status})`);
    }

    const productos = await respuesta.json();

    estado.productos = productos.map((producto, indice) => ({
      ...producto,
      id: indice + 1
    }));

    renderizarProductos();
    renderizarCarrito();
  } catch (error) {
    console.error("Error al cargar los productos:", error);

    elementos.productos.replaceChildren();

    const aviso = document.createElement("div");
    aviso.className = "estado-vacio";

    const titulo = document.createElement("h3");
    titulo.textContent = "No pudimos cargar el catálogo";

    const texto = document.createElement("p");
    texto.textContent =
      "Abrí la tienda con un servidor local y verificá que exista js/productos.json.";

    aviso.append(titulo, texto);
    elementos.productos.append(aviso);
  }
}

const botonVaciarCarrito = document.querySelector("#vaciar-carrito");
botonVaciarCarrito?.addEventListener("click", () => {
estado.carrito = [];
renderizarCarrito();
});
renderizarCarrito();
iniciarCatalogo();

const botonCalcularEnvio = document.querySelector("#calcular-envio");
const campoCodigoPostal = document.querySelector("#codigo-postal");

if (campoCodigoPostal) {
  campoCodigoPostal.value = localStorage.getItem("codigoPostalCliente") || "";
  campoCodigoPostal.addEventListener("input", () => {
    campoCodigoPostal.setCustomValidity("");
  });
}

botonCalcularEnvio?.addEventListener("click", () => {
  const cp = campoCodigoPostal?.value.trim() || "";

  if (!/^\d{4,8}$/.test(cp)) {
    campoCodigoPostal?.setCustomValidity("Ingresá un código postal válido de 4 a 8 números.");
    campoCodigoPostal?.reportValidity();
    return;
  }

  campoCodigoPostal.setCustomValidity("");
  localStorage.setItem("codigoPostalCliente", cp);
  actualizarResumenEnvio();
  renderizarCarrito();
});

// INICIO MENU HAMBURGUESA
(() => {
  const boton = document.querySelector("#boton-menu");
  const panel = document.querySelector("#panel-menu");
  const fondo = document.querySelector("#fondo-menu");
  const cerrar = document.querySelector("#cerrar-menu");

  if (!boton || !panel || !fondo || !cerrar) return;

  function abrirMenu() {
    fondo.hidden = false;
    panel.inert = false;
    panel.setAttribute("aria-hidden", "false");
    boton.setAttribute("aria-expanded", "true");
    boton.setAttribute("aria-label", "Cerrar menú");
    requestAnimationFrame(() => {
      fondo.classList.add("visible");
      panel.classList.add("abierto");
    });
    cerrar.focus();
  }

  function cerrarMenu() {
    panel.classList.remove("abierto");
    fondo.classList.remove("visible");
    panel.setAttribute("aria-hidden", "true");
    panel.inert = true;
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-label", "Abrir menú");
    fondo.hidden = true;
  }

  boton.addEventListener("click", () => {
    if (boton.getAttribute("aria-expanded") === "true") {
      cerrarMenu();
    } else {
      abrirMenu();
    }
  });

  cerrar.addEventListener("click", cerrarMenu);
  fondo.addEventListener("click", cerrarMenu);
  panel.querySelectorAll("[data-cerrar-menu]").forEach((enlace) => {
    enlace.addEventListener("click", cerrarMenu);
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && boton.getAttribute("aria-expanded") === "true") {
      cerrarMenu();
      boton.focus();
    }
  });

  document.querySelector("#menu-calcular-envio")?.addEventListener("click", (evento) => {
    evento.preventDefault();
    cerrarMenu();
    abrirCarrito();

    setTimeout(() => {
      const campo = document.querySelector("#codigo-postal");
      if (campo) {
        campo.scrollIntoView({ behavior: "smooth", block: "center" });
        campo.focus({ preventScroll: true });
      }
    }, 300);
  });
  document.querySelector("#abrir-carrito")?.addEventListener("click", cerrarMenu);
})();
// FIN MENU HAMBURGUESA

// Ocultar WhatsApp flotante cuando el footer está visible
(() => {
  const whatsapp = document.querySelector("#whatsapp-btn");
  const footer = document.querySelector(".footer-aries");

  if (!whatsapp || !footer) return;

  const observador = new IntersectionObserver(([entrada]) => {
    whatsapp.classList.toggle(
      "oculto-por-footer",
      entrada.isIntersecting
    );
  });

  observador.observe(footer);
})();
// Ventana "Cómo pagar"
(() => {
  const enlacePago = document.querySelector("#menu-pago");
  const modalPago = document.querySelector("#modal-pago");
  const cerrarPago = document.querySelector(".cerrar-pago");
  const botonCopiar = document.querySelector("#copiar-alias");
  const mensajeCopiado = document.querySelector("#copiado-msg");

  if (!enlacePago || !modalPago || !cerrarPago || !botonCopiar || !mensajeCopiado) {
    console.error("No se pudo inicializar la ventana de pago: falta un elemento HTML.");
    return;
  }

  function abrirPago() {
    modalPago.classList.add("visible");
    modalPago.setAttribute("aria-hidden", "false");
    cerrarPago.focus();
  }

  function cerrarVentanaPago() {
    modalPago.classList.remove("visible");
    modalPago.setAttribute("aria-hidden", "true");
    mensajeCopiado.textContent = "";
    enlacePago.focus();
  }

  enlacePago.addEventListener("click", (evento) => {
    evento.preventDefault();
    abrirPago();
  });

  cerrarPago.addEventListener("click", cerrarVentanaPago);

  modalPago.addEventListener("click", (evento) => {
    if (evento.target === modalPago) {
      cerrarVentanaPago();
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modalPago.classList.contains("visible")) {
      cerrarVentanaPago();
    }
  });

  botonCopiar.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("ana.maria.montiel");
      mensajeCopiado.textContent = "¡Copiado! ✔";
    } catch {
      mensajeCopiado.textContent = "No se pudo copiar. Seleccioná el alias manualmente.";
    }
  });
})();