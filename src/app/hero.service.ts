import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, catchError, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({'conent-type': 'application/json'})
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHeroById id=${id}`))
    )
  }

  updateHero(payload: Hero): Observable<any> {
    return this.http.put(`${this.heroesUrl}/${payload.id}`, payload, this.httpOptions).pipe(
      tap( _ => this.log(`hero ${payload.id} updated successfully`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(payload: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.heroesUrl}`, payload, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`hero ${newHero.id} added successfully`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  deleteHero(id: number): Observable<Hero> {
    return this.http.delete<Hero>(`${this.heroesUrl}/${id}`, this.httpOptions).pipe(
      tap(_ => this.log(`hero ${id} successfully deleted`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap( heroes => {
        heroes ? this.log(`found heroes matching ${term}`): this.log(`no heroes matching ${term}`);
      }),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    )
  }

  log(message: string): void {
    this.messageService.add(message);
  }

  private handleError<T>(operation: string='operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed : ${error.message}`)
      return of(result as T)
    }
  }
}
