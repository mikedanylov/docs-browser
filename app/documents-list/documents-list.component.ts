import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { Document }             from '../document';
import { LoginService }         from '../services/login.service';
import { DocumentService }      from '../services/document.service';

declare var jwt_decode: any;

@Component({
    selector: 'documents-list',
    templateUrl: 'app/documents-list/documents-list.component.html',
    styleUrls: ['app/documents-list/documents-list.component.css']
})

export class DocumentsListComponent implements OnInit {
    private documents: Document[];

    constructor(
        private router: Router,
        private loginService: LoginService,
        private documentService: DocumentService) {
        }
    
    private getDocuments() {
        let token;
        let self = this;

        if (this.loginService.isValidToken()) {
            token = this.loginService.getLocalToken();
            this.documentService.getAllDocuments(token)
                .then((docs) => {
                    self.normalizeDocs(docs);
                });
        } else {
            this.loginService.getToken({
                username: (jwt_decode(localStorage.getItem('token'))).username,
                password: window.localStorage.getItem('pwd')
            })
            .then(() => {
                token = this.loginService.getLocalToken();
                this.documentService.getAllDocuments(token)
                    .then((docs) => {
                        self.normalizeDocs(docs);
                    });
            });
        }
    }

    private normalizeDocs(docs: Document[]) {
        this.documents = docs.map(doc => {
            return this.parseDocName(doc);
        });
    }

    private parseDocName(doc: Document): Document {
        doc.name = doc.name.replace(/_|-/g, ' ');
        return doc;
    }

    ngOnInit(): void {
        if (!this.loginService.isToken()) {
            this.gotoLogin();
        }

        this.getDocuments();
    }

    gotoLogin(): void {
        this.router.navigate(['/login']);
    }

    onClick(document): void {
        this.router.navigate([document._links[0].href]);
    }
}
