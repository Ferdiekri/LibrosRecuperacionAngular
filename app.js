var Visualizer = window["ui-router-visualizer"].Visualizer;
var app = angular.module("myApp", ["ui.router"]);
app
    .controller("librosController", LibrosController)
    .controller("libroController", LibroController)
    .service("librosService", LibrosService);
app.config([
    "$urlRouterProvider",
    "$stateProvider",
    function ($urlRouterProvider, $stateProvider) {
        console.log("Entrando en la configuracion");
        $urlRouterProvider.when("", "/inicio");
        $stateProvider
            .state("inicio", {
            url: "/inicio",
            templateUrl: "views/inicio.html"
        })
            .state("libros", {
            url: "/libros",
            templateUrl: "views/libros.html",
            controller: "librosController"
        })
            .state("libro", {
            url: "/libros/:libroId",
            templateUrl: "views/libro.html",
            controller: "libroController",
            resolve: {
                libroId: ["$stateParams", function ($stateParams) { return $stateParams.libroId; }],
            }
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