import { Injectable } from '@angular/core';
import { request, HttpResponse } from "tns-core-modules/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable(
    {
         providedIn: "root"
    }
)
export class HttpPostService {
  
      postData(Url: string, obj: any) {
          request({
            url: Url,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(obj)
        }).then((response: HttpResponse) => {
        
        const token = response.content.toJSON();
        console.log(token);
        return token;

    }, (e) => {

            console.log("Error: "+ e);
            return undefined;        
    });

    }

}

export class MyHttpPostService {
    
    constructor(private http: HttpClient) { }

    postData(data: any, serverUrl: string) {
        let options = this.createRequestOptions();
        return this.http.post(serverUrl, { data }, { headers: options });
    }

    private createRequestOptions() {
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        return headers;
    }
}

export class HttpGetService {

    getCommonHeaders(accessToken: string) {
        return {
           "Authorization": "Bearer " + accessToken
        }
      }
    
      
     tokenRequest(Url: string, accessToken: string){
        request({
               url: Url,
               method: "GET",
               headers: this.getCommonHeaders(accessToken)
           }).then(async (response: HttpResponse) => {
            
    
               var obj = response.content.toJSON();
               console.log("obj: "+ obj);
              return obj;
    
           }, (e) => {
               console.log("Error: "+ e);
           });
     }
    
     normalGetRequest(Url:string)
     {
        request({
            url: Url,
            method: "GET"
        }).then((response: HttpResponse) => {
            
            var obj = response.content.toJSON();
   
            return obj;

        }, (e) => {
            console.log("Error: "+ e);
        });
        
     }
   
}
