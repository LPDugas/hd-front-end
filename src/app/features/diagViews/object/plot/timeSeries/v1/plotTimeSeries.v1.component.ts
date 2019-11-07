import { TranslationStringsv1Service } from '../../../../translation/strings/v1/translationStringsv1.service';
import { SkipSelf, Component, Input, OnInit, OnChanges } from '@angular/core';


@Component({
    selector: 'app-diagnostic-object-plot-timeSeries-v1',
    templateUrl: './plotTimeSeries.v1.component.html',
    styleUrls: ['./plotTimeSeries.v1.component.scss'],
    providers: [TranslationStringsv1Service]
})
export class plotTimeSeriesv1Component implements OnChanges {
    @Input() jsonView: object;


    public graph = {
        data: [
            { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
            { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
        ],
        layout: {width: 320, height: 240, title: 'A Fancy Plot'}
    };


    public titleString: string;
    public titleStrength: string;

    constructor(
        @SkipSelf() private translationService:TranslationStringsv1Service,
        ) {
            this.translationService.onlanguageChange$.subscribe(() => {
                this.ngOnChanges();
            })
        };

        

    ngOnChanges() {
        this.titleString = "Allo"
        this.titleStrength = 'h3';

        //And replace titleString with it's translation
        //this.titleString = this.translationService.getString(this.titleString);
    }
}