import { Component, OnInit, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Slide {
	id: number;
	imageUrl: string;
	note: string;
}

@Component({
	selector: 'app-document',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './document.component.html',
	styleUrls: ['./document.component.scss'],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentComponent {
	slides = signal<Slide[]>([
		{ id: 1, imageUrl: 'assets/img/slide-1.png', note: '' },
		{ id: 2, imageUrl: 'assets/img/slide-2.png', note: '' },
		{ id: 3, imageUrl: 'assets/img/slide-3.png', note: '' },
	]);

	selectedSlide = signal<Slide>(this.slides()[0]);

	selectSlide(slide: Slide) {
		this.selectedSlide.set(slide);
	}
}