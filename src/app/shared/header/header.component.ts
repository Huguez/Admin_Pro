import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor( private _us:UsuarioService, private router: Router ) { }

  ngOnInit(): void {
  }

  logout(){
    this._us.logout();
    this.router.navigateByUrl( '/login' );
  }

}
