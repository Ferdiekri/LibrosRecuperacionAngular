var InicioController = (function () {
    function InicioController($scope) {
        this.$scope = $scope;
        this.titulo = "Tutorial ES6";
        console.debug('InicioController constructor');
        $scope.vm = this;
    }
    InicioController.$inject = ["$scope"];
    return InicioController;
}());
//# sourceMappingURL=InicioController.js.map