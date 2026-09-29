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

## Cómo se juega

- Abajo ves el indicador **ATRAPA**: esa es tu forma. Muévete entre 3 carriles (◀ ▶ / A D / toque o deslizar) y **atrápala**; al hacerlo evolucionas a la siguiente forma y color.
- Las demás formas quitan una vida (o terminan la partida en el modo **☠ 1 VIDA**, con récord propio y sin entrar al ranking global). Puedes esquivarlas cambiando de carril o saltando (▲ / W / deslizar arriba).
- Combo: 5 aciertos seguidos = x2, 10 = x3, 20 = x4. Fallar o dejar pasar tu forma reinicia el combo.
- Precisión: **PERFECT** (x1.5) si ya estás alineado en el carril, **GREAT** (x1.25), **GOOD** (x1).
- Puntos por acierto = `100 × combo × precisión`.
- **Cambios de dirección:** tras 12 formas atrapadas (y luego cada 10-16) aparece un aviso de ~2 s: "DIRECTION CHANGE", flechas por el borde donde entrarán las formas y un círculo punteado donde quedarás. Después las formas vienen de arriba, abajo, izquierda o derecha, y tu personaje pasa al lado contrario. Las formas que quedaban en pantalla desaparecen sin castigo.
- **Cada partida empieza desde otro punto de vista:** la primera vez es la clásica (formas de arriba a abajo); después la dirección inicial nunca se repite dos partidas seguidas y se muestra un aviso breve con los controles (`DIRECTION.VARY_START`).
- Controles según la dirección (teclado, WASD o deslizar): el eje **perpendicular** al avance mueve de carril y el eje **paralelo** hacia donde nacen las formas es el salto. Espacio siempre salta. En pantalla táctil, tocar la mitad izquierda/derecha (o superior/inferior) también mueve.
- **Boss final (VOID MAW):** al atrapar 35 formas aparece un aviso y empieza la pelea. El control pasa a ser **libre** (arrastra el dedo, ratón, o WASD/flechas). Tu nave dispara sola; el boss lanza balas hechas con las formas de tu tema (nunca se parecen a tu forma). Cada pocos segundos suelta una copia brillante de tu forma: atrápala para evolucionar (combo y puntos como siempre) y lanzar un **disparo potente**. Tiene 3 fases (más rápido y denso al bajar su vida; al cambiar de fase recuperas 1 vida si te falta alguna).
- Vencerlo da una bonificación (5.000 + 1.500 por vida restante) y **skins de aura** que se guardan en el dispositivo: 👑 Gold (vencer al boss), 🌌 Void (sin recibir daño), 💀 Skull (en modo ☠ 1 VIDA). Si pierdes contra el boss puedes usar **⚔ Retry Boss** para volver directo a la pelea (práctica: no cuenta para récords ni ranking, pero sí desbloquea skins).
- La dificultad sube poco a poco (EASY START → MEDIUM FLOW → HIGH INTENSITY). Si cometes 2 errores seguidos deja de subir (nunca baja).
- Se guardan en tu dispositivo (localStorage): mejor puntuación, estadísticas y temas desbloqueados (Emoji 1.500, Pixel 3.500, Neon 5.000 puntos totales).

## Balance y depuración

- Todos los valores de balance están en el objeto `CONFIG` al inicio del `<script>` de `index.html` (puntos, umbrales de combo, precisión, velocidad mínima/máxima, ritmo de dificultad, shake, partículas, hitos, desbloqueos en `THEMES` y `SKINS`, `BOSS` para vida, ataques y recompensas del jefe, `DIRECTION` para los cambios de dirección; pon `DIRECTION.ENABLED: false` para desactivarlos).
- **Shift+D** (o `?debug` en la URL) muestra telemetría local: score, tiempo, dificultad/fase, combo, aciertos/fallos. No se envía a ningún servidor.
- **M** silencia el sonido.

## Estructura del proyecto

```
shaperush/
├── index.html          ← El juego completo (HTML + CSS + JS)
├── api/
│   ├── user.js         ← POST /api/user
│   ├── score.js        ← POST /api/score
│   └── leaderboard.js  ← GET  /api/leaderboard
├── setup.sql           ← Script de base de datos
├── vercel.json         ← Config de Vercel
└── package.json
```

> Nota: el ranking global lo reporta el cliente, así que no es a prueba de trampas. `api/score.js` solo valida que el score sea un entero razonable.
