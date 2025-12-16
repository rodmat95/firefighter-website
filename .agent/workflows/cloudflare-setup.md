# 🚀 Guía Simple: Conectar tu Dominio de Cloudflare con Vercel

**¿Qué vamos a hacer?** Configurar tu dominio para que cuando alguien escriba `tudominio.com` en el navegador, vea tu sitio web alojado en Vercel.

**Tiempo estimado:** 10-15 minutos

---

## 📍 PASO 1: Entrar a Cloudflare

1. Ve a https://dash.cloudflare.com/
2. Inicia sesión con tu cuenta
3. Verás una lista de tus dominios
4. **Haz clic en el dominio** que quieres conectar con Vercel

---

## 🔧 PASO 2: Ir a la Sección de DNS

Una vez dentro de tu dominio:

1. En el **menú de la izquierda**, busca y haz clic en **"DNS"**
2. Verás una tabla con "DNS Records" (Registros DNS)
3. Aquí es donde vamos a trabajar

---

## ➕ PASO 3: Añadir el Primer Registro (Para tu dominio principal)

Vamos a crear un registro para que `tudominio.com` funcione:

1. Haz clic en el botón **"Add record"** (Añadir registro)
2. Llena los campos así:

```
┌─────────────────────────────────────────────┐
│ Type (Tipo):        A                       │
│ Name (Nombre):      @                       │
│ IPv4 address:       76.76.21.21            │
│ Proxy status:       🔘 DNS only (GRIS)     │  ← ¡MUY IMPORTANTE!
│ TTL:                Auto                    │
└─────────────────────────────────────────────┘
```

3. **IMPORTANTE:** Verás un icono de nube. Debe estar **GRIS** ⚪, NO naranja 🟠
   - Si está naranja, haz clic en ella para cambiarla a gris
   - Debe decir "DNS only"

4. Haz clic en **"Save"** (Guardar)

### 💡 ¿Qué significa cada cosa?
- **Type (A):** Tipo de registro que conecta un dominio a una dirección IP
- **@ :** Significa tu dominio raíz (ejemplo.com)
- **76.76.21.21:** La dirección IP de Vercel
- **Nube Gris:** Significa que Cloudflare solo maneja el DNS, no el tráfico

---

## ➕ PASO 4: Añadir el Segundo Registro (Para www)

Ahora vamos a hacer que `www.tudominio.com` también funcione:

1. Haz clic otra vez en **"Add record"**
2. Llena los campos así:

```
┌─────────────────────────────────────────────┐
│ Type (Tipo):        CNAME                   │
│ Name (Nombre):      www                     │
│ Target (Destino):   cname.vercel-dns.com   │
│ Proxy status:       🔘 DNS only (GRIS)     │  ← ¡MUY IMPORTANTE!
│ TTL:                Auto                    │
└─────────────────────────────────────────────┘
```

3. Otra vez, asegúrate de que la **nube esté GRIS** ⚪
4. Haz clic en **"Save"**

---

## 🔒 PASO 5: Configurar el Certificado SSL (Para HTTPS)

Ahora vamos a asegurarnos de que tu sitio sea seguro (https://):

1. En el **menú de la izquierda**, haz clic en **"SSL/TLS"**
2. Verás una sección que dice **"Configure"** o **"Encryption mode"**
3. Selecciona **"Full"** o **"Full (strict)"**
   - ✅ Full
   - ✅ Full (strict)
   - ❌ NO selecciones "Flexible" (causará errores)

4. Cloudflare guardará automáticamente

### 💡 ¿Por qué esto?
Esto le dice a Cloudflare cómo comunicarse de forma segura con Vercel.

---

## ✅ PASO 6: Verificar en Vercel

Ahora vamos a confirmar que Vercel reconoce tu dominio:

1. Ve a https://vercel.com/
2. Abre tu proyecto
3. Haz clic en **"Settings"** (Configuración)
4. Haz clic en **"Domains"** (Dominios)
5. Deberías ver tu dominio con un ✅ verde que dice **"Valid Configuration"**

### ⏳ Si ves un error o advertencia:
- **No te preocupes**, es normal
- Los cambios pueden tardar entre **5 y 30 minutos** en aplicarse
- Espera un poco y recarga la página

---

## 🎉 PASO 7: ¡Probar tu Sitio!

Después de esperar unos minutos:

1. Abre una **nueva pestaña** en tu navegador
2. Escribe tu dominio: `tudominio.com`
3. Presiona Enter
4. **¡Deberías ver tu sitio web!** 🎊

---

## 🆘 ¿Algo salió mal?

### ❌ Error: "Too many redirects" (Demasiadas redirecciones)
**Solución:**
1. Ve a Cloudflare → SSL/TLS
2. Cambia a "Full" o "Full (strict)"

### ❌ Error: "DNS_PROBE_FINISHED_NXDOMAIN"
**Solución:**
1. Verifica que escribiste bien los registros DNS
2. Espera 15-30 minutos más (los cambios DNS tardan en propagarse)

### ❌ La nube está naranja 🟠 en lugar de gris ⚪
**Solución:**
1. Ve a DNS en Cloudflare
2. Haz clic en la nube naranja de tus registros
3. Cámbiala a gris (DNS only)
4. Guarda los cambios

---

## 📋 Checklist Rápido

Antes de terminar, verifica que:

- [ ] Creaste el registro **A** con IP `76.76.21.21` y nube **GRIS**
- [ ] Creaste el registro **CNAME** con destino `cname.vercel-dns.com` y nube **GRIS**
- [ ] SSL/TLS está en modo **"Full"** o **"Full (strict)"**
- [ ] Esperaste al menos 10-15 minutos
- [ ] Tu sitio carga cuando visitas `tudominio.com`

---

## 🎯 Resumen Visual

```
TU DOMINIO EN CLOUDFLARE
         ↓
    [Nube Gris ⚪]  ← ¡Importante!
         ↓
    Apunta a Vercel
         ↓
    VERCEL muestra tu sitio
```

**Nube Gris = Cloudflare solo maneja el nombre del dominio**
**Nube Naranja = Cloudflare maneja todo (puede causar problemas con Vercel)**

---

## 💬 ¿Necesitas ayuda?

Si algo no funciona después de 30 minutos:
1. Revisa que las nubes estén en **GRIS** ⚪
2. Verifica que copiaste bien las direcciones IP y dominios
3. Espera un poco más (a veces tarda hasta 1-2 horas)

¡Listo! Tu sitio debería estar funcionando. 🚀
