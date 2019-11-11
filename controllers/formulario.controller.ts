interface IFormularioController extends ng.IScope{
    vm: FormularioController;
}

class FormularioController implements ng.IController{

    public static $inyect = ["$scope·"];
    public titulo: string;
    public mensaje: string;
    public viviendaNueva: IVivienda;
   
    //funcion
    public nuevaVivienda: any;
    
    constructor(private $scope: IFormularioController, private viviendasService: IViviendasService){
        
        console.trace("IFormularioController constructor");
        this.$scope.vm = this;
        $scope.vm.titulo = "Formulario de nueva vivienda";
        $scope.vm.mensaje = undefined;

        // funciones

        $scope.vm.nuevaVivienda = () => {
            console.trace("nuevaVivienda %o", $scope.vm.viviendaNueva);

            viviendasService.crearVivienda($scope.vm.viviendaNueva).then(
                ( data ) => {
                    console.warn("Vivienda añadida. %o", data);
                    $scope.vm.mensaje = "Vivienda creada correctamente.";                       
                },
                ( res ) => {
                    console.warn("No se ha podido crear la vivienda. %o", res);
                    $scope.vm.mensaje = "No se ha podido crear la vivienda.";
                } 
            );
            
        } // nuevaVivienda()

    } // constructor
}