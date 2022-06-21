import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AlertController ,LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from '../../service/auth.service';
import { AvatarService } from '../../service/avatar.service';
import { DataService} from '../../service/data.service';
import { Geolocation} from '@awesome-cordova-plugins/geolocation/ngx';
import { Directory, Filesystem } from '@capacitor/filesystem';


declare var google: any;




@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {

  perdidos = []; 
  profile = null ; 
  private _storage: Storage | null = null;



  @ViewChild('map',{static:false}) mapElement:ElementRef;

  map: any;
  address:string;
  lat: string;
  long: string;  
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;  


  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController : AlertController,
    private dataService : DataService ,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,    
    public zone: NgZone,
    public toastController: ToastController,
    private platform : Platform,
  ) 
  {
    this.avatarService.getUserProfile().subscribe((data => {
      this.profile = data;
    }));
    this.dataService.getFind().subscribe(res => {
      console.log(res);
      this.perdidos = res;
    })
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  ngOnInit(){
    this.loadMap();
    
  
  }

  volver(){
    let navigationExtras: NavigationExtras={
    
    }
    this.router.navigate(['../home'], navigationExtras);
  }

  historial(){
    let navigationExtras: NavigationExtras={
    
    }
    this.router.navigate(['../foto-perdidos'], navigationExtras);
  }
  
  //foto mascota perdida
  
 async changeImage(){
  const image = await Camera.getPhoto({
    quality:90,
    allowEditing:false,
    resultType:CameraResultType.Base64,
    source: CameraSource.Photos,
  });
  console.log(Image);
  if(Image){
    const loadingController = await this.loadingController.create();
    await loadingController.present();

    const result = await this.avatarService.uploadImage(image);
    loadingController.dismiss();
    if(result){
      const alert = await this.alertController.create({
        header:'Si se puso subir la imagen',
        message:'Foto Agregada  ',
        buttons:['OK'],
      });
      await alert.present();
    }
  }
 }
 imgUrl : any;
  //formulario
  async addFind(){
    const alert = await this.alertController.create({
      header :'Ingrese Mascota Extraviada',
      inputs: [
       
        {
          name : 'nameM',
          placeholder: 'Ingrese Nombre de la mascota',
          type:'text'
        },
        {
          name : 'tipoM',
          placeholder: 'Ingrese tipo de la mascota',
          type:'text'
        },
        {
          name : 'color',
          placeholder: 'Ingrese color de la mascota',
          type:'text'
        },
        {
          name : 'tamano',
          placeholder: 'Ingrese Tamaño de la mascota',
          type:'text'
        },
        {
          name : 'fecha',
          placeholder: 'Ingrese fecha en la que se perdió',
          type:'date'
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
            tamano :res.tamano, direccion: this.placeid, fecha: res.fecha})
          
          }
        }
      ]
      
    });
    //this.imgUrl = this.changeImage();
    //console.log(this.imgUrl);
    await alert.present();
  }
 
//
async logout(){
  await this.authService.logut();
  this.router.navigateByUrl('/home', {replaceUrl:true});
}

//mostrar google map
 
  loadMap() {
    
this.geolocation.getCurrentPosition().then((resp) => {
  let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
  let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  } 
  
  //CUANDO TENEMOS LAS COORDENADAS SIMPLEMENTE NECESITAMOS PASAR AL MAPA DE GOOGLE TODOS LOS PARAMETROS.
  this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude); 
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); 
  this.map.addListener('tilesloaded', () => {
    console.log('accuracy',this.map, this.map.center.lat());
    this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
    this.lat = this.map.center.lat()
    this.long = this.map.center.lng()
  }); 

}).catch((error) => {
  console.log('Error getting location', error);
});
}


getAddressFromCoords(latitude, longitude) {
console.log("getAddressFromCoords "+latitude+" "+longitude);
let options: NativeGeocoderOptions = {
  useLocale: true,
  maxResults: 5    
}; 
this.nativeGeocoder.reverseGeocode(latitude, longitude, options)
  .then((result: NativeGeocoderResult[]) => {
    this.address = "";
    let responseAddress = [];
    for (let [key, value] of Object.entries(result[0])) {
      if(value.length>0)
      responseAddress.push(value); 
    }
    responseAddress.reverse();
    for (let value of responseAddress) {
      this.address += value+", ";
    }
    this.address = this.address.slice(0, -2);
  })
  .catch((error: any) =>{ 
    this.address = "Address Not Available!";
  }); 
}

//FUNCION DEL BOTON INFERIOR PARA QUE NOS DIGA LAS COORDENADAS DEL LUGAR EN EL QUE POSICIONAMOS EL PIN.
ShowCords(){
alert('lat' +this.lat+', long'+this.long )
}

//AUTOCOMPLETE, SIMPLEMENTE ACTUALIZAMOS LA LISTA CON CADA EVENTO DE ION CHANGE EN LA VISTA.
UpdateSearchResults(){
if (this.autocomplete.input == '') {
  this.autocompleteItems = [];
  return;
}
this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
(predictions, status) => {
  this.autocompleteItems = [];
  this.zone.run(() => {
    predictions.forEach((prediction) => {
      this.autocompleteItems.push(prediction);
    });
  });
});
}

//FUNCION QUE LLAMAMOS DESDE EL ITEM DE LA LISTA.
SelectSearchResult(item) {

this.placeid = item.description

this.map.addListener('tilesloaded', () => {
  console.log('accuracy',this.map, this.map.center.lat());
  this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
  this.lat = this.map.center.lat()
  this.long = this.map.center.lng()
}); 

}


//LLAMAMOS A ESTA FUNCION PARA LIMPIAR LA LISTA CUANDO PULSAMOS IONCLEAR.
ClearAutocomplete(){
this.autocompleteItems = []
this.autocomplete.input = ''
}

//EJEMPLO PARA IR A UN LUGAR DESDE UN LINK EXTERNO, ABRIR GOOGLE MAPS PARA DIRECCIONES. 
GoTo(){
return window.location.href = 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id='+this.placeid;
}

}