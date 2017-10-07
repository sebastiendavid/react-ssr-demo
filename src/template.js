module.exports = ({ body, title, initialState, isProd, version }) => {
  const cdn = '//cdn.jsdelivr.net/npm';
  const min = isProd ? '.production.min' : '.development';
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
        <title>${title}</title>
        <link rel="stylesheet" href="/static/index.css" />
        <script src="${cdn}/react@${version.react}/umd/react${min}.js"></script>
        <script src="${cdn}/react-dom@${version.react}/umd/react-dom${min}.js"></script>
      </head>

      <body>
        <div id="root">${body}</div>
      </body>

      <script src="/static/bundle.js"></script>
    </html>
  `;
};
