import { inject, Injectable } from '@angular/core';
import { UsersApiService } from '../services/users-api.service';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, Observable, shareReplay, switchMap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersStore {
  private readonly api = inject(UsersApiService);

  private readonly addedUsersSubject = new BehaviorSubject<User[]>([]);
  readonly addedUsers$ = this.addedUsersSubject.asObservable();

  connectSearch(search$: Observable<string>): Observable<readonly User[]> {
    const searchWithDebounce$ = search$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    const apiUsers$ = searchWithDebounce$.pipe(
      switchMap(term => this.api.getUsers(term))
    );

    return combineLatest([
      apiUsers$,
      this.addedUsers$,
      searchWithDebounce$,
    ]).pipe(
      map(([apiUsers, addedUsers, search]) => {
        const normalized = search.toLocaleLowerCase();

        const filteredAdded = addedUsers.filter(user => 
          user.name.toLocaleLowerCase().includes(normalized)
        );

        return [...apiUsers, ...filteredAdded];
      }),
      shareReplay({bufferSize: 1, refCount: true})
    );
  }

  addUser(user: User): void {
    const current = this.addedUsersSubject.value;
    this.addedUsersSubject.next([...current, user]);
  }
}
