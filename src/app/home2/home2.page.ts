import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController ,LoadingController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { AvatarService } from '../service/avatar.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page  {
  profile = null;
  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController : AlertController

  ) {
    this.avatarService.getUserProfile().subscribe((data => {
      this.profile = data;
    }));
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
