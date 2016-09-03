import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Headers, RequestOptions }  from '@angular/http';
import                               '../rxjs-extensions';

@Injectable()
export class LoginService {
    private host = 'http://localhost:3000';
    private loginUrl = '/login';

    constructor (private http: Http) {}
  
    getToken(settings: any): Promise<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({
            username: settings.username,
            password: settings.password
        });

        return this.http.post(this.host + this.loginUrl, body, options)
            .toPromise()
            .then(this.extractToken)
            .then(this.saveToken)
            .catch(this.handleError);
    }

    private extractToken(res: Response): Promise<Response> {
        let body = res.json();
        return body.token || {};
    }

    private saveToken(token: Response): Promise<Response> {
        window.localStorage.setItem('token', 'Bearer ' + token);
        return;
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message : error.status ?
            `${error.status} - ${error.statusText}` : 'Server error';
        
        console.error(errMsg);
        return Promise.reject(errMsg);
    }

}