import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { UsersStore } from '../../store/users.store';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent {
  private readonly store = inject(UsersStore);

  readonly searchControl = new FormControl<string>('', { nonNullable: true });

  readonly users$ = this.store.connectSearch(
    this.searchControl.valueChanges.pipe(startWith(''))
  );
}
