# bbk_proyecto1_backend

🛒 E-Commerce API
API RESTful desarrollada con Node.js, Express y Sequelize para una tienda online. El proyecto incluye autenticación, gestión de productos, categorías, pedidos y usuarios con relaciones entre tablas y uso de seeders.

📚 Tecnologías usadas

Node.js
Express.js
MySQL
Sequelize ORM
Bcrypt
JSON Web Tokens (JWT)
Git & GitHub

⚙️ Funcionalidades principales

🔐 Autenticación

Registro de usuario con bcrypt
Login con JWT + middleware de autenticación
Logout
Validación de campos obligatorios

🛍️ Productos

CRUD completo
Búsqueda por nombre y precio
Filtro por precio ascendente/descendente
Asociación con categorías (Many to Many)
Solo usuarios autenticados pueden crear, editar o eliminar productos
Validación al crear producto

🗂️ Categorías

CRUD completo
Ver todas las categorías con sus productos
Búsqueda por nombre
Ver una categoría por ID

📦 Pedidos

Ver pedidos con sus productos
Crear pedidos
Ver pedidos de usuario autenticado

👤 Usuarios

Ver perfil del usuario autenticado con sus pedidos y productos relacionados

🌱 Seeders

Seeder para crear al menos 5 productos de prueba

🔗 Relaciones en la base de datos

User ➝ Orders (One to Many)
Product ⇄ Category (One to Many)
Order ⇄ Product (Many to Many)