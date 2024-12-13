let productos = [];

async function cargarProductos() {
    try {
        const respuesta = await fetch('./JS/productos.json');
        productos = await respuesta.json();
        mostrarProductos();
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

function mostrarProductos() {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = '<h2>Productos Disponibles</h2>'; // Limpiar para evitar duplicados
    productos.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${index})">Agregar</button>
        `;
        contenedorProductos.appendChild(productoDiv);
    });
}