import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { ThemePickerModule } from './theme-picker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { AngularEditorModule, AngularEditorConfig } from '@kolkov/angular-editor';

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
import { EqualValidatorDirective } from './directives';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const config: InputFileConfig = {};

const editorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '25rem',
  minHeight: '5rem',
  placeholder: 'Enter text here...',
  translate: 'no',
  uploadUrl: 'v1/images', // if needed
  customClasses: [ // optional
    {
      name: "quote",
      class: "quote",
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: "titleText",
      class: "titleText",
      tag: "h1",
    },
  ]
};

@NgModule({
    imports: [
      ThemePickerModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      //NgbModule.forRoot(),
      InputFileModule.forRoot(config),
      FontAwesomeModule,
      AngularEditorModule
    ],
    declarations: [
      ControlMessagesComponent,
      SpinnerComponent,
      EqualValidatorDirective
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
      SpinnerComponent,
      AngularEditorModule,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
