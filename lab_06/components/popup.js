class QuotePopup extends HTMLElement {
    show(quote) {
        this.innerHTML = `
            <div style="position:fixed; top:20%; left:30%; background:white; padding:20px; border:1px solid black;">
                <p>${quote.quote}</p>
                <p><b>${quote.author}</b></p>
                <button id="add">Додати в обране</button>
                <button id="close">Закрити</button>
            </div>
        `;

        document.getElementById('close').onclick = () => this.innerHTML = '';

        document.getElementById('add').onclick = () => {
            document.querySelector('favorite-list').add(quote);
        };
    }
}

customElements.define('quote-popup', QuotePopup);