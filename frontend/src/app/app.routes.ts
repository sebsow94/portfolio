import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./features/users/pages/users-page/users-page.component').then(m => m.UsersPageComponent)
    }
];
