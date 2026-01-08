import { Component, effect, input, OnInit, output } from "@angular/core";
import { DialogModule } from "primeng/dialog";

@Component({
    selector:'show-details-modal',
    imports:[DialogModule],
    templateUrl:'./show-details-modal.component.html',
    styleUrl:'./show-details-modal.component.css'

})
export class ShowDetailsModalComponent implements OnInit{


    ngOnInit(): void {
    }

    title = input<string>('Title Aqui')
    visible = input<boolean>(false);
    visibleChange = output<boolean>();
    data = input<any>(null);

    private contactEffect  = effect (() => {
        const data = this.data();
        console.log("data dsde el padre en el hijo", data);
    })


}