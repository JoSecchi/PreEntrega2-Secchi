// Creación del carrito de compras vacío
const carrito = [];

// Ordenar productos de menor a mayor precio
const ordenarMenorMayor = () => {
    productos.sort((a,b)=> a.precio - b.precio);
    mostrarListaOrdenada();
}

// Ordenar productos de mayor a menor precio
const ordenarMayorMenor = () => {
    productos.sort((a,b)=> b.precio - a.precio);
    mostrarListaOrdenada();
}

// Mostrar lista ordenada
const mostrarListaOrdenada = () => {
    const listaOrdenada = productos.map(producto => {
        return '- '+producto.nombre+' $'+producto.precio
    });
    alert('Lista de precios:'+'\n\n'+listaOrdenada.join('\n'))
    comprarProductos(listaOrdenada)
}

const comprarProductos = (listaDeProductos) => {
    let otroProducto;
    let productoNombre = '';
    let productoCantidad = 0;

    // Crear bucle de compra hasta que otroProducto retorne "false"
    do {
        productoNombre = prompt ('¿Que juego deseas comprar?'+'\n\n'+listaDeProductos.join('\n'));
        productoCantidad = parseInt(prompt('¿Cuántos querés comprar?'))

    
        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase());

        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad)
        } else {
            alert('El juego no se encuentra en el catálogo.')
        }

        otroProducto = confirm('Deseas agregar otro juego?');
    } while (otroProducto)

    confirmarCompra()
};


const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    const productoRepetido = carrito.find(producto => producto.id === productoId)
    if (!productoRepetido) {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    } else {
        productoRepetido.cantidad += productoCantidad;
    }
    console.log(carrito)
}

const eliminarProductoCarrito = (productoNombre) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === productoNombre.toLowerCase()) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra()
};

const confirmarCompra = () => {
    const listaCarrito = carrito.map(producto => {
        return '- '+producto.nombre+' | Cantidad: '+producto.cantidad+' | Precio: $'+(producto.precio*producto.cantidad)
    });

    const confirmar = confirm('Checkout: '
        +'\n\n'+listaCarrito.join('\n')
        +'\n\nPara continuar hace click en "Aceptar", sino "Cancelar" para eliminar un algun juego de tu carrito de compras.'
    )

    if (confirmar) {
        finalizarCompra(listaCarrito)
    } else {
        const productoAEliminar = prompt('Ingrese el nombre del juego a eliminar:')
        eliminarProductoCarrito(productoAEliminar)
    }
};

const finalizarCompra = (listaCarrito) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

    alert('Detalle de tu compra:'
        +'\n\n'+listaCarrito.join('\n')
        +'\n\nTotal de juegos: '+cantidadTotal
        +'\n\nEl total de su compra es: $'+precioTotal
        +'\n\nGracias por su elegirnos!!!'
    )
};

const comprar = () => {
    const productosBaratos = confirm('¡Bienvenido a nuestra tienda gamer! ¿Querés ordenar los juegos del más barato al mas caro?')

    if (productosBaratos) {
        ordenarMenorMayor()
    } else {
        ordenarMayorMenor()
    }
};

comprar()