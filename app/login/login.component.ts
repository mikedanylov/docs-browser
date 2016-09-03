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

    logIn(): void {
        let self = this;

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