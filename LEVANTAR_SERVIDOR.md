# 🚀 Guía para Levantar el Servidor - AFORIX

## 📋 Pasos Rápidos

### Opción 1: Usar el Script Automático (Windows)

1. **Abre el archivo:**
   ```
   iniciar_servidor.bat
   ```
   (Haz doble clic en el archivo)

2. **Espera a que inicie** el servidor

3. **Abre tu navegador** y ve a:
   ```
   http://localhost:8000/
   ```

---

### Opción 2: Manual (Recomendado)

#### Paso 1: Abre una terminal/PowerShell

#### Paso 2: Navega al directorio del proyecto
```powershell
cd "C:\Users\Usuario\Desktop\AFORIX\AFORIX\Nueva carpeta (3)"
```

#### Paso 3: Activa el entorno virtual
```powershell
.\venv\Scripts\Activate.ps1
```

**Si tienes problemas de ejecución de scripts en PowerShell, ejecuta primero:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

O usa la versión `.bat`:
```cmd
venv\Scripts\activate.bat
```

#### Paso 4: Ve al directorio de control_aforo
```powershell
cd control_aforo
```

#### Paso 5: Inicia el servidor
```powershell
python manage.py runserver
```

#### Paso 6: Abre tu navegador
Ve a:
```
http://localhost:8000/
```

O también:
```
http://127.0.0.1:8000/
```

---

## 🎯 Páginas Disponibles

Una vez que el servidor esté corriendo:

### Página de Login
```
http://localhost:8000/login/
```

**Credenciales de prueba (solo frontend):**
- Usuario: cualquier texto
- Contraseña: mínimo 4 caracteres

### Lista de Locales
```
http://localhost:8000/
```
*(Requiere login)*

### Detalle de un Local
```
http://localhost:8000/local/1/
```
*(Cambia el número por el ID del local)*

### Reportes
```
http://localhost:8000/reportes/1/
```

---

## 🔧 Comandos Útiles

### Verificar configuración
```powershell
python manage.py check
```

### Ver todas las URLs disponibles
```powershell
python manage.py show_urls
```

### Crear superusuario (para admin)
```powershell
python manage.py createsuperuser
```

### Acceder al panel de administración
```
http://localhost:8000/admin/
```

---

## ⚠️ Solución de Problemas

### Error: "Python no se reconoce"
- Asegúrate de tener el entorno virtual activado
- O instala Python desde python.org

### Error: "No se puede activar el entorno virtual"
- En PowerShell, ejecuta primero:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```
- O usa el archivo `.bat` en lugar de `.ps1`

### Error: "Puerto 8000 ya está en uso"
- Cambia el puerto:
  ```powershell
  python manage.py runserver 8001
  ```

### Los archivos estáticos no se ven
- Ejecuta:
  ```powershell
  python manage.py collectstatic
  ```

---

## 🎨 Características del Frontend

✅ **Sistema de Login** - Página de inicio de sesión elegante
✅ **Tema Global Unificado** - Diseño consistente en toda la app
✅ **Animaciones Suaves** - Transiciones y efectos visuales
✅ **Barras Responsive** - Indicadores en tiempo real
✅ **Gráficos Interactivos** - Visualización de datos
✅ **Diseño Responsive** - Funciona en móvil y desktop

---

## 📱 Para ver desde móvil en la misma red WiFi

1. **Encuentra tu IP local:**
   ```powershell
   ipconfig
   ```
   Busca "IPv4 Address" (ejemplo: `192.168.1.100`)

2. **Inicia el servidor accesible desde la red:**
   ```powershell
   python manage.py runserver 0.0.0.0:8000
   ```

3. **Accede desde tu móvil:**
   ```
   http://192.168.1.100:8000/
   ```

---

## ✅ Verificación Rápida

Después de iniciar el servidor, deberías ver:

```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

Si ves esto, ¡todo está funcionando! 🎉

---

## 🆘 ¿Necesitas ayuda?

Si tienes problemas, verifica:
1. ✅ El entorno virtual está activado
2. ✅ Estás en el directorio correcto (`control_aforo`)
3. ✅ Django está instalado (`pip install django`)
4. ✅ Las migraciones están aplicadas (`python manage.py migrate`)

¡Disfruta tu aplicación AFORIX! 🚀

