class Producto{    
    constructor(Nombre, Precio, Año){
        this.Nombre = Nombre;
        this.Precio = Precio;
        this.Año = Año;
    };
}
class InterfazUsuario{
    AñadirProducto($Productos){
        const $ListaProducto = document.getElementById("ListaProducto");
        const $Elemento = document.createElement('div');
        $Elemento.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
                <strong>Producto</strong>: ${$Productos.Nombre}
                <strong>Precio</strong>: ${$Productos.Precio}
                <strong>Año</strong>: ${$Productos.Año}
                <a href="#" class="btn btn-danger" name="Eliminar">Delete</a>
            </div>
        </div>`;

        $ListaProducto.appendChild($Elemento);

    };
    EliminarProducto(element){
        if(element.name === "Eliminar"){
            element.parentElement.parentElement.parentElement.remove();
            this.Avisos('Producto Eliminado Exitosamente', 'info');
        }
    };
    Blanqueo(){
        document.getElementById("PForm").reset();
    }
    Avisos(Mensaje, CSSClass){
        const $Div = document.createElement('div');
        $Div.className = `alert alert-${CSSClass} mt-2`;
        $Div.appendChild(document.createTextNode(Mensaje));
        const $Contenedor = document.querySelector('.container');
        const $Aplicacion = document.querySelector("#Aplicacion");
        $Contenedor.insertBefore($Div, $Aplicacion);
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        }, 3000);
    };
}
document.getElementById("PForm").addEventListener('submit', (e) =>{
    e.preventDefault();
    const $Nombre = document.getElementById('Nombre').value;
    const $Precio = document.getElementById('Precio').value;
    const $Año = document.getElementById('Año').value;
    const $Productos = new Producto($Nombre, $Precio, $Año);
    const interfas = new InterfazUsuario();

    if($Nombre === '' || $Precio === '' || $Año === ''){
        return interfas.Avisos('Faltan Datos para Completar', 'danger');
    }
    interfas.AñadirProducto($Productos);        
    interfas.Blanqueo();       
    interfas.Avisos('Producto Agregago Satisfatoriamente', 'success');
});
document.getElementById('ListaProducto').addEventListener('click', (e)=>{
    const LInterfas = new InterfazUsuario();
    LInterfas.EliminarProducto(e.target);
});