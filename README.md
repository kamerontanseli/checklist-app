# Checklists

An app to help you manage standard operating procedures for your everyday life. Built without Webpack etc. Uses [LitElement](https://lit-element.polymer-project.org), [kv-storage](https://css-tricks.com/kv-storage/), [@vaadin/router](https://vaadin.com/router) and [cutestrap](https://cutestrap.com) ([inspired by this article](https://css-tricks.com/going-buildless/)).

## Setting up

After cloning the repo, you should run

```
npm install
```

After installing you should see a postinstall hook run `@pika/web`.

## Running the app

To start the server, simply run

```
npm start
```

## Improvements

[ ] Isolate CSS logic to specific components (i.e: don't load the entire 7kb CSS framework in every page)

[ ] Preload app with defaults such as the [Front End Checklist](https://github.com/thedaviddias/Front-End-Checklist) and the [React Checklist](https://blog.jakoblind.no/checklist-for-reviewing-your-own-react-code/)

[ ] Improve icon and branding