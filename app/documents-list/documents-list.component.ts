import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { Document }             from '../document';
import { LoginService }         from '../services/login.service';
import { DocumentService }      from '../services/document.service';

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
    
    private getDocuments(): Promise<any> {
        let token = this.loginService.getLocalToken();

        if (!token) {
            this.gotoLogin();
        }

        return this.documentService.getAllDocuments(token)
            .then(docs => this.documents = docs);
    }

    ngOnInit(): void {
        this.getDocuments();
    }

    gotoLogin(): void {
        this.router.navigate(['/login']);
    }

    onClick(document): void {
        this.router.navigate([document._links[0].href]);
    }
}
