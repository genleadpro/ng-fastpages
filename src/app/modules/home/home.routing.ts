import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageResolver } from './page-resolver.service';
import { HomeComponent } from './pages/home.component';
import { PageDetailsComponent } from './pages/page-details/page-details.component';
import { PageAddComponent } from './pages/page-add/page-add.component';
import { PageEditComponent } from './pages/page-edit/page-edit.component';

export const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'pages/add',
          pathMatch: 'full',
          component: PageAddComponent,
        },
        {
          path: 'pages/:id',
          component: PageDetailsComponent,
          resolve: {
            page: PageResolver
          }
        },
        {
          path: 'pages/:id/edit',
          component: PageEditComponent,
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
