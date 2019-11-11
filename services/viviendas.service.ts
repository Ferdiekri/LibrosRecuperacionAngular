interface IViviendasService{

    /**
     * Peticion GET para obtener todas las viviendas
     * @return Promesa con array de IVivienda
     */
    getViviendas(): angular.IPromise<IVivienda[]>;

    /**
     * Peticion PUT para insertar un libro.
     * @param libro a crear
     */
    crearVivienda(vivienda: IVivienda): angular.IPromise<any>;

}

class ViviendasService implements IViviendasService{

    private http: ng.IHttpService;
    private URL: string;

    constructor($http) {
        console.trace('ViviendasService constructor');
        this.http = $http;
        this.URL = "http://localhost:3000/viviendas/";
    }

    public getViviendas = (): any => {
        console.trace('GET ' + this.URL);
        return this.http.get(this.URL).then( res => res.data );
    } // getViviendas()

    public crearVivienda = (vivienda: IVivienda): angular.IPromise<any> => {
        console.trace('POST ' + this.URL);
        return this.http.post(this.URL, vivienda).then(
            (res) => {
                console.debug("Petición Rest correcta.");
                return res.data;
            });     
    } // crearVivienda()

}