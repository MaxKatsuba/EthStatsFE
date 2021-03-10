import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  apiUrl: string;

  temp: string;
  power: string;
  load: string;

  name: string;

  shares: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.apiUrl = `https://ethstatsbe.herokuapp.com/api/logs/rtx3070`;

    this.getData().subscribe(res => {
      console.log(res);
      if (res.gpu && res.gpu.length > 0) {
        this.name = res.worker;
        
        let latestGpu = res.gpu[res.gpu.length - 1];

        this.temp = latestGpu.temp;
        this.power = latestGpu.power;
        this.load = latestGpu.load;

        this.shares = res.shares;
      }
    })
  }

  refresh() {
    this.getData().subscribe(res => {
      console.log(res);
      if (res.gpu && res.gpu.length > 0) {
        this.name = res.worker;
        
        let latestGpu = res.gpu[res.gpu.length - 1];

        this.temp = latestGpu.temp;
        this.power = latestGpu.power;
        this.load = latestGpu.load;
      }
    })
  }

  title = 'ethstatsfe';


  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
