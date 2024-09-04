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

	// Schemas are required to add Velt html tags
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
	title = 'slides';

	constructor(
		private veltService: VeltService,
		private authService: AuthService,
	) { }

	async ngOnInit(): Promise<void> {
		
		// Initialize Velt with the API key
		await this.veltService.initializeVelt('AN5s6iaYIuLLXul0X4zf');

		// Identify the current user if authenticated
		const user = this.authService.userSignal();
		if (user) {
			await this.veltService.identifyUser(user);
		}
	}
}
