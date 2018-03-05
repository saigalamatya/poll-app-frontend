import { Routes, RouterModule } from '@angular/router';
import { IndexChildComponent } from './index-child/index-child.component';

export const childRoutes: Routes = [
    { path: 'poll/:id', component: IndexChildComponent }
]