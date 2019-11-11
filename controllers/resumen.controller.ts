interface IResumenController extends ng.IScope{
    vm: ResumenController;
}

class ResumenController implements ng.IController{

    public static $inyect = ["$scope·"];
    public titulo: string;
    public mensaje: string;
    public viviendas: Array<IVivienda>;
    public ejercicio1: any;
    public ejercicio2: any;
    public ejercicio3: any;
    public ejercicio4: any;
   
    //funcion
    public editarLibro: any;
    public borrarLibro: any;
    public guardarLibro: any;
    public obternerFormatos: any;
    public nuevoLibro: any;
    
    constructor(private $scope: IResumenController, private viviendasService: IViviendasService){
        
        console.trace("IResumenController constructor");
        this.$scope.vm = this;
        $scope.vm.titulo = "Resumen de datos de viviendas.";
        $scope.vm.mensaje = undefined;
        

        viviendasService.getViviendas().then(
            ( datos ) => {
                console.trace("Viviendas leídas: %o", datos);
                $scope.vm.viviendas = datos;
                $scope.vm.mensaje = "Viviendas cargadas correctamente.";

                // 1.Listado ordenado por nombre con los siguientes atributos [ nombre, precio ]
                $scope.vm.ejercicio1 = $scope.vm.viviendas.map(
                    (elem) => {
                                return {
                                "nombre": elem.nombre,
                                "precio": elem.precio
                                }
                            }
                );   
                
                // 3. Precio total de todas las viviendas en alquiler con mas de 3 habitaciones
                $scope.vm.ejercicio3 = $scope.vm.viviendas.filter(
                    (elem) => elem.habitaciones>3).map(
                        (elem) => elem.precio).reduce(
                            (acum,cv) => acum+cv
                    );
                
                // 2. Primer inmueble con un servicio cocina disponible                
               $scope.vm.ejercicio2 = this.$scope.vm.viviendas.find(
                    (elem) => elem.servicios);
                $scope.vm.ejercicio2.find(
                    (elem)=> elem.nombre === "cocina" && elem.disponible === true // dentro del array de servicios, buscamos cocina
                );
/*
                $scope.vm.ejercicio2 = $scope.vm.viviendas.filter((elem)=>elem.servicios);
                $scope.vm.ejercicio2 = $scope.vm.ejercicio2.find((elem)=>elem.nombre === 'cocina' && elem.disponible === true );
*/

                // 4. Listado de todos los nombres de servicios sin repetición
                console.trace("PAREMOS");
               let aux = $scope.vm.viviendas.map(
                    (elem) => elem.servicios
                    );
                
                $scope.vm.ejercicio4 = aux.map( (elem) => elem.nombre);

               // $scope.vm.ejercicio4 = [...new Set(serviciosDuplicados)].sort(); // eliminar duplicados y ordena

               let serviciosDuplicados: Array<any> = $scope.vm.viviendas
                    .map(v => v.servicios)                             // quedarnos con las servicios            
                                                            // quedarnos con el titulo de la accion

                    $scope.vm.ejercicio4 = serviciosDuplicados;
               // $scope.vm.ejercicio4 = [...new Set(serviciosDuplicados)].sort(); // eliminar duplicados y ordena



            }
        ); // getViviendas()
        

    } // constructor
}