# AC4 – Dashboard de Inventario

## Descripción del proyecto

El objetivo de esta práctica es desarrollar la lógica de un dashboard interactivo para gestionar un inventario de productos mediante JavaScript. Se trabaja con un array de objetos llamado `productes`, utilizando métodos de programación funcional y las nuevas funciones de inmutabilidad introducidas en ES2023.

## Objetivos

- Calcular las métricas principales del inventario.
- Añadir, editar y eliminar productos.
- Buscar productos por categoría.
- Ordenar productos por diferentes columnas.
- Combinar la búsqueda por texto con el filtro por categoría.
- Practicar el uso de métodos modernos de arrays y la programación funcional.

## Tareas realizadas

1. **Métricas del dashboard:** uso de `reduce()`, `at()`, `some()` y `every()` para calcular y comprobar los datos del inventario.

2. **Añadir y editar productos:** generación automática de ID con `map()` y `Math.max()`, incorporación de productos con `push()` y edición inmutable con `with()`.

3. **Eliminar productos:** búsqueda del índice con `findIndex()` y eliminación inmutable mediante `toSpliced()`.

4. **Búsqueda por categoría:** uso de `findLast()` para encontrar el último producto que pertenece a una categoría determinada.

5. **Ordenación por columnas:** uso de `toSorted()` y `toReversed()` para ordenar e invertir el orden de los productos sin modificar el array original.

6. **Búsqueda y filtros combinados:** uso de `filter()` e `includes()` para buscar productos por nombre y filtrar por categoría. Si no se introduce texto ni se selecciona una categoría específica, se muestran todos los productos.