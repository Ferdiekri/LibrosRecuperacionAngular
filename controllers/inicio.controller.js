var InicioController = (function () {
    function InicioController($scope, viviendasService) {
        this.$scope = $scope;
        this.viviendasService = viviendasService;
        console.trace("IInicioController constructor");
        this.$scope.vm = this;
        $scope.vm.viviendas = [];
        $scope.vm.mensaje = undefined;
        viviendasService.getViviendas().then(function (datos) {
            console.trace("Viviendas leídas: %o", datos);
            $scope.vm.viviendas = datos;
            $scope.vm.mensaje = "Viviendas cargadas correctamente.";
        });
    }
    InicioController.$inyect = ["$scope·"];
    return InicioController;
}());
//# sourceMappingURL=inicio.controller.js.map