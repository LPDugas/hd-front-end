import { TranslationStringsv1Service } from '../../../translation/strings/v1/translationStringsv1.service';
import { SkipSelf, Component, Input, OnInit, OnChanges } from '@angular/core';


@Component({
    selector: 'app-diagnostic-object-title-v1',
    templateUrl: './titlev1.component.html',
    styleUrls: ['./titlev1.component.css']
})
export class Titlev1Component implements OnChanges {
    @Input() jsonView: object;

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
        this.titleString = this.jsonView['titleString'];
        this.titleStrength = this.jsonView['titleStrength'] ? this.jsonView['titleStrength'] : 'h3';

        //And replace titleString with it's translation
        this.titleString = this.translationService.getString(this.titleString);
    }
}