import Dish from '../models/DishModel.js';

class DishService {
    static async getAllDishes() {
        try {
            const dishes = await Dish.findAll();
            return dishes;
        } catch (error) {
            throw new Error(`Ошибка при получении блюд: ${error.message}`);
        }
    }

    static async addDish(dishData) {
        try {
            if (!dishData.name || !dishData.price || !dishData.dish_category) {
                throw new Error('Необходимо указать название, цену и категорию блюда');
            }
            return await Dish.create(dishData);
        } catch (error) {
            throw new Error(`Ошибка при добавлении блюда: ${error.message}`);
        }
    }

    static async deleteDish(id) {
        try {
            const dish = await Dish.findByPk(id);
            if (!dish) {
                throw new Error('Блюдо не найдено');
            }
            await dish.destroy();
        } catch (error) {
            throw new Error(`Ошибка при удалении блюда: ${error.message}`);
        }
    }

    static async updateDish(id, dishData) {
        try {
            const dish = await Dish.findByPk(id);
            if (!dish) {
                throw new Error('Блюдо не найдено');
            }
            return await dish.update(dishData);
        } catch (error) {
            throw new Error(`Ошибка при обновлении блюда: ${error.message}`);
        }
    }

    static async addAllDishes() {
        try {
            const dishes = [
                {
                    id: 1,
                    name: "Classic говядина",
                    dish_category: "Бургеры Говядина",
                    price: 479,
                    calories: 650,
                    description: "Булочка, котлета, сыр чеддер, маринованые огурчики, лук, салат соус 'русский', 340 грамм",
                },
                {
                    id: 2,
                    name: "El diablo",
                    dish_category: "Бургеры Говядина",
                    price: 509,
                    calories: 650,
                    description: "Булочка, котлета, сыр чеддер, бекон, перец халапеньо, лук, салат, майонез, соус барбекю, 340 грамм"
                },
                {
                    id: 3,
                    name: "Черный ловелас",
                    dish_category: "Бургеры Говядина",
                    price: 509,
                    calories: 650,
                    description: "Булочка черная, котлета, яйцо, бекон, перец халапеньо, томат, салат, майонез, дижонская горчица, 360 грамм"
                },
                {
                    id: 4,
                    name: "American boy",
                    dish_category: "Бургеры Говядина",
                    price: 479,
                    calories: 650,
                    description: "Булочка, котлета, сыр чеддер, салат айсберг, пекинская капуста, лук, соус тар-тар, кетчуп, 360 грамм"
                },
                {
                    id: 5,
                    name: "Лесник",
                    dish_category: "Бургеры Говядина",
                    price: 499,
                    calories: 650,
                    description: "Булочка, котлета, сыр чеддер, салат, шампиньоны, маринованные огурчики, соус тар-тар, кетчуп, 340 грамм"
                },
                {
                    id: 6,
                    name: "Большой Бен",
                    dish_category: "Бургеры Говядина",
                    price: 719,
                    calories: 650,
                    description: "Булочка, двойная котлета, сыр чеддер, маринованые огурчики, лук, салат соус 'русский', 490 грамм"
                },
                {
                    id: 7,
                    name: "Classic свинина",
                    dish_category: "Бургеры Свинина",
                    price: 399,
                    calories: 650,
                    description: "Булочка, котлета, сыр чеддер, маринованые огурчики, лук, салат соус 'русский', 340 грамм"
                },
                {
                    id: 8,
                    name: "Пират",
                    dish_category: "Бургеры Свинина",
                    price: 379,
                    calories: 650,
                    description: "Булочка, котлета, бекон, огурец, салат айсберг, майонез соус спайси, 320 грамм"
                },
                {
                    id: 9,
                    name: "Фермер Джек",
                    dish_category: "Бургеры Свинина",
                    price: 389,
                    calories: 650,
                    description: "Булочка, котлета, сыр чеддер, томат, лук, салат айсберг, пекинская капуста, соус тар-тар, соус барбекю, 360 грамм"
                },
                {
                    id: 10,
                    name: "Чемпион",
                    dish_category: "Бургеры Свинина",
                    price: 609,
                    calories: 650,
                    description: "Булочка, двойная котлета, сыр чеддер, маринованые огурчики, лук, салат соус 'русский', 490 грамм"
                },
                {
                    id: 11,
                    name: "Classic курица",
                    dish_category: "Бургеры Курица",
                    price: 379,
                    calories: 650,
                    description: "Булочка, котлета, сыр чеддер, маринованые огурчики, лук, салат соус 'русский', 340 грамм"
                },
                {
                    id: 12,
                    name: "Fresh burger",
                    dish_category: "Бургеры Курица",
                    price: 479,
                    calories: 650,
                    description: "Булочка, котлета, томат, огурец, салат, майонез, соус тар-тар, 310 грамм"
                },
                {
                    id: 13,
                    name: "Черный русский",
                    dish_category: "Бургеры Курица",
                    price: 479,
                    calories: 650,
                    description: "Булочка черная, котлета, яйцо, сыр чеддер, лук, пекинская капуста, салат, соус 'русский', 380 грамм"
                },
                {
                    id: 14,
                    name: "Big boss",
                    dish_category: "Бургеры Курица",
                    price: 579,
                    calories: 650,
                    description: "Булочка, двойная котлета, сыр чеддер, маринованые огурчики, лук, салат соус 'русский', 490 грамм"
                },
                {
                    id: 15,
                    name: "Classic",
                    dish_category: "Шаурма",
                    price: 239,
                    calories: 650,
                    description: "Куриное филе, свежий томат, свежий огурец, капуста, морковь по корейски, соус на выбор: острый, сливочный, сырный, чесночный, 350 грамм"
                },
                {
                    id: 16,
                    name: "Грибная",
                    dish_category: "Шаурма",
                    price: 249,
                    calories: 650,
                    description: "Куриное филе, шампиньоны, картофель фри, маринованный лук, соус на выбор: острый, сливочный, сырный, чесночный, 300 грамм"
                },
                {
                    id: 17,
                    name: "Сэндвич с беконом",
                    dish_category: "Сэндвичи",
                    price: 329,
                    calories: 650,
                    description: "Тостовый хлеб, бекон, яйцо, сыр чеддер, салат, маринованные огурчики, дижоанская горчица, майонез, 280 грамм"
                },
                {
                    id: 18,
                    name: "Сэндвич с курочкой",
                    dish_category: "Сэндвичи",
                    price: 319,
                    calories: 650,
                    description: "Тостовый хлеб, курица жареная, сыр чеддер, яйцо, салат, томат, майонез, соус тар-тар, 290 грамм"
                },
                {
                    id: 19,
                    name: "Мини бургер курица",
                    dish_category: "Мини бургеры",
                    price: 179,
                    calories: 650,
                    description: "Булочка, котлета, сыр чеддер, маринованые огурчики, лук, салат соус 'русский', 160 грамм"
                },
                {
                    id: 20,
                    name: "Мини бургер свинина",
                    dish_category: "Мини бургеры",
                    price: 199,
                    calories: 650,
                    description: "Булочка, котлета, сыр чеддер, маринованые огурчики, лук, салат соус 'русский', 160 грамм"
                },
                {
                    id: 21,
                    name: "Мини бургер говядина",
                    dish_category: "Мини бургеры",
                    price: 219,
                    calories: 650,
                    description: "Булочка, котлета, сыр чеддер, маринованые огурчики, лук, салат соус 'русский', 160 грамм"
                },
                {
                    id: 22,
                    name: "Картофель фри",
                    dish_category: "Закуски фри",
                    price: 149,
                    calories: 650,
                    description: "Хрустящий картофель фри с панировкой во фритюре, 100 грамм"
                },
                {
                    id: 23,
                    name: "Луковые кольца",
                    dish_category: "Закуски фри",
                    price: 159,
                    calories: 650,
                    description: "Ароматные луковые колечки в панировке обжареные во фритюре, 8 штук"
                },
                {
                    id: 24,
                    name: "Пельмешки",
                    dish_category: "Закуски фри",
                    price: 169,
                    calories: 650,
                    description: "Небольшие пельмешки во фритюре с мясом свинина говядина, 10 штук"
                },
                {
                    id: 25,
                    name: "Сырные палочки",
                    dish_category: "Закуски фри",
                    price: 229,
                    calories: 650,
                    description: "Тянущаяся моцарелла в панировке обжареная во фритюре, 6 штук"
                },
                {
                    id: 26,
                    name: "Наггетсы",
                    dish_category: "Закуски фри",
                    price: 229,
                    calories: 650,
                    description: "Куриное филе в панировке обжареное во фритюре, 6 штук"
                },
                {
                    id: 27,
                    name: "Медовые крылышки",
                    dish_category: "Закуски фри",
                    price: 239,
                    calories: 650,
                    description: "Куриные крылышки, обжаренные во фритюре и карамелизованные в слегка остром медовом соусе, 6 кусочков"
                },
                {
                    id: 28,
                    name: "Креветки",
                    dish_category: "Закуски фри",
                    price: 239,
                    calories: 650,
                    description: "Креветки в панировке, обжаренные во фритюре, 32323 штук"
                },
                {
                    id: 29,
                    name: "Кольца кальмара",
                    dish_category: "Закуски фри",
                    price: 239,
                    calories: 650,
                    description: "Кольца кальмара в панировке, обжареннные во фритюре, 2323 штук"
                },
                {
                    id: 30,
                    name: "Сырные медальоны",
                    dish_category: "Закуски фри",
                    price: 239,
                    calories: 650,
                    description: "Сырные медальоны с перцем халапеньо в панировке, обжаренные во фритюре, 23232 штук"
                },
                {
                    id: 31,
                    name: "Картошка по-деревенски",
                    dish_category: "Закуски фри",
                    price: 239,
                    calories: 650,
                    description: "Молодой картофель со шкуркой, обжаренный во фритюре, 1292929 грамм"
                },
                {
                    id: 32,
                    name: "Бекон",
                    dish_category: "Добавки",
                    price: 30,
                    calories: 650,
                    description: "Ломтик бекона, 20 грамм"
                },
                {
                    id: 33,
                    name: "Халапеньо",
                    dish_category: "Добавки",
                    price: 20,
                    calories: 650,
                    description: "Нарезанный перчик халапеньо, 15 грамм"
                },
                {
                    id: 34,
                    name: "Сыр чеддер",
                    dish_category: "Добавки",
                    price: 40,
                    calories: 650,
                    description: "Два ломтика сыра чеддер бистро, 25 грамм"
                },
                {
                    id: 35,
                    name: "Красный лук",
                    dish_category: "Добавки",
                    price: 10,
                    calories: 650,
                    description: "Ароматный красный лук, 10 грамм"
                },
                {
                    id: 36,
                    name: "Картофель фри добавка",
                    dish_category: "Добавки",
                    price: 25,
                    calories: 650,
                    description: "Ароматная хрустящая картошка фри, 20 грамм"
                },
                {
                    id: 37,
                    name: "Кетчуп",
                    dish_category: "Соусы",
                    price: 25,
                    calories: 650,
                    description: "Соус кетчуп, 30 миллилитров"
                },
                {
                    id: 38,
                    name: "Сырный",
                    dish_category: "Соусы",
                    price: 25,
                    calories: 650,
                    description: "Соус сырный, 30 миллилитров"
                },
                {
                    id: 39,
                    name: "Тар-тар",
                    dish_category: "Соусы",
                    price: 25,
                    calories: 650,
                    description: "Соус тар-тар, 30 миллилитров"
                },
                {
                    id: 40,
                    name: "Чесночный",
                    dish_category: "Соусы",
                    price: 25,
                    calories: 650,
                    description: "Соус чесночный, 30 миллилитров"
                },
                {
                    id: 41,
                    name: "Барбекю",
                    dish_category: "Соусы",
                    price: 25,
                    calories: 650,
                    description: "Соус барбекю, 30 миллилитров"
                },
                {
                    id: 42,
                    name: "Спайси",
                    dish_category: "Соусы",
                    price: 25,
                    calories: 650,
                    description: "Соус спайси, 30 миллилитров"
                },
                {
                    id: 43,
                    name: "Горчичный",
                    dish_category: "Соусы",
                    price: 25,
                    calories: 650,
                    description: "Соус горчичный, 30 миллилитров"
                },
            ];
            console.log('Добавление блюд в базу данных...');
            const result = await Dish.bulkCreate(dishes);
            console.log('Блюда успешно добавлены:', result);
            return result;
        } catch (error) {
            console.error('Ошибка при добавлении блюд:', error);
            throw new Error(`Ошибка при добавлении блюд: ${error.message}`);
        }
    }

    static async getDishById(id) {
        try {
            const dish = await Dish.findByPk(id);
            if (!dish) {
                throw new Error('Блюдо не найдено');
            }
            return dish;
        } catch (error) {
            throw new Error(`Ошибка при получении блюда: ${error.message}`);
        }
    }
}

export default DishService;