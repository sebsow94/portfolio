import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent {
  private readonly usersApiService = inject(UsersApiService);

  readonly searchControl = new FormControl<string>('', { nonNullable: true });

  filteredUsers$ = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(search => this.usersApiService.getUsers(search))
  );
}
