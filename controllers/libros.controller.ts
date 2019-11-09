interface ILibrosController extends ng.IScope{
    vm: LibrosController;
}

class LibrosController implements ng.IController{

    public static $inyect = ["$scope·"];
    public libros: Array<ILibro>;
    public titulo: string;
    public libroBorrar: ILibro;
    public mensaje: string;
    public habilitarFormulario: boolean;
   
    //funcion
    public editarLibro: any;
    public borrarLibro: any;
    public guardarLibro: any;
    public obternerFormatos: any;
    public nuevoLibro: any;
    
    constructor(private $scope: ILibrosController, private librosService: ILibrosService){
        
        console.trace("LibrosController constructor");
        this.$scope.vm = this;
        $scope.vm.libros = [];
        $scope.vm.titulo = "Listado de libros";
        $scope.vm.mensaje = undefined;
        $scope.vm.habilitarFormulario = false;

        librosService.getLibros().then(
            ( datos ) => {
                console.trace("Libros leídos: %o", datos);
                $scope.vm.libros = datos;                
            }
        ); // getLibros()

        $scope.vm.borrarLibro = () => {
            $scope.vm.mensaje = undefined;
            console.trace("borrarLibro %o", $scope.vm.libroBorrar);

            let indice = $scope.vm.libros.indexOf($scope.vm.libroBorrar);

            librosService.deleteLibro($scope.vm.libroBorrar.id).then(
                (data) => {
                    $scope.vm.libros.splice(indice,1);
                    $scope.vm.mensaje = "Libro eliminado correctamente.";
                }
            );
        } // borrarLibro()

        $scope.vm.nuevoLibro = (nuevoTitulo: string, nuevoAutor: string) => {
            console.trace("nuevoLibro: %s - %s", nuevoTitulo, nuevoAutor);

            $scope.vm.mensaje = undefined;
            let libro: ILibro;
            let pagina = {"id": 0, "texto": "Érase una vez..."};
            libro.id = -1;
            libro.titulo = nuevoTitulo;
            libro.autor = nuevoAutor;
            libro.paginas = pagina;

            librosService.crearLibro(libro).then(
                (data) => {
                    $scope.vm.libros.push(data);
                    $scope.vm.mensaje = "Libro creado correctamente";
                }
            );
        }
        // nuevoLibro()
        
    } // constructor
}