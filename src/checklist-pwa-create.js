import { LitElement, html, css } from "lit-element";
import { Router } from "@vaadin/router";
import Storage from "./api/storage.js";
import "./components/checklist-procedure-form.js";

class ChecklistPwaCreate extends LitElement {
	static get properties() {
		return {
			checklists: { type: Array },
			title: { type: String },
			description: { type: String },
			procedure: { type: Array }
		};
	}

	constructor() {
		super();
		this.api = new Storage();
		this.checklists = [];
		this.title = "";
		this.description = "";
		this.procedure = [];
	}

	async requestUpdate() {
		this.checklists = await this.api.getChecklists();
	}

	changeProperty(key) {
		return e => {
			this[key] = e.currentTarget.value;
		};
	}

	updateProcedures(e) {
		this.procedure = e.detail.procedure;
	}

	async handleSubmit(e) {
		if (this.title.length && this.procedure.length) {
			await this.api.addChecklist({
				title: this.title,
				description: this.description,
				procedure: this.procedure.map(action => ({
					completed: false,
					action
				}))
			});

			Router.go("/");
		}
	}

	render() {
		return html`
			<link
				rel="stylesheet"
				href="/node_modules/cutestrap/dist/css/cutestrap.min.css"
			/>

			<h1>Create A Checklist</h1>

			<form @onsubmit="${e => e.preventDefault()}">
				<label class="textfield">
					<input
						.value="${this.title}"
						@change="${this.changeProperty("title")}"
						type="text"
					/>
					<span class="textfield__label">Title</span>
				</label>
				<label class="textfield">
					<textarea
						.value="${this.description}"
						@change="${this.changeProperty("description")}"
					></textarea>
					<span class="textfield__label">Description</span>
				</label>

				<checklist-procedure-form
					@procedure-update="${this.updateProcedures}"
				></checklist-procedure-form>

				<br />
				<span>
					<button
						.disabled="${!(this.title.length && this.procedure.length)}"
						type="button"
						@click="${this.handleSubmit}"
					>
						Create
					</button>
				</span>
				<a href="/" class="btn btn--link">Go Back</a>
			</form>
		`;
	}
}

customElements.define("checklist-pwa-create", ChecklistPwaCreate);
