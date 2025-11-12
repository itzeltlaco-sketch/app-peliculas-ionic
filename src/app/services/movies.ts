import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeliculaDetalle, RespuestaMDB, RespuestaCredits } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { Genre } from '../interfaces/interfaces';

const URL = environment.url
const API_KEY = environment.apiKey

@Injectable({
  providedIn: 'root',
})
export class Movies {

  private popularesPage = 0;
  generos: Genre[] = [];

  constructor(private http: HttpClient) {}

 private ejecutarQuery<T>(query: string) {
  query = URL + query;
  if (!query.includes('?')) {
    query += '?';
  } else {
    query += '&';
  }
  query += `api_key=${API_KEY}&language=es&include_image_language=es`;
  
  return this.http.get<T>(query);
}

  getPopulares() {

    this.popularesPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;

    return this.ejecutarQuery<RespuestaMDB>(query);

  }

  buscarPeliculas( texto: string ) {
    return this.ejecutarQuery(`/search/movie?query=${ texto }`);

  }

  getFeature() {
  const hoy = new Date();
  const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
  const mes = hoy.getMonth() + 1;

  const mesString = mes < 10 ? '0' + mes : mes;
  const inicio = `${hoy.getFullYear()}-${mesString}-01`;
  const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

  // ahora sí usamos el rango de fechas
  const query = `/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`;
  return this.ejecutarQuery<RespuestaMDB>(query);
}

getPeliculaDetalle( id: string ) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
  }

  getActoresPelicula(id: string) {
  return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
}

cargarGeneros(): Promise<Genre[]> {
  return new Promise(resolve => {
    this.ejecutarQuery<{ genres: Genre[] }>(`/genre/movie/list?a=1`)
      .subscribe(resp => {
        this.generos = resp.genres;
        console.log(this.generos);
        resolve(this.generos);
      });
  });
}

}