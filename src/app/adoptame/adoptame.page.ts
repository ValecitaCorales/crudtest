import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from '../service/data.service';
import { NavigationExtras, Router} from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-adoptame',
  templateUrl: './adoptame.page.html',
  styleUrls: ['./adoptame.page.scss'],
})
export class AdoptamePage {

  users = [];

  constructor(private dataService : DataService ,
               private alertCtrl : AlertController,
               private router: Router,
               private authService: AuthService,
               ) 
               
  {
    this.dataService.getUser().subscribe(res =>{
      console.log(res);
      this.users = res;
    })
  
    
    
  
  }

  
  openNote(note){
  }

  volver(){
    let navigationExtras: NavigationExtras={
    
    }
    this.router.navigate(['../home'], navigationExtras);
  }

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl:true});}

async addUser(){
  const alert = await this.alertCtrl.create({
    header :'Formulario de Adopcion',
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
        name : 'estadoC',
        placeholder: 'Ingrese estado civil',
        type:'text'
      },
      {
        name : 'ocupacion',
        placeholder: 'Ingrese Ocupacion',
        type:'text'
      },
      {
        name : 'direccion',
        placeholder: 'Ingrese Direccion',
        type:'text'
      },
      {
        name : 'tipocasa',
        placeholder: 'Indique Casa PROPIA/ARRENDADA',
        type:'text'
      },
      {
        name : 'permiso',
        placeholder: 'tiene permiso SI/NO ',
        type:'text'
      },
      {
        name : 'integrantesHogar',
        placeholder: 'Numero integrantes del hogar',
        type:'text'
      },
      {
        name : 'telefono',
        placeholder: 'Ingrese Numero de telefono',
        type:'text'
      },
      {
        name : 'email',
        placeholder: 'Ingrese imail que se REGISTRO',
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
          this.dataService.addUser({nameC: res.nameC , rut : res.rut ,estadoC :res.estadoC, ocupacion : res.ocupacion ,
            direccion:res.direccion,tipocasa: res.tipocasa,permiso: res.permiso,integrantesHogar: res.integrantesHogar,
            telefono:res.telefono,email:res.email, mascota : res.mascota })
        }
      }
    ]
  });
  await alert.present();
}

option ={
  slidesPerView: 1.5,
  centeredSlides: true,
  loop: true,
  spaceBetween: 10,
  autoplay: true, 

}


}