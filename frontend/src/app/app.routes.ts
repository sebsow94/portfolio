import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/users/pages/users-page/users-page.component').then(m => m.UsersPageComponent)
    }
];
