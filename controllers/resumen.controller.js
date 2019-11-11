var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
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
            var auxi = $scope.vm.viviendas.map(function (elem) {
                return {
                    "nombre": elem.nombre,
                    "precio": elem.precio
                };
            });
            $scope.vm.ejercicio1 = __spread(new Set(auxi)).sort();
            $scope.vm.ejercicio3 = $scope.vm.viviendas.filter(function (elem) { return elem.habitaciones > 3; }).map(function (elem) { return elem.precio; }).reduce(function (acum, cv) { return acum + cv; });
            $scope.vm.ejercicio2 = _this.$scope.vm.viviendas.find(function (elem) { return elem.servicios; });
            $scope.vm.ejercicio2.find(function (elem) { return elem.nombre === "cocina" && elem.disponible === true; });
            $scope.vm.ejercicio4 = $scope.vm.viviendas.map(function (elem) { return elem.servicios; });
        });
    }
    ResumenController.$inyect = ["$scope·"];
    return ResumenController;
}());
//# sourceMappingURL=resumen.controller.js.map