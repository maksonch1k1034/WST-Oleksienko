document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.btn-action');
    const input = document.querySelector('.input-field');
    const message = document.querySelector('.action-message');
    const orderList = document.getElementById('order-list');

    button.addEventListener('click', function() {
        const text = input.value.trim();

        if (text !== '') {
            const emptyText = orderList.querySelector('.empty-list-text');
            if (emptyText) {
                emptyText.style.display = 'none';
            }

            message.textContent = 'Додано до кошика!';
            message.style.color = '#2e7d32';
            message.style.display = 'block';

            const newItem = document.createElement('div');
            newItem.className = 'order-item';

            const itemText = document.createElement('span');
            itemText.textContent = text;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete';
            deleteBtn.textContent = 'Видалити';

            deleteBtn.addEventListener('click', function() {
                newItem.remove();
                if (orderList.querySelectorAll('.order-item').length === 0) {
                    if (emptyText) emptyText.style.display = 'block';
                }
            });

            newItem.appendChild(itemText);
            newItem.appendChild(deleteBtn);
            orderList.appendChild(newItem);

            input.value = '';
        } else {
            message.textContent = 'Будь ласка, введіть назву напою.';
            message.style.color = '#d32f2f';
            message.style.display = 'block';
        }

        setTimeout(function() {
            message.style.display = 'none';
        }, 3000);
    });
});