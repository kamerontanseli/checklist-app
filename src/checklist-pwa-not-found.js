import { LitElement, html, css } from "lit-element";
import Storage from "./api/storage.js";

class ChecklistPwaNotFound extends LitElement {
	render() {
		return html`
			<link rel="stylesheet" href="/web_modules/cutestrap/dist/css/cutestrap.min.css" />
			<h1>Page Not Found</h1>

			<p>
				<a href="/">Go Back</a>
			</p>
		`;
	}
}

customElements.define("checklist-pwa-not-found", ChecklistPwaNotFound);
