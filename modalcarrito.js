//Creo ventana emergente modal, para el carrito
//Capturo elementos de manera tradicional
const contenedorModal = document.getElementsByClassName('contenedorCarrito')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

//Agrego Eventos
botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')
})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 
})