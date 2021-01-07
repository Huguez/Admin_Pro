import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
    
  menu: any[] = [];

  //   { title: 'Dashboard :D!!!!!', icon: 'mdi mdi-gauge', submenu: 
  //     [
  //       { titulo: 'Main', url: '/'  },
  //       { titulo: 'ProgressBar', url: 'progress'  },
  //       { titulo: 'Grafica', url: 'grafica1'  },
  //       { titulo: 'Promesa', url: 'promesa'  },
  //       { titulo: 'Rxjs', url: 'rxjs' }
  //     ]
  //   },{ title: 'Mantenimiento', icon: 'mdi mdi-folder-lock-open', submenu: 
  //     [
  //       { titulo: 'Usuarios', url: 'usuarios'  },
  //       { titulo: 'Hospitales', url: 'hospitales'  },
  //       { titulo: 'Medicos', url: 'medicos'  },
  //     ]
  //   }
  // ];
  
  cargarMenu(){
    this.menu = JSON.parse( localStorage.getItem('menu') ) || [];
  }

  constructor() { }
}
