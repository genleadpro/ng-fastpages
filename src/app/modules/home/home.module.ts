import { NgModule } from '@angular/core';

import { MyModalComponent } from './modals/my-modal.component';

import { HomeComponent } from './pages/home.component';
import { HomeRoutingModule } from './home.routing';

import { SharedModule } from '@app/shared';
import { PageItemComponent } from './pages/page-item/page-item.component';
import { PageDetailsComponent } from './pages/page-details/page-details.component';

@NgModule({
    declarations: [
        HomeComponent,
        MyModalComponent,
        PageItemComponent,
        PageDetailsComponent
    ],
    imports: [
        SharedModule,

        HomeRoutingModule
    ],
    exports: [],
    providers: [],
    entryComponents: [MyModalComponent]
})
export class HomeModule {}
