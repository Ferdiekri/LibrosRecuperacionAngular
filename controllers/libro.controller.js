var LibroController = (function () {
    function LibroController($scope, libroId, librosService) {
        this.librosService = librosService;
        console.trace("LibroController constructor");
        this.scope = $scope;
        $scope.vm = this;
        $scope.vm.libroId = libroId;
        console.trace("LibroId: %s", $scope.vm.libroId);
        $scope.vm.titulo = "Detalle del libro #" + $scope.vm.libroId;
        librosService.getLibroById($scope.vm.libroId).then(function (data) {
            console.trace("Libro leídos: %o", data);
            $scope.vm.libro = data;
            $scope.vm.paginas = data.paginas;
            $scope.vm.pagina = $scope.vm.paginas[0];
        });
        $scope.vm.cambiarPagina = function (accion) {
            console.trace("cambiarPagina ANTES: " + $scope.vm.pagina.id);
            var pagActual = $scope.vm.pagina.id;
            if (accion) {
                if (pagActual == $scope.vm.paginas.length) {
                    $scope.vm.mensaje = "Se acabó el cuento.";
                }
                else {
                    $scope.vm.pagina = $scope.vm.paginas[pagActual];
                    $scope.vm.mensaje = undefined;
                }
            }
            else {
                if (pagActual == $scope.vm.paginas[0].id) {
                    $scope.vm.mensaje = "Ya estás al principio del cuento.";
                }
                else {
                    $scope.vm.pagina = $scope.vm.paginas[(pagActual - 2)];
                    $scope.vm.mensaje = undefined;
                }
            }
            console.trace("cambiarPagina DESPUES: " + $scope.vm.pagina.id);
        };
        $scope.vm.cambiarPaginaNumero = function () {
            console.trace("cambiarPaginaNumero");
            $scope.vm.mensaje = undefined;
            if (($scope.vm.saltarPagina < 1) || ($scope.vm.saltarPagina > $scope.vm.paginas.length)) {
                $scope.vm.mensaje = "Te has salido del rango de páginas del libro.";
            }
            else {
                $scope.vm.pagina = $scope.vm.paginas[$scope.vm.saltarPagina - 1];
                $scope.vm.mensaje = undefined;
            }
        };
    }
    LibroController.prototype.$onDestroy = function () { };
    return LibroController;
}());
//# sourceMappingURL=libro.controller.js.map