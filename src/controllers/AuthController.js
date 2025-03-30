import AuthService from '../services/AuthService.js';

class AuthController {
    // Показ формы регистрации
    static showRegistrationForm(req, res) {
        res.render('register', {
            title: 'Регистрация',
            isAuthenticated: !!req.session.user,
            user: req.session.user
        });
    }

    // Показ формы входа
    static showLoginForm(req, res) {
        res.render('enter', {
            title: 'Вход',
            isAuthenticated: !!req.session.user,
            user: req.session.user,
            error: req.query.error
        });
    }

    // Обработка регистрации
    static async register(req, res) {
        try {
            const { password, confirmPassword, role, ...userData } = req.body;
            const formData = req.body;
    
            // Валидация паролей
            if (password !== confirmPassword) {
                return res.render('register', {
                    error: 'Пароли не совпадают',
                    formData
                });
            }
    
            // Проверка существования пользователя
            const existingUser = await AuthService.findUserByUsername(formData.username);
            if (existingUser) {
                return res.render('register', {
                    error: 'Пользователь с таким именем уже существует',
                    formData
                });
            }
    
            // Создание пользователя
            const user = await AuthService.registerUser({
                ...userData,
                password,
                role: parseInt(role) || 1 // По умолчанию "Пользователь"
            });
    
            // Автоматический вход после регистрации
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            };
    
            return res.redirect('/');
    
        } catch (error) {
            console.error('Registration error:', error);
            return res.render('register', {
                error: 'Ошибка регистрации: ' + error.message,
                formData: req.body
            });
        }
    }

    // Обработка входа
    static async login(req, res) {
        try {
            const { username, password } = req.body;
            
            // Для API-запросов (fetch)
            if (req.accepts('json')) {
                const user = await AuthService.findUserByUsername(username);
                
                if (!user) {
                    return res.status(401).json({ error: 'Неверный логин или пароль' });
                }
    
                const isMatch = await AuthService.comparePasswords(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ error: 'Неверный логин или пароль' });
                }
    
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                };
    
                return res.json({ success: true });
            }
    
            // Для обычных form-запросов
            const user = await AuthService.findUserByUsername(username);
            
            if (!user) {
                return res.render('enter', { 
                    error: 'Неверный логин или пароль',
                    username
                });
            }
    
            const isMatch = await AuthService.comparePasswords(password, user.password);
            if (!isMatch) {
                return res.render('enter', { 
                    error: 'Неверный логин или пароль',
                    username
                });
            }
    
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            };
    
            return res.redirect('/');
    
        } catch (error) {
            console.error('Login error:', error);
            
            if (req.accepts('json')) {
                return res.status(500).json({ error: 'Ошибка сервера' });
            }
            
            return res.render('enter', {
                error: 'Ошибка сервера при входе',
                username: req.body.username
            });
        }
    }
    // Выход
    static logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                console.error('Logout error:', err);
            }
            res.redirect('/');
        });
    }

    // Middleware для проверки аутентификации
    static requireAuth(req, res, next) {
        if (req.session.user) {
            return next();
        }
        res.redirect('/auth/login');
    }

    // Middleware для проверки ролей
    static requireRole(role) {
        return (req, res, next) => {
            if (req.session.user?.role === role) {
                return next();
            }
            res.status(403).send('Доступ запрещен');
        };
    }
}

export default AuthController;