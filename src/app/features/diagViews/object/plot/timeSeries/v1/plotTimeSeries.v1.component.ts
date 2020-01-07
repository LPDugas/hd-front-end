import { TranslationStringsv1Service } from '../../../../translation/strings/v1/translationStringsv1.service';
import { SkipSelf, Component, Input, OnInit, OnChanges } from '@angular/core';
import { InfluxdbApiService } from '../../../../../../shared/api/influxdb.service'
import * as moment from 'moment';


type GraphTrace = {
    x: Array< number | string>,
    y: Array< number>,
    type: string,
    name: string,
    yaxis: string,
    marker?: object,
    line?: object,
    mode: string
}
type GraphLayout = {
    title?: string,

    legend?: object,
    margin?: object,
    //yaxis,yaxis2,etc.
} & {
    [prop: string]: any
}
type Graph = {
    data: Array<GraphTrace>,
    layout: GraphLayout
}

@Component({
    selector: 'app-diagnostic-object-plot-timeSeries-v1',
    templateUrl: './plotTimeSeries.v1.component.html',
    styleUrls: ['./plotTimeSeries.v1.component.scss'],
    providers: [TranslationStringsv1Service]
})
export class plotTimeSeriesv1Component implements OnChanges {
    @Input() jsonView: object;


    public graph :Graph = {
        data: [
            { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'}, name: 'fun', yaxis:'y' },
        ],
        layout: {width: 320, height: 240, title: 'A Fancy Plot'}
    };


    public titleString: string;
    public titleStrength: string;

    constructor(
        @SkipSelf() private translationService:TranslationStringsv1Service,
        private influxdbApi : InfluxdbApiService
        ) {
            this.translationService.onlanguageChange$.subscribe(() => {
                this.ngOnChanges();
            })
        };

        
    private extractDataLayoutFromInput() {
        let graphData : Array<GraphTrace> = [] ;

        this.jsonView['traces'].forEach(trace => {
            let graphTrace : GraphTrace = {} as GraphTrace;
            graphTrace.name = this.translationService.getString( trace['traceName'] );
            graphTrace.yaxis = trace['yaxis'] ? trace['yaxis'] : 'y';
            graphTrace.mode = trace['mode'] ? trace['mode'] : 'lines';
            graphTrace.type = 'scatter';
            graphTrace.line = trace['line'] ? trace['line'] : {};

            if( trace['dataSource']['influxDbDataSource'] ) {
                //TODO: do somoething to get all data for influxDB 
                //Make the request to the influxdb api
                this.influxdbApi.requestInfluxdbData$(moment().subtract(1, 'month'), moment().subtract(1,'day'),
                    trace['dataSource']['influxDbDataSource']['dbName'],
                    trace['dataSource']['influxDbDataSource']['dbField'],
                    trace['dataSource']['influxDbDataSource']['dbMeas'],
                    trace['dataSource']['influxDbDataSource']['graphType'] ? trace['dataSource']['influxDbDataSource']['graphType'] : 'continuous'
                    ).subscribe( (data: any) => {
                        console.log(data);
                        const points = data.results[0].series[0].values;
                        const xValues = points.map( point => point[0]);
                        const yValues = points.map( point => point[1]);
                        graphTrace.x = xValues
                        graphTrace.y = yValues
                        //graphTrace.marker = this.graph.data[0].marker;
                        graphData.push(graphTrace);
                    })                    
                
                
            } else if( trace['dataSource']['embeddedDataSource']) {
                graphTrace.x = trace['dataSource']['embeddedDataSource']['x'];
                graphTrace.y = trace['dataSource']['embeddedDataSource']['y'];
                graphData.push(graphTrace);
            }

            
        });

        let graphLayout : GraphLayout = {} as GraphLayout;
        graphLayout = this.jsonView['layout'];

        this.graph = {data: graphData, layout: graphLayout};

    }

    ngOnChanges() {
        this.extractDataLayoutFromInput();

        //And replace titleString with it's translation
        //this.titleString = this.translationService.getString(this.titleString);
    }
}