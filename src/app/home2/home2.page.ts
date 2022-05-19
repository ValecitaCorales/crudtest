import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController ,LoadingController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { AvatarService } from '../service/avatar.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page  {
  perdidos = [];
  profile = null;
  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController : AlertController,
    private dataService : DataService ,

  ) {
    this.avatarService.getUserProfile().subscribe((data => {
      this.profile = data;
    }));
    this.dataService.getFind().subscribe(res => {
      console.log(res);
      this.perdidos = res;
    })
  }
  volver(){
    let navigationExtras: NavigationExtras={
    
    }
    this.router.navigate(['../home'], navigationExtras);
  }

  async addFind(){
    const alert = await this.alertController.create({
      header :'Ingrese animal perdido',
      inputs: [
        {
          name : 'nameM',
          placeholder: 'Ingrese Nombre Mascota',
          type:'text'
        },
        {
          name : 'tipoM',
          placeholder: 'Ingrese tipo Animal',
          type:'text'
        },
        {
          name : 'color',
          placeholder: 'Ingrese color animal',
          type:'text'
        },
        {
          name : 'tamano',
          placeholder: 'Ingrese Tamaño del animal',
          type:'text'
        },
        {
          name : 'direccion',
          placeholder: 'Ingrese Direccion perdido',
          type:'text'
        },
        {
          name : 'fecha',
          placeholder: 'Ingrese fecha que se perdio',
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
            this.dataService.addFind({nameM : res.nameM,tipoM : res.tipoM , color: res.color,
            tamano :res.tamano,direccion : res.direccion,fecha: res.fecha })
          
          }
        }
      ]
    });
    await alert.present();
  }



  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/home', {replaceUrl:true});
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

    
  }
