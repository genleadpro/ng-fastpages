import { Component, OnInit } from '@angular/core';
import { PageService, Page } from '@app/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    pages$: Observable<Page[]>;

    constructor(
        private pageService: PageService
    ) { }

    ngOnInit(): void {
        // this.loadPages();
    }

    loadPages() {
        this.pages$ = this.pageService.getAll();
    }

}
