var ViviendasService = (function () {
    function ViviendasService($http) {
        var _this = this;
        this.getViviendas = function () {
            console.trace('GET ' + _this.URL);
            return _this.http.get(_this.URL).then(function (res) { return res.data; });
        };
        this.crearVivienda = function (vivienda) {
            console.trace('POST ' + _this.URL);
            return _this.http.post(_this.URL, vivienda).then(function (res) {
                console.debug("Petición Rest correcta.");
                return res.data;
            });
        };
        console.trace('ViviendasService constructor');
        this.http = $http;
        this.URL = "http://localhost:3000/viviendas/";
    }
    return ViviendasService;
}());
//# sourceMappingURL=viviendas.service.js.map