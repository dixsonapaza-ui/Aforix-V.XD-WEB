# 🏢 AFORIX - Sistema de Control de Aforo

Sistema web de monitoreo de aforo en tiempo real con integración IoT (ESP32) desarrollado con Django.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Django](https://img.shields.io/badge/Django-5.2.8-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 📋 Descripción

AFORIX es un sistema completo para el control y monitoreo de aforo (capacidad de personas) en tiempo real. Permite gestionar múltiples locales, recibir datos de sensores ESP32, visualizar el estado actual y generar reportes históricos.

### ✨ Características Principales

- 🔐 **Sistema de Login** - Autenticación de usuarios
- 📊 **Monitoreo en Tiempo Real** - Actualización automática cada 3 segundos
- 📱 **Responsive Design** - Funciona en móvil y desktop
- 📉 **Gráficos Interactivos** - Visualización de datos históricos
- 🔄 **API REST** - Endpoints para integración con dispositivos IoT
- 📄 **Sistema de Reportes** - Reportes diarios, semanales y mensuales

## 🚀 Tecnologías Utilizadas

### Backend
- **Django 5.2.8** - Framework web de Python
- **Django REST Framework** - API REST
- **SQLite3** - Base de datos (desarrollo)
- **django-cors-headers** - Soporte CORS para ESP32

### Frontend
- **Bootstrap 5.3.0** - Framework CSS
- **JavaScript Vanilla** - Lógica del frontend
- **Chart.js** - Gráficos interactivos
- **Font Awesome** - Iconos

### Hardware
- **ESP32** - Dispositivo IoT para conteo de personas

## 📦 Instalación

### Requisitos Previos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/aforix.git
   cd aforix
   ```

2. **Crear entorno virtual**
   ```bash
   python -m venv venv
   ```

3. **Activar entorno virtual**
   
   **Windows:**
   ```cmd
   venv\Scripts\activate.bat
   ```
   
   **Linux/Mac:**
   ```bash
   source venv/bin/activate
   ```

4. **Instalar dependencias**
   ```bash
   pip install django djangorestframework django-cors-headers
   ```

5. **Aplicar migraciones**
   ```bash
   python manage.py migrate
   ```

6. **Crear superusuario (opcional)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Iniciar servidor de desarrollo**
   ```bash
   python manage.py runserver
   ```

8. **Abrir en el navegador**
   ```
   http://localhost:8000/login/
   ```

## 🎯 Uso

### Login
- **URL:** `http://localhost:8000/login/`
- **Credenciales:** Cualquier usuario y contraseña (mínimo 4 caracteres)
- El login es persistente mientras el navegador esté abierto

### Páginas Principales

- **Lista de Locales:** `/`
- **Detalle de Local:** `/local/<id>/`
- **Reportes:** `/reportes/<id>/`
- **Panel Admin:** `/admin/`

### API REST

#### Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/locales/` | Lista todos los locales |
| `POST` | `/api/locales/` | Crear nuevo local |
| `GET` | `/api/locales/<id>/` | Detalle de un local |
| `GET` | `/api/aforos/?local=<id>` | Historial de aforo |
| `GET` | `/api/locales/<id>/ultimo/` | Último registro de aforo |
| `POST` | `/api/recibir_aforo/` | Endpoint para ESP32 |

#### Ejemplo de uso con ESP32

```json
POST /api/recibir_aforo/
{
  "local_id": 1,
  "aforo": 15,
  "origen": "ESP32-01"
}
```

## 📁 Estructura del Proyecto

```
control_aforo/
├── aforo/                    # Aplicación principal
│   ├── models.py            # Modelos de datos
│   ├── views.py             # Vistas y API
│   ├── serializers.py       # Serializadores DRF
│   ├── static/              # Archivos estáticos
│   │   ├── css/            # Estilos
│   │   └── js/             # JavaScript
│   └── templates/           # Plantillas HTML
├── control_aforo/           # Configuración del proyecto
│   ├── settings.py          # Configuración Django
│   └── urls.py              # URLs principales
└── manage.py                # CLI de Django
```

## 🔧 Configuración

### Variables de Entorno

El proyecto usa SQLite por defecto. Para producción, configura una base de datos PostgreSQL en `settings.py`.

### CORS

CORS está configurado para permitir todas las conexiones en desarrollo. Para producción, configura los orígenes permitidos.

## 📱 Integración con App Móvil

El sistema está preparado para conectarse con aplicaciones móviles. Consulta `CONEXION_APP_MOVIL.md` para más detalles.

## 🐛 Solución de Problemas

### Error de recarga infinita
- Limpia el caché del navegador (Ctrl + F5)
- Limpia localStorage: `localStorage.clear()` en la consola

### Puerto 8000 ocupado
```bash
python manage.py runserver 8001
```

### Archivos estáticos no se ven
```bash
python manage.py collectstatic
```

## 📝 Documentación Adicional

- `LEVANTAR_SERVIDOR.md` - Guía para iniciar el servidor
- `CONEXION_APP_MOVIL.md` - Cómo conectar app móvil
- `RUTAS_CMD.txt` - Rutas exactas para comandos

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollo inicial*

## 🙏 Agradecimientos

- Django Community
- Bootstrap Team
- Chart.js Contributors

## 📞 Contacto

Para preguntas o soporte, abre un issue en GitHub.

---

⭐ Si te gustó este proyecto, ¡dale una estrella en GitHub!

