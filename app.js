var Visualizer = window["ui-router-visualizer"].Visualizer;
var app = angular.module("myApp", ["ui.router"]);
app
    .controller("inicioController", InicioController)
    .controller("formularioController", FormularioController)
    .controller("resumenController", ResumenController)
    .service("viviendasService", ViviendasService);
app.config([
    "$urlRouterProvider",
    "$stateProvider",
    function ($urlRouterProvider, $stateProvider) {
        console.log("Entrando en la configuracion");
        $urlRouterProvider.when("", "/inicio");
        $stateProvider
            .state("inicio", {
            url: "/inicio",
            templateUrl: "views/inicio.html",
            controller: "inicioController"
        })
            .state("formulario", {
            url: "/formulario",
            templateUrl: "views/formulario.html",
            controller: "formularioController"
        })
            .state("resumen", {
            url: "/resumen",
            templateUrl: "views/resumen.html",
            controller: "resumenController"
        })
            .state("leeme", {
            url: "/leeme",
            templateUrl: "views/leeme.html"
        });
    }
]);
app.run([
    "$uiRouter",
    function ($uiRouter) {
        var pluginInstance = $uiRouter.plugin(Visualizer);
    }
]);
//# sourceMappingURL=app.js.map