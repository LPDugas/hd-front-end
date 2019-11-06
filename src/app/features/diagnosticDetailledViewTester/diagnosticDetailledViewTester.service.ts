import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DiagnosticDetailledTesterService {
  constructor(private http: HttpClient) {}

  getBaseJSONSchema() {
    return this.http.get(
      'https://schemas.dashboard.hdenergie.ca/views/diagnostic-detailled/v1.json'
    );
  }

  getNewJsonURI(uri: string) {
    return this.http.get(uri);
  }
}
