import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import {environment} from 'environments/environment'


enum GraphType {
    continuous= "continuous",
    discrete= "discrete"
}

const TIMEZONE: string = "America/New_York";

@Injectable({
  providedIn: 'root'
})
export class InfluxdbApiService {

  constructor(private http: HttpClient) { }

  requestInfluxdbData$( startDate: moment.Moment, endDate: moment.Moment, dbName: string, fieldName:string, seriesName:string, graphType:GraphType) {
      const timeDiffSeconds = endDate.diff(startDate, 'seconds');

      let requestUrl : string;
      if( graphType == GraphType.continuous){
          requestUrl = `${environment.urlBackend}/influxdb/query?q=SELECT+moving_average(mean(${fieldName}),3)+FROM+${dbName}.."${seriesName}"+WHERE+time+>+'${startDate.toISOString()}'+AND+time+<+'${endDate.toISOString()}'+GROUP+BY+time(${((timeDiffSeconds/(10000)>>0)+1)}s)+fill(linear)+tz('${TIMEZONE}')`;
      } else if (graphType == GraphType.discrete){
        requestUrl = `${environment.urlBackend}/influxdb/query?q=SELECT+(${fieldName})+FROM+${dbName}.."${seriesName}"+WHERE+time+>+'${startDate.toISOString()}'+AND+time+<+'${endDate.toISOString()}'+tz('${TIMEZONE}')`;
      }

      return this.http.get(requestUrl);
  }

}