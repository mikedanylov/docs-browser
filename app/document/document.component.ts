import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import { Document }                 from '../document';
import { LoginService }             from '../services/login.service';
import { DocumentService }          from '../services/document.service';

declare var jwt_decode: any;

@Component({
    selector: 'document',
    templateUrl: 'app/document/document.component.html',
    styleUrls: ['app/document/document.component.css']
})

export class DocumentComponent implements OnInit {
    private document: Document;
    private searchParam: string;
    private contentElemSel = 'pre.doc-content';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private loginService: LoginService,
        private documentService: DocumentService) {
        }
    
    private getDocument(docId: number): Promise<Document> {
        let token;
        let tokenPromise;
        let self = this;

        if (!this.loginService.isValidToken()) {
            tokenPromise = this.loginService.getToken({
                username: (jwt_decode(localStorage.getItem('token'))).username,
                password: window.localStorage.getItem('pwd')
            });
        } else {
            tokenPromise = Promise.resolve();
        }

        return tokenPromise.then(() => {
            token = this.loginService.getLocalToken();

            Promise.all([
                this.documentService.getDocument(token, docId),
                this.documentService.getDocumentContent(token, docId)
            ])
            .then((vals) => {
                return self.appendDocumentContent(vals);
            });
        });
    }

    private parseDocName(doc: Document): Document {
        doc.name = doc.name.replace(/_|-/g, ' ');
        return doc;
    }

    private appendDocumentContent(vals: any): Promise<Document> {
        this.document = vals[0];
        this.document = this.parseDocName(this.document);
        this.document.content = vals[1];
        
        return Promise.resolve(this.document);
    }

    ngOnInit(): void {
        let docId: number;
        let self = this;

        if (!this.loginService.isToken()) {
            this.gotoLogin();
        }

        this.route.params.forEach((params: Params) => {
            docId = +params['id'];

            if (docId < 0) {
                return;
            }

            this.getDocument(docId)
                .then((doc) => {
                    setTimeout(() => {
                        self.searchParam = self.getQueryParam('search', location.href);
                        
                        if (!self.searchParam) {
                            return;
                        }
                        
                        self.highlight();
                    }, 5000);
                });
        });
    }

    ngOnChanges(changes: any) {
        this.searchParam = this.getQueryParam('search', location.href);
                    
        if (!this.searchParam) {
            return;
        }

        this.highlight();
    }

    gotoLogin(): void {
        this.router.navigate(['/login']);
    }

    private highlight() {
        let content = document.querySelector(this.contentElemSel);
        let re = new RegExp(this.searchParam, 'g');

        content.innerHTML =
            content.innerHTML.replace(re, `<span class="highlight">${this.searchParam}</span>`);
    }

    private getQueryParam(name: string, url: string): string {
        let regex: RegExp;
        let results: Array<string>;

        if (!url) {
            url = window.location.href;
        }

        name = name.replace(/[\[\]]/g, "\\$&");
        
        regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        results = regex.exec(url);
        
        if (!results || !results[2]) {
            return;
        }
        
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}
