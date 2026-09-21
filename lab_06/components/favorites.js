class FavoriteList extends HTMLElement {
    constructor() {
        super();
        this.items = [];
    }

    add(quote) {
        this.items.push(quote);
        this.render();
    }

    render() {
    this.innerHTML = `
        <div class="card mt-4 shadow">
            <div class="card-body">
                <h4 class="card-title">Обране</h4>
                <ul class="list-group">
                    ${this.items.map(q => `
                        <li class="list-group-item">
                            ${q.quote} — <b>${q.author}</b>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
}
}

customElements.define('favorite-list', FavoriteList);