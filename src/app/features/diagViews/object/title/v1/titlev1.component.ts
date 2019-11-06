import { TranslationStringsv1Service } from '../../../translation/strings/v1/translationStringsv1.service';
import { SkipSelf, Component, Input, OnInit } from '@angular/core';


@Component({
    selector: 'app-diagnostic-object-title-v1',
    templateUrl: './titlev1.component.html',
    styleUrls: ['./titlev1.component.css'],
    providers: [
        {
            provide: TranslationStringsv1Service,
        }
    ]
})
export class Titlev1Component implements OnInit {
    @Input() jsonView: object;

    public titleString: string;
    public titleStrength: string;

    constructor(
        private translationService:TranslationStringsv1Service,
        ) {};

    ngOnInit() {
        this.titleString = this.jsonView['titleString'];
        this.titleStrength = this.jsonView['titleStrength'] ? this.jsonView['titleStrength'] : 'h3';

        //And replace titleString with it's translation
        this.titleString = this.translationService.getString(this.titleString);
    }
}