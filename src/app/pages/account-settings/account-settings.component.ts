import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public elemento = document.querySelector('#theme');
  public links;
  
  constructor() { }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme( theme:string ){

    const url = `./assets/css/colors/${ theme }.css`;
    
    this.elemento.setAttribute( 'href', url );
    
    localStorage.setItem('theme', url );
    

    this.checkCurrentTheme();
  }


  checkCurrentTheme(){
    //working
    this.links.forEach( elem => {
      elem.classList.remove('working');
      
      const btnName = elem.getAttribute('data-theme');
      
      const url = `./assets/css/colors/${ btnName }.css`;
      
      const currentTheme = this.elemento.getAttribute('href');
      
      if( url === currentTheme ){
        elem.classList.add('working');
      }

    } );
        
  }
  
}
