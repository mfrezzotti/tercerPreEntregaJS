const productosEnElCarrito = JSON.parse(localStorage.getItem("productos-carrito"));

const carritoVacio = document.querySelector("#carrito-vacio");
const productosCarrito = document.querySelector("#productos-carrito");
const totalCarritoElement = document.querySelector("#total-carrito");



function actualizarCarrito() {
    if (!productosEnElCarrito || productosEnElCarrito.length === 0) {
        carritoVacio.classList.remove("disabled");
        productosCarrito.classList.add("disabled");

    } else {
        carritoVacio.classList.add("disabled");
        productosCarrito.classList.remove("disabled");

        productosCarrito.innerHTML = "";

        productosEnElCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto-carrito");
            div.innerHTML = `
                <img class="producto-carrito-imagen" src="${producto.img}" alt="${producto.titulo}">
                <div class="producto-carrito-titulo" >
                    <h3>${producto.titulo}</h3>
                </div>

                <div class="producto-carrito-cantidad">
                    <h3>Cantidad</h3>
                    <p>${producto.cantidad}</p>
                </div>

                <div class="producto-carrito-precio">
                    <h4>Precio</h4>
                    <p>$${producto.precio}</p>
                </div>
                <div class="producto-carrito-subtotal">
                    <h4>Subtotal</h4>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
            `;

            const botonEliminar = document.createElement("button");
            botonEliminar.classList.add("boton-eliminar-productos-carrito", "bi", "bi-x");
            botonEliminar.addEventListener("click", () => {
                borrarDelCarrito(producto);
            });

            div.append(botonEliminar);
            productosCarrito.append(div);
        })

    }

    actualizarTotal();
}


actualizarCarrito();



const borrarDelCarrito = (producto) => {
    const productoIndex = productosEnElCarrito.findIndex(item => item.titulo === producto.titulo);

    productosEnElCarrito.splice(productoIndex, 1);
    actualizarCarrito();
}

function actualizarTotal () {
    const totalCarrito = productosEnElCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalCarritoElement.innerText = `$${totalCarrito}`;
}


