var LibrosController = (function () {
    function LibrosController($scope, librosService) {
        this.$scope = $scope;
        this.librosService = librosService;
        console.trace("LibrosController constructor");
        this.$scope.vm = this;
        $scope.vm.libros = [];
        $scope.vm.titulo = "Listado de libros";
        $scope.vm.mensaje = undefined;
        $scope.vm.habilitarFormulario = false;
        librosService.getLibros().then(function (datos) {
            console.trace("Libros leídos: %o", datos);
            $scope.vm.libros = datos;
        });
        $scope.vm.borrarLibro = function () {
            $scope.vm.mensaje = undefined;
            console.trace("borrarLibro %o", $scope.vm.libroBorrar);
            var indice = $scope.vm.libros.indexOf($scope.vm.libroBorrar);
            librosService.deleteLibro($scope.vm.libroBorrar.id).then(function (data) {
                $scope.vm.libros.splice(indice, 1);
                $scope.vm.mensaje = "Libro eliminado correctamente.";
            });
        };
        $scope.vm.nuevoLibro = function (nuevoTitulo, nuevoAutor) {
            console.trace("nuevoLibro: %s - %s", nuevoTitulo, nuevoAutor);
            $scope.vm.mensaje = undefined;
            var libro;
            var pagina = { "id": 0, "texto": "Érase una vez..." };
            libro.id = -1;
            libro.titulo = nuevoTitulo;
            libro.autor = nuevoAutor;
            libro.paginas = pagina;
            librosService.crearLibro(libro).then(function (data) {
                $scope.vm.libros.push(data);
                $scope.vm.mensaje = "Libro creado correctamente";
            });
        };
    }
    LibrosController.$inyect = ["$scope·"];
    return LibrosController;
}());
//# sourceMappingURL=libros.controller.js.map