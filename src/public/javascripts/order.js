document.addEventListener('DOMContentLoaded', function() {
    // Показываем/скрываем поле для сдачи
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const cashGroup = document.getElementById('cashGroup');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            cashGroup.style.display = this.value === 'cash' ? 'block' : 'none';
            if (this.value === 'cash') {
                document.getElementById('cashAmount').value = '';
            }
        });
    });
    
    // Валидация формы
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', function(e) {
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        const totalPrice = parseFloat('{{totalPrice}}');
        
        if (paymentMethod === 'cash') {
            const cashAmount = parseFloat(document.getElementById('cashAmount').value);
            if (isNaN(cashAmount)) {
                e.preventDefault();
                alert('Пожалуйста, укажите сумму наличных');
                return;
            }
            
            if (cashAmount < totalPrice) {
                e.preventDefault();
                alert('Сумма наличных должна быть не меньше суммы заказа');
                return;
            }
        }
    });
});