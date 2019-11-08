let Visualizer = window["ui-router-visualizer"].Visualizer;
const app = angular.module("myApp", ["ui.router"]);


app 
  .controller("librosController", LibrosController)
  .controller("libroController", LibroController)
  .service("librosService", LibrosService);

app.config([
  "$urlRouterProvider",
  "$stateProvider",
  ($urlRouterProvider: angular.ui.IUrlRouterProvider, $stateProvider: angular.ui.IStateProvider) => {
    console.log("Entrando en la configuracion");

    // Si no escribimos nada, que nos lleve a Home.
    $urlRouterProvider.when("", "/inicio");

    // Configuración de estados.
    $stateProvider
        
        // Home.
        .state("inicio",    {
                            url: "/inicio",
                            templateUrl: "views/inicio.html"        
                            }
        )
        // Libros
        .state("libros",    {
                            url: "/libros",
                            templateUrl: "views/libros.html"  ,
                            controller: "librosController"      
                            }
        )
        // Pagina
        .state("pagina",    {
                            url: "/pagina",
                            templateUrl: "views/pagina.html"        
                            }
        )
        // Libro con id
        .state("libro",     {
                            url: "/libros/:libroId",
                            templateUrl: "views/libro.html",
                            controller: "libroController",
                            resolve:
                              {
                                libroId: ["$stateParams", ($stateParams: angular.ui.IStateParamsService) => $stateParams.libroId],
                              }
                            }
      )

  }
]);

app.run([
  "$uiRouter",
  $uiRouter => {
    const pluginInstance = $uiRouter.plugin(Visualizer);
  }
]);
