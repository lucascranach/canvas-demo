const metaDataHeader = require('./components/meta-data-head.11ty.js');
const imageData = require('./components/image-data.11ty.js');

exports.render = (data) => {

  const headerData = {
    content: {
      metadata: {
        "title": "Canvas"
      }
    }
  }

  const metaDataHead = metaDataHeader.getHeader(headerData);
  const paintingData = imageData.getImageData(this, data, "de");

  return `<!doctype html> 
  <html lang="">
    <head>
      <title>cda :: Canvas</title>
      ${metaDataHead}
      <link href="${this.url('/compiled-assets/main.css')}" rel="stylesheet">
      <script type="importmap">
        {
          "imports": {
            "three": "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js",
            "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/"
          }
        }
      </script>
      <script>
        const paintings = '${JSON.stringify(paintingData.paintings)}';
      </script>

    </head>
    <body>

      <main>
              ${data.content}
      </main>
      <script src="${this.url('/assets/scripts/canvas.js')}" type="module"></script>
    </body>
  </html>`;
};


