# Sistema de Diseño — AVL Asesorías

Este documento es la fuente única de verdad del diseño visual del sitio. Describe los tokens, componentes y patrones que **ya existen en el código** (`tailwind.config.cjs`, `src/styles/global.css`, `src/components/`, `src/pages/`), para que cualquier página o componente nuevo se vea coherente con el resto sin tener que inspeccionar el código existente.

> Si cambias un token o un componente, actualiza también este archivo en el mismo PR (ver [Gobernanza](#12-gobernanza)).

## Índice
1. [Principios](#1-principios)
2. [Color](#2-color)
3. [Tipografía](#3-tipografía)
4. [Espaciado y layout](#4-espaciado-y-layout)
5. [Radios, bordes y sombras](#5-radios-bordes-y-sombras)
6. [Componentes](#6-componentes)
7. [Patrones de sección](#7-patrones-de-sección)
8. [Motion](#8-motion)
9. [Iconografía e ilustración](#9-iconografía-e-ilustración)
10. [Imágenes y assets](#10-imágenes-y-assets)
11. [Accesibilidad](#11-accesibilidad)
12. [Voz y contenido](#12-voz-y-contenido)
13. [Inconsistencias y deuda de diseño](#13-inconsistencias-y-deuda-de-diseño)
14. [Gobernanza](#14-gobernanza)

---

## 1. Principios

AVL Asesorías ofrece asesorías académicas (presenciales en Cúcuta, remotas en toda Colombia). El diseño debe transmitir:

- **Confianza académica**: azul institucional, tipografía clara, mucho espacio en blanco.
- **Cercanía**: tono cálido en el copy, iconografía redondeada, toques de color cálido (naranja/dorado) como acento, nunca como protagonista.
- **Claridad**: jerarquía tipográfica simple, una idea por sección, CTAs explícitos ("Contáctanos", "Comienza Ahora").

Fuentes de tokens: `tailwind.config.cjs` (color, fuentes, spacing, animaciones) + `src/styles/global.css` (`@layer base/components/utilities`, scrollbar, keyframes extra).

---

## 2. Color

### 2.1 Escalas

| Escala | 50 | 500 (base) | 700 | 900/950 |
|---|---|---|---|---|
| `primary` | `#f4f7fa` | **`#2A5C8A`** | `#204568` | `#152d43` / `#0d1d2b` |
| `accent` | `#fff7f4` | **`#FF6B35`** | `#bf5028` | `#7d351a` |
| `neutral` | `#f8fafc` | `#64748b` | `#334155` | `#0f172a` |
| `success` | — | `#4CAF50` (único valor) | — | — |

`primary` es la escala dominante del sitio: el gradiente `from-primary-500 to-primary-700` es el gradiente de marca y aparece en botones, mosaicos de icono, subrayado del nav, etc. `accent` (naranja) es un color de **énfasis puntual**, no estructural.

### 2.2 Roles semánticos

| Rol | Clase(s) | Uso |
|---|---|---|
| Texto de cuerpo | `text-neutral-700` | párrafos |
| Texto secundario | `text-neutral-600` | descripciones de apoyo |
| Títulos | `text-neutral-800` (o blanco sobre fondo oscuro) | h2/h3/h4 definidos globalmente en `global.css` |
| Marca / énfasis en título | `.text-gradient` (`from-primary-600 to-primary-800`) | palabra clave dentro de un `<h2>` |
| Fondo de página | `bg-gradient-to-br from-neutral-50 to-primary-50/30` | `<body>` en `Layout.astro` |
| Interacción primaria | `primary-500→700` | `.btn-primary`, iconos de check, mosaicos |
| Interacción de acento | `accent-500/700` | hover de redes sociales (footer), `.btn-secondary`, acentos decorativos en SVG |
| Éxito / check | `success` (`#4CAF50`) | ícono de check en Banner |

### 2.3 Gradientes canónicos (nombrarlos así en código/PRs)

| Nombre | Clases | Dónde se usa |
|---|---|---|
| **brand** (texto) | `.text-gradient` → `bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent` | palabra destacada en títulos |
| **hero** | `bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900` | `Banner` variante `gradient` |
| **light section** | `bg-gradient-to-br from-primary-50 to-neutral-50` | secciones "intermedias" (stats, pasos, CTA secundario) |
| **dark section** | `bg-gradient-to-br from-primary-900 to-primary-950` | secciones de cierre fuerte (valores, ventajas, aliados B2B) |
| **cta** | `bg-gradient-to-br from-primary-600 to-primary-800` | sección final de contacto (`#contacto`) |
| **footer** | `bg-gradient-to-br from-primary-950 to-primary-900` | `Footer.astro` |
| **icon tile** | `bg-gradient-to-r from-primary-500 to-primary-700` | mosaico cuadrado/circular de icono (el gradiente más repetido del sitio) |

### 2.4 Reglas
- No introducir colores Tailwind por defecto (`blue-*`, `green-*`, `yellow-*`, `pink-*`, `gray-*`) fuera de `primary`/`accent`/`neutral`/`success`. Ver deuda §13.2.
- Todo hex "suelto" dentro de un SVG decorativo debe salir de la paleta anterior; si se necesita un tono nuevo, se añade como token en `tailwind.config.cjs`, no como literal.

---

## 3. Tipografía

- **Cuerpo**: `Inter` (300–700), vía `font-sans` (default en `<body>`).
- **Títulos**: `Poppins` (400–800), vía `font-heading`, aplicado globalmente a `h1–h6` en `@layer base`.
- Ambas se cargan desde Google Fonts en `global.css`, con `preconnect` en `Layout.astro`.

### Escala (definida en `@layer base` de `global.css`)

| Elemento | Clases |
|---|---|
| `h1` | `text-4xl lg:text-5xl font-heading font-semibold` |
| `h2` | `text-3xl lg:text-4xl` |
| `h3` | `text-2xl lg:text-3xl` |
| `h4` | `text-xl lg:text-2xl` |
| Hero (`Banner`) | hasta `text-6xl` en desktop (clase inline, no global) |
| Lead / intro de sección | `text-xl` |
| Cuerpo | tamaño base, `leading-relaxed` |
| Texto pequeño / badge | `text-sm` / `text-xs` |

### Patrón de título de sección (repetido en todas las páginas)
```astro
<div class="text-center mb-12">
  <h2 class="text-3xl lg:text-4xl font-bold text-gradient mb-4">
    Título de la Sección
  </h2>
  <p class="text-xl text-neutral-700 max-w-3xl mx-auto">
    Copy de apoyo, 1–2 líneas.
  </p>
</div>
```
Usa `.text-gradient` cuando la sección abre contenido nuevo (servicios, aliados, testimonios); usa `text-neutral-800` plano cuando es una sección secundaria dentro de la misma página (stats, pasos).

---

## 4. Espaciado y layout

| Token / clase | Valor | Uso |
|---|---|---|
| `.container-custom` | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` | ancho máximo de todo el contenido |
| `.section-padding` | `py-16 lg:py-24` | padding vertical estándar de `<section>` |
| `spacing.18` / `spacing.22` | `4.5rem` / `5.5rem` | ajustes finos puntuales (poco usados) |
| Gaps de grid | `gap-4` (compacto) · `gap-6/8` (cards) · `gap-12` (hero de dos columnas) | |
| Breakpoints | `sm` (formularios/botones) · `md` (grids de 2 col) · `lg` (navegación desktop, grids de 3–4 col, tipografía grande) | consistente con Tailwind default |
| Hero | `min-h-[80vh]` | única altura mínima "especial" del sitio |
| `aspectRatio.phone` | `aspect-phone` → `9 / 19.5` | marco de teléfono en capturas de apps móviles (§10.1) |

Grids responsivas típicas: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (servicios, stats) y `...lg:grid-cols-4` (footer, aliados).

---

## 5. Radios, bordes y sombras

| Nivel | Clase | Uso |
|---|---|---|
| Botones, mosaicos de icono | `rounded-lg` | el radio más usado (31 ocurrencias) |
| Tarjetas (`.card`) | `rounded-xl` | |
| Paneles destacados (misión/visión) | `rounded-2xl` | |
| Badges, avatares, iconos circulares | `rounded-full` | (29 ocurrencias) |
| Sombra de reposo | `shadow-lg` (tarjetas, navbar) / `shadow-sm` (tabs, badges) | |
| Sombra en hover | `shadow-xl` / `shadow-2xl` | `.card:hover`, banner |
| Borde sutil | `border border-neutral-100` → `hover:border-primary-200` | `.card` |

Regla: un elemento interactivo sube un nivel de sombra en `:hover` con `duration-300`; nunca salta más de un nivel de golpe.

---

## 6. Componentes

### 6.1 Botones — clases utilitarias (no hay `Button.astro`)
Base: `.btn` (`px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 focus:ring-4`).

| Variante | Clase | Uso | Notas |
|---|---|---|---|
| Primario | `.btn-primary` | acción principal sobre fondo claro | gradiente `primary-500→700` |
| Secundario | `.btn-secondary` | acción de énfasis | fondo `accent-500`, texto `neutral-900` — **verificar contraste**, ver §13.8 |
| Outline | `.btn-outline` | acción secundaria sobre fondo claro | borde `primary-500` |
| Sobre fondo oscuro (primario invertido) | `btn bg-white text-primary-700 hover:bg-neutral-100` | CTA sobre `Banner`/CTA final | **inline, no es una clase CSS**; ver deuda §13.5 |
| Sobre fondo oscuro (outline invertido) | `btn btn-outline border-white text-white hover:bg-white hover:text-primary-700` | idem | combina `.btn-outline` + overrides inline |

```astro
<a href="/servicios" class="btn btn-primary">Ver Servicios</a>
<a href="#contacto" class="btn btn-outline border-white text-white hover:bg-white hover:text-primary-700">Contáctanos</a>
```

### 6.2 `.card`
`bg-white rounded-xl shadow-lg border border-neutral-100 transition-all duration-300 hover:shadow-xl hover:border-primary-200`. Se usa directo (`<div class="card p-6">`) o a través de `Cards.astro`.

### 6.3 Badge / pill
No es un componente, es un patrón de clases:
```astro
<span class="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">Texto</span>
```
Variante con gradiente suave: `bg-gradient-to-r from-primary-100 to-primary-200/50`.

### 6.4 `Banner.astro`
Hero de página completa. Props: `title`, `subtitle?`, `description?`, `ctaText="Contáctanos"`, `ctaUrl="#contacto"`, `backgroundImage?`, `variant: 'default' | 'gradient' | 'image'`.
- `default`: fondo blanco, título con `.text-gradient`.
- `gradient`: fondo con el gradiente **hero** (§2.3), texto blanco. Es el usado en todas las páginas actuales.
- `image`: fondo oscuro + imagen con overlay — **definido pero sin uso actual**, probar antes de confiar en él.
Incluye siempre un segundo botón fijo "Ver Servicios" → considerar si debe ser configurable si se reutiliza en una página sin servicios.

### 6.5 `Cards.astro`
Props: `cards: {title, description, icon?, image?, href?, badge?}[]`, `variant: 'default'|'services'|'testimonials'` (variant no cambia estilos actualmente, solo documenta intención), `columns: 1-4`.
- Si `card.href`, toda la tarjeta es clicable (overlay `<a>` con `aria-label`) y gana flecha "Saber más".
- Si `card.icon`, renderiza un **icon tile** (§2.3) con el `path` del icono.
- ⚠️ No pasar más de 3 cards si quieres que el `animation-delay` funcione (ver deuda §13.6).

### 6.6 `Tabs.astro`
Props: `tabs: {id, label, active?}[]`, `variant: 'default'|'pills'|'underline'`. El contenido va en `<Tabs>…</Tabs>` como paneles hermanos:
```astro
<Tabs tabs={serviceTabs} variant="pills">
  <div class="tab-panel" data-tab-content="colegio">...</div>
  <div class="tab-panel hidden" data-tab-content="universidad">...</div>
</Tabs>
```
El primer panel va sin `hidden`; el resto con `hidden`. El script interno maneja el cambio de clases y `aria-selected`.

### 6.7 `TeamList.astro`
Props: `members: {name, role, bio?, avatar?, social?}[]`, `variant: 'grid'|'list'`, `columns: 2-4`. Si no hay `avatar`, genera un avatar SVG con iniciales y un gradiente — **los gradientes de fallback no son de marca**, ver deuda §13.3. Siempre usar `avatar` con foto real cuando esté disponible (ver `public/assets/*.jpeg`).

### 6.8 `Navbar.astro`
Sticky (`sticky top-0 z-50`), fondo `bg-white/95 backdrop-blur-sm`. Subrayado animado por `group-hover` en desktop; menú hamburguesa con script propio en móvil. Lista de enlaces y el CTA final están hardcodeados en el componente — para añadir una página al nav, editar `navItems` aquí y en `Footer.astro` (`quickLinks`), que están duplicados.

### 6.9 `Footer.astro`
4 columnas (`lg:grid-cols-4`): marca+redes, enlaces rápidos, servicios, contacto. Fondo **footer gradient** (§2.3). Redes sociales con `hover:bg-accent-500` como único uso "grande" del acento naranja.

### 6.10 Componentes no usados — no copiar su patrón
- `Header.astro`: no se importa en ninguna página. No seguir su estructura (`<h1>` suelto sin estilos).
- `SocialIcons.jsx`: componente React que depende de `@fortawesome/react-fontawesome`, no instalado en `package.json`. El patrón vigente de iconos sociales es el SVG inline de `Footer.astro`.

### 6.11 Componentes de portafolio personal (`src/components/portfolio/`)
Usados exclusivamente por `src/pages/equipo/[slug].astro` (ver §7.8). Son extensiones del sistema, no clases nuevas: reutilizan `.btn`, `.card`, el gradiente hero, el icon tile y las tarjetas flotantes ya definidos.

| Componente | Props clave | Qué es |
|---|---|---|
| `ProfileHero.astro` | `name, role, headline?, location?, avatar, contact?, highlights?, compact?` | Variante de `Banner` para una persona: foto circular en vez de ilustración SVG, mismas tarjetas flotantes, botones de contacto + redes (email/LinkedIn/GitHub/web). `compact` reduce la altura para el estado "en construcción". |
| `SectionHeader.astro` | `title, description?, gradient?, light?` | El patrón de título de sección de §3 convertido en componente, con variante `light` para fondos oscuros. |
| `ProjectCard.astro` | `name, slug, type: 'mobile'\|'web', visibility?, org?, description, stack?, metrics?, links?` | Tarjeta de proyecto: `ProjectMedia` como cabecera, badge de organización + badge de tipo, métricas como checklist, stack como chips `bg-neutral-100`, y un pie "dónde consultarlo" que cambia según `type`/`visibility` (§10.1). |
| `ProjectMedia.astro` | `name, slug, type` | Resuelve las capturas del proyecto vía `src/utils/projectMedia.ts`. `web` → una imagen `aspect-video object-cover object-top`; `mobile` → hasta 3 capturas en marco de teléfono (`aspect-phone`) sobre un escenario claro. Sin capturas, muestra un icon tile de placeholder (en `dev` con la medida exacta a soltar). |
| `StoreBadge.astro` | `store: 'appStore'\|'playStore', href, appName` | Insignia oscura (`bg-neutral-900`) con el logo de la tienda y texto en dos líneas, para apps móviles públicas. |
| `Timeline.astro` | `items: {company, role, location?, period, context?, achievements?}[]` | Línea de tiempo vertical (`border-l` + nodos con gradiente de marca) para experiencia laboral. |
| `SkillGroup.astro` | `category, items[]` | Tarjeta `bg-white/10 backdrop-blur-sm` para una categoría de habilidades, pensada para la sección oscura. |
| `CredentialList.astro` | `title, education? \| certifications? \| languages?` | `.card` genérica para educación, certificaciones o idiomas (una de las tres listas por instancia). |
| `ComingSoon.astro` | `name` | Estado de "portafolio en construcción" para miembros en `draft` (§7.8). |

---

## 7. Patrones de sección

Reutilizar estos bloques en vez de inventar estructura nueva:

1. **Cabecera de sección centrada** — ver §3, patrón de título.
2. **Mosaico de icono + texto** (servicios, aliados, ventajas):
   ```astro
   <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
     <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="..."/></svg>
   </div>
   ```
   Circular (`rounded-full`, `w-16 h-16`) para pasos/categorías; cuadrado (`rounded-lg`, `w-12 h-12`) para listas de ítems.
3. **Checklist de beneficios** (home, "¿Por qué elegirnos?"): icono de check en círculo `w-6 h-6` + `<h3>` + `<p>` en `flex items-start space-x-4`.
4. **Rating / estrellas** (testimonios): 5 `<svg>` de estrella, `text-yellow-400` si `filled` / `text-neutral-300` si no — pendiente de alinear con paleta, ver §13.2.
5. **CTA de contacto** (`id="contacto"`, siempre al final de `index.astro` y `nosotros.astro`): fondo **cta gradient**, texto centrado, botones WhatsApp (verde de marca de WhatsApp, no de la paleta propia — aceptado como excepción porque es un logo externo) + Email (`.btn-outline` invertido).
6. **Tarjeta de aliado/partner** (`aliados.astro`): logo + nombre + badge de categoría dentro de `.card`.
7. **Ritmo de fondos entre secciones** de una página larga: blanco → *light section* → blanco → *dark section* → (a veces) *cta*. No encadenar dos secciones oscuras seguidas ni dos blancas con el mismo contenido visual sin un cambio de fondo entre medio.
8. **Página de perfil personal** (`/equipo/[slug]`, fuente: `src/content/team/*.json`): cada miembro del equipo tiene una página propia.
   - **`status: "published"`** (ej. Anderson): `ProfileHero` → *Sobre mí* (blanco, resumen + franja de métricas) → *Proyectos destacados* `#proyectos` (light section, grid de `ProjectCard`) → *Experiencia* (blanco, `Timeline`) → *Habilidades* (dark section, grid de `SkillGroup`) → *Formación* (light section, 3 `CredentialList`) → *CTA de contacto* `#contacto` (cta gradient). Sigue el ritmo de fondos del punto 7.
   - **`status: "draft"`** (Vanessa, Laura mientras no se cargue su información): `ProfileHero` en modo `compact` (solo foto, nombre, rol y LinkedIn) + `ComingSoon`. La página lleva `noindex` vía `Layout` hasta que pase a `published`.
   - `TeamList.astro` en `/nosotros` enlaza a cada página con "Ver portafolio" cuando el miembro trae `href`.

---

## 8. Motion

| Animación | Definición | Uso |
|---|---|---|
| `animate-fade-in` | `fade-in 0.6s ease-out` | entrada de tarjetas/flotantes |
| `animate-slide-up` | `slide-up 0.6s ease-out` | definida, uso puntual |
| `animate-bounce-gentle` | rebote sutil infinito | elemento flotante decorativo en SVG del hero |
| `.float-animation` | `float 3s ease-in-out infinite` (en `global.css`, fuera de Tailwind) | ilustración del hero |
| `.animation-delay-200/400/600` | delays fijos | escalonar entrada de tarjetas flotantes del Banner |
| `duration-300` | — | **duración estándar** de toda transición de hover (botones, cards, nav, footer) |
| `hover:scale-105` | — | botones |
| `hover:-translate-y-2` (`.hover-lift`) | — | tarjetas, iconos sociales |

Regla: toda animación nueva usa `duration-300` salvo que sea una entrada de página (`0.6s`). Las animaciones `infinite` (`float`, `bounce-gentle`, `animate-pulse`) deben respetar `prefers-reduced-motion` — pendiente, ver deuda §13.9.

---

## 9. Iconografía e ilustración

- **Iconos UI**: SVG inline estilo Heroicons, `viewBox="0 0 24 24"`, outline (`stroke`, `stroke-width="2"`, `stroke-linecap/linejoin="round"`) o solid (`fill="currentColor"`). Tamaños: `w-4 h-4` (inline en texto) · `w-5 h-5` (redes, listas) · `w-6 h-6` (mosaicos, CTA).
- **Ilustraciones decorativas**: SVG a medida (hero, sección "por qué elegirnos") con gradiente de marca `#2A5C8A → #193753` o, cuando se quiere contraste cálido, `#2A5C8A → #FF6B35`. El dorado `#ffd700` se usa como partícula/chispa decorativa — es el único hex fuera de la paleta aceptado explícitamente como "acento de ilustración"; no usarlo en UI funcional (botones, badges, texto).
- **Emojis**: solo en el `subtitle` tipo pill del `Banner` (ej. "🎓 Excelencia Educativa", "🤝 Colaboraciones"), uno por página, nunca en títulos ni botones.

---

## 10. Imágenes y assets

- `public/favicon.svg`: logo de marca, se reutiliza como "logo" en `Navbar` y `Footer` (`w-10 h-10`).
- `public/assets/*.jpeg`: fotos de equipo (`AndersonPatino`, `LauraJaimes`, `VanessaStevenson`) — pasar siempre como `avatar` a `TeamList`, nunca dejar que genere el avatar con iniciales si hay foto real disponible.
- `public/assets/*.png`: logos de aliados (`drillsoft`, `ayzatec`, `cableexito`, `xyzqua`, `cootranscarga`) — mostrar en tamaño contenido (`object-contain`), fondo blanco o neutro detrás, nunca sobre fondo oscuro sin padding.
- Imagen OG (`/og-image.jpg`, referenciada en `Layout.astro`) — **confirmar que el archivo existe en `public/`** antes de depender de las meta tags de redes sociales.

### 10.1 Capturas de proyectos (`ProjectCard` / `ProjectMedia`)

Convención de carpetas: `public/assets/projects/<slug>/`, con los archivos nombrados `1.png`, `2.png`, `3.png` (también válidos `.jpg`, `.jpeg`, `.webp`, `.avif`). El `slug` es el del proyecto en `src/content/team/*.json`. No hace falta tocar el JSON ni el código: `ProjectMedia.astro` lee la carpeta en build vía `src/utils/projectMedia.ts` y muestra lo que encuentra.

| Tipo (`type`) | Cantidad | Proporción | Tamaño recomendado | Peso máx. | Encuadre |
|---|---|---|---|---|---|
| `web` | 1 | **16:9** | **1600 × 900 px** (mín. 1280×720) | 400 KB | captura del viewport sin la barra del navegador; `object-cover object-top` recorta por abajo si hace falta |
| `mobile` | hasta 3 | **9:19.5** | **1080 × 2340 px** | 300 KB c/u | pantalla completa del dispositivo, dentro de un marco oscuro (`aspect-phone`) |

Sin capturas cargadas se muestra un placeholder con el icon tile de la marca (en producción) y, solo en `npm run dev`, el texto con la medida exacta pendiente de agregar — así nunca se publica una tarjeta rota, y en local es evidente qué falta.

---

## 11. Accesibilidad

- Idioma del documento: `<html lang="es">`.
- Foco visible: `.btn` incluye `focus:outline-none focus:ring-4 focus:ring-opacity-50` — todo elemento interactivo nuevo debe mantener un anillo de foco visible, no solo `outline-none`.
- `aria-label` obligatorio en: botón de menú móvil, íconos sociales, enlaces de overlay en `Cards`, íconos sociales en `TeamList`.
- `Tabs.astro` gestiona `role="tab"` y `aria-selected`; si se añade un panel, debe llevar `data-tab-content` emparejado con el `id` del tab.
- Pendiente de verificar formalmente (ver §13.8): contraste `text-accent-700` sobre fondo `primary-950` (footer) y `text-neutral-900` sobre `bg-accent-500` (`.btn-secondary`).
- Todas las imágenes de contenido (fotos de equipo, logos de aliados) deben llevar `alt` descriptivo, no vacío (ya se cumple en `TeamList`; mantenerlo en nuevas imágenes).

---

## 12. Voz y contenido

- Tono cercano y profesional, tuteo directo al estudiante/cliente ("Transforma tu futuro académico", "Contáctanos hoy mismo").
- CTAs cortos y en imperativo: "Contáctanos", "Comienza Ahora", "Ver Servicios", "Conoce Nuestro Equipo".
- Títulos de sección en Title Case descriptivo, no preguntas largas salvo en "¿Por qué elegir…?" / "¿Listo para…?" (se usan con moderación, como gancho, no como norma).
- Datos de contacto siempre consistentes con `Footer.astro`/`.env.example`: teléfono `+57 322 369 5520`, correo `info@avlasesorias.com`, ubicación "Cúcuta, Norte de Santander, Colombia".

---

## 13. Inconsistencias y deuda de diseño

Detectadas al documentar el sistema; no se corrigen en este cambio, quedan registradas para priorizar después.

1. **Hex sin token** (`#ffd700`, `#3d8b40`, `#10b981`, `#ff006e`, `#dc4dff`, `#8b5cf6`, `#7c3aed`, `#3b82f6`, `#06b6d4`, `#059669`…) en SVGs decorativos y en `TeamList`. → Mover los que son estructurales a `tailwind.config.cjs`; dejar solo `#ffd700` como excepción documentada (§9).
2. **Colores Tailwind por defecto fuera de paleta**: `text-gray-600` (SocialIcons), `blue-*`/`green-*` (fondos de video en testimonios, tarjetas en servicios), `yellow-400`/`neutral-300` (estrellas), `pink-600`. → Sustituir por equivalentes de `primary`/`accent`/`neutral` o justificar la excepción (p. ej. amarillo de rating).
3. **`TeamList.generateAvatar`**: paleta de gradientes (magenta, violeta, etc.) no relacionada con la marca. → Redefinir con tonos derivados de `primary`/`accent`/`neutral`.
4. **Acento naranja infrautilizado**: solo aparece en hover de redes y `.btn-secondary`; no hay un rol claro de "cuándo usar accent vs. primary" en el contenido actual. → Definir 1–2 usos canónicos adicionales o reducir su alcance en el token config.
5. **Variantes de botón "sobre fondo oscuro" son overrides inline** (`btn bg-white text-primary-700 hover:bg-neutral-100`, `btn btn-outline border-white text-white hover:bg-white hover:text-primary-700`) en vez de clases `.btn-primary-inverse`/`.btn-outline-inverse` en `global.css`. → Promoverlas a `@layer components`.
6. **`Cards.astro` genera `animation-delay-${index*200}` dinámicamente**: Tailwind JIT no puede detectar clases construidas en runtime; solo "funciona" porque `Banner.astro` usa los mismos valores de forma literal en otro archivo y el purge los conserva por coincidencia. → Generar esas clases con `style="animation-delay: ..."` o limitarlas a una lista fija conocida por el compilador.
7. **Componentes muertos**: `Header.astro` (no importado) y `SocialIcons.jsx` (depende de `@fortawesome/react-fontawesome`, no instalado, y de React, no configurado como integración de Astro). → Eliminarlos o completarlos; mientras tanto, no usarlos como referencia.
8. **Contraste por verificar**: `text-accent-700` sobre `primary-950` (footer) y `text-neutral-900` sobre `bg-accent-500` (`.btn-secondary`). → Calcular ratio WCAG AA antes de reutilizar esas combinaciones en texto pequeño.
9. **Sin `prefers-reduced-motion`**: `float`, `bounce-gentle` y `animate-pulse` corren siempre, sin respetar la preferencia de accesibilidad del sistema. → Añadir media query en `global.css`.
10. **`postcss.config.cjs` y `postcss.config.mjs` duplicados** con el mismo contenido. → Conservar solo uno (el proyecto es `"type": "module"`, así que `.mjs` es el consistente).

---

## 14. Gobernanza

Antes de mergear un cambio de UI:
- [ ] ¿El color usado está en `primary`/`accent`/`neutral`/`success`? Si no, ¿es una excepción ya documentada (§9, dorado decorativo) o hay que añadir el token a `tailwind.config.cjs`?
- [ ] ¿El radio, la sombra y la duración de transición coinciden con un nivel de la tabla de §5/§8?
- [ ] ¿El título de sección sigue el patrón de §3?
- [ ] ¿El componente nuevo reutiliza `.btn`/`.card`/`Cards`/`Tabs`/`TeamList`/`Banner` en vez de reimplementar su comportamiento?
- [ ] ¿Se añadió `aria-label`/`alt` donde corresponde (§11)?
- [ ] ¿Se actualizó este archivo (`DESIGN.md`) si se introdujo o cambió un token, componente o patrón?

Para añadir un token nuevo: definirlo en `tailwind.config.cjs` (nunca como hex literal repetido en varias páginas) y documentarlo aquí en la tabla correspondiente antes de usarlo en una página.
