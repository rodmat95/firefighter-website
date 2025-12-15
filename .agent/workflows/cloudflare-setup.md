---
description: Configuración de Cloudflare para dominio en Vercel
---

# Configuración de Cloudflare para Vercel

Esta guía te ayudará a configurar correctamente tu dominio en Cloudflare para que funcione con Vercel.

## ⚠️ Importante: Modo DNS Only (Nube Gris)

Vercel **recomienda usar el modo "DNS Only"** (nube gris) en lugar del modo "Proxied" (nube naranja) para evitar conflictos entre los proxies de Cloudflare y Vercel.

---

## Paso 1: Configurar los Registros DNS

1. Inicia sesión en tu cuenta de [Cloudflare](https://dash.cloudflare.com/)
2. Selecciona tu dominio
3. Ve a la sección **DNS** en el menú lateral
4. Añade o edita los siguientes registros:

### Registro A (Dominio principal)
- **Tipo**: `A`
- **Nombre**: `@` (representa tu dominio raíz, ej. `tudominio.com`)
- **Dirección IPv4**: `76.76.21.21`
- **Proxy status**: ⚪ **DNS only** (Nube Gris - DESACTIVADO)
- **TTL**: Auto

### Registro CNAME (Subdominio www)
- **Tipo**: `CNAME`
- **Nombre**: `www`
- **Destino**: `cname.vercel-dns.com`
- **Proxy status**: ⚪ **DNS only** (Nube Gris - DESACTIVADO)
- **TTL**: Auto

5. Haz clic en **Save** para cada registro

---

## Paso 2: Verificar la Configuración SSL/TLS

Aunque uses el modo "DNS Only", es importante verificar la configuración SSL:

1. Ve a **SSL/TLS** en el menú lateral de Cloudflare
2. En la pestaña **Overview**, verifica que el modo de encriptación esté en:
   - **Full** o **Full (strict)** ✅
   - **NO** uses "Flexible" ❌ (causaría bucles de redirección)

---

## Paso 3: Configurar Dominio Personalizado para R2 (Opcional)

Si quieres servir tus imágenes desde un subdominio personalizado (ej. `assets.tudominio.com`):

1. Ve a **R2** en el menú lateral
2. Selecciona tu bucket (ej. `firefighter-assets`)
3. Ve a la pestaña **Settings**
4. En la sección **Public Access**, busca **Custom Domains**
5. Haz clic en **Connect Domain**
6. Ingresa tu subdominio (ej. `assets.tudominio.com`)
7. Cloudflare creará automáticamente el registro DNS necesario
8. **Para R2, la nube naranja (Proxied) SÍ se recomienda** para aprovechar el caché de Cloudflare

---

## Paso 4: Verificar en Vercel

1. Ve a tu proyecto en [Vercel](https://vercel.com/)
2. Ve a **Settings** > **Domains**
3. Verifica que tu dominio aparezca como **Valid Configuration** ✅
4. Si aparece algún error, espera unos minutos para que se propaguen los cambios DNS

---

## Paso 5: Esperar Propagación DNS

Los cambios en DNS pueden tardar entre **5 minutos y 48 horas** en propagarse completamente, aunque normalmente es mucho más rápido (15-30 minutos).

Puedes verificar la propagación usando:
- [DNS Checker](https://dnschecker.org/)
- [What's My DNS](https://www.whatsmydns.net/)

---

## 🔍 Solución de Problemas

### Error: "Too Many Redirects"
**Causa**: Tienes la nube naranja activada en Cloudflare con SSL en modo "Flexible"
**Solución**: 
- Cambia a nube gris (DNS Only), O
- Cambia SSL/TLS a "Full (strict)"

### Error: "Invalid Configuration" en Vercel
**Causa**: Los registros DNS no apuntan correctamente
**Solución**: 
- Verifica que los registros A y CNAME estén correctos
- Asegúrate de que estén en modo "DNS Only" (nube gris)
- Espera unos minutos para la propagación

### El certificado SSL no se genera
**Causa**: Cloudflare está interceptando las validaciones de Let's Encrypt
**Solución**: 
- Usa nube gris (DNS Only) para permitir que Vercel gestione el SSL
- Vercel generará automáticamente el certificado SSL

---

## 📋 Checklist Final

- [ ] Registro A configurado con IP `76.76.21.21` en modo DNS Only
- [ ] Registro CNAME configurado con `cname.vercel-dns.com` en modo DNS Only
- [ ] SSL/TLS en modo "Full" o "Full (strict)"
- [ ] Dominio verificado en Vercel
- [ ] (Opcional) Subdominio personalizado configurado para R2
- [ ] Esperado tiempo de propagación DNS
- [ ] Sitio accesible desde el navegador

---

## 🎯 Resumen

| Servicio | Modo Recomendado | Razón |
|----------|------------------|-------|
| **Vercel (Web)** | 🔘 DNS Only (Gris) | Evita conflictos de proxy y permite que Vercel gestione SSL |
| **R2 (Assets)** | 🟠 Proxied (Naranja) | Aprovecha el caché de Cloudflare y reduce costos |

---

## 📚 Referencias

- [Vercel: Using Cloudflare with Vercel](https://vercel.com/docs/concepts/projects/custom-domains#cloudflare)
- [Cloudflare: DNS Proxy Status](https://developers.cloudflare.com/dns/manage-dns-records/reference/proxied-dns-records/)
- [Cloudflare: SSL/TLS Encryption Modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/)
