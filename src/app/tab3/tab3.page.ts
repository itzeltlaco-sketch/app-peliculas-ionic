import { Component } from '@angular/core';
import { DataLocal } from '../services/data-local';
import { Movies } from '../services/movies';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  favoritoGenero: any[] = [];

  constructor( private dataLocal: DataLocal,
               private Movies: Movies  ) { }


  async ionViewWillEnter() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.Movies.cargarGeneros();

    this.pelisPorGenero( this.generos, this.peliculas );
  }


  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {
  this.favoritoGenero = [];

  generos.forEach(genero => {
    this.favoritoGenero.push({
      genero: genero.name,
      pelis: peliculas.filter(peli => {
        // Verificamos que peli.genres exista antes de buscar
        return peli.genres?.find(genre => genre.id === genero.id);
      })
    });
  });

  console.log(this.favoritoGenero);
}


}
