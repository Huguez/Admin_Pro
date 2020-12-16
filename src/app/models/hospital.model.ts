import { environment } from '../../environments/environment';

interface _HospitalUser {
    nombre: string;
    id: string;
    img: string;
}

const base_url = environment.base_url;

export class Hospital {
    constructor( 
        public nombre: string,
        public id?: string,
        public img?: string,
        public user?: _HospitalUser
    ){}
}