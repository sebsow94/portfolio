import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  getUsers(): Observable<User[]> {
    return of([
      {id: 1, name: 'Anna'},
      {id: 2, name: 'Jan'},
      {id: 3, name: 'Adrian'},
      {id: 4, name: 'Michalina'},
      {id: 5, name: 'Emilia'},
      {id: 6, name: 'Dawid'},
      {id: 7, name: 'Helena'},
      {id: 8, name: 'Ela'},
      {id: 9, name: 'Henryk'}
    ]).pipe(delay(500));
  }
}
