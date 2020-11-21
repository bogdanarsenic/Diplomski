import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';


@Component({
    selector: 'jw-modal',
    template: 
        `<div class="jw-modal">
            <div class="jw-modal-body">
                <ng-content></ng-content>
            </div>
        </div>
        <div class="jw-modal-background"></div>`
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        let modal = this;

        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        document.body.appendChild(this.element);
        this.modalService.add(this);
    }

    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('jw-modal-open');
    }

    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('jw-modal-open');
    }
}