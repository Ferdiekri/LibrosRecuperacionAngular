var LibroController = (function () {
    function LibroController($scope, libroId, librosService) {
        this.librosService = librosService;
        console.trace("LibroController constructor");
        this.scope = $scope;
        $scope.vm = this;
        $scope.vm.libroId = libroId;
        $scope.vm.nuevaPagina = "Introduce el texto de la nueva página.";
        $scope.vm.mostrarNuevo = false;
        $scope.vm.mostrarEditar = false;
        console.trace("LibroId: %s", $scope.vm.libroId);
        $scope.vm.titulo = "Detalle del libro #" + $scope.vm.libroId;
        librosService.getLibroById($scope.vm.libroId).then(function (data) {
            console.trace("Libro leídos: %o", data);
            $scope.vm.libro = data;
            $scope.vm.paginas = data.paginas;
            $scope.vm.pagina = $scope.vm.paginas[0];
            $scope.vm.copiaLibro = angular.copy($scope.vm.libro);
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
        $scope.vm.guardarPagina = function () {
            console.trace("guardarPagina: %o", $scope.vm.nuevaPagina);
            $scope.vm.mensaje = undefined;
            var ultimaPagina = $scope.vm.paginas[$scope.vm.paginas.length - 1].id + 1;
            var nuevoLibro = angular.copy($scope.vm.libro);
            console.trace("guardarPagina: %o", nuevoLibro);
            var nuevaPag = { "id": ultimaPagina, "texto": $scope.vm.nuevaPagina };
            $scope.vm.paginas.push(nuevaPag);
            nuevoLibro.paginas = $scope.vm.paginas;
            console.trace("guardarPagina: %o", $scope.vm.nuevaPagina);
            librosService.insertNuevaPagina(nuevoLibro.id, nuevoLibro).then(function (data) {
                console.trace("Libro leídos: %o", data);
                $scope.vm.libro = data;
                $scope.vm.mensaje = "Página añadida correctamente.";
            });
        };
        $scope.vm.editarLibro = function () {
            console.trace("editarLibro %o", $scope.vm.copiaLibro);
            $scope.vm.mensaje = undefined;
            librosService.modificarLibro($scope.vm.copiaLibro).then(function (data) {
                $scope.vm.libro = $scope.vm.copiaLibro;
                $scope.vm.mensaje = "Datos del libro modificados satisfactoriamente.";
            });
        };
        $scope.vm.eliminarPagina = function (pagina) {
            console.trace("eliminarPagina %o", pagina);
            $scope.vm.mensaje = undefined;
            var indice = $scope.vm.paginas.indexOf(pagina);
            var nuevoLibro = angular.copy($scope.vm.libro);
            console.trace("Indice de la página %o", indice);
            $scope.vm.paginas.splice(indice, 1);
            nuevoLibro.paginas = $scope.vm.paginas;
            librosService.modificarPagina(nuevoLibro.id, nuevoLibro).then(function (data) {
                console.trace("Libro leídos: %o", data);
                $scope.vm.libro = data;
                $scope.vm.mensaje = "Página eliminada correctamente.";
                $scope.vm.pagina = $scope.vm.paginas[0];
            });
        };
    }
    LibroController.prototype.$onDestroy = function () { };
    return LibroController;
}());
//# sourceMappingURL=libro.controller.js.map