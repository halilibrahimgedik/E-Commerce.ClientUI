import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }


  private createUrl(requestParameter: Partial<RequestParameter>) : string
  {
    // !requestParameter'daki baseUrl alanı doldurulmuş ise onu kullan (bunu kullanıyorsak demek ki farkli bir
    // !servise istek atıyoruzdur. Çünkü zaten app.module.ts de baseUrl'imiz tanımlı idi)

    // ! requestParameter'daki baseUrl alanı eğer doldurulmamışsa app.module.ts de tanımlı baseUrl'i kullan
    // ! (ctor'dan aldık bu değeri)

    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action? `/${requestParameter.action}`:""}`
  }

  get<T>(requestParameter: Partial<RequestParameter>, id?: string): Observable<T>{
    let url: string = "";

    if(requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url= `${this.createUrl(requestParameter)}${id ? `/${id}` : ""}`;

    return this.httpClient.get<T>(url, {headers: requestParameter.headers})
  }

  post<T>(requestParameter: Partial<RequestParameter>, body: Partial<T>): Observable<T>{
    let url: string = "";

    if(requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url= `${this.createUrl(requestParameter)}`;

    return this.httpClient.post<T>(url, body,{headers: requestParameter.headers})
  }

  put<T>(requestParameter: Partial<RequestParameter>, body: Partial<T>): Observable<T>{
    let url = "";

    if(requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.createUrl(requestParameter)}`;

      return this.httpClient.put<T>(url, body, { headers: requestParameter.headers});
  }

  delete<T>(requestParameter: Partial<RequestParameter>, id: string) : Observable<T>{
    let url: string = "";

    if(requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.createUrl(requestParameter)}/${id}`;

    return this.httpClient.delete<T>(url, {headers: requestParameter.headers});
  }
  
}

export class RequestParameter
{
  controller?: string;
  action?: string;

  headers?: HttpHeaders;
  baseUrl?: string; // uygulamanın dıında başka bir servis'e istek atabiliriz.
  fullEndPoint?: string; // dış dünyada bambaşka bir endpointe istek atabiliriz.
}