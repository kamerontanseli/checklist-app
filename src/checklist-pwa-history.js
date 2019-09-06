import { LitElement, html, css } from "lit-element";
import Storage from "./api/storage.js";

class ChecklistPwaHistory extends LitElement {
	static get properties() {
		return {
			reviews: { type: Array },
			loading: { type: Boolean }
		};
	}

	constructor() {
		super();
		this.api = new Storage();
		this.reviews = [];
		this.loading = true;
	}

	async connectedCallback() {
		super.connectedCallback();
		this.reviews = await this.api.getReviews();
		this.loading = false;
	}

	render() {
		return html`
			<link
				rel="stylesheet"
				href="/web_modules/cutestrap/dist/css/cutestrap.min.css"
			/>

			<h1>Your Reviews</h1>

			${this.reviews.length
				? html`
						<ul>
							${this.reviews.map(
								(review, index) =>
									html`
										<li>
											<a href="/history/${index}"
												>${review.title} -
												${new Date(review.date).toDateString()}</a
											>
										</li>
									`
							)}
						</ul>
				  `
				: this.loading
				? html`
						<p>Loading...</p>
				  `
				: html`
						<p>No reviews found</p>
				  `}
		`;
	}
}

customElements.define("checklist-pwa-history", ChecklistPwaHistory);
