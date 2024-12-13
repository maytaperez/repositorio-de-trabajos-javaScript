let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

function saludarUsuario() {
    const nombrePersona = document.getElementById("nombrePersona").value;
    if (!nombrePersona) {
        Swal.fire({
            icon: 'error',
            title: 'ingrese su nombre.',
            text: 'Por favor',
        });
    } else {
        document.getElementById("productos").style.display = 'block';
        document.getElementById("carrito").style.display = 'block';
        document.getElementById("finalizarCompra").style.display = 'block';
        cargarProductos(); // Llamar a cargar productos desde productos.js
    }
}

// Agregar producto al carrito
function agregarAlCarrito(index) {
    const producto = productos[index]; // productos.js es necesario para que funcione
    if (carrito[producto.nombre]) {
        carrito[producto.nombre].cantidad += 1;
    } else {
        carrito[producto.nombre] = { cantidad: 1, precio: producto.precio };
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Actualizar el carrito
function actualizarCarrito() {
    const contenedorCarrito = document.getElementById('carrito');
    contenedorCarrito.innerHTML = '<h2>Carrito de Compras</h2>';
    for (const [nombre, datos] of Object.entries(carrito)) {
        const item = document.createElement('div');
        item.classList.add('carrito-item');
        item.innerHTML = `
            <span>${nombre} - $${datos.precio} x ${datos.cantidad}</span>
            <button onclick="modificarCantidad('${nombre}', 1)">+</button>
            <button onclick="modificarCantidad('${nombre}', -1)">-</button>
            <button onclick="eliminarDelCarrito('${nombre}')">Eliminar</button>
        `;
        contenedorCarrito.appendChild(item);
    }
}

// Modificar la cantidad de un producto en el carrito
function modificarCantidad(nombre, cambio) {
    if (carrito[nombre]) {
        carrito[nombre].cantidad += cambio;
        if (carrito[nombre].cantidad <= 0) {
            delete carrito[nombre];
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }
}

// Eliminar un producto del carrito
function eliminarDelCarrito(nombre) {
    delete carrito[nombre];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
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

// Inicializar
actualizarCarrito();