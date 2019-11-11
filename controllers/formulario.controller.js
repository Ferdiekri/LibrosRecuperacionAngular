var FormularioController = (function () {
    function FormularioController($scope, viviendasService) {
        this.$scope = $scope;
        this.viviendasService = viviendasService;
        console.trace("IFormularioController constructor");
        this.$scope.vm = this;
        $scope.vm.titulo = "Formulario de nueva vivienda";
        $scope.vm.mensaje = undefined;
        $scope.vm.nuevaVivienda = function () {
            console.trace("nuevaVivienda %o", $scope.vm.viviendaNueva);
            viviendasService.crearVivienda($scope.vm.viviendaNueva).then(function (data) {
                console.warn("Vivienda añadida. %o", data);
                $scope.vm.mensaje = "Vivienda creada correctamente.";
            }, function (res) {
                console.warn("No se ha podido crear la vivienda. %o", res);
                $scope.vm.mensaje = "No se ha podido crear la vivienda.";
            });
        };
    }
    FormularioController.$inyect = ["$scope·"];
    return FormularioController;
}());
//# sourceMappingURL=formulario.controller.js.map