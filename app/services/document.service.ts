import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Headers, RequestOptions }  from '@angular/http';
import                                   '../rxjs-extensions';
import { Document }                 from '../document';
import { DOMAIN, API_URLS }         from '../constants';

@Injectable()
export class DocumentService {

    constructor(private http: Http) {
    }

    getAllDocuments(token: string): Promise<any> {
        let headers = new Headers();
        
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);
        
        let options = new RequestOptions({
            headers: headers,
            body: ''
        });

        return this.http.get(DOMAIN + API_URLS.DOCUMENTS, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getDocument(token: string, docId: number): Promise<any> {
        let headers = new Headers();
        
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);
        
        let options = new RequestOptions({
            headers: headers,
            body: ''
        });

        return this.http.get(DOMAIN + API_URLS.DOCUMENT + docId, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getDocumentContent(token: string, docId: number): Promise<any> {
        let headers = new Headers();
        
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);
        
        let options = new RequestOptions({
            headers: headers,
            body: ''
        });

        return this.http.get(DOMAIN + API_URLS.DOCUMENT + docId + API_URLS.TEXT, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response): Promise<any> {
        let body = res.json();
        return body || {};
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message : error.status ?
            `${error.status} - ${error.statusText}` : 'Server error';
        
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}
