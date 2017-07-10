module.exports = ({ body, title, initialState, isProd }) => {
  const cdnjs = '//cdnjs.cloudflare.com/ajax/libs';
  const min = isProd ? '.min' : '';
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
        <title>${title}</title>
        <link rel="stylesheet" href="/static/index.css" />
        <script src="${cdnjs}/react/15.6.1/react${min}.js"></script>
        <script src="${cdnjs}/react/15.6.1/react-dom${min}.js"></script>
      </head>

      <body>
        <div id="root">${body}</div>
      </body>

      <script src="/static/bundle.js"></script>
    </html>
  `;
};
