// Array de productos

const productos =[
    {
        titulo: "Shampoo Toxic Wap",
        precio: 2200,
        img: "./img/shampootoxic.webp"
    },

    {
        titulo: "Sellador ceramico",
        precio: 45000,
        img: "./img/selladorceramico.webp"
    },

    {
        titulo: "Pulidor corte intermedio",
        precio: 32000,
        img: "./img/merzerna-pulidor-corte-intermedio.webp"
    },

    {
        titulo: "Cera rápida",
        precio: 25000,
        img: "./img/cerarapida.webp"
    },

    {
        titulo: "Cera para cueros",
        precio: 52000,
        img: "./img/ceraparacueros.webp"
    },

    {
        titulo: "Limpia cristales antiempañado",
        precio: 12000,
        img: "./img/limpiacristales.webp"
    },


];

const contenedorProductos = document.querySelector("#contenedor-productos");
const numeritoCarrito = document.querySelector("#carrito-numerito");
numeritoCarrito.innerText = 0; // carrito en 0 al iniciar la pagina

// Recorremos el array y lo mostramos en pagina

productos.forEach((producto) =>{

    const div = document.createElement ("div");
    div.classList.add("card-productos");
    div.innerHTML = `
        <img class ="imagen-producto" src="${producto.img}" alt ="${producto.titulo}">
        <h3>${producto.titulo}</h3>
        <p>$${producto.precio}</p>
       
        `;

        const boton = document.createElement("button");
        boton.classList.add("btn-comprar");
        boton.innerText = "Agregar al carrito";

        //definir el evento
        boton.onclick = () => {
            agregarProductosAlCarrito(producto);
        }

        div.append(boton);

        contenedorProductos.append(div);
    
});
 //array para los productos que se van pusheando del array
const productosEnElCarrito = [];

// funcion para verificar que el producto este en el array y si esta, se agreguen productos al carrito, y la cantidad

function agregarProductosAlCarrito(producto) {
    const productoEncontrado = productosEnElCarrito.find(item => item.titulo === producto.titulo);
    if (productoEncontrado) {
        productoEncontrado.cantidad++;
    }else {
        productosEnElCarrito.push({...producto, cantidad: 1});
    }

    actualizarNumerito();

    localStorage.setItem("productos-carrito", JSON.stringify(productosEnElCarrito));
}
 agregarProductosAlCarrito();

 // actualizar numerito carrito

 function actualizarNumerito () {
    let nuevoNumerito = productosEnElCarrito.reduce((acc, producto) => acc + producto.cantidad,0);
    numeritoCarrito.innerText = nuevoNumerito;
 }
