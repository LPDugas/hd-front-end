import { Injectable, Inject, OnInit } from '@angular/core';
import { UiQuery } from 'app/shared/states/ui/ui.query';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class TranslationStringsv1Service implements OnInit {
    private translationStringsObject: object;
    private languageCode: string;
    private onDestroy$ = new Subject<void>();
    
    constructor(
        private uiQuery: UiQuery,
        ) {
    }
    ngOnInit() {
        this.uiQuery.currentLangage$
        .pipe( 
          takeUntil(this.onDestroy$),
          tap(language => (this.languageCode = language))
        )
        .subscribe();
    }

    setTranslationStrings(translationStrings: object) {
        this.translationStringsObject = translationStrings
    }

    getString(stringID: string) {
        let strings = this.translationStringsObject[stringID];
        if(strings != undefined && strings != null) {
            let translatedString : string = strings[this.languageCode]
            if ( translatedString != undefined && translatedString != null) {
                return translatedString
            } else {
                //Try getting the english version as fallback
                console.warn("Missing Translation string for StringID : " + stringID + "in language " + this.languageCode);
                translatedString = strings['en'];
                if ( translatedString != undefined && translatedString != null) {
                    return translatedString
                } else {
                    throw new Error("stringID: " + stringID + " is not inside the translationStringsObject for language " + this.languageCode + " and en");
                }
            }
        } else {
            throw new Error("stringID: " + stringID + " is not inside the translationStringsObject");
        }
    }
}
