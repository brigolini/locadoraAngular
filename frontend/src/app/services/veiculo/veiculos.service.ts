import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Veiculo} from '../../model/Veiculo';

const baseUrl = 'http://localhost:3090/api';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  private async request(method: string, url: string, data?: any) {

    console.log('request ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  // tslint:disable-next-line:typedef
  getVeiculos(): Promise<Veiculo[]> {
    return this.request('get', `${baseUrl}/veiculos`);
  }


}
