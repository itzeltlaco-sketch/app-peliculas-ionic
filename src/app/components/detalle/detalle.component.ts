import { Loop } from './../../../../node_modules/@babel/types/lib/index-legacy.d';
import { Component, OnInit , Input} from '@angular/core';
import { Movies } from '../../services/movies';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocal } from 'src/app/services/data-local';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  standalone: false
})
export class DetalleComponent  implements OnInit {
[x: string]: any;

  @Input() id: any;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  estrella = 'star-outline';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 10,
    Loop: false,
  };


  constructor(private Movies: Movies,
              private modalCtrl: ModalController,
              private dataLocal: DataLocal
              ) { }

  ngOnInit() {
    //console.log('ID', this.id);

    this.dataLocal.existePelicula( this.id )
      .then( existe => this.estrella = ( existe ) ? 'star' : 'star-outline' );

    this.Movies.getPeliculaDetalle( this.id ).subscribe( resp => {
      console.log( resp );
      this.pelicula = resp;
      })
    this.Movies.getActoresPelicula(this.id).subscribe(resp => {
  console.log(resp.cast); // debería mostrar los actores en consola
  this.actores = resp.cast;
});

  
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
  const agregado = this.dataLocal.guardarPelicula(this.pelicula);

  // guardarPelicula devuelve true si se agregó, false si se removió
  if (agregado) {
    this.estrella = 'star';
  } else {
    this.estrella = 'star-outline';
  }
}



}
