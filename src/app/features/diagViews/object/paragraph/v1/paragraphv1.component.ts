import { TranslationStringsv1Service } from '../../../translation/strings/v1/translationStringsv1.service';
import { SkipSelf, Component, Input, OnInit, OnChanges } from '@angular/core';


@Component({
    selector: 'app-diagnostic-object-paragraph-v1',
    templateUrl: './paragraphv1.component.html',
    styleUrls: ['./paragraphv1.component.scss'],
    providers: [TranslationStringsv1Service]
})
export class Paragraphv1Component implements OnChanges {
    @Input() jsonView: object;

    public simpleString: string;

    constructor(
        @SkipSelf() private translationService:TranslationStringsv1Service,
        ) {
            this.translationService.onlanguageChange$.subscribe(() => {
                this.ngOnChanges();
            })
        };

        

    ngOnChanges() {
        this.simpleString = this.jsonView['simpleString'];

        //And replace titleString with it's translation
        this.simpleString = this.translationService.getString(this.simpleString);
    }
}