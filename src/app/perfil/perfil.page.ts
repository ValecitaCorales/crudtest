import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController ,LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/service/data.service';
import { AuthService } from '../service/auth.service';
import { AvatarService } from '../service/avatar.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  users = [];

  constructor( 
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController : AlertController,
   private dataService : DataService )
  {
    this.dataService.getUser().subscribe(res =>{
      console.log(res);
      this.users = res;
    })
  }
  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl:true});}

  volver(){
    let navigationExtras: NavigationExtras={
    
    }
    this.router.navigate(['../home'], navigationExtras);
  }
  async changeImage(){
    const image = await Camera.getPhoto({
      quality:90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, 
    });
    console.log(image); //para ver si carga la img
    if (image){
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();

      if(!result){
        const alert = await this.alertController.create({
          header: 'No se pudo subir la imagen',
          message: 'Hubo un problema',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    }
}


  openNote(note){
  }
async addUser(){
  const alert = await this.alertController.create({
    header :'Agregue Usuario',
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
        name : 'celular',
        placeholder: 'Número contacto',
        type:'number'
      },
      
      {
        name : 'mascota',
        placeholder: 'Ingrese mascota',
        type:'text'
      }
    ],
    
  });
  await alert.present();
}

}
