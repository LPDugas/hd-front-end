import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { Titlev1Component } from './titlev1.component';
import { TranslationStringsv1Service } from '../../../translation/strings/v1/translationStringsv1.service';

@NgModule({
  imports: [SharedModule],
  declarations: [Titlev1Component],
  exports: [Titlev1Component]
})
export class Titlev1Module {}
