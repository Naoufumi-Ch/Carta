document.addEventListener('DOMContentLoaded', function() {
    const barcodeInput = document.getElementById('barcode');
    const productList = document.getElementById('product-list');
    const totalAmount = document.getElementById('total-amount');
    const completeSaleButton = document.getElementById('complete-sale');
    const cancelSaleButton = document.getElementById('cancel-sale');

    let products = [];
    let total = 0;

    barcodeInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const code = barcodeInput.value;
            if (code) {
                addProduct(code);
                barcodeInput.value = '';
            }
        }
    });

    completeSaleButton.addEventListener('click', function() {
        // Aquí podrías hacer una llamada al backend para completar la venta
        alert('Venta completada');
        resetSale();
    });

    cancelSaleButton.addEventListener('click', function() {
        resetSale();
    });

    function addProduct(code) {
        // Aquí se debería hacer una llamada al backend para obtener los datos del producto
        // Por simplicidad, vamos a agregar un producto ficticio
        const product = {
            id: products.length + 1,
            code: code,
            description: 'Galletas chokis',
            price: 15.00,
            quantity: 1,
            total: 15.00
        };

        products.push(product);
        updateTable();
        updateTotal();
    }

    function updateTable() {
        productList.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.code}</td>
                <td>${product.description}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.quantity}</td>
                <td>${product.total.toFixed(2)}</td>
                <td><button class="remove-product" data-id="${product.id}">❌</button></td>
            `;
            productList.appendChild(row);
        });

        document.querySelectorAll('.remove-product').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                removeProduct(id);
            });
        });
    }

    function updateTotal() {
        total = products.reduce((sum, product) => sum + product.total, 0);
        totalAmount.textContent = total.toFixed(2);
    }

    function removeProduct(id) {
        products = products.filter(product => product.id !== id);
        updateTable();
        updateTotal();
    }

    function resetSale() {
        products = [];
        updateTable();
        updateTotal();
    }
});
