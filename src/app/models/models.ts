export interface Usuario
 {
   id?: string;
   nameC : string ;
   rut : string;
   estadoC : string;
   ocupacion : string;
   direccion: string;
   tipocasa: string;
   permiso: string;
   integrantesHogar : string;
   telefono: string;
   email: string;
   mascota : string;
 }

export interface Perdidos{
  id?: string;
  nameM : string;
  tipoM : string;
  color: string;
  tamano: string;
  direccion: string;
  fecha: string;
}

export interface UserI {
  nombre: string;
  edad: number;
  correo: string;
  uid: string;
  password: string;
  perfil: 'visitante'
}

