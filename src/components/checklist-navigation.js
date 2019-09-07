import { LitElement, html, css } from 'lit-element';

class ChecklistNavigation extends LitElement {
  static get properties() {
    return {
      pathname: { type: String },
    };
  }

  static get styles() {
    return css`
      .navbar {
        background-color: #eee;
        padding: 1rem;
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
      }

      .navbar > a {
        text-decoration: none;
        padding: 0 10px;
        border-right: 1px solid #ddd;
      }

      .navbar > a:first-child {
        padding-left: 0;
      }

      .navbar > a:last-child {
        border: 0;
      }

      .navbar > a.navbar--active {
        color: #585858;
      }
    `;
  }

  constructor() {
    super();
    this.pathname = location.pathname;
    this.popstateListener = () => {
      this.pathname = location.pathname;
    };
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this.popstateListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('popstate', this.popstateListener);
  }

  render() {
    let selected = null;

    if (this.pathname === '/' || this.pathname.indexOf('checklists') > -1) {
      selected = 'checklists';
    } else if (this.pathname.indexOf('history') > -1) {
      selected = 'history';
    } else if (this.pathname === '/create') {
      selected = 'create';
    }

    return html`
      <link
        rel="stylesheet"
        href="/web_modules/cutestrap/dist/css/cutestrap.min.css"
      />
      <p class="navbar">
        <a class="${selected === 'checklists' ? 'navbar--active' : ''}" href="/"
          >Checklists</a
        >
        <a
          class="${selected === 'history' ? 'navbar--active' : ''}"
          style="margin-right: auto;"
          href="/history"
          >Reviews</a
        >
        <a
          class="${selected === 'create' ? 'navbar--active' : ''}"
          href="/create"
          >+ Add New Checklist</a
        >
      </p>
    `;
  }
}

customElements.define('checklist-navigation', ChecklistNavigation);
