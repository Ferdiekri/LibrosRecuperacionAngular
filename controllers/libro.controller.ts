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

    // Funciones
    public cambiarPagina: any;
    public cambiarPaginaNumero: any;


    constructor($scope, libroId: string, private librosService: ILibrosService) {
        console.trace("LibroController constructor");

        this.scope = $scope;
        $scope.vm = this;
        $scope.vm.libroId = libroId;

        console.trace("LibroId: %s", $scope.vm.libroId);

        $scope.vm.titulo = "Detalle del libro #" + $scope.vm.libroId;

        librosService.getLibroById($scope.vm.libroId).then(
            ( data ) => {
                console.trace("Libro leídos: %o", data);
                $scope.vm.libro = data;
                $scope.vm.paginas = data.paginas;
                $scope.vm.pagina = $scope.vm.paginas[0];
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



    }
}