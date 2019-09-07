import { LitElement, html, css } from "lit-element";

class ChecklistProcedure extends LitElement {
	static get properties() {
		return {
			procedure: { attribute: true, type: String },
			"up-disabled": {
				attribute: true,
				type: Boolean,
				converter: v => v === 'true'
			},
			"down-disabled": {
				attribute: true,
				type: Boolean,
				converter: v => v === 'true'
			}
		};
	}

	static get styles() {
		return css`
			.btn--small {
				height: 2.4rem;
				padding: 0 1.5rem;
				line-height: 0;
			}

			.procedure {
				align-items: center;
				margin-bottom: 10px;
			}
		`;
	}

	constructor() {
		super();
		this.procedure = "";
		this["up-disabled"] = false;
		this["down-disabled"] = false;
	}

	onRemove() {
		let removeEvent = new CustomEvent("procedure-remove", {
			detail: {},
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(removeEvent);
	}

	onChangeDirection(direction) {
		return e => {
			let directionEvent = new CustomEvent("procedure-shift", {
				detail: { direction },
				bubbles: true,
				composed: true
			});
			this.dispatchEvent(directionEvent);
		};
	}

	render() {
		return html`
			<link
				rel="stylesheet"
				href="/web_modules/cutestrap/dist/css/cutestrap.min.css"
			/>
			<div class="grid procedure">
				<div class="column--heavy">
					<p style="padding: 0;">${this.procedure}</p>
				</div>
				<div class="grid ta-right">
					<div class="column">
						<button
							type="button"
							@click="${this.onRemove}"
							class="btn--secondary btn--small"
						>
							x
						</button>
					</div>
					<div class="column">
						<button
							type="button"
							@click="${this.onChangeDirection("up")}"
							?disabled="${this["up-disabled"]}"
							class="btn--secondary btn--small"
						>
							&uarr;
						</button>
					</div>
					<div class="column">
						<button
							type="button"
							@click="${this.onChangeDirection("down")}"
							?disabled="${this["down-disabled"]}"
							class="btn--secondary btn--small"
						>
							&darr;
						</button>
					</div>
				</div>
			</div>
		`;
	}
}

customElements.define("checklist-procedure", ChecklistProcedure);
