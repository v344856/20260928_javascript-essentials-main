# 22. DOM Events, Delegation, and Styling

One page that renders a color list from data and then handles everything that happens to it. It builds each `<li>` with `createElement` and stamps its id onto the element with `dataset`, then handles the form's `submit` event, calling `preventDefault()` so the page does not reload, reading the field through `form.elements`, and appending the new item. From there it wires **one** click listener on the list rather than one per item: the log shows the event traveling down through the capture phase and back up through the bubble phase, and the difference between `event.target` (what was clicked) and `event.currentTarget` (what the listener is attached to), which is the difference that makes delegation work, including for items added after the listener was attached. Selecting an item then restyles it three ways: `classList` add/remove/contains, an inline `.style` assignment, and a read-only `getComputedStyle` check.

## Run

```bash
npx http-server -o
```

Open the browser DevTools console (press **F12**), click a color, and submit the form to add another, then click the new one to confirm the single listener already handles it.

This folder is its own project: run `npm install` once,
then `npm run format` formats it with the Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- Rendering a list from an array of objects with `createElement` and `appendChild`.
- Storing per-element data in `dataset` (a `data-*` attribute) and reading it back.
- Handling `submit` with `preventDefault()` and reading fields via `form.elements`.
- Event delegation: one listener on the container serving every item, now and later.
- The capture and bubble phases of a single click, and `event.target` versus `event.currentTarget`.
- Restyling with `classList` (`add`/`remove`/`contains`), the preferred approach, since the rules stay in CSS.
- Setting inline styles through `.style`, and why CSS names become camelCase.
- Reading the browser's final applied values with `getComputedStyle`.

## Related reading

- [DOM Event Handling](../../docs/Module-07-The-DOM/06-dom-event-handling.md)
- [Manipulating Elements](../../docs/Module-07-The-DOM/05-dom-manipulating-elements.md)
- [Element Styling with JavaScript](../../docs/Module-07-The-DOM/07-dom-element-styling.md)
- Diagram: [The DOM Event Path and Delegation](../../diagrams/png/dom-event-path.png)
