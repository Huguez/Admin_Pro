import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunction();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  
  public year : any;
  
  constructor(private ss: SettingsService ) { }

  ngOnInit(): void {
    
    customInitFunction();
    // this.year = ( new Date() ).getFullYear(); 
    this.year = 2020;
  }

}
