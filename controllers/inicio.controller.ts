interface IInicioController extends ng.IScope{
    vm: InicioController;
}

class InicioController implements ng.IController{

    public static $inyect = ["$scope·"];
    public viviendas: Array<IVivienda>;
    public viviendasMostrar: Array<IVivienda>;
    public vivienda: IVivienda;
    public mensaje: string;
   
    //funcion
    public editarLibro: any;
    public borrarLibro: any;
    public guardarLibro: any;
    public obternerFormatos: any;
    public nuevoLibro: any;
    
    constructor(private $scope: IInicioController, private viviendasService: IViviendasService){
        
        console.trace("IInicioController constructor");
        this.$scope.vm = this;
        $scope.vm.viviendas = [];
        $scope.vm.mensaje = undefined;
        

        viviendasService.getViviendas().then(
            ( datos ) => {
                console.trace("Viviendas leídas: %o", datos);
                $scope.vm.viviendas = datos;
                $scope.vm.mensaje = "Viviendas cargadas correctamente.";

            }
        ); // getViviendas()



    } // constructor
}