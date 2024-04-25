
let productosEnElCarrito = localStorage.getItem("productos-en-carrito");
productosEnElCarrito = productosEnElCarrito ? JSON.parse(productosEnElCarrito) : [];


// const productosEnElCarrito = JSON.parse(localStorage.getItem("productos-carrito")) || [];

const carritoVacio = document.querySelector("#carrito-vacio");
const productosCarrito = document.querySelector("#productos-carrito");
const totalCarrito = document.querySelector("#total-carrito");


function actualizarCarrito() {
    if (productosEnElCarrito.length ===0) {
        carritoVacio.classList.remove("d-none");
        productosCarrito.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        productosCarrito.classList.remove("d-none");
        
           
        productosCarrito.innerHTML = "";

        productosEnElCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto-carrito");
            div.innerHTML = `
                <img class="producto-carrito-imagen" src="${producto.img}" alt="${producto.titulo}">
                <h3>${producto.titulo}</h3>
                <h3>Cantidad</h3>
                <p>${producto.cantidad}</p>
                <h4>Precio</h4>
                <p>$${producto.precio}</p>
                <h4>Subtotal</h4>
                <p>$${producto.precio * producto.cantidad}</p>
                
            `;

            const botonEliminar = document.createElement("button");
            botonEliminar.classList.add("boton-eliminar-productos-carrito", "bi","bi-trash3");
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

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnElCarrito))
}

function actualizarTotal () {
    const total = productosEnElCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalCarrito.innerText = `$${total}`;
}


