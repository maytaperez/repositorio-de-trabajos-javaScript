// Lista de productos
const productos = [
    { nombre: 'Manzana', precio: 500 },
    { nombre: 'Banana', precio: 400 },
    { nombre: 'Naranjas', precio: 380 },
    { nombre: 'Zanahoria', precio: 200 },
    { nombre: 'Tomate', precio: 700 },
    { nombre: 'Lechuga', precio: 1000 },
    { nombre: 'Papa', precio: 1200 },
    { nombre: 'Cebolla', precio: 700 },
    { nombre: 'Ajo', precio: 1200 },
    { nombre: 'Pepino', precio: 460 },
    { nombre: 'Huevos x 6un', precio: 1200 },
    { nombre: 'Frutilla x 500gr', precio: 3600 },
    { nombre: 'Ciruela', precio: 350 },
    { nombre: 'Pera', precio: 520 },
    { nombre: 'Mandarina', precio: 280 }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || {}; 

function saludarUsuario() {
    const nombrePersona = document.getElementById("nombrePersona").value;
    if (!nombrePersona) {
        alert("Por favor, ingresa tu nombre.");
    } else {
        document.getElementById("productos").style.display = 'block';
        document.getElementById("carrito").style.display = 'block';
        document.getElementById("finalizarCompra").style.display = 'block';
        mostrarProductos();
    }
}

// Mostrar productos en el DOM
function mostrarProductos() {
    const contenedorProductos = document.getElementById('productos');
    productos.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${index})">Agregar</button>
        `;
        contenedorProductos.appendChild(productoDiv);
    });
    actualizarCarrito();
}

// Agregar producto al carrito y actualizar localStorage
function agregarAlCarrito(index) {
    const producto = productos[index];
    const cantidad = parseInt(prompt(`¿Cuántas ${producto.nombre} deseas llevar?`));
    
    if (cantidad > 0) {
        if (carrito[producto.nombre]) {
            carrito[producto.nombre].cantidad += cantidad;
        } else {
            carrito[producto.nombre] = { cantidad: cantidad, precio: producto.precio };
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    } else {
        alert("Cantidad no válida.");
    }
}

function actualizarCarrito() {
    const contenedorCarrito = document.getElementById('carrito');
    contenedorCarrito.innerHTML = '<h2>Carrito de Compras</h2>';
    for (const [nombre, datos] of Object.entries(carrito)) {
        const item = document.createElement('p');
        item.textContent = `${nombre} - ${datos.cantidad} unidad(es) - $${datos.cantidad * datos.precio}`;
        contenedorCarrito.appendChild(item);
    }
}

// Finalizar compra y mostrar resumen
document.getElementById('finalizarCompra').addEventListener('click', () => {
    let total = Object.values(carrito).reduce((sum, { cantidad, precio }) => sum + cantidad * precio, 0);
    let resumen = `<h2>Resumen de la Compra</h2>`;
    for (const [nombre, datos] of Object.entries(carrito)) {
        resumen += `<p>${nombre} - ${datos.cantidad} unidad(es) - $${datos.cantidad * datos.precio}</p>`;
    }
    resumen += `<p><strong>Total a pagar: $${total}</strong></p>`;
    document.getElementById('resumenCompra').innerHTML = resumen;

    carrito = {};
    localStorage.removeItem('carrito');
    actualizarCarrito();
});

actualizarCarrito();
