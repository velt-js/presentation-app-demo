import { Component, signal, CUSTOM_ELEMENTS_SCHEMA, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeltService } from '../../services/velt.service';
import { FormsModule } from '@angular/forms';

/**
 * DocumentComponent handles the slides functionality and integrates Velt collaboration features.
 */
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

	// Schemas are required to add Velt html tags
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentComponent {
	slides = signal<Slide[]>([
		{ id: 1, imageUrl: 'assets/img/slide-1.png', note: '' },
		{ id: 2, imageUrl: 'assets/img/slide-2.png', note: '' },
		{ id: 3, imageUrl: 'assets/img/slide-3.png', note: '' },
	]);

	selectedSlide = signal<Slide>(this.slides()[0]);

	// Getting the Velt Client
	client = this.veltService.clientSignal();

	constructor(
		private veltService: VeltService
	) {
		// Set Document when the velt client is initialized
		effect(() => {

			this.client = this.veltService.clientSignal();
			if (this.client) {

				// Contain your comments in a document by setting a Document ID & Name
				this.client.setDocument('slides', { documentName: 'slides' });

				// Enable dark mode for Velt UI
				this.client.setDarkMode(true);
			}
		});
	}

	selectSlide(slide: Slide) {
		this.selectedSlide.set(slide);
	}

}