# westech-pivot-tables

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Type-Check, Compile and Minify for Production

```sh
bun run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```

## Assignment Description

Create an application to display a pivot table of sales performance for categories and their products by stores. Each row will represent a category and its respective products, which can be shown or hidden. By default, the products will be hidden.

Columns will represent individual stores, and clicking on a store name will apply ascending/descending sorting. Sorting can also be reset, and the UI implementation of this functionality is left up to you.

The required table structure can be found in the attached mockup.

The dataset is available at: [https://hiring.wdev.sk/fe-data](https://hiring.wdev.sk/fe-data)

Conditions:

- Using Vue.js will be considered a small plus, but any reactive framework (React, Svelte, Angular...) can be used.
- It is not allowed to use a library explicitly designed for creating pivot tables.
- Every additional NPM dependency must be justified.
- Any CSS framework can be used based on personal preference.
- The final result must be submitted as a Git repository or a zip archive.

Dataset sample:

```
[
  {
    "product": "Xbox Series X with EA FC 24",
    "pcs": 4,
    "category": "Xbox",
    "store": "KE"
  },
  {
    "product": "Asus ROG Ally Z1 Extreme",
    "pcs": 5,
    "category": "Handheld",
    "store": "PE"
  },
  {
    "product": "Nintendo Switch",
    "pcs": 3,
    "category": "Nintendo",
    "store": "MI"
  },
  {
    "product": "Playstation 5 Digital Edition",
    "pcs": 2,
    "category": "Playstation",
    "store": "TN"
  },
  {
    "product": "Nintendo Switch",
    "pcs": 3,
    "category": "Nintendo",
    "store": "BA"
  },
  {
    "product": "Playstation 4",
    "pcs": 1,
    "category": "Playstation",
    "store": "PP"
  }
]
```
