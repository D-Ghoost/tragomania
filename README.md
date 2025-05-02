# 🥂 TRAGOMANIA — Explorador de Cócteles

**TRAGOMANIA** es una aplicación Angular que permite descubrir y buscar bebidas por categoría, nombre o ingrediente. Diseñada con una interfaz moderna y dinámica, ofrece una experiencia visual envolvente y fácil de usar.

---

## 🚀 Características

- 🔍 Búsqueda por nombre o ingredientes.
- 📂 Filtros por categorías populares: Cocktails, Ordinary Drinks y Non-Alcoholic.
- 🖼️ Visualización responsiva con imágenes.
- ⚙️ Conexión con API externa mediante un servicio modular.
- 💡 Uso de signals para manejo eficiente del estado.

---

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/tragomania.git
cd tragomania
```

2. Instala las dependencias:

```bash
bun install
```

3. Ejecuta la aplicación:

```bash
bun run start
```

Luego, abre `http://localhost:4200` en tu navegador.

---

## 🧪 Pruebas

Para ejecutar los tests unitarios:

```bash
bun run test
```

---

## 🧠 Justificación Técnica

- **Modularidad**: Separación clara entre componentes (`Home`, `Search`) y servicios.
- **Signals**: Se usa `signal<Cocktail[]>` para una gestión más eficiente del estado reactivo.
- **Reutilización**: Componente `<app-cocktail>` usado tanto en Home como en Search.
- **Tailwind CSS**: Facilita un diseño limpio y adaptativo.
- **Inyección moderna**: Uso de `inject()` en lugar del constructor para servicios.

---

## 🗂️ Estructura de Carpetas (Extracto)

```
src/
├── app/
│   ├── home/
│   ├── search/
│   └── shared/
│       ├── models/
│       └── services/
```

---

## 🧾 Modelo de Datos

```ts
export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  [key: string]: string | null;
}
```

---

## 🔗 API Referenciada

Se utiliza la API pública de [TheCocktailDB](https://www.thecocktaildb.com/api.php), por ejemplo:

```
https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail
```

---

## ✅ Requisitos

- Node.js 16+
- Angular CLI 15+
- Conexión a Internet

---

## 📌 Autor

Desarrollado por D-Ghoost.

---
