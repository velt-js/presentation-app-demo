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
		// Initialize selectedSlide to the first slide
		this.selectedSlide.set(this.slides()[0]);

		// Set Document when the velt client is initialized
		effect(() => {

			this.client = this.veltService.clientSignal();

			this.client?.setLocation({ id: String(this.selectedSlide().id), locationName: "Slide " + (this.selectedSlide().id) })

			if (this.client) {

				// Contain your comments in a document by setting a Document ID & Name
				this.client.setDocument('slides', { documentName: 'slides' });

				// Enable dark mode for Velt UI
				this.client.setDarkMode(true);

				// When comment is clicked in sidebar we set the active slide
				const sidebar = document.querySelector('velt-comments-sidebar');
				sidebar?.addEventListener("onCommentClick", (e: any) => {
					const id = Number(e.detail.location.id)
					this.selectedSlide.set(this.slides()[id - 1])
					
					// Set location based on selected comment slide id
					this.client?.setLocation({ id: String(this.selectedSlide().id) })
				})

				// Only Allow Commenting on the selected slide
				this.client?.getCommentElement().allowedElementClassNames(['slide-view'])

			}
		});
	}

	selectSlide(slide: Slide) {
		this.selectedSlide.set(slide);
		this.client?.setLocation({ id: String(slide.id), locationName: "Slide " + (slide.id) })
	}

}