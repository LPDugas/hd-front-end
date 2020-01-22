import { SkipSelf, Component, Input, OnInit, OnChanges } from '@angular/core';
import { Flagsv1Service } from 'app/features/diagViews/flags/v1/flags.v1.service';


@Component({
    selector: 'app-diagnostic-object-flag-v1',
    templateUrl: './flag.v1.component.html',
    styleUrls: ['./flag.v1.component.scss']
})
export class Flagv1Component implements OnChanges {
    @Input() jsonView: object;

    public flagPath: string;
    public flagValue: boolean;

    constructor(
        @SkipSelf() private flagsService:Flagsv1Service,
        ) {
            this.flagsService.onlanguageChange$.subscribe(() => {
                this.ngOnChanges();
            })
        };
  
        

    ngOnChanges() {
        this.flagPath = this.jsonView['flagPath'];

        //Get the flag using the flagPath;
        let flag = this.flagsService.getFlag(this.flagPath);

        if(flag != null) {
            this.flagValue = flag.value
        } else {
            this.flagValue = null;
        }
    }
}