# 🚀 ShapeRush — Deploy en 3 pasos (todo gratis)

---

## PASO 1 — Base de datos gratis en Neon

1. Ve a **https://neon.tech** → "Sign Up" (gratis, sin tarjeta)
2. Crea un proyecto llamado `shaperush`
3. En el dashboard, abre **SQL Editor** y pega el contenido de `setup.sql`
4. Copia tu **Connection String** (empieza con `postgresql://...`)

---

## PASO 2 — Subir código a GitHub

1. Ve a **https://github.com/new** y crea un repo llamado `shaperush`
2. Sube todos estos archivos al repo (usa la interfaz web o GitHub Desktop)

---

## PASO 3 — Desplegar en Vercel (gratis)

1. Ve a **https://vercel.com** → "Sign Up" con tu cuenta de GitHub
2. Haz clic en **"Add New Project"** → selecciona tu repo `shaperush`
3. En **"Environment Variables"**, agrega:
   - **Name:** `DATABASE_URL`
   - **Value:** (la connection string de Neon del Paso 1)
4. Haz clic en **"Deploy"**

¡En 2 minutos tendrás tu URL como `https://shaperush-xxx.vercel.app`! 🎉

---

## Estructura del proyecto

```
shaperush/
├── public/
│   └── index.html      ← El juego completo
├── api/
│   ├── user.js         ← POST /api/user
│   ├── score.js        ← POST /api/score
│   └── leaderboard.js  ← GET  /api/leaderboard
├── setup.sql           ← Script de base de datos
├── vercel.json         ← Config de Vercel
└── package.json
```
