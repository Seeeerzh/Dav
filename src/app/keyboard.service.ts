import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Keyboard } from './keyboard';
import { KEYBOARDS } from './mock-keyboards';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {

  private keyboardsUrl = 'api/keyboards';  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient,
    private messageService: MessageService) { } 

  getKeyboards(): Observable<Keyboard[]> {
    return this.http.get<Keyboard[]>(this.keyboardsUrl)
    .pipe(
      tap(_ => this.log('fetched keyboards')),
      catchError(this.handleError<Keyboard[]>('getKeyboards', []))
    );
  }


  getKeyboardNo404<Data>(id: number): Observable<Keyboard> {
    const url = `${this.keyboardsUrl}/?id=${id}`;
    return this.http.get<Keyboard[]>(url)
      .pipe(
        map(keyboards => keyboards[0]), 
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} keyboard id=${id}`);
        }),
        catchError(this.handleError<Keyboard>(`getKeyboard id=${id}`))
      );
  }

  getKeyboard(id: number): Observable<Keyboard> {
    
    const url = `${this.keyboardsUrl}/${id}`;
    return this.http.get<Keyboard>(url).pipe(
      tap(_ => this.log(`fetched keyboard id=${id}`)),
      catchError(this.handleError<Keyboard>(`getKeyboard id=${id}`))
    );
  }

  searchKeyboard(term: string): Observable<Keyboard[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Keyboard[]>(`${this.keyboardsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found keyboards matching "${term}"`) :
         this.log(`no keyboards matching "${term}"`)),
      catchError(this.handleError<Keyboard[]>('searchKeyboards', []))
    );
  }

  addKeyboard(keyboard: Keyboard): Observable<Keyboard> {
    return this.http.post<Keyboard>(this.keyboardsUrl, keyboard, this.httpOptions).pipe(
      tap((newKeyboard: Keyboard) => this.log(`added keyboard w/ id=${newKeyboard.id}`)),
      catchError(this.handleError<Keyboard>('addKeyboard'))
    );
  }

 
  deleteKeyboard(id: number): Observable<Keyboard> {
    const url = `${this.keyboardsUrl}/${id}`;

    return this.http.delete<Keyboard>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted keyboard id=${id}`)),
      catchError(this.handleError<Keyboard>('deleteKeyboard'))
    );
  }

  
  updateKeyboard(keyboard: Keyboard): Observable<any> {
    return this.http.put(this.keyboardsUrl, keyboard, this.httpOptions).pipe(
      tap(_ => this.log(`updated keyboard id=${keyboard.id}`)),
      catchError(this.handleError<any>('updateKeyboard'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`KeyboardService: ${message}`);
  }

}
