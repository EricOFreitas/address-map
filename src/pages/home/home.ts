import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { GeocoderProvider } from '../../providers/geocoder/geocoder';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   // Defino os objetos do form para o forwardGeocoding
   public form: FormGroup;
   public geoForm: FormGroup;

   //variavel para setar se aconteceu ou nao o 
   public geocoded               : boolean;



   /**
    * Define a string value to handle returned geocoding results
    */   
   public results                : string;



   /**
    * Define the initial text value for the form switching button in the
    * HTML template
    */   
   public filter                 : string      = 'Search by Coordinates';
   


   /**
    * Define a boolean property to determine that the forwardGeocoding
    * form is displayed first
    */   
   public displayForward         : boolean     = true;
   


   /**
    * Define a boolean property to determine that the reverseGeocoding
    * form is not to be displayed first
    */   
   public displayReverse         : boolean     = false;



   constructor(public navCtrl    : NavController,
               public _GEOCODE   : GeocoderProvider,
               private _FB       : FormBuilder,
               private _PLATFORM : Platform) 
   {


      // Define the validation rules for handling the
      // address submission from the forward geocoding form
      this.form       = _FB.group({
         'keyword'        : ['', Validators.required]
      });

      
      // Define the validation rules for handling the 
      // latitude/longitude submissions from the reverse 
      // geocoding form
      this.geoForm    = _FB.group({
         'latitude'        : ['', Validators.required],
         'longitude'       : ['', Validators.required]
      });

   }

   /**
     * Determine whether the forwardGeocoding or
     * reverseGeocoding form will be displayed
     *
     * @public
     * @method filterForm
     * @return {none}
     */   
   filterForm()
   {
      this.filter      		 = 'Search by keyword';
      this.displayReverse     = true;
     
   }
   
   /**
     * Recebe o endereço que vem do form 
     * passa os valores por forwardGeocode método do provider criado 
     * e manipula as coordenadas como necessário
     *
     * @public
     * @method performForwardGeocoding
     * @return {none}
     */   
   performForwardGeocoding(val)
   {
      this._PLATFORM.ready()
      .then((data : any) =>
      {
         let keyword : string = this.form.controls["keyword"].value;
         this._GEOCODE.forwardGeocode(keyword)
         .then((data : any) =>
         {
            this.geocoded      = true;
            this.results       = data; 
            
         })
         .catch((error : any)=>
         {
            this.geocoded      = true;
            this.results       = error.message;
         });
      });
   }
}