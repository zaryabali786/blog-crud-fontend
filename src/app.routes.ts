import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from './app/core/guard/auth.guard';
import { BlogListingComponent } from './app/pages/uikit/blogListing';
import { BlogsComponent } from './app/pages/blog/blog.component';
import { BlogDeatailComponent } from './app/pages/blog/blog-detail.component';

export const appRoutes: Routes = [
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '', component: BlogsComponent },
    {path:':id',component:BlogDeatailComponent},
    {
        path: 'admin',
        component: AppLayout,
        canActivate: [AuthGuard], // 👈 Protect this route
        children: [
            // { path: '', component: Dashboard },
            { path: 'blog', component: BlogListingComponent },

        ],
        
    },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];
