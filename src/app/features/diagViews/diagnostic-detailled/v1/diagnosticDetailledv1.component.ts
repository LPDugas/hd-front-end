import { Component, Input, OnChanges, Injector, Host, Type, InjectionToken, SkipSelf } from "@angular/core";
import { TranslationStringsv1Service } from '../../translation/strings/v1/translationStringsv1.service';




@Component({
    selector: 'app-diagnostic-detailled-v1',
    templateUrl: './diagnosticDetailledv1.component.html',
    styleUrls: ['./diagnosticDetailledv1.component.css'],
    providers: [ TranslationStringsv1Service ]
})
export class DiagnosticDetailledv1Component implements OnChanges {
    @Input() jsonView: any;

    constructor(@Host() private translationService:TranslationStringsv1Service) { }

    ngOnChanges() {
        this.translationService.setTranslationStrings(this.jsonView['translationStrings'])
    }

    

}