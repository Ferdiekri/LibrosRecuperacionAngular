interface IPaginas {
    id: number;
    texto: string;
}

interface ILibro {
    id: number;
    titulo: string;
    autor: string
    paginas: IPaginas;
}