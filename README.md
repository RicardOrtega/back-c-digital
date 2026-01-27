# C-Digital Backend

API REST para la gestión de tarjetas de regalo digitales, desarrollada con NestJS y TypeORM.

# Descripción

C-Digital es el backend de una plataforma para la venta, administración y canje de Gift Cards digitales. El sistema cubre todo el flujo del negocio, desde la autenticación de usuarios hasta la compra, generación y redención de tarjetas, con foco en seguridad, escalabilidad y mantenibilidad.

Está pensado como una base sólida para evolucionar hacia un producto en producción, manteniendo buenas prácticas de arquitectura y desarrollo backend.

# Funcionalidades principales

El sistema permite:

Registro y autenticación de usuarios mediante JWT

Administración de comercios (tiendas)

Catálogo de tarjetas de regalo

Generación y gestión de códigos únicos de Gift Cards

Procesamiento de compras

Registro y consulta del historial de canjes

Protección contra abusos mediante rate limiting

Validación estricta de datos de entrada

# Stack tecnológico y decisiones
Framework y lenguaje

Se utiliza NestJS (v10) como framework principal por su arquitectura modular, su sistema de inyección de dependencias y su excelente integración con TypeScript.
El proyecto está desarrollado en TypeScript (v5), lo que permite detectar errores en etapas tempranas y facilita el mantenimiento a largo plazo.

# Base de datos

La persistencia se maneja con PostgreSQL, elegido por su confiabilidad, soporte transaccional y buen desempeño en escenarios reales de producción.
El acceso a datos se realiza mediante TypeORM, trabajando directamente con entidades tipadas y aprovechando migrations para mantener el control del esquema.

# Seguridad

La autenticación se implementa con JSON Web Tokens, permitiendo un enfoque stateless y escalable.
Las contraseñas se almacenan utilizando bcrypt, asegurando un hash seguro con salt.
Se incorporan medidas adicionales como Helmet para headers de seguridad y Throttler para limitar solicitudes y reducir el riesgo de ataques de fuerza bruta.

# Validación de datos

Se utiliza class-validator junto a class-transformer para validar y transformar los datos de entrada de forma declarativa, manteniendo los controladores limpios y consistentes.

# Containerización

El proyecto incluye configuración completa con Docker y Docker Compose, lo que permite levantar la aplicación y la base de datos de forma consistente en cualquier entorno, sin dependencias externas adicionales.

# Estructura del proyecto

La organización del código sigue una estructura modular clara, alineada con las recomendaciones de NestJS:

src/
 ├── auth/                 autorización
 ├── users/                Gestión de usuarios
 ├── shops/                Gestión de tiendas
 ├── gift-cards/           Catálogo de tarjetas
 ├── gift-cards-codes/     Códigos de tarjetas
 ├── purchases/            Procesamiento de compras
 ├── redemption-history/   Historial de canjes
 ├── app.module.ts         Módulo raíz
 └── main.ts               Punto de entrada

 Cada módulo encapsula su lógica de dominio, controladores, servicios y entidades correspondientes.
# Instalación y configuración

El proyecto puede ejecutarse tanto de forma local como mediante Docker.

# Ejecución local

Clonar el repositorio

Instalar dependencias con npm install

Configurar las variables de entorno en un archivo .env

Crear la base de datos en PostgreSQL

Ejecutar la aplicación en modo desarrollo o producción

# Ejecución con Docker

La forma recomendada de ejecutar el proyecto es mediante Docker Compose, lo que levanta automáticamente:

La aplicación NestJS

Una instancia de PostgreSQL con volumen persistente

La red interna entre servicios

Healthchecks para asegurar el orden de arranque

Esto permite tener un entorno reproducible y cercano a producción con un solo comando.


# Testing

El proyecto incluye configuración para:

Tests unitarios

Tests end-to-end

Reportes de cobertura

Esto permite validar la lógica crítica y asegurar la estabilidad del sistema ante cambios.

# Endpoints principales

La API expone endpoints REST organizados por dominio, incluyendo autenticación, gestión de tiendas, catálogo de tarjetas, compras y canjes.
Todos los endpoints sensibles están protegidos mediante autenticación JWT.

# Uso de Inteligencia Artificial

Durante el desarrollo se utilizó asistencia de IA de forma puntual y controlada, principalmente para acelerar tareas de soporte y configuración.

La IA se empleó en:

Configuración inicial de Docker y Docker Compose

Generación de un decorator personalizado para obtener el usuario autenticado

Sugerencias para corrección de errores de importación y validaciones

Todo el código generado con asistencia fue revisado manualmente, comprendido en su totalidad y probado en ejecución real antes de integrarse al proyecto.

La lógica de negocio, el modelado de datos, las relaciones entre entidades, los servicios principales y las decisiones de arquitectura fueron desarrolladas 

Apoyo en la estructuración, claridad y redacción del README y documentación general del proyecto, manteniendo siempre la coherencia técnica y el contenido definido por el equipo.

