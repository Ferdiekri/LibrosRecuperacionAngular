interface IServicios {
    nombre: string;
    disponible: boolean;
}

interface IVivienda {
    nombre: string;
    precio: number;
    alquiler: boolean;
    habitaciones: number;
    foto: string;
    direccion: string;
    servicios: IServicios;
}