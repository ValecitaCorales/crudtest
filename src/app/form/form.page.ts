import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-form',
  templateUrl: 'form.page.html',
  styleUrls: ['form.page.scss'],
})
export class FormPage {

  users = [];

  constructor(private dataService : DataService , private alertCtrl : AlertController) 
  {
    this.dataService.getUser().subscribe(res =>{
      console.log(res);
      this.users = res;
    })
  }
  openNote(note){
  }
async addUser(){
  const alert = await this.alertCtrl.create({
    header :'Agrege Usuario',
    inputs: [
      {
        name : 'nameC',
        placeholder: 'Ingrese Nombre Completo',
        type:'text'
      },
      {
        name : 'rut',
        placeholder: 'Ingrese Rut',
        type:'text'
      },
      {
        name : 'ocupacion',
        placeholder: 'Ingrese Ocupacion',
        type:'text'
      },
      {
        name : 'mascota',
        placeholder: 'Ingrese mascota',
        type:'text'
      }
    ],
    buttons:[
      {
        text : 'Cancelar',
        role : 'cancel'
      },
      {
        text: 'Agregar',
        handler: (res) => {
          this.dataService.addUser({nameC: res.nameC , rut : res.rut , ocupacion : res.ocupacion , mascota : res.mascota })
        }
      }
    ]
  });
  await alert.present();
}


}