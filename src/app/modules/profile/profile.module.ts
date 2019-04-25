import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';

@NgModule({
  declarations: [ ProfileEditComponent, ProfileDetailComponent, PasswordChangeComponent ],
  imports: [
    SharedModule,

    ProfileRoutingModule
  ]
})
export class ProfileModule { }
