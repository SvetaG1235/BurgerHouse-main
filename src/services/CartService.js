document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    let cart = [];

    // Функция для обновления корзины
    function updateCart() {
        // Очищаем корзину
        cartItems.innerHTML = '';

     
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - ${item.quantity} x ${item.price} руб.
                <button class="remove-item" data-id="${item.id}">Удалить</button>
            `;
            cartItems.appendChild(li);
        });

        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotalPrice.textContent = `${totalPrice} руб.`;


        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', removeItemFromCart);
        });
    }


    function addToCart(event) {
        const product = event.target.closest('.product');
        const productId = product.dataset.id;
        const productName = product.dataset.name;
        const productPrice = parseInt(product.dataset.price, 10);

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1; // Увеличиваем количество
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
    }

    function removeItemFromCart(event) {
        const productId = event.target.dataset.id;
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
});