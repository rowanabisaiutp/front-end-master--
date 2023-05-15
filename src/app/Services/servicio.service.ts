import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/empresa';

interface ApiResponse {
  items: Item[];
}

@Injectable({
  providedIn: 'root'
})

export class ServicioService {

  url = 'http://localhost:5000';

  constructor(private http:HttpClient) { }

  // getAll():Observable<Empresa[]>{
  //   return this.http.get<Empresa[]>(`${this.url}/productos`).pipe(
  //     map(data => data)
  //   );
  // }

  getData(page: number, pageSize: number): Observable<Item[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());
    return this.http.get<ApiResponse>(`${this.url}/productos`, {params}).pipe(
      map(data => data.items)
    );
  }

  add(modelo:Item):Observable<Item>{
return this.http.post<Item>(`${this.url}/productos`,modelo);
  }

  update(id:number,modelo:Item):Observable<Item>{
    return this.http.put<Item>(`${this.url}/productos/${id}`,modelo);
      }

      delete(id:number):Observable<void>{
        return this.http.delete<void>(`${this.url}/productos/${id}`);
          }
}


// getData(page: number, pageSize: number): Observable<Item[]> {
//   const params = new HttpParams()
//     .set('page', page.toString())
//     .set('pageSize', pageSize.toString());
//   return this.http.get('<URL de la API>', { params }).pipe(
//     map(data => data.items)
//   );
// }
// }