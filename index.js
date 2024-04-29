class Producto{
    //se usa el constructor para crear objetos
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
/*Para eliminar, se realiza una consulta buscando el 
nombre o elemento espécifico, y para elegir el padre/superior del mismo
hay que escribir {{ .parentElement }} que puede repetir varias veces*/
        if(element.name === "Eliminar"){
            element.parentElement.parentElement.parentElement.remove();
            this.Avisos('Producto Eliminado Exitosamente', 'info');
        }
    };
    Blanqueo(){
        //el siguiente método solamente funciona con datos dentro de un Form
        document.getElementById("PForm").reset();
    }
    Avisos(Mensaje, CSSClass){
        const $Div = document.createElement('div');
        $Div.className = `alert alert-${CSSClass} mt-2`;
        $Div.appendChild(document.createTextNode(Mensaje));
        //Seleccion de elemento
        const $Contenedor = document.querySelector('.container');
        const $Aplicacion = document.querySelector("#Aplicacion");
        //se utiliza los elementos seleccionado para usarlo de margen
        $Contenedor.insertBefore($Div, $Aplicacion);
        //temporizador para eliminar el mensaje creado
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        }, 3000);
    };
}

//evento del DOOM
document.getElementById("PForm").addEventListener('submit', (e) =>{
    e.preventDefault();
    const $Nombre = document.getElementById('Nombre').value;
    const $Precio = document.getElementById('Precio').value;
    const $Año = document.getElementById('Año').value;

    //se compila la infomacion
    const $Productos = new Producto($Nombre, $Precio, $Año);

    //Se lo añade a la clase 
    const interfas = new InterfazUsuario();

    if($Nombre === '' || $Precio === '' || $Año === ''){
       //el uso del return permite cortar con el proceso y evita escribir el else
        return interfas.Avisos('Faltan Datos para Completar', 'danger');
    }

    //se lo añade al evento con la informacion compilado
    interfas.AñadirProducto($Productos);        
    interfas.Blanqueo();       
    interfas.Avisos('Producto Agregago Satisfatoriamente', 'success');

});

document.getElementById('ListaProducto').addEventListener('click', (e)=>{
    const LInterfas = new InterfazUsuario();
    LInterfas.EliminarProducto(e.target);
});