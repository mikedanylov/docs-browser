import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Headers, RequestOptions }  from '@angular/http';
import                               '../rxjs-extensions';
import { DOMAIN, API_URLS }         from '../constants';

declare var jwt_decode: any;

@Injectable()
export class LoginService {

    constructor (private http: Http) {}
  
    getToken(settings: any): Promise<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({
            username: settings.username,
            password: settings.password
        });

        // for development only ##################################
        window.localStorage.setItem('pwd', settings.password);
        // #######################################################

        return this.http.post(DOMAIN + API_URLS.LOGIN, body, options)
            .toPromise()
            .then(this.extractToken)
            .then(this.saveToken)
            .catch(this.handleError);
    }

    getLocalToken(): string {
        return 'Bearer ' + localStorage.getItem('token'); 
    }

    isToken(): boolean {
        return localStorage.getItem('token');
    }
    
    isValidToken(): boolean {
        let expirationTime;
        let valid;

        expirationTime = new Date((jwt_decode(localStorage.getItem('token'))).exp * 1000); 
        valid = expirationTime.getTime() - new Date().getTime();
        
        return valid > 0;
    }

    private extractToken(res: Response): Promise<Response> {
        let body = res.json();
        return body.token || {};
    }

    private saveToken(token: Response): Promise<Response> {
        window.localStorage.setItem('token', token.toString());
        return;
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message : error.status ?
            `${error.status} - ${error.statusText}` : 'Server error';
        
        console.error(errMsg);
        return Promise.reject(errMsg);
    }

}