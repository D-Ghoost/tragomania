# 🥂 TRAGOMANIA — Explorador de Cócteles

**TRAGOMANIA** es una aplicación web desarrollada en Angular que permite descubrir, buscar y explorar cócteles de manera visual e interactiva. El usuario puede buscar bebidas por nombre, ingrediente o categoría, visualizar detalles, ingredientes y preparaciones, todo en una interfaz moderna y responsiva.

---

## 🚀 ¿Qué hace este aplicativo?

- Permite buscar cócteles por nombre o ingredientes.
- Filtra bebidas por categorías populares: Cocktails, Ordinary Drinks y Non-Alcoholic.
- Muestra imágenes y detalles de cada cóctel, incluyendo ingredientes y medidas.
- Presenta instrucciones claras para la preparación de cada bebida.
- Ofrece una experiencia de usuario ágil y visualmente atractiva.

---

## 🛠️ Tecnologías Utilizadas

- **Angular 15+** — Framework principal para la construcción de la SPA.
- **TypeScript** — Lenguaje principal para el desarrollo frontend.
- **Tailwind CSS** — Utilizado para el diseño responsivo y moderno de la interfaz.
- **Bun** — Gestor de paquetes y scripts para desarrollo y ejecución.
- **Signals de Angular** — Para manejo eficiente y reactivo del estado.

---

## 🔗 API Externa

Este proyecto utiliza la API pública de [TheCocktailDB](https://www.thecocktaildb.com/api.php) para obtener información, imágenes y detalles de los cócteles.

Ejemplo de endpoint utilizado:

```
https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail
```

Créditos y agradecimientos a [TheCocktailDB](https://www.thecocktaildb.com/) por proveer la información y recursos visuales.

---

## ✅ Requisitos para ejecutar el proyecto

- Node.js 16 o superior
- Angular CLI 15 o superior
- Bun instalado
- Conexión a Internet

---

## 📦 Instalación y ejecución

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

## 📌 Autor

Desarrollado por D-Ghoost.

---
