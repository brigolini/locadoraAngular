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
    const header = {Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJUZXN0ZSIsImlhdCI6MTYwMDI5MjczMDIxMH0.9xC4Myd9pktMETd8vQo7hIoRdxdvfDaXA8rZEuPLAV8`};
    const result = this.http.request(method, url, {
      headers: header,
      body: data,
      responseType: 'json',
      observe: 'body',
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  // tslint:disable-next-line:typedef
  getAll(): Promise<Veiculo[]> {
    return this.request('get', `${baseUrl}/veiculos`);
  }

  // tslint:disable-next-line:typedef
  getById(id: number): Promise<Veiculo> {
    return this.request('get', `${baseUrl}/veiculos/${id}`);
  }

  // tslint:disable-next-line:typedef
  delete(id: number): Promise<Veiculo[]> {
    return this.request('delete', `${baseUrl}/veiculos/${id}`);
  }

  // tslint:disable-next-line:typedef
  create(veiculo: Veiculo): Promise<true> {
    return this.request('post', `${baseUrl}/veiculos/`, veiculo);
  }

  // tslint:disable-next-line:typedef
  update(veiculo: Veiculo): Promise<true> {
    return this.request('put', `${baseUrl}/veiculos/${veiculo.id}`, veiculo);
  }


}
