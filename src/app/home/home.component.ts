import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UserService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: any;
    users = [];

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}