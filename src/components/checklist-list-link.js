import { LitElement, html, css } from 'lit-element';

class ChecklistListLink extends LitElement {
  static get styles() {
    return css`
      .list-link {
        padding: 10px;
        margin-bottom: 10px;
        background-color: #eee;
      }

      .list-link ::slotted(a) {
        text-decoration: none;
      }
    `;
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="/web_modules/cutestrap/dist/css/cutestrap.min.css"
      />
      <div class="list-link">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('checklist-list-link', ChecklistListLink);
