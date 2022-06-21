import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { AvatarService } from 'src/app/service/avatar.service';
import { DataService, Perdidos } from 'src/app/service/data.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import {Directory, Filesystem} from '@capacitor/filesystem';

const IMAGE_DIR = 'upload';
interface Historial{
  name:string;
  path: string;
  data: string;
}


@Component({
  selector: 'app-foto-perdidos',
  templateUrl: './foto-perdidos.page.html',
  styleUrls: ['./foto-perdidos.page.scss'],
})
export class FotoPerdidosPage implements OnInit {
 
  perdidos = [];
  profile : {}  ;
  imagenLink : string = '';
 

  constructor(
    private router: Router,
    private authService: AuthService,
    private dataService : DataService ,
    private avatarService: AvatarService,
    private platform : Platform,
    private loadingController : LoadingController,
  )  
  {
   /* this.avatarService.getUserProfile().subscribe((data => {
      this.profile = data;
      this.imagenLink = this.profile['imageUrl'];
      console.log('aqui el url -->>>',this.profile['imageUrl']);
    }));*/


    this.dataService.getFind().subscribe(res => {
      console.log(res);
      this.perdidos = res;
    })
  }

  ngOnInit() {
  
  }


  volver(){
    let navigationExtras: NavigationExtras={
    
    }
    this.router.navigate(['../home'], navigationExtras);
  }
  
  async logout(){
    await this.authService.logut();
    this.router.navigateByUrl('/home', {replaceUrl:true});
  }
 

  


}