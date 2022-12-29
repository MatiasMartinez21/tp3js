
class Cliente {
    constructor(nombre, apellido) {
        this.nombre = nombre; 
        this.apellido = apellido;
    }
}

const arrayClientes = [];

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e)=>{
    //Evito el comportamiento por default del formulario: 
    e.preventDefault();

    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");

    //Crear un objeto Cliente: 
    const cliente = new Cliente(nombre.value, apellido.value);
    arrayClientes.push(cliente);


  //Verificamos por consola:
  console.log(arrayClientes);
    
  //Reseteamos el formulario: 
  formulario.reset();


})



class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1; 
    }
}

const F30 = new Producto(1, "F30 10W40 4L", 7000, "https://http2.mlstatic.com/D_NQ_NP_2X_626866-MLA52214809643_102022-F.webp");
const F50 = new Producto(2, "F50 5W40 4L", 12000, "https://http2.mlstatic.com/D_NQ_NP_2X_809648-MLA48169026682_112021-F.webp");
const F50E = new Producto(3, "F50E 5W30 4L", 12500, "https://http2.mlstatic.com/D_NQ_NP_2X_745527-MLA52041008928_102022-F.webp");
const Plus = new Producto(4, "F50 PLUS 5W40 4L", 12500, "https://http2.mlstatic.com/D_NQ_NP_2X_809028-MLA32967653852_112019-F.webp");
const F10 = new Producto(5, "F10 20W40 4L", 6500, "https://www.ypf.com/productosyservicios/PublishingImages/imagen-detalle-producto/Elaion-F10-20W50.png");
const F1015w40 = new Producto(6, "F10 15W40 4L", 6900, "https://lubricantesypfecuador.files.wordpress.com/2021/09/7.-elaion-f10-15w40.jpg");
const D1 = new Producto(7, "F50 D1 0W20 4L", 13000, "https://lubricantesypfecuador.files.wordpress.com/2021/09/1.-elaion-f50-d1-0w20.jpg");
const F50d1 = new Producto(8, "F50 D1 5W30 4L", 13500, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSHHo0jsYy_5jlvkkaBTNsPr_ysxYPgGWpzq-_iqn7iAlXQ8a5nv3dBa36sf6VjJdqxfv4mPk7B1Va8Wvq5Lr60I5K5fsWUqAyIdzCBj08RwYuUCJeDtXMUJg&usqp=CAE");



const productos = [F30, F50, F50E, Plus, F10, F1015w40, D1, F50d1];



let carrito = []; 



if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}



const contenedorProductos = document.getElementById("contenedorProductos");

 

const mostrarProductos = () => {
    productos.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-6", "col-md-6", "col-xs-12");
        card.innerHTML = 
                    ` <div class="card">
                    <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                    <div class= "card-body">
                        <h5>${producto.nombre}</h5>
                        <p> ${producto.precio} </p>
                        <button class="btn colorBoton" id="boton${producto.id}" > Agregar al Carrito </button>
                    </div>
                </div>`
        contenedorProductos.appendChild(card);

       
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
    })
}

mostrarProductos();


const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    //Trabajamos con el localStorage: 
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
}



const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito")

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})



const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";

    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                <div class="card">
                    <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                    <div class= "card-body">
                        <h5>${producto.nombre}</h5>
                        <p> ${producto.precio} </p>
                        <p> ${producto.cantidad} </p>
                        <button class="btn colorBoton" id="eliminar${producto.id}" > Eliminar Producto </button>
                    </div>
                </div>
                        `
        contenedorCarrito.appendChild(card);

       
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })

    })
    calcularTotal();
}



const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

 
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})



const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    //LocalStorage:
    localStorage.clear();
}



const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
       
    })
    total.innerHTML = `Total: $${totalCompra}`;
}



const botonFondo = document.getElementById("botonFondo");

botonFondo.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")) {
        localStorage.setItem("modo", "dark");
    } else {
        localStorage.setItem("modo", "light");
    }
});


const modo = localStorage.getItem("modo");

if(modo === "dark") {
    document.body.classList.add("dark");
} else {
    document.body.classList.remove("dark");
}
