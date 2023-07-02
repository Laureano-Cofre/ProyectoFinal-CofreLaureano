//////////////////////Variables, capturo elementos de manera tradicional
const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('totalCompra')
const cantidadTotal = document.getElementById('cantidadTotal')


//////////////////////Nav Bar
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav-menu_visible");
  
  if (navMenu.classList.contains("nav-menu_visible")) {
    navToggle.setAttribute("aria-label", "Cerrar menú");
  } else {
    navToggle.setAttribute("aria-label", "Abrir menú");
  }
});


///////////////////Carrito vacío
let data = []; 
let carrito = []

///////////////////Transformo JSON a objeto JS
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('carrito')){
      carrito = JSON.parse(localStorage.getItem('carrito'))
      actualizarCarrito()
  }
})

botonVaciar.addEventListener('click', () => {
  carrito.length = 0
  actualizarCarrito()
})


//////////////////Aplicando Fetch DENTRO DE UNA FUNCIÓN ASÍNCRONA y sumando un div con el Array de objetos tomado de mi archivo JSON 
const contenedorDrums = document.querySelector(".contenedor-drums")

const pedirDatos = async()=>{
  try {
  const resp = await fetch("./data.json")
  data = await resp.json()

    data.forEach((producto)=>{
        const div = document.createElement('div')
        div.classList.add('contenedor')
        div.innerHTML=`
        <div class="box">
        <img src=${producto.imagen} alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <h4>${producto.modelo}</h4>
        <p>$${producto.precio}</p>
        <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

        </div>
        `
        contenedorDrums.appendChild(div)


        const boton = document.getElementById(`agregar${producto.id}`)

        boton.addEventListener('click', () => {
    
            agregarAlCarrito(producto.id)
    
        })
    });
} catch (error) {
  console.log('Error al obtener los datos:', error);
}
}
pedirDatos()






///////////////////Agrego productos al carrito
const agregarAlCarrito = (prodId) => {
  const existe = carrito.some(prod => prod.id === prodId);

  if (existe) {
    carrito.forEach(prod => {
      if (prod.id === prodId) {
        prod.cantidad++;
      }
    });
  } else {
    const item = data.find(prod => prod.id === prodId);
    carrito.push({...item, cantidad: 1});
  }

  actualizarCarrito();
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Producto agregado al carrito',
    showConfirmButton: false,
    timer: 2000
  });
};



const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId)

  const indice = carrito.indexOf(item) 

  carrito.splice(indice, 1) 

  actualizarCarrito() 
  
  console.log(carrito)
}

const actualizarCarrito = () => {
  
  contenedorCarrito.innerHTML = "" 

  
  carrito.forEach((producto) => {
      const div = document.createElement('div')
      div.className = ('productoEnCarrito')
      div.innerHTML = `
      <p>${producto.nombre}</p>
      <p>Precio:$${producto.precio}</p>
      <p>Cantidad: <span id="cantidad">${producto.cantidad}</span></p>
      <button onclick="eliminarDelCarrito(${producto.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
      `

      contenedorCarrito.appendChild(div)
      
      localStorage.setItem('carrito', JSON.stringify(carrito))

  })

  
  /////////////////Longitud del carrito
  contadorCarrito.innerText = carrito.length
  console.log(carrito)
  /////////////////ACUMULADOR
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

}

//////////////Formulario, capturo elementos con querySelector

const formulario =  document.querySelector(".form-contact")
const inputName = document.querySelector(".nombre")
const inputEmail = document.querySelector(".correo")
const inputCelular = document.querySelector(".celular")
const inputMensaje = document.querySelector("#mensaje")


formulario.addEventListener("submit", validarFormulario)

function validarFormulario(e){
    e.preventDefault()
    
    console.log(`Nombre del usuario: ${inputName.value}, correo: ${inputEmail.value}, número de celular: ${inputCelular.value}, y su mensaje es: ${inputMensaje.value}`);
/* 
    Swal.fire({
      title: '¡Gracias por tu compra!',
      text: 'Nos pondremos en contacto.',
      imageUrl: 'https://cdn.aarp.net/content/dam/aarp/entertainment/music/2019/10/1140-ringo-starr-esp.imgcache.rev.web.700.403.jpg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    }) */
}

const botonFinalizarCompra = document.querySelector("#finalizar-compra")

botonFinalizarCompra.addEventListener('click', () => {
    
  Swal.fire({
    title: '¡Gracias por tu compra!',
    text: 'Completa el formulario de denajo y nos pondremos en contacto.',
    imageUrl: 'https://cdn.aarp.net/content/dam/aarp/entertainment/music/2019/10/1140-ringo-starr-esp.imgcache.rev.web.700.403.jpg',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',

})
})
