import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';
import { UsersStore } from '../../store/users.store';
import { CapitalizePipe } from '../../../../shared/pipes/capitalize-pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, ReactiveFormsModule, CapitalizePipe, HighlightDirective],
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
