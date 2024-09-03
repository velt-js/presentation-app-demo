import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DocumentComponent } from './component/document/document.component';
import { VeltService } from './services/velt.service';
import { AuthService } from './services/auth.service';
import { ToolbarComponent } from "./component/toolbar/toolbar.component";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, DocumentComponent, ToolbarComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
	title = 'slides';

	constructor(
		private veltService: VeltService,
		private authService: AuthService,
	) { }

	async ngOnInit(): Promise<void> {
		// Follow the Setup Guide for more info: https://docs.velt.dev/get-started/setup/install

		await this.veltService.initializeVelt('AN5s6iaYIuLLXul0X4zf');

		const user = this.authService.getUser()(); // Getting Random User
		if (user) {
			await this.veltService.identifyUser(user);
		}

		await this.veltService.setDocument('slides', { documentName: 'slides' });
		this.veltService.setDarkMode(true);
	}
}
