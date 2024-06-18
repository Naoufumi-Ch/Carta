const codigoBarrasInput = document.getElementById('codigoBarras');
const tablaProductos = document.getElementById('tablaProductos');
const totalElement = document.getElementById('total');
const terminarVentaBtn = document.getElementById('terminarVenta');
const cancelarVentaBtn = document.getElementById('cancelarVenta');
const enviarCompraBtn = document.getElementById('enviarCompra'); // New line

let productos = [];
let total = 0;

function agregarProducto(codigo, descripcion, precioVenta, cantidad) {
    const producto = {
        id: productos.length + 1,
        codigo,
        descripcion,
        precioVenta,
        cantidad,
        total: precioVenta * cantidad
    };
    productos.push(producto);
    renderizarTabla();
    actualizarTotal();
    codigoBarrasInput.value = '';
}

function renderizarTabla() {
    const tbody = tablaProductos.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.codigo}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.precioVenta}</td>
            <td><input type="number" value="${producto.cantidad}" min="1" onchange="actualizarCantidad(${producto.id}, this.value)"></td>
            <td>${producto.total}</td>
            <td><button onclick="quitarProducto(${producto.id})">Quitar</button></td>
        `;
        tbody.appendChild(fila);
    });
}

function actualizarCantidad(id, nuevaCantidad) {
    const producto = productos.find(p => p.id === id);
    producto.cantidad = parseInt(nuevaCantidad);
    producto.total = producto.precioVenta * producto.cantidad;
    actualizarTotal();
    renderizarTabla();
}

function quitarProducto(id) {
    productos = productos.filter(p => p.id !== id);
    actualizarTotal();
    renderizarTabla();
}

function actualizarTotal() {
    total = productos.reduce((acc, producto) => acc + producto.total, 0);
    totalElement.textContent = total.toFixed(2);
}

codigoBarrasInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const codigo = e.target.value;
        const producto = buscarProducto(codigo);
        if (producto) {
            agregarProducto(producto.codigo, producto.descripcion, producto.precioVenta, 1);
        } else {
            alert('Producto no encontrado');
        }
    }
});

terminarVentaBtn.addEventListener('click', () => {
    alert(`Venta realizada por un total de $${total.toFixed(2)}`);
    productos = [];
    total = 0;
    renderizarTabla();
    actualizarTotal();
});

cancelarVentaBtn.addEventListener('click', () => {
    productos = [];
    total = 0;
    renderizarTabla();
    actualizarTotal();
});

// New function to handle the "Enviar a la compra" button click
enviarCompraBtn.addEventListener('click', () => {
    if (productos.length === 0) {
        alert('No hay productos para enviar a la compra');
        return;
    }

    // Aquí puedes implementar la lógica para enviar los productos a la compra
    // Por ejemplo, puedes enviar los datos al servidor o mostrar un resumen de la compra

    alert('Productos enviados a la compra');
    productos = [];
    total = 0;
    renderizarTabla();
    actualizarTotal();
});

// Función de ejemplo para buscar un producto por código
function buscarProducto(codigo) {
    // Aquí deberías implementar la lógica para buscar el producto en tu base de datos o fuente de datos
    const productos = [
        { codigo: '1', descripcion: 'Galletas chokis', precioVenta: 15 },
        { codigo: '2', descripcion: 'Refresco', precioVenta: 10 },
        { codigo: '3', descripcion: 'Chocolates', precioVenta: 20 }
    ];
    return productos.find(p => p.codigo === codigo);
}
