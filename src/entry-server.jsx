import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

// Used only at build time by scripts/prerender.mjs to bake the page into
// dist/index.html, so crawlers that do not run JavaScript still see the text.
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
