import { inject, Injectable } from '@angular/core';
import { UsersApiService } from '../services/users-api.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, shareReplay, switchMap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersStore {
  private readonly api = inject(UsersApiService);

  connectSearch(search$: Observable<string>): Observable<readonly User[]> {
    return search$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.api.getUsers(term)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
