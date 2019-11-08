var LibrosService = (function () {
    function LibrosService($http) {
        var _this = this;
        this.getLibros = function () {
            console.trace('GET ' + _this.URL);
            return _this.http.get(_this.URL).then(function (res) { return res.data; });
        };
        this.getLibroById = function (id) {
            var ruta = _this.URL + id;
            console.trace('GET ' + ruta);
            return _this.http.get(ruta).then(function (res) {
                console.debug("Petición Rest correcta.");
                return res.data;
            });
        };
        this.deleteLibro = function (id) {
            var ruta = _this.URL + id;
            console.trace('DELETE ' + ruta);
            return _this.http.delete(ruta).then(function (res) {
                console.debug("Petición Rest correcta.");
                return res.data;
            });
        };
        this.crearLibro = function (libro) {
            console.trace('POST ' + _this.URL);
            return _this.http.post(_this.URL, libro).then(function (res) {
                console.debug("Petición Rest correcta.");
                return res.data;
            });
        };
        this.modificarLibro = function (id, libro) {
            var ruta = _this.URL + id;
            console.trace('PUT ' + ruta);
            return _this.http.put(ruta, libro).then(function (res) {
                console.debug("Petición Rest correcta.");
                return res.data;
            });
        };
        console.trace('LibrosService constructor');
        this.http = $http;
        this.URL = "http://localhost:3000/libros/";
    }
    return LibrosService;
}());
//# sourceMappingURL=libros.service.js.map