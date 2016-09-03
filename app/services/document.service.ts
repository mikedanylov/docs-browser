import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Headers, RequestOptions }  from '@angular/http';
import '../rxjs-extensions';

import { LoginService }             from './login.service';
import { Document }                 from '../document';

@Injectable()
export class DocumentService {
    private host = 'http://localhost:3000';
    private loginUrl = '/documents';

    constructor(private http: Http,
        private loginService: LoginService) {

    }

    getAllDocuments(token: string): Promise<Response> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authentication': token
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.host + this.loginUrl, options)
            .toPromise()
            .then(this.extractDocuments)
            .catch(this.handleError);
    }

    private extractDocuments(res: Response): Promise<any> {
        let docs: Document[];

        return Promise.resolve(docs);
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message : error.status ?
            `${error.status} - ${error.statusText}` : 'Server error';
        
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}