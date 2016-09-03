import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { Document }             from '../document';
import { LoginService }         from '../services/login.service';

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    styleUrls: ['app/login/login.component.css']
})

export class LoginComponent implements OnInit {
    private token: string;

    constructor(
        private router: Router,
        private loginService: LoginService) {
    }

    ngOnInit(): void {
        this.loginService.getToken()
            .then(token => this.token);
    }
}