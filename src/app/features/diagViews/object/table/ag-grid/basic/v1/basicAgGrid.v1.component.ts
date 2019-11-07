import { TranslationStringsv1Service } from '../../../../../translation/strings/v1/translationStringsv1.service';
import { SkipSelf, Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
    selector: 'app-diagnostic-object-agGrid-basic-v1',
    templateUrl: './basicAgGrid.v1.component.html',
    styleUrls: ['./basicAgGrid.v1.component.scss'],
    providers: [TranslationStringsv1Service]
})
export class BasicAgGridv1Component implements OnChanges {
    @Input() jsonView: object;

    public columnDefs: Array<object>;
    public rowData: Array<object>;

    constructor(
        @SkipSelf() private translationService:TranslationStringsv1Service,
        ) {
            this.translationService.onlanguageChange$.subscribe(() => {
                this.ngOnChanges();
            })
        };

        
    private replaceColumnStringsWithTranslation(columnDef: object):object {
        columnDef['headerName'] = this.translationService.getString(columnDef['headerName'])
        //verify that there is no other properties
        if('headerTooltip' in columnDef)
            columnDef['headerTooltip'] = this.translationService.getString(columnDef['headerTooltip'])
        if('children' in columnDef)
            columnDef['children'].forEach(childrenColumn => {
                childrenColumn = this.replaceColumnStringsWithTranslation(childrenColumn)
            });

        return columnDef;
    }

    private replaceRowStringsWithTranslation(rowData: object): object {
        for( let value of Object.values(rowData) ) {
            if (typeof value === 'string')
                value = this.translationService.getString(value);
        }

        return rowData;
    }

    ngOnChanges() {
        this.columnDefs = this.jsonView['columnDefs'].map(e => ({ ... e }));
        this.rowData = this.jsonView['rowData'].map(e => ({ ... e }));

        this.columnDefs.forEach(columnDef => {
            //Replace the strings with their translation
            columnDef = this.replaceColumnStringsWithTranslation(columnDef);
        });
        this.rowData.forEach(rowData => {
            rowData = this.replaceRowStringsWithTranslation(rowData);
        })
    }
}