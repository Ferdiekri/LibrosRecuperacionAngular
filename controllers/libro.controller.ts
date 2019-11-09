interface ILibroController extends ng.IScope{
    vm: LibroController;
}

class LibroController implements ng.IController{
    public $onDestroy() {}
    private scope: angular.IScope;
    public libroId: string;
    public titulo: string;
    public libro: ILibro;
    public paginas: Array<string>;
    public pagina: string;
    public mensaje: string;
    public saltarPagina: number;
    public nuevaPagina: string;
    public copiaLibro: ILibro;
    public mostrarNuevo: boolean;
    public mostrarEditar: boolean;

    // Funciones
    public cambiarPagina: any;
    public cambiarPaginaNumero: any;
    public guardarPagina: any;
    public editarLibro: any;
    public copiarLibro: any;
    public cambiarEstados: any;
    public habilitarNuevo: any;
    public eliminarPagina: any;


    constructor($scope, libroId: string, private librosService: ILibrosService) {
        console.trace("LibroController constructor");

        this.scope = $scope;
        $scope.vm = this;
        $scope.vm.libroId = libroId;
        $scope.vm.nuevaPagina = "Introduce el texto de la nueva página.";
        $scope.vm.mostrarNuevo = false;
        $scope.vm.mostrarEditar = false; 

        console.trace("LibroId: %s", $scope.vm.libroId);

        $scope.vm.titulo = "Detalle del libro #" + $scope.vm.libroId;

        librosService.getLibroById($scope.vm.libroId).then(
            ( data ) => {
                console.trace("Libro leídos: %o", data);
                $scope.vm.libro = data;
                $scope.vm.paginas = data.paginas;
                $scope.vm.pagina = $scope.vm.paginas[0];
                $scope.vm.copiaLibro=angular.copy($scope.vm.libro);
            }
        ); // getLibroById()

        $scope.vm.cambiarPagina = (accion: boolean) => {
            console.trace("cambiarPagina ANTES: " + $scope.vm.pagina.id);
            let pagActual = $scope.vm.pagina.id;

            if(accion){ // Avanzar una página.
                if ( pagActual == $scope.vm.paginas.length ) { //Si ya está en el final
                    $scope.vm.mensaje = "Se acabó el cuento.";
                }else{
                    $scope.vm.pagina = $scope.vm.paginas[ pagActual ];
                    $scope.vm.mensaje = undefined;
                }
                
            }else{ // Retroceder una página.
                if (pagActual == $scope.vm.paginas[0].id) { // Si ya está al principio.
                    $scope.vm.mensaje = "Ya estás al principio del cuento.";
                } else {
                    $scope.vm.pagina = $scope.vm.paginas[ (pagActual-2) ];
                    $scope.vm.mensaje = undefined;
                }                 
            }
            console.trace("cambiarPagina DESPUES: " + $scope.vm.pagina.id);
        } // cambiarPagina()

        $scope.vm.cambiarPaginaNumero = () => {
            console.trace("cambiarPaginaNumero");
            $scope.vm.mensaje = undefined;

            if ( ( $scope.vm.saltarPagina < 1 ) || ( $scope.vm.saltarPagina > $scope.vm.paginas.length )  ) {
                $scope.vm.mensaje = "Te has salido del rango de páginas del libro.";
            } else {
                $scope.vm.pagina = $scope.vm.paginas[ $scope.vm.saltarPagina-1 ];
                $scope.vm.mensaje = undefined;
            }
        } // cambiarPaginaNumero()

        $scope.vm.guardarPagina = () => {
            console.trace("guardarPagina: %o", $scope.vm.nuevaPagina);
            
            $scope.vm.mensaje = undefined;
            let ultimaPagina = $scope.vm.paginas[$scope.vm.paginas.length-1].id+1
            let nuevoLibro = angular.copy($scope.vm.libro);
            console.trace("guardarPagina: %o", nuevoLibro);

            
            let nuevaPag = {"id": ultimaPagina, "texto":$scope.vm.nuevaPagina};
            $scope.vm.paginas.push( nuevaPag );
            nuevoLibro.paginas = $scope.vm.paginas;
            console.trace("guardarPagina: %o", $scope.vm.nuevaPagina);

            librosService.modificarLibro(nuevoLibro).then(
                ( data ) => {
                    console.trace("Libro leídos: %o", data);
                    $scope.vm.libro = data;
                    $scope.vm.mensaje = "Página añadida correctamente.";
                }
            ); // modificarLibro()
           
        } // guardarPagina()

        $scope.vm.editarLibro = () => {
            console.trace("editarLibro %o", $scope.vm.copiaLibro);

            $scope.vm.mensaje = undefined;
            librosService.modificarLibro($scope.vm.copiaLibro).then(
                ( data ) => {
                    $scope.vm.libro = $scope.vm.copiaLibro;
                    $scope.vm.mensaje = "Datos del libro modificados satisfactoriamente.";
                }
            );

        } // editarLibro()

        $scope.vm.eliminarPagina = (pagina: IPaginas) => {
            console.trace("eliminarPagina %o", pagina);

            $scope.vm.mensaje = undefined;
            let indice = $scope.vm.paginas.indexOf(pagina);
            let nuevoLibro = angular.copy($scope.vm.libro);
            console.trace("Indice de la página %o", indice);

            $scope.vm.paginas.splice(indice, 1);
            nuevoLibro.paginas = $scope.vm.paginas;

            librosService.modificarPagina(nuevoLibro.id, nuevoLibro).then(
                ( data ) => {
                    console.trace("Libro leídos: %o", data);
                    $scope.vm.libro = data;
                    $scope.vm.mensaje = "Página eliminada correctamente.";
                    $scope.vm.pagina = $scope.vm.paginas[0];
                }
            ); // modificarPagina()

        } // eliminarPagina()



    }
}