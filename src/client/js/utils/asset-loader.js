
// Function which returns a function: https://davidwalsh.name/javascript-functions
const _load = tag => (
    url => (
        // This promise will be used by Promise.all to determine success or failure
        new Promise((resolve, reject) => {
            const element = document.createElement(tag);
            let parent = 'body';
            let attr = 'src';

            // Important success and error for the promise
            element.onload = () => {
                resolve(url);
            };
            element.onerror = () => {
                reject(url);
            };

            // Need to set different attributes depending on tag type
            switch (tag) {
                case 'script':
                    element.async = true;
                    break;
                case 'link':
                    element.type = 'text/css';
                    element.rel = 'stylesheet';
                    attr = 'href';
                    parent = 'head';
                    break;
                default:
            }

            // Inject into document to kick off loading
            element[attr] = url;
            document[parent].appendChild(element);
        })
    )
);

export default {
    css: _load('link'),
    js: _load('script'),
    img: _load('img'),
};

