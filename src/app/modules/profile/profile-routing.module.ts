import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';

const routes: Routes = [
  {
    path: "edit",
    component: ProfileEditComponent
  },
  {
    path: "password",
    component: PasswordChangeComponent
  },
  {
    path: "",
    component: ProfileDetailComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProfileRoutingModule { }
