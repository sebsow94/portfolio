import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly usersMock: readonly User[] = [
    { id: 1, name: 'anna' },
    { id: 2, name: 'jan' },
    { id: 3, name: 'adrian' },
    { id: 4, name: 'michalina' },
    { id: 5, name: 'emilia' },
    { id: 6, name: 'dawid' },
    { id: 7, name: 'helena' },
    { id: 8, name: 'ela' },
    { id: 9, name: 'Henryk' }
  ];

  getUsers(filter: string): Observable<readonly User[]> {
    return of(this.usersMock.filter(user =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    )).pipe(delay(500));
  }
}
