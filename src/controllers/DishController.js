import DishService from '../services/DishService.js';

class DishController {
    static async getAllDishes() {  
        try {
            const dishes = await DishService.getAllDishes();
            return dishes;  
        } catch (error) {
            throw error;  
        }
    }

    static async addDish(req, res) {
        try {
            const dish = await DishService.addDish(req.body);
            res.status(201).json(dish);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getDishById(req, res) {
        try {
            const dish = await DishService.getDishById(req.params.id);
            res.status(200).json(dish);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async updateDish(req, res) {
        try {
            const dish = await DishService.updateDish(req.params.id, req.body);
            res.status(200).json(dish);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteDish(req, res) {
        try {
            await DishService.deleteDish(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async addAllDishes(req, res) {
        try {
            const dishes = await DishService.addAllDishes();
            res.status(201).json(dishes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

        
    static async renderMenu(req, res) {
        try {
            const dishes = await DishService.getAllDishes();
            
            const menuData = {};
            dishes.forEach(dish => {
                if (!menuData[dish.dish_category]) {
                    menuData[dish.dish_category] = [];
                }
                menuData[dish.dish_category].push(dish);
            });
    
            let cartItems = {};
            let cartCount = 0;
            
            if (req.session.user) {
                try {
                    const cartData = await CartService.getFullCartData(req.session.user.id);
                    cartData.forEach(item => {
                        cartItems[item.dishId] = item.quantity;
                    });
                    cartCount = await CartService.getCartCount(req.session.user.id);
                } catch (error) {
                    console.error('Cart service error:', error);
                }
            }
    
            res.render('Web App Burger house', {
                menuData: Object.entries(menuData),
                cartItems: cartItems || {}, // Гарантируем что cartItems всегда объект
                isAuthenticated: !!req.session.user,
                user: req.session.user || null, // Гарантируем что user всегда определен
                cartCount: cartCount
            });
        } catch (error) {
            console.error('Menu render error:', error);
            res.status(500).render('error', { message: 'Ошибка загрузки меню' });
        }
    }
}
export default DishController;
