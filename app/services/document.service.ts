import { Injectable }       from '@angular/core';
import { Http, Response }   from '@angular/http';

import { Observable }       from 'rxjs/Observable';

import { Document }         from '../document';

@Injectable()
export class DocumentService {
    private docsUrl = 'localhost:3000/documents'

    constructor (private http: Http) {}
  
    getDocuments(): Promise<Document[]> {
        return Promise.resolve([]);
    }

}