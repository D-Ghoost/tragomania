import { Routes } from '@angular/router';
import { HomeComponent } from './domains/home/pages/home/home.component';
import { ListComponent } from './domains/cocktails/pages/list/list.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'search',
        component: ListComponent
    },
    {
        path: 'no-alcohol',
        component: ListComponent
    }
];
