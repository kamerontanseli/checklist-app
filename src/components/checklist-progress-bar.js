import { LitElement, html, css } from 'lit-element';

class ChecklistProgressBar extends LitElement {
  static get properties() {
    return {
      progress: { type: Number, attribute: true },
    };
  }

  static get styles() {
    return css`
      progress {
        width: 100%;
        margin-bottom: 20px;
        -webkit-appearance: none;
        appearance: none;
      }

      progress[value]::-webkit-progress-bar {
        background-color: #eee;
        border-radius: 20px;
      }

      progress[value]::-webkit-progress-value {
        border-radius: 20px;
        background-color: #e83fb8;
      }
    `;
  }

  constructor() {
    super();
    this.progress = 0;
  }

  render() {
    return html`
      <progress min="0" max="100" .value="${this.progress}"></progress>
    `;
  }
}

customElements.define('checklist-progress-bar', ChecklistProgressBar);
