import { LitElement, html, css } from "lit-element";
import { Router } from "@vaadin/router";

class ChecklistPwaApp extends LitElement {
  firstUpdated() {
    const router = new Router(this.shadowRoot.getElementById("outlet"));

    router.setRoutes([
      {
        path: "/",
        component: "checklist-pwa-list",
        action: () => {
          import("./checklist-pwa-list.js");
        }
      },
      {
        path: "/create",
        component: "checklist-pwa-create",
        action: () => {
          import("./checklist-pwa-create.js");
        }
      },
      {
        path: "/checklists/:id",
        component: "checklist-pwa-detail",
        action: () => {
          import("./checklist-pwa-detail.js");
        }
      },
      {
        path: "/checklists/edit/:id",
        component: "checklist-pwa-edit",
        action: () => {
          import("./checklist-pwa-edit.js");
        }
      },
      {
        path: "/history",
        component: "checklist-pwa-history",
        action: () => {
          import("./checklist-pwa-history.js");
        }
      },
      {
        path: "/history/:id",
        component: "checklist-pwa-history-detail",
        action: () => {
          import("./checklist-pwa-history-detail.js");
        }
      },
      {
        path: '(.*)', 
        component: "checklist-pwa-not-found",
        action: () => {
          import("./checklist-pwa-not-found.js");
        }
      },
    ]);
  }

  render() {
    return html`
      <link rel="stylesheet" href="/web_modules/cutestrap/dist/css/cutestrap.min.css" />
      <div class="wrapper-small">
        <p>
          <a href="/create">Add a checklist</a> | <a href="/">Checklists</a> | <a href="/history">Reviews</a>
        </p>
        <div id="outlet"></div>
      </div>
    `;
  }
}

customElements.define("checklist-pwa-app", ChecklistPwaApp);
