import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from '../component/index/index.component';
import { CreatePollComponent } from '../component/create-poll/create-poll.component';
import { PollListComponent } from '../component/poll-list/poll-list.component';
import { childRoutes } from '../component/index/index.routes';

const routes: Routes = [
    // { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent, children: childRoutes },
    { path: 'create-poll', component: CreatePollComponent },
    { path: 'poll-list', component: IndexComponent }
]

export const routing = RouterModule.forRoot(routes);