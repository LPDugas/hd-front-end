// There is no module for this component since it's already integrated in the baseComponent 
// There is a cyclic dependency if this module imports the baseComponent

import { TranslationStringsv1Service } from '../../../../../translation/strings/v1/translationStringsv1.service';
import { SkipSelf, Component, Input, OnInit, OnChanges } from '@angular/core';

import { CellRenderer } from './cellRenderer/cellRenderer.component';

@Component({
    selector: 'app-diagnostic-object-agGrid-basic-v1',
    templateUrl: './basicAgGrid.v1.component.html',
    styleUrls: ['./basicAgGrid.v1.component.scss']
})
export class BasicAgGridv1Component implements OnChanges, OnInit {
    @Input() jsonView: object;

    private gridApi;
    private gridColumnApi;

    public frameworkComponents = {
        cellRenderer : CellRenderer
    }

    public columnDefs: Array<object>;
    public rowData: Array<object>;
    public defaultColDef = {resizable: true};
    public domLayout: string;
    public divHeight:number ;

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
        if(!( 'autoHeight' in columnDef))
            columnDef['autoHeight'] =  true;
        if('children' in columnDef)
            columnDef['children'].forEach(childrenColumn => {
                childrenColumn = this.replaceColumnStringsWithTranslation(childrenColumn)
            });

        return columnDef;
    }

    private replaceRowStringsWithTranslation(rowData: object): object {
        for( let key of Object.keys(rowData) ) {
            if (typeof rowData[key] === 'string')
                rowData[key] = this.translationService.getString(rowData[key]);
        }

        return rowData;
    }

    ngOnChanges() {
        this.columnDefs = this.jsonView['columnDefs'].map(e => ({ ... e }));
        this.rowData = this.jsonView['rowData'].map(e => ({ ... e }));

        this.columnDefs.forEach(columnDef => {
            //Replace the strings with their translation
            columnDef = this.replaceColumnStringsWithTranslation(columnDef);
            //setup the cell renderer
            columnDef['cellRenderer'] = 'cellRenderer';
        });
        this.rowData.forEach(rowData => {
            rowData = this.replaceRowStringsWithTranslation(rowData);
        })
    }

    ngOnInit() {
        const nbRows = this.jsonView['rowData'].length;
        if(nbRows < 10)
            this.domLayout= "autoHeight";
        else{
            this.domLayout= "normal"; 
            this.divHeight = 400;
        }
    }

    sizeToFit() {
        this.gridApi.sizeColumnsToFit();
    }
    
    autoSizeAll(skipHeader) {
        var allColumnIds = [];
        this.gridColumnApi.getAllColumns().forEach(function(column) {
            allColumnIds.push(column.colId);
        });
        this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.ngOnChanges();

        params.api.sizeColumnsToFit();

        /*window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });*/

    }
    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }
}