import { ModuleWithProviders }      from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { LoginComponent }           from './login/login.component';
import { DocumentsListComponent }
    from './documents-list/documents-list.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'documents',
        component: DocumentsListComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
