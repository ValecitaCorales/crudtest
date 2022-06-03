import { Component, OnInit } from '@angular/core';
import { InteracionService } from '../../service/interacion.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent implements OnInit {

  
  ajustes: any[] = [];

  constructor(private database: DataService,
            private interaction: InteracionService) { }

  ngOnInit() {
    console.log('hola estamois en ajustes'); 
  }

  leerAjustesSecretos() {
    const path = 'Ajustes';
    this.database.getCollection(path).subscribe( (res) => {
        console.log(' leerAjustesSecretos -> ', res);
        this.ajustes = res;
    });
  }



}