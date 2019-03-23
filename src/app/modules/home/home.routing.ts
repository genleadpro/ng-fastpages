import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageResolver } from './page-resolver.service';
import { HomeComponent } from './pages/home.component';
import { PageDetailsComponent } from './pages/page-details/page-details.component';

export const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'pages/:id',
          component: PageDetailsComponent,
          resolve: {
            page: PageResolver
          }
        }
      ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
