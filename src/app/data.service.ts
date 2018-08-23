import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { IExcercise } from './IExcercise';
import { Observable } from 'rxjs';
import { IUserAnswer } from './IUserAnswer';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  url: string = 'http://localhost:55999/api/exercise';

  constructor(private http: HttpClient) {
   }

  getExcercise(): Observable<IExcercise> {
    return this.http.get<IExcercise>(this.url);
  }

  postAnswer(answer: IUserAnswer): Observable<IExcercise> {
    return this.http.post<IExcercise>(this.url, answer);
  } 
}

