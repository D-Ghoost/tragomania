import { Routes } from '@angular/router';
import { HomeComponent } from './domains/home/pages/home/home.component';
import { SearchComponent } from './domains/search/pages/search/search.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'search/:query',
        component: SearchComponent
    }
];
