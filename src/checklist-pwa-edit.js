import { LitElement, html, css } from "lit-element";
import { Router } from "@vaadin/router";
import Storage from "./api/storage.js";
import "./components/checklist-procedure-form.js";

class ChecklistPwaEdit extends LitElement {
	static get properties() {
		return {
			title: { type: String },
			description: { type: String },
			procedure: { type: Array }
		};
	}

	constructor() {
		super();
		this.api = new Storage();
		this.title = "";
		this.description = "";
		this.procedure = [];
	}

	async connectedCallback() {
		super.connectedCallback();
		const result = await this.api.getChecklists();
		const id = Number(this.location.params.id);
		const checklist = result[id];
		this.loading = false;

		if (!checklist) {
			Router.go("/404");
		}


		this.title = checklist.title;
		this.description = checklist.description;
		this.procedure = checklist.procedure.map(p => p.action);
	}

	changeProperty(key) {
		return e => {
			this[key] = e.currentTarget.value;
		};
	}

	updateProcedures(e) {
		console.log(e.detail.procedure)
		this.procedure = e.detail.procedure;
	}

	async handleSubmit(e) {
		if (this.title.length && this.procedure.length) {
			await this.api.editChecklist(Number(this.location.params.id), {
				title: this.title,
				description: this.description,
				procedure: this.procedure.map(action => ({
					completed: false,
					action
				}))
			});

			Router.go(`/checklists/${this.location.params.id}`);
		}
	}

	async deleteChecklist() {
		if (confirm('Are you sure?')) {
			const id = Number(this.location.params.id);
			this.loading = true;
			await this.api.deleteChecklist(id);
			Router.go("/");
		}
	}

	render() {
		return html`
			<link
				rel="stylesheet"
				href="/web_modules/cutestrap/dist/css/cutestrap.min.css"
			/>

			<h1>Edit A Checklist</h1>

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
					procedure="${JSON.stringify(this.procedure)}"
					@procedure-update="${this.updateProcedures}"
				></checklist-procedure-form>

				<br />
				<span>
					<button
						.disabled="${!(this.title.length && this.procedure.length)}"
						type="button"
						@click="${this.handleSubmit}"
					>
						Save
					</button>
				</span>
				<span>
					<button
						class="btn btn--secondary"
						type="button"
						@click="${this.deleteChecklist}"
					>
						Delete
					</button>
				</span>
				<a href="/" class="btn btn--link">Go Back</a>
			</form>
		`;
	}
}

customElements.define("checklist-pwa-edit", ChecklistPwaEdit);
