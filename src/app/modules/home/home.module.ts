import { NgModule } from '@angular/core';

import { HomeComponent } from './pages/home.component';
import { HomeRoutingModule } from './home.routing';
import { SharedModule } from '@app/shared';
import { PageItemComponent } from './pages/page-item/page-item.component';
import { PageDetailsComponent } from './pages/page-details/page-details.component';
import { PageAddComponent } from './pages/page-add/page-add.component';
import { PageEditComponent } from './pages/page-edit/page-edit.component';

@NgModule({
    declarations: [
        HomeComponent,
        PageItemComponent,
        PageDetailsComponent,
        PageAddComponent,
        PageEditComponent
    ],
    imports: [
        SharedModule,

        HomeRoutingModule
    ],
    exports: [],
    providers: [],
    entryComponents: []
})
export class HomeModule {}
