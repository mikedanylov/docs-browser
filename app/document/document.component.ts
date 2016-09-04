import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import { Document }                 from '../document';
import { LoginService }             from '../services/login.service';
import { DocumentService }          from '../services/document.service';

@Component({
    selector: 'document',
    templateUrl: 'app/document/document.component.html',
    styleUrls: ['app/document/document.component.css']
})

export class DocumentComponent implements OnInit {
    private document: Document;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private loginService: LoginService,
        private documentService: DocumentService) {
        }
    
    private getDocument(docId: number) {
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

        tokenPromise.then(() => {
            token = this.loginService.getLocalToken();

            Promise.all([
                this.documentService.getDocument(token, docId),
                this.documentService.getDocumentContent(token, docId)
            ])
            .then((vals) => {
                console.log(vals);
                self.appendDocumentContent(vals);
            });
        });
    }

    appendDocumentContent(vals: any) {
        this.document = vals[0];
        this.document.content = vals[1];
    }

    ngOnInit(): void {
        let docId: number;

        if (!this.loginService.isToken()) {
            this.gotoLogin();
        }

        this.route.params.forEach((params: Params) => {
            docId = +params['id'];

            if (docId < 0) {
                return;
            }

            this.getDocument(docId);
        });
    }

    gotoLogin(): void {
        this.router.navigate(['/login']);
    }

    onClick(): void {
        console.log(this.document);
    }
}
