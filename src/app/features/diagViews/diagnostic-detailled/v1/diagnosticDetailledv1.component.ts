import { Component, Input, OnInit, Injector, Host, Type, InjectionToken } from "@angular/core";
import { TranslationStringsv1Service } from '../../translation/strings/v1/translationStringsv1.service';


@Component({
    selector: 'app-diagnostic-detailled-v1',
    templateUrl: './diagnosticDetailledv1.component.html',
    styleUrls: ['./diagnosticDetailledv1.component.css'],
    providers: [
        {
            provide: TranslationStringsv1Service,
        }
    ]
})
export class DiagnosticDetailledv1Component implements OnInit {
    @Input() jsonView: object;

    constructor(@Host() private translationService:TranslationStringsv1Service) {
        alert('test');
    }

    ngOnInit() {
        this.translationService.setTranslationStrings(this.jsonView['translationStrings'])
    }

}