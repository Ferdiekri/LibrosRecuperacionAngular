let Visualizer = window["ui-router-visualizer"].Visualizer;
const app = angular.module("myApp", ["ui.router"]);


app 
  .controller("inicioController", InicioController)
  .controller("formularioController", FormularioController)
  .controller("resumenController", ResumenController)
  .service("viviendasService", ViviendasService);

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
                                  templateUrl: "views/inicio.html",
                                  controller: "inicioController"     
                                }
        )
        // Formulario
        .state("formulario",    {
                                  url: "/formulario",
                                  templateUrl: "views/formulario.html",
                                  controller: "formularioController"      
                                }
        )
        // Resumen
          .state("resumen",     {
                                  url: "/resumen",
                                  templateUrl: "views/resumen.html",
                                  controller: "resumenController"
                                }
        )
        // Léeme
        .state("leeme",         {
                                  url: "/leeme",
                                  templateUrl: "views/leeme.html"
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
