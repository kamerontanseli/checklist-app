import { LitElement, html, css } from "lit-element";

class ChecklistProcedureForm extends LitElement {
	static get properties() {
		return {
			procedure: { type: Array },
			procedureText: { type: String }
		};
	}

	static get styles() {
		return css`
			.btn--small {
				height: 2.4rem;
				padding: 0 1.5rem;
				line-height: 0;
			}
		`;
	}

	constructor() {
		super();
		this.procedureText = "";
		this.procedure = [];
	}

	changeProperty(key) {
		return e => {
			this[key] = e.currentTarget.value;
		};
	}

	triggerUpdate() {
		let myEvent = new CustomEvent("procedure-update", {
			detail: { procedure: this.procedure },
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(myEvent);
	}

	createProcedure() {
		if (this.procedureText.length) {
			this.procedure.push(this.procedureText);
			this.procedureText = "";
			this.triggerUpdate();
		}
	}

	removeProcedure(index) {
		return e => {
			this.procedure = this.procedure.filter((_, i) => i !== index);
			this.triggerUpdate();
		};
	}

	changeDirection(index, direction) {
		return e => {
			const isValidForUp = direction === "up" && index > 0;
			const isValidForDown =
				direction === "down" && index < this.procedure.length - 1;

			if (isValidForUp || isValidForDown) {
				const clone = this.procedure.slice();
				const newIndex = index + (direction === "up" ? -1 : 1);
				let temp = clone[index];
				clone[index] = clone[newIndex];
				clone[newIndex] = temp;
				this.procedure = clone;
			}
		};
	}

	render() {
		return html`
			<link
				rel="stylesheet"
				href="/web_modules/cutestrap/dist/css/cutestrap.min.css"
			/>
			<fieldset>
				<legend><h3>Procedure</h3></legend>
				<div class="grid">
					<div class="column--heavy">
						<label class="textfield">
							<input
								.value="${this.procedureText}"
								id="procedureText"
								@change="${this.changeProperty("procedureText")}"
								type="text"
							/>
							<span class="textfield__label">Title</span>
						</label>
					</div>
					<div>
						<button
							@click="${this.createProcedure}"
							type="button"
							class="btn--secondary"
							.disabled="${this.procedureText.length < 1}"
						>
							+
						</button>
					</div>
				</div>
				${this.procedure.map(
					(item, index, arr) =>
						html`
							<div
								class="grid"
								style="align-items: center; margin-bottom: 10px;"
							>
								<div class="column--heavy">
									<p style="padding: 0;">${item}</p>
								</div>
								<div class="grid">
									<div class="column">
										<button
											type="button"
											@click="${this.removeProcedure(index)}"
											class="btn--secondary btn--small"
										>
											x
										</button>
									</div>
									<div class="column">
										<button
											type="button"
											@click="${this.changeDirection(index, "up")}"
											.disabled="${index === 0}"
											class="btn--secondary btn--small"
										>
											&uarr;
										</button>
									</div>
									<div class="column">
										<button
											type="button"
											@click="${this.changeDirection(index, "down")}"
											.disabled="${index === arr.length - 1}"
											class="btn--secondary btn--small"
										>
											&darr;
										</button>
									</div>
								</div>
							</div>
						`
				)}
			</fieldset>
		`;
	}
}

customElements.define("checklist-procedure-form", ChecklistProcedureForm);
