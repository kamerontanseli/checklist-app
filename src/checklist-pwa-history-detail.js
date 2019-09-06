import { LitElement, html, css } from "lit-element";
import { Router } from "@vaadin/router";
import Storage from "./api/storage.js";
import "./components/checklist-progress-bar.js";

class ChecklistPwaHistoryDetail extends LitElement {
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
		const result = await this.api.getReviews();
		const id = Number(this.location.params.id);
		this.loading = false;
		this.checklist = result[id];

		if (!this.checklist) {
			Router.go("/404");
		} else {
			this.progress = this.getProgress();
		}
	}

	async deleteReview() {
		if (confirm('Are you sure?')) {
			const id = Number(this.location.params.id);
			this.loading = true;
			await this.api.deleteReview(id);
			Router.go("/history");
		}
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
				: (() => {
						const { title, date, description, procedure } = this.checklist;

						return html`
							<h1>${title}</h1>

							<p>
								<time datetime="${new Date(date).toISOString()}"
									>${new Date(date).toDateString()}</time
								>${description.length ? ` - ${description}` : ""}
							</p>

							<div class="grid">
								<div class="column--heavy">
									<checklist-progress-bar
										progress="${this.progress}"
									></checklist-progress-bar>
								</div>
								<div class="column ta-right">${this.progress}%</div>
							</div>
							${procedure.map(
								(item, index) =>
									html`
										<div>
											<label class="checkbox">
												<input
													disabled
													type="checkbox"
													.checked="${item.completed}"
												/>
												<span class="checkbox__label">${item.action}</span>
											</label>
										</div>
									`
							)}
							<button @click="${this.deleteReview}" class="btn btn--secondary">
								Delete
							</button>
							<a href="/history" class="btn btn--link">Go Back</a>
						`;
				  })()}
		`;
	}
}

customElements.define(
	"checklist-pwa-history-detail",
	ChecklistPwaHistoryDetail
);
