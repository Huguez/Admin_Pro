import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunction();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  
  public year : any;
  
  constructor(private _ss: SettingsService, private  _sideSer:SidebarService ) { }

  ngOnInit(): void {
    
    customInitFunction();
    // this.year = ( new Date() ).getFullYear(); 
    this.year = 2020;
    this._sideSer.cargarMenu();
  }

}
