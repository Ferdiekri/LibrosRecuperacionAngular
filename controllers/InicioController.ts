interface IInicioControllerScope extends ng.IScope {
  vm: InicioController;
}
class InicioController implements ng.IController {
 
 
  public titulo: string = "Tutorial ES6"; 

  public static $inject = ["$scope"];

  constructor(private $scope: IInicioControllerScope) {

    console.debug('InicioController constructor');
    $scope.vm = this;
   

  }
}
