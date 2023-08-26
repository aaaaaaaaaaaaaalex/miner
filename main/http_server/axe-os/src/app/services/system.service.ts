import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { delay, Observable, of } from 'rxjs';
import { ISystemInfo } from 'src/models/ISystemInfo';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService
  ) { }

  public getInfo(): Observable<ISystemInfo> {
    if (environment.production) {
      return this.httpClient.get(`/api/system/info`) as Observable<ISystemInfo>;
    } else {
      return of(
        {
          "power": 11.670000076293945,
          "voltage": 5208.75,
          "current": 2237.5,
          "fanSpeed": 82,
          "hashRate": 0,
          "bestDiff": "0",
          "freeHeap": 200504,
          "coreVoltage": 1188,
          "ssid": "skimadtrees-secure",
          "wifiPass": "password",
          "wifiStatus": "Connected!",
          "sharesAccepted": 1,
          "sharesRejected": 0,
          "uptimeSeconds": 38,
          "ASICModel": "BM1366",
          "stratumURL": "192.168.1.242",
          "stratumPort": 3333,
          "stratumUser": "bc1q99n3pu025yyu0jlywpmwzalyhm36tg5u37w20d.bitaxe-U1"
        }
      ).pipe(delay(1000));
    }
  }

  public restart() {
    return this.httpClient.post(`/api/system/restart`, {});
  }

  public updateSystem(update: any) {
    return this.httpClient.patch(`/api/system`, update);
  }


  private otaUpdate(file: File, url: string) {
    return new Observable<HttpEvent<string>>((subscriber) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const fileContent = event.target.result;

        return this.httpClient.post(url, fileContent, {
          reportProgress: true,
          observe: 'events',
          responseType: 'text', // Specify the response type
          headers: {
            'Content-Type': 'application/octet-stream', // Set the content type
          },
        })
          .subscribe({
            next: (e) => {
              subscriber.next(e)
            },
            error: (err) => {
              subscriber.error(err)
            },
            complete: () => {
              subscriber.complete();
            }
          });
      };
      reader.readAsArrayBuffer(file);
    });
  }

  public performOTAUpdate(file: File) {
    return this.otaUpdate(file, `/api/system/OTA`);
  }
  public performWWWOTAUpdate(file: File) {
    return this.otaUpdate(file, `/api/system/OTAWWW`);
  }


}
