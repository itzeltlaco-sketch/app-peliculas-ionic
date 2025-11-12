import { Component } from '@angular/core';
import { Movies } from '../services/movies';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Spiderman', 'Avenger', 'El señor de los anillos', 'La vida es bella','Superman'];

  constructor( private Movies: Movies,
                private modalCtrl: ModalController
  ){

  }
 buscar( event:any ) {
    const valor: string = event.detail.value;

    if ( valor.length === 0 ) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    // console.log(valor);
    this.buscando = true;


  this.Movies.buscarPeliculas(valor)
    .subscribe((resp: any) => {
      console.log(resp);
      this.peliculas = resp.results;
      this.buscando = false;
    });
}

async detalle( id: number) {

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }


 

}
