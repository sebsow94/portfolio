import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent {
  private readonly usersApiService = inject(UsersApiService);

  readonly users$ = this.usersApiService.getUsers();
}
