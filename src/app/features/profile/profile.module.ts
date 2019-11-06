import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [SharedModule, CommonModule],
  declarations: [ProfileComponent],
})
export class ProfileModule {}
