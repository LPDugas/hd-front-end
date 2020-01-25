import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { CommonModule } from '@angular/common';

import {StoreStatusComponent} from './storeStatus.component';

import {DiagViewModule} from './diagView/diagView.module'

@NgModule({
  imports: [SharedModule, CommonModule, DiagViewModule],
  declarations: [StoreStatusComponent],
})
export class StoreStatusModule {}
