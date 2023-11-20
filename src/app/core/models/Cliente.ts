import { Rol } from "./Rol";

export interface Cliente{
    id_usuario:number,
    nombre:string,
    apellido_paterno:string,
    apellido_materno:string,
    dni:string,
    fecha_nacimiento:string,
    telefono:string,
    imagen:string,
    email:string,
    contrasenia:string,
    rol:Rol
}