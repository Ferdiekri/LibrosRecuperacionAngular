var ResumenController = (function () {
    function ResumenController($scope, viviendasService) {
        var _this = this;
        this.$scope = $scope;
        this.viviendasService = viviendasService;
        console.trace("IResumenController constructor");
        this.$scope.vm = this;
        $scope.vm.titulo = "Resumen de datos de viviendas.";
        $scope.vm.mensaje = undefined;
        viviendasService.getViviendas().then(function (datos) {
            console.trace("Viviendas leídas: %o", datos);
            $scope.vm.viviendas = datos;
            $scope.vm.mensaje = "Viviendas cargadas correctamente.";
            $scope.vm.ejercicio1 = $scope.vm.viviendas.map(function (elem) {
                return {
                    "nombre": elem.nombre,
                    "precio": elem.precio
                };
            });
            $scope.vm.ejercicio2 = _this.$scope.vm.viviendas.find(function (elem) { return elem.servicios; });
            $scope.vm.ejercicio2.find(function (elem) { return elem.nombre === "cocina" && elem.disponible === true; });
            $scope.vm.ejercicio3 = $scope.vm.viviendas.filter(function (elem) { return elem.habitaciones > 3; }).map(function (elem) { return elem.precio; }).reduce(function (acum, cv) { return acum + cv; });
            console.trace("PAREMOS");
            var aux = $scope.vm.viviendas.map(function (elem) { return elem.servicios; });
            $scope.vm.ejercicio4 = aux.map(function (elem) { return elem.nombre; });
            var serviciosDuplicados = $scope.vm.viviendas
                .map(function (v) { return v.servicios; });
            $scope.vm.ejercicio4 = serviciosDuplicados;
        });
    }
    ResumenController.$inyect = ["$scope·"];
    return ResumenController;
}());
//# sourceMappingURL=resumen.controller.js.map