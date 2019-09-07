import { LitElement, html, css } from 'lit-element';
import Storage from './api/storage.js';
import './components/checklist-list-link.js';

class ChecklistPwaList extends LitElement {
  static get properties() {
    return {
      checklists: { type: Array },
      loading: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.api = new Storage();
    this.checklists = [];
    this.loading = true;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.checklists = await this.api.getChecklists();
    this.loading = false;
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="/web_modules/cutestrap/dist/css/cutestrap.min.css"
      />

      <h1>Your Checklists</h1>

      ${this.checklists.length
        ? html`
            ${this.checklists.map(
              (checklist, index) =>
                html`
                  <checklist-list-link>
                    <a href="/checklists/${index}">${checklist.title}</a>
                  </checklist-list-link>
                `
            )}
          `
        : this.loading
        ? html`
            <p>Loading...</p>
          `
        : html`
            <p>No checklists found</p>
          `}
    `;
  }
}

customElements.define('checklist-pwa-list', ChecklistPwaList);
