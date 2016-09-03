import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Headers, RequestOptions }  from '@angular/http';

@Injectable()
export class LoginService {
    private host = 'http://localhost:3000';
    private loginUrl = '/login';
    private username = 'ssh';
    private password = 'homework';

    constructor (private http: Http) {}
  
    getToken(): Promise<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({
            username: this.username,
            password: this.password
        });

        return this.http.post(this.host + this.loginUrl, body, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.token || { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message : error.status ?
            `${error.status} - ${error.statusText}` : 'Server error';
        
        console.error(errMsg);
        return Promise.reject(errMsg);
    }

}