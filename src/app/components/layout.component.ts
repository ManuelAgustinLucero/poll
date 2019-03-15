import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['layout.component.css']
})

export class LayoutComponent {

    public logo: string;
    public rubro: string;

    constructor(
        private router: Router
    ) {

    }

    ngOnInit() {
    }


}
