import { NgModule } from '@angular/core';

import { FeaturesRoutingModule } from 'app/features/features-routing.module';
import { FeaturesComponent } from 'app/features/features.component';
import { SharedModule } from 'app/shared/shared.module';

import { DiagnosticDetailledViewTesterModule } from './diagnosticDetailledViewTester/diagnosticDetailledViewTester.module';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  imports: [
    SharedModule,
    FeaturesRoutingModule,
    ProfileModule,
    DiagnosticDetailledViewTesterModule,
  ],
  declarations: [FeaturesComponent],
})
export class FeaturesModule {}
