module.exports = ({ body, title, initialState, isProd }) => {
  const min = isProd ? '.min' : '';
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
        <title>${title}</title>
        <link rel="stylesheet" href="/static/index.css" />
        <script src="//cdn.jsdelivr.net/react/15.5.4/react${min}.js"></script>
        <script src="//cdn.jsdelivr.net/react/15.5.4/react-dom${min}.js"></script>
      </head>

      <body>
        <div id="root">${body}</div>
      </body>

      <script src="/static/bundle.js"></script>
    </html>
  `;
};
