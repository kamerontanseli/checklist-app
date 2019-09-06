import { LitElement, html, css } from "lit-element";
import { Router } from "@vaadin/router";
import Storage from "./api/storage.js";
import "./components/checklist-progress-bar.js";

class ChecklistPwaDetail extends LitElement {
	static get properties() {
		return {
			checklist: { type: Object },
			loading: { type: Boolean },
			progress: { type: Number }
		};
	}

	constructor() {
		super();
		this.api = new Storage();
		this.checklist = {};
		this.loading = true;
		this.progress = 0;
	}

	async connectedCallback() {
		super.connectedCallback();
		const result = await this.api.getChecklists();
		const id = Number(this.location.params.id);
		this.loading = false;
		this.checklist = result[id];

		if (!this.checklist) {
			Router.go("/404");
		} else {
			this.progress = this.getProgress();
		}
	}

	async createReview() {
		this.loading = true;
		const id = await this.api.addReviewal({ 
			...this.checklist, 
			progress: this.progress,
			date: Date.now()
		});
		Router.go(`/history/${id}`);
	}

	toggleProcedure(index) {
		return e => {
			const clone = this.checklist.procedure.slice();
			const object = clone[index];
			object.completed = !object.completed;
			this.checklist.procedure = clone;
			this.progress = this.getProgress();
		};
	}

	getProgress() {
		const array = this.checklist.procedure;
		const completed = array.filter(p => p.completed).length;
		const total = array.length;
		return (completed / total) * 100;
	}

	render() {
		return html`
			<link
				rel="stylesheet"
				href="/web_modules/cutestrap/dist/css/cutestrap.min.css"
			/>
			${this.loading || !this.checklist
				? html`
						<p>Loading...</p>
				  `
				: html`
						<h1>${this.checklist.title}</h1>
						${this.checklist.description.length
							? html`
									<p>${this.checklist.description}</p>
							  `
							: ""}
						<div class="grid">
							<div class="column--heavy">
								<checklist-progress-bar
									progress="${this.progress}"
								></checklist-progress-bar>
							</div>
							<div class="column ta-right">${this.progress.toFixed(0)}%</div>
						</div>
						${this.checklist.procedure.map(
							(item, index) =>
								html`
									<div>
										<label class="checkbox">
											<input
												@click=${this.toggleProcedure(index)}
												type="checkbox"
												.checked="${item.completed}"
											/>
											<span class="checkbox__label">${item.action}</span>
										</label>
									</div>
								`
						)}
						<button @click="${this.createReview}" class="btn">Finish</button>
						<a href="/checklists/edit/${this.location.params.id}" class="btn btn--secondary">Edit</a>
						<a href="/" class="btn btn--link">Cancel</a>
				  `}
		`;
	}
}

customElements.define("checklist-pwa-detail", ChecklistPwaDetail);
