export default class Section {
    constructor({api, renderer}, containerSelector) {
        this._api = api;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._container.innerHTML = "";
        this._api.getInitialCards()
            .then((res) => {
                res.sort((a, b) => {
                    if (a.createdAt > b.createdAt) {
                        return 1;
                    }
                    if (a.createdAt < b.createdAt) {
                        return -1;
                    }
                    return 0;
                });
                res.forEach(item => this._renderer(item));
            })
            .catch((err) => {
                console.log(err);
            });

    }

    addItem(element) {
        this._container.prepend(element);
    }
}