import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from './livro';
import { LivroFilter } from './livro-filter';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  public save(obj: Livro): Observable<any> {
    return this.http.post('api/livro/save', JSON.stringify(obj), this.httpOptions);
  }

  public getById(id: number): Observable<any> {
    return this.http.get('api/livro/find/' + id, this.httpOptions);
  }

  public count(): Observable<any> {
    return this.http.get('api/livro/count', this.httpOptions);
  }

  public remove(id: number): Observable<any> {
    return this.http.delete('api/livro/remove/' + id, this.httpOptions);
  }

  public update(obj: Livro): Observable<any> {
    return this.http.put('api/livro/save', JSON.stringify(obj), this.httpOptions);
  }

  public getPaginatedDataFiltered(pageable: any, filter: LivroFilter): Observable<any> {
    const parameters: string = JSON.stringify({ pageable: pageable, filter: filter});
    return this.http.post('api/livro/paginated', parameters, this.httpOptions);
  }
}
