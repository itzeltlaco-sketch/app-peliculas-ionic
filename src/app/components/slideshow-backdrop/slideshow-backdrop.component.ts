import { Component, OnInit, Input } from '@angular/core'; //  aquí agregas Input
import { Pelicula } from '../../interfaces/interfaces'; 
import { ModalController } from '@ionic/angular';  //  aquí importas tu modelo (ajusta la ruta si es distinta)
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
  standalone: false
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas: Pelicula[] = []; //  ya no marcará error

  slideOpts = {
    slidesPerView: 1.1,
    freeMode: true,
  };
  
  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {

  }

  async verDetalle( id: number ) {

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    
    modal.present();
  
  }
}
