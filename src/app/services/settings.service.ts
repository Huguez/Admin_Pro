import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  private linkStyle = document.querySelector('#theme');

  constructor(){
    const theme = localStorage.getItem('theme') || 'href="./assets/css/colors/default-dark.css"';
    this.linkStyle.setAttribute( 'href', theme );
  }


  changeTheme( theme:string ){
    const url = `./assets/css/colors/${ theme }.css`;
    this.linkStyle.setAttribute( 'href', url );
    localStorage.setItem('theme', url );
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    const elemento = document.querySelector('#theme');
    
    const linkStyle = document.querySelectorAll('.selector');
  
    //working
    linkStyle.forEach( elem => {
      elem.classList.remove('working');
      
      const btnName = elem.getAttribute('data-theme');
      
      const url = `./assets/css/colors/${ btnName }.css`;
      
      const currentTheme = elemento.getAttribute('href');
      
      if( url === currentTheme ){
        elem.classList.add('working');
      }
    } );        
  }

}
