# 🚀 Guía para Subir el Proyecto a GitHub

## 📋 Pasos para Subir AFORIX a GitHub

### PASO 1: Crear el Repositorio en GitHub

1. Ve a [GitHub.com](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** (arriba a la derecha) → **"New repository"**
3. Completa la información:
   - **Repository name:** `aforix` (o el nombre que prefieras)
   - **Description:** "Sistema de Control de Aforo en Tiempo Real"
   - **Visibility:** Elige **Public** o **Private**
   - **NO marques** "Initialize with README" (ya tenemos uno)
4. Haz clic en **"Create repository"**

### PASO 2: Conectar el Repositorio Local con GitHub

Después de crear el repositorio, GitHub te mostrará comandos. Usa estos:

#### Opción A: Si es un repositorio NUEVO (recomendado)

```bash
git remote add origin https://github.com/TU-USUARIO/aforix.git
git branch -M main
git push -u origin main
```

#### Opción B: Si ya existe el repositorio

```bash
git remote add origin https://github.com/TU-USUARIO/aforix.git
git branch -M main
git push -u origin main
```

**Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub**

### PASO 3: Hacer el Commit Inicial

Si aún no has hecho commit:

```bash
git add .
git commit -m "Initial commit: Sistema AFORIX completo"
```

### PASO 4: Subir a GitHub

```bash
git push -u origin main
```

Si GitHub te pide autenticación, usa un **Personal Access Token**:
- Ve a GitHub → Settings → Developer settings → Personal access tokens
- Crea un nuevo token con permisos de `repo`
- Usa ese token como contraseña

---

## 🎯 Comandos Completos (Copia y Pega)

### Desde CMD o PowerShell en el directorio del proyecto:

```bash
# 1. Verificar que estás en el directorio correcto
cd "C:\Users\Usuario\Desktop\AFORIX\AFORIX\AFORIX\Nueva carpeta (3)\control_aforo"

# 2. Verificar el estado
git status

# 3. Agregar todos los archivos
git add .

# 4. Hacer commit inicial
git commit -m "Initial commit: Sistema AFORIX - Control de Aforo en Tiempo Real"

# 5. Agregar el remoto (REEMPLAZA TU-USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU-USUARIO/aforix.git

# 6. Cambiar a rama main
git branch -M main

# 7. Subir a GitHub
git push -u origin main
```

---

## 🔄 Para Actualizar el Repositorio en el Futuro

Cada vez que hagas cambios:

```bash
# 1. Ver qué cambió
git status

# 2. Agregar cambios
git add .

# 3. Hacer commit con mensaje descriptivo
git commit -m "Descripción de los cambios"

# 4. Subir a GitHub
git push
```

---

## ⚠️ Solución de Problemas

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/TU-USUARIO/aforix.git
```

### Error: "Authentication failed"
1. Ve a GitHub → Settings → Developer settings → Personal access tokens
2. Crea un nuevo token
3. Úsalo como contraseña al hacer push

### Error: "Permission denied"
- Verifica que el nombre del repositorio sea correcto
- Verifica que tengas permisos de escritura en el repositorio

### Cambiar la URL del remoto
```bash
git remote set-url origin https://github.com/TU-USUARIO/aforix.git
```

---

## 📝 Archivos que NO se Suben (Gracias a .gitignore)

- `db.sqlite3` - Base de datos local
- `__pycache__/` - Archivos compilados de Python
- `venv/` - Entorno virtual
- Archivos del sistema operativo

---

## ✅ Verificación

Después de subir, ve a tu repositorio en GitHub y verifica que:
- ✅ Todos los archivos estén presentes
- ✅ El README.md se muestre correctamente
- ✅ Los archivos de código estén visibles

---

## 🎉 ¡Listo!

Tu proyecto AFORIX ahora está en GitHub y puedes:
- Compartirlo con otros
- Colaborar en equipo
- Hacer backup en la nube
- Mostrarlo en tu portafolio

¡Felicidades! 🚀

