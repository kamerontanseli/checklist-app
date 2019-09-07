import { LitElement, html } from "lit-element";
import "./checklist-procedure.js";

class ChecklistProcedureForm extends LitElement {
  static get properties() {
    return {
      procedure: { type: Array },
      procedureText: { type: String }
    };
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
    return () => {
      this.procedure = this.procedure.filter((_, i) => i !== index);
      this.triggerUpdate();
    };
  }

  changeDirection(index) {
    return ({ detail }) => {
      const { direction } = detail;
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
    }
  }

  render() {
    const procedures = this.procedure.map(
      (item, index, arr) =>
        html`
          <checklist-procedure
            @procedure-remove="${this.removeProcedure(index)}"
            @procedure-shift="${this.changeDirection(index)}"
            down-disabled="${index === arr.length - 1}"
            up-disabled="${index === 0}"
            procedure="${item}"
          >
          </checklist-procedure>
        `
    );

    return html`
      <link
        rel="stylesheet"
        href="/web_modules/cutestrap/dist/css/cutestrap.min.css"
      />
      <fieldset>
        <legend><h3>Procedure</h3></legend>
        <div class="grid">
          <div class="column--heavy" style="flex-grow: 25;">
            <label class="textfield">
              <textarea
                .value="${this.procedureText}"
                id="procedureText"
                @change="${this.changeProperty("procedureText")}"
              ></textarea>
              <span class="textfield__label">Action</span>
            </label>
          </div>
          <div class="ta-right">
            <button
              @click="${this.createProcedure}"
              type="button"
              class="btn--secondary"
            >
              +
            </button>
          </div>
        </div>
        ${procedures}
      </fieldset>
    `;
  }
}

customElements.define("checklist-procedure-form", ChecklistProcedureForm);
