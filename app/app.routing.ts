import { ModuleWithProviders }      from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { LoginComponent }           from './login/login.component';
import { DocumentsListComponent }   from './documents-list/documents-list.component';
import { DocumentComponent }   from './document/document.component';

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
    },
    {
        path: 'document/:id',
        component: DocumentComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
