import { Component, inject, OnInit } from '@angular/core';
import { BlockUIModule } from 'primeng/blockui';
import { LoaderService } from '../../../services/loader.service';

@Component({
    selector:'custom-loader',
    imports:[BlockUIModule],
    templateUrl:'./loader.component.html',
    styleUrl:'./loader.component.css'
    
})
export class CustomLoaderComponent implements OnInit{

    ngOnInit(): void {
        this.loaderService.isLoagind$.subscribe(load => {this.isLoading = load})
     }
    isLoading = false;
    message = '';

    private loaderService = inject(LoaderService)

    
}