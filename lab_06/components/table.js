class QuoteTable extends HTMLElement {
    setData(data) {
        this.data = data;
        this.render();
    }

    render() {
    this.innerHTML = `
        <table class="table table-striped table-hover shadow">
            <thead class="table-primary">
                <tr>
                    <th>Цитата</th>
                    <th>Автор</th>
                </tr>
            </thead>
            <tbody>
                ${this.data.map(q => `
                    <tr data-id="${q.id}">
                        <td>${q.quote}</td>
                        <td>${q.author}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    this.querySelectorAll('tr[data-id]').forEach(row => {
        row.addEventListener('click', () => {
            const id = row.dataset.id;
            const quote = this.data.find(q => q.id == id);

            document.querySelector('quote-popup').show(quote);
        });
    });
}
}

customElements.define('quote-table', QuoteTable);