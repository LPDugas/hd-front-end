import { Injectable, OnDestroy} from '@angular/core';
import { UiQuery } from 'app/shared/states/ui/ui.query';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class Flagsv1Service implements OnDestroy {

    private flagsMap: { [flagPath:string]:object; }

    private languageCode: string;

    private onDestroy$ = new Subject<void>();

    public onlanguageChange$ = new Subject<void>();
    
    constructor(
        private uiQuery: UiQuery
        ) {
            this.uiQuery.currentLangage$.pipe( 
                takeUntil(this.onDestroy$),
                tap(language => {
                    this.languageCode = language;
                    this.onlanguageChange$.next();
                })
              ).subscribe();
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    setFlagsMap(flagsMap: { [flagPath:string]:object; }) {
        this.flagsMap = flagsMap ? flagsMap : {};
    }

    getFlag(flagPath: string) {
        let flag = this.flagsMap[flagPath];
        if(flag != undefined && flag != null){
            let title = {... flag['title']}
            //Get title in your language
            let titleString = title[this.languageCode];
            if (!( titleString != undefined && titleString != null)) {
                //Try getting the english version as fallback
                console.warn("Missing Title Translation string for flag : " + flagPath + " in language " + this.languageCode);
                titleString = title['en'];
                if (!( titleString != undefined && titleString != null)) {
                    //throw new Error("stringID: " + stringID + " is not inside the translationStringsObject for language " + this.languageCode + " and en");
                    console.error("Missing Title Translation string for flag : " + flagPath + " in language " + this.languageCode + " and en");
                    titleString = '';
                }
            }
            let message = {... flag['message']}
            let messageString = message[this.languageCode];
            if(!(messageString != undefined && messageString != null)) {
                console.warn("Missing Message Translation string for flag : " + flagPath + " in language " + this.languageCode);
                messageString = message['en'];
                if(!(messageString != undefined && messageString != null)) {
                    //throw new Error("stringID: " + stringID + " is not inside the translationStringsObject for language " + this.languageCode + " and en");
                    console.error("Missing Message Translation string for flag : " + flagPath + " in language " + this.languageCode + " and en");
                    messageString = '';
                }
            }
            let value = flag['value'];

            //only keep the text you need in your language
            return {
                title: titleString,
                message: messageString,
                value: value,
                flagPath: flagPath
            }
        } else {
            //throw new Error("flagPath: " + flagPath + " is not inside the FlagsMap");
            console.error("flagPath: " + flagPath + " is not inside the FlagsMap");    
            return null;        
        }

        
    }

}
