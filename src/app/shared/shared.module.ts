import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { ThemePickerModule } from './theme-picker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';

import {
  faAsterisk,
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faPlayCircle,
  faRocket,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faAsterisk,
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faRocket,
  faPlayCircle,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook
);


import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

const config: InputFileConfig = {};

@NgModule({
    imports: [
      ThemePickerModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      //NgbModule.forRoot(),
      InputFileModule.forRoot(config),
      FontAwesomeModule
    ],
    declarations: [
      ControlMessagesComponent,
      SpinnerComponent
    ],
    exports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      MaterialModule,

      //NgbModule,
      FontAwesomeModule,

      ControlMessagesComponent,
      SpinnerComponent
    ]
})
export class SharedModule { }
