interface ILibrosController extends ng.IScope{
    vm: LibrosController;
}

class LibrosController implements ng.IController{

    public static $inyect = ["$scope·"];
    public libros: Array<ILibro>;
    public titulo: string;
   
    //funcion
    public editarLibro: any;
    public borrarLibro: any;
    public guardarLibro: any;
    public obternerFormatos: any;
    
    constructor(private $scope: ILibrosController, private librosService: ILibrosService){
        
        console.trace("LibrosController constructor");
        this.$scope.vm = this;
        $scope.vm.libros = [];
        $scope.vm.titulo = "Listado de libros";

        librosService.getLibros().then(
            ( datos ) => {
                console.trace("Libros leídos: %o", datos);
                $scope.vm.libros = datos;                
            }
        ); // getLibros()
        
/*
        // funciones
        
        this.editarLibro = ( lib: ILibro ) => {
            console.trace("editarLibro & %o", lib);
            this.$scope.vm.libroFormulario = angular.copy(lib); // Hace una copia del objeto y así no se modifica el original.
            $scope.vm.tituloseccion = "Editar Libro: #" + lib.id;
        } // editarLibro()

        this.borrarLibro = ( ) => {
            console.trace("borrarLibro & %s", $scope.vm.libroBorrar.id);
            librosService.deleteLibro($scope.vm.libroBorrar.id).then(
                ( data ) => {
                    console.warn("Libro eliminado. %o", data);
                    $scope.vm.mensaje = "Libro eliminado correctamente.";
                    let indice = $scope.vm.libros.indexOf($scope.vm.libroBorrar); 
                    $scope.vm.libros.splice(indice, 1);
                },
                ( res ) => {
                    console.warn("No se ha podido eliminar el libro. %o", res);
                    $scope.vm.mensaje = "No se ha podido eliminar el libro.";
                }
            );
        } // borrarLibro()

        this.guardarLibro = () => {
            console.trace("guardarLibro");

            let lib = $scope.vm.libroFormulario; 

            // Si el libro elegido es en PAPEL, le quitamos los FORMATOS que haya podido seleccionar antes.
            if (!lib.digital){ 
                lib.formatos = undefined;
            }

            // Validar que si es libro es DIGITAL, al menos tiene que haber un FORMATO seleccionado.
            if ( lib.digital && !lib.formatos ){
                $scope.vm.mensaje = "Si el libro es DIGITAL, tiene que tener al menos un FORMATO.";
                return false; 
            }
            
            if( lib.id ){
                // Modificar libro.
                librosService.modificarLibro(lib.id, lib).then(
                    ( data ) => {
                        console.warn("Libro modificado. %o", data);
                        $scope.vm.mensaje = "Libro modificado correctamente.";
                        let indice = $scope.vm.libros.indexOf(lib); 
                        $scope.vm.libros.indexOf[indice] = data;
                        $scope.vm.libroFormulario = undefined;                        
                    },
                    ( res ) => {
                        console.warn("No se ha podido modificar el libro. %o", res);
                        $scope.vm.mensaje = "No se ha podido modificar el libro.";
                    } 
                );

            } else {
                // Insertar libro.
                librosService.crearLibro($scope.vm.libroFormulario).then(
                    ( data ) => {
                        console.warn("Libro creado. %o", data);
                        $scope.vm.mensaje = "Libro modificado correctamente.";
                        $scope.vm.libros.push(data); 
                        $scope.vm.libroFormulario = undefined;
                    },
                    ( res ) => {
                        console.warn("No se ha podido crear el libro. %o", res);
                        $scope.vm.mensaje = "No se ha podido crear el libro.";
                    } 
                );

            }
        } // guardarLibro()

        $scope.vm.obternerFormatos = () =>{
            $scope.vm.temp = $scope.vm.libros.filter((elem)=>elem.formatos != undefined);
            let temporal = $scope.vm.temp.map((elem)=>elem.formatos).flat();
            console.debug('temporales %o', temporal);
          
            $scope.vm.formatos = temporal.filter((v,i,a)=>a.indexOf(v)===i);
            console.debug("formatos %o", $scope.vm.formatos);

            /*

            let sacarFormatos = $scope.vm.libros
            .filter( elem => elem.formatos )
                .map( elem => elem.formatos != undefined )
                    //.reduce( (a,b) => a.concat(b) )
            ;
            $scope.vm.formatos = [ ...new Set(sacarFormatos) ].sort();

            *
        } // obtenerFormato()

        
       */

    } // constructor

  

    

    
}

