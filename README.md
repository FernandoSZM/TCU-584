# AgroGames — Rediseño

Proyecto educativo de juegos sobre agricultura, alimentación y clasificación de residuos.

## Cómo ejecutar en Fedora

```bash
cd Agro-Games-Redesign
python3 -m http.server 8000
```

Abre http://localhost:8000 en tu navegador.

## Contenido

- `index.html`: página principal.
- `space_defenders.html`: Protege la Huerta.
- `space_defenders_caña.html`: instrucciones de Protege la Huerta.
- `AlimentaMatch/menuAlimentaMatch.html`: selección de niveles.
- `AlimentaMatch/ComoJugarAlimentaMatch.html`: guía de AlimentaMatch.
- `ecoClasificacion/ecoClasificacion.html`: EcoClasificación.
- `ecoClasificacion/comoJugar.html`: guía de EcoClasificación.
- `guia.css`: estilos compartidos para las guías y el menú de niveles.

## Alcance de esta entrega

Se conservaron los archivos JavaScript y las mecánicas originales de los juegos. Se rediseñaron las guías de AlimentaMatch y EcoClasificación y el menú de niveles para unificar su apariencia con la página de inicio y la guía de Protege la Huerta ya existentes en el ZIP de origen.

Los controles y comportamientos internos de los juegos requieren pruebas manuales en navegador; este paquete no representa una reescritura de las mecánicas.

## Protege la Huerta — nueva versión

La pantalla de **caña de azúcar** (`space_defenders.html`) tiene HUD, partículas, animaciones, pausa, controles táctiles, menú inicial y niveles progresivos. Se reemplazó únicamente `space.js` y `space.css` para esta modalidad. La modalidad de melón mantiene su implementación original. Controles: flechas o mouse para mover; Espacio/W/E para disparar; P o Escape para pausar.
