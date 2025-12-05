# 🔌 Guía: Conectar App Móvil con Django

## ⚠️ IMPORTANTE - Aclaración

**Firebase Studio** = Solo es una herramienta para VER/EDITAR datos de Firebase
- No es donde se conecta tu app
- Es solo una interfaz visual

**Tu App Móvil** = El código de tu app (React Native, Flutter, etc.)
- Aquí sí necesitas hacer las conexiones HTTP
- Aquí es donde consumes la API de Django

---

## 📋 Pasos para Verificar la Conexión

### **PASO 1: Verificar que Django está listo**

Tu Django ya está configurado para recibir peticiones:
- ✅ CORS habilitado (`CORS_ALLOW_ALL_ORIGINS = True`)
- ✅ Permisos públicos (`AllowAny`)
- ✅ API REST funcionando

**Endpoints disponibles:**
```
GET  /api/locales/              → Lista todos los locales
GET  /api/locales/<id>/         → Detalle de un local
GET  /api/aforos/?local=<id>    → Historial de aforo
GET  /api/locales/<id>/ultimo/  → Último aforo del local
```

---

### **PASO 2: Obtener la URL base de Django**

#### **Opción A: Red Local (Misma WiFi)**
1. Encuentra la IP de tu PC:
   - **Windows:** Abre CMD y ejecuta `ipconfig`
   - Busca "IPv4 Address" (ejemplo: `192.168.1.100`)

2. URL base será:
   ```
   http://192.168.1.100:8000
   ```

#### **Opción B: Servidor Público**
```
http://tu-servidor.com
```

#### **Opción C: Túnel (Desarrollo)**
```
https://xxxx.ngrok.io
```

---

### **PASO 3: Probar desde tu App Móvil**

#### **Ejemplo en JavaScript/React Native:**

```javascript
// URL base de Django (CAMBIAR POR TU IP)
const DJANGO_URL = 'http://192.168.1.100:8000';

// Función para obtener locales
async function obtenerLocales() {
  try {
    const response = await fetch(`${DJANGO_URL}/api/locales/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const datos = await response.json();
    console.log('Locales recibidos:', datos);
    return datos;
  } catch (error) {
    console.error('Error conectando con Django:', error);
    return null;
  }
}

// Función para obtener último aforo
async function obtenerUltimoAforo(localId) {
  try {
    const response = await fetch(
      `${DJANGO_URL}/api/locales/${localId}/ultimo/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    const datos = await response.json();
    console.log('Último aforo:', datos);
    return datos;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

---

### **PASO 4: Verificar la Conexión**

#### **Test Rápido con Postman o Navegador:**

1. **Abre tu navegador móvil** (o Postman en PC)
2. **Ve a:**
   ```
   http://TU_IP:8000/api/locales/
   ```
3. **Deberías ver JSON** con los locales:
   ```json
   [
     {
       "id": 1,
       "nombre": "Local 1",
       "direccion": "...",
       "aforo_max": 10,
       ...
     }
   ]
   ```

#### **Si NO funciona:**

❌ **Error de conexión:**
- Verifica que Django esté corriendo
- Verifica que estés en la misma WiFi
- Verifica la IP correcta

❌ **Error 404:**
- Verifica que la URL esté bien escrita
- Verifica que Django esté en el puerto 8000

❌ **Error CORS:**
- Ya está configurado, pero si persiste, verifica settings.py

---

### **PASO 5: Integrar en tu App Móvil**

#### **Estructura recomendada:**

```
tu-app-movil/
├── src/
│   ├── services/
│   │   └── djangoApi.js    ← Aquí pones las funciones HTTP
│   ├── screens/
│   │   └── LocalesScreen.js ← Aquí muestras los datos
│   └── config/
│       └── api.js          ← Aquí pones la URL base
```

#### **Ejemplo de servicio:**

```javascript
// src/services/djangoApi.js
import { DJANGO_BASE_URL } from '../config/api';

export const DjangoAPI = {
  // Obtener todos los locales
  getLocales: async () => {
    const response = await fetch(`${DJANGO_BASE_URL}/api/locales/`);
    return response.json();
  },
  
  // Obtener último aforo de un local
  getUltimoAforo: async (localId) => {
    const response = await fetch(
      `${DJANGO_BASE_URL}/api/locales/${localId}/ultimo/`
    );
    return response.json();
  },
  
  // Obtener historial de aforo
  getHistorialAforo: async (localId) => {
    const response = await fetch(
      `${DJANGO_BASE_URL}/api/aforos/?local=${localId}`
    );
    return response.json();
  },
};
```

---

## ✅ Checklist de Verificación

- [ ] Django está corriendo en tu PC
- [ ] Conoces la IP de tu PC en la red local
- [ ] Puedes acceder a `http://TU_IP:8000/api/locales/` desde el navegador
- [ ] Tu app móvil puede hacer peticiones HTTP
- [ ] Tienes la URL base configurada en tu app móvil
- [ ] Probaste la conexión con un endpoint simple

---

## 🚨 Problemas Comunes

### **1. "No se puede conectar"**
- **Solución:** Verifica que Django esté corriendo y la IP sea correcta

### **2. "Network request failed"**
- **Solución Android:** Agrega en `AndroidManifest.xml`:
  ```xml
  <application android:usesCleartextTraffic="true">
  ```
- **Solución iOS:** Agrega en `Info.plist`:
  ```xml
  <key>NSAppTransportSecurity</key>
  <dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
  </dict>
  ```

### **3. "CORS error"**
- Ya está configurado en Django, pero si persiste, verifica `settings.py`

---

## 📱 Nota sobre Firebase

Si tu app usa **Firebase para otras cosas** (login, otros datos), puedes:
- **Mantener Firebase** para lo que ya tienes
- **Agregar Django API** para los datos de aforo
- **No necesitas elegir uno u otro**, pueden coexistir

---

## 🔗 Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/locales/` | Lista todos los locales |
| GET | `/api/locales/<id>/` | Detalle de un local |
| GET | `/api/aforos/?local=<id>` | Historial de aforo |
| GET | `/api/locales/<id>/ultimo/` | Último registro de aforo |
| POST | `/api/locales/` | Crear nuevo local |
| POST | `/api/recibir_aforo/` | Recibir dato del ESP32 |

