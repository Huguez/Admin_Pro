import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public linkStyle = document.querySelector('#theme');
  constructor() { }

  ngOnInit(): void {
    
    const theme = localStorage.getItem('theme') || 'href="./assets/css/colors/default-dark.css"';

    this.linkStyle.setAttribute( 'href', theme );

  }

}
