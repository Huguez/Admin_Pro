import { environment } from '../../environments/environment';

const base_url = environment.base_url; 

export class Usuario {
    
    constructor(
        public nombre: string, 
        public email: string, 
        public password?: string, 
        public img?: string, 
        public google?: boolean, 
        public role?: string, 
        public id?: string ,
    ){}

    get getImagen(){
        
        if( !this.img ){
            return `${ base_url }/upload/usuarios/no-img`;
        }else if( this.img.includes('http') ){
            return this.img;
        }else if( this.img ){
            return `${ base_url }/upload/usuarios/${ this.img }`;
        }else {
            return `${ base_url }/upload/usuarios/no-img`;
        }

    }

    get getNombre(){
        if( this.nombre ){
            return this.nombre;
        }
        return "Steave Jobs";
    }

    get getEmail(){
        if( this.email ){
            return this.email;
        }
        return "user@example.com";
    }
}