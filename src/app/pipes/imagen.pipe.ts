import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: 'usuarios'|'medicos'|'hospitales' ): string {

    if( !img ){
      return `${ base_url }/upload/usuarios/no-img`;
    }else if( img.includes('http') ){
        return img;
    }else if( img ){
        return `${ base_url }/upload/usuarios/${ img }`;
    }else {
        return `${ base_url }/upload/usuarios/no-img`;
    }
    
    // return 'Hola Mundo  ' + `${img} - ${ tipo }`;
  }

}
