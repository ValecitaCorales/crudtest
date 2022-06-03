import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { userInfo } from 'os';
import { identity } from 'rxjs';
import { UserI } from 'src/app/models/models';
import { AuthService } from '../../service/auth.service'; 
import { DataService } from '../../service/data.service';
import { InteracionService } from '../../service/interacion.service'; 

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  login: boolean = false;
  rol: 'visitante' = null;


  constructor(public popoverController: PopoverController,
              private auth: AuthService,
              private interaction: InteracionService,
              private firestore: DataService,
              private router: Router) { 

                    this.auth.stateUser().subscribe(res => {
                      if (res){
                        console.log('esta logeado');
                        this.login=true;
                        this.getDatosUser(res.uid)
                      }else {
                        console.log('No esta logeado')
                        this.login =false;
                      }
                    })
              }

  ngOnInit() {}



  loginApp() {
      this.login = true;
  }

  logout() {
      this.auth.logut();
      this.interaction.presentToast('sesion finalizada');
      this.router.navigate(['/login'])

  }

  getDatosUser(uid: string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getUser().subscribe( res => {
        console.log('datos -> ', res);
        if (res) {
        
        }
    })
  }
}