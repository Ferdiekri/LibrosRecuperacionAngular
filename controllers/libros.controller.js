var LibrosController = (function () {
    function LibrosController($scope, librosService) {
        this.$scope = $scope;
        this.librosService = librosService;
        console.trace("LibrosController constructor");
        this.$scope.vm = this;
        $scope.vm.libros = [];
        $scope.vm.titulo = "Listado de libros";
        librosService.getLibros().then(function (datos) {
            console.trace("Libros leídos: %o", datos);
            $scope.vm.libros = datos;
        });
    }
    LibrosController.$inyect = ["$scope·"];
    return LibrosController;
}());
//# sourceMappingURL=libros.controller.js.map