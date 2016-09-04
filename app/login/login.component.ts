import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { Document }             from '../document';
import { LoginService }         from '../services/login.service';

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    styleUrls: ['app/login/login.component.css']
})

export class LoginComponent {
    private title = 'Log In';
    private token: string;
    private formUsername: string;
    private formPassword: string;

    constructor(
        private router: Router,
        private loginService: LoginService) {
    }

    syncName(event: any): void {
        this.formUsername = event.target.value;
    }

    syncPassword(event: any): void {
        this.formPassword = event.target.value;
    }

    updateForm() {
        let inputs = <HTMLInputElement[]><any>document.querySelectorAll('input');
        this.formUsername = inputs[0].value;
        this.formPassword = inputs[1].value;
    }

    logIn(): void {
        let self = this;

        this.updateForm();
        if (!this.formUsername || !this.formPassword) {
            throw new Error('login.component: Username or password is missing');
        }

        this.loginService.getToken({
            username: this.formUsername,
            password: this.formPassword
        })
        .then(() => {
            self.gotoDocuments();
        })
        .catch(err => console.log(err));
    }

    gotoDocuments(): void {
        this.router.navigate(['/documents']);
    }
}