import fs from 'node:fs';
import path from 'node:path';

/**
 * Especificación de capturas de proyecto (ver DESIGN.md §10 "Capturas de proyectos").
 *
 * | Tipo     | Cantidad | Proporción | Tamaño recomendado   | Peso máx. |
 * |----------|----------|------------|----------------------|-----------|
 * | web      | 1        | 16:9       | 1600 × 900 px        | 400 KB    |
 * | mobile   | hasta 3  | 9:19.5     | 1080 × 2340 px       | 300 KB    |
 *
 * Las imágenes se colocan en `public/assets/projects/<slug>/` como `1.png`, `2.png`, `3.png`
 * (también se aceptan .jpg, .jpeg, .webp, .avif). No hace falta tocar el JSON ni el código:
 * basta con soltar los archivos en la carpeta del proyecto.
 */
export const PROJECT_MEDIA = {
  web: { ratio: '16:9', width: 1600, height: 900, max: 1 },
  mobile: { ratio: '9:19.5', width: 1080, height: 2340, max: 3 },
} as const;

export type ProjectType = keyof typeof PROJECT_MEDIA;

const VALID_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);

/**
 * Lee `public/assets/projects/<slug>/` y devuelve las rutas públicas de las capturas
 * disponibles (hasta el máximo permitido para ese tipo de proyecto), ordenadas por nombre.
 * Devuelve [] si la carpeta no existe o no tiene imágenes válidas.
 */
export function getProjectImages(slug: string, type: ProjectType): string[] {
  const { max } = PROJECT_MEDIA[type];
  const dir = path.join(process.cwd(), 'public', 'assets', 'projects', slug);

  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }

  return files
    .filter((file) => VALID_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .slice(0, max)
    .map((file) => `/assets/projects/${slug}/${file}`);
}
