const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnPlanes = document.querySelector('.planes');
const btnServContables = document.querySelector('.servContables');
const btnServRrhhs = document.querySelector('.servRrhhs');
const contenedorServicios = document.querySelector('.servicios');

document.addEventListener('DOMContentLoaded',()=>{
    evento();
    servicios();
});

const evento = () => {
    menu.addEventListener('click', abrirMenu);
}

const abrirMenu = () => {
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () => {
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length>0)return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'X';
    btnCerrar.classList.add('btn-cerrar');
    // while(navegacion.children[4]){
    //     navegacion.removeChild(navegacion.children[4]);
    // }
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar, overlay);
}

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    })
});

imagenes.forEach(imagen=>{
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) => {
    boton.addEventListener('click', () =>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick= function(){
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    }
}

const servicios = () => {
    let serviciosArrays = [];
    const servicios = document.querySelectorAll('.servicio');
    
    servicios.forEach(servicio=>serviciosArrays = [...serviciosArrays,servicio]);

    const planes = serviciosArrays.filter(plan=> plan.getAttribute('data-servicio') === 'planes');
    const contables = serviciosArrays.filter(contable=> contable.getAttribute('data-servicio') === 'contables');
    const rrhhs = serviciosArrays.filter(rrhh=> rrhh.getAttribute('data-servicio') === 'rrhhs');

    mostrarServicios(planes, contables, rrhhs, serviciosArrays);
}

const mostrarServicios = (planes, contables, rrhhs, todos) => {
    btnPlanes.addEventListener('click', () => {
        limpiarHtml(contenedorServicios);
        planes.forEach(plan=> contenedorServicios.appendChild(plan))
    });
    btnServContables.addEventListener('click', () => {
        limpiarHtml(contenedorServicios);
        contables.forEach(contable=> contenedorServicios.appendChild(contable))
    });
    btnServRrhhs.addEventListener('click', () => {
        limpiarHtml(contenedorServicios);
        rrhhs.forEach(rrhh=> contenedorServicios.appendChild(rrhh))
    });
    btnTodos.addEventListener('click', () =>{
        limpiarHtml(contenedorServicios);
        todos.forEach(todo => contenedorServicios.appendChild(todo))
    })
}
const limpiarHtml = (contenedor) => {
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}