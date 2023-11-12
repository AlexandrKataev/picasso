# PICASSO Test Project

https://kataev-picasso.vercel.app/

## Features

- Бесконечный скролл
- Виртуализированный список постов

  ![Farmers Market Finder Demo](demo/scroll.gif)

## Technologies

- React
- RTK Query
- TypeScript
- React Router
- React Intersection Observer
- Tanstack Virtual
- FSD (Feature-Sliced Design)

## Описание

– для виртуализации использовал Tanstack Virtual. Виртуализация не зависит от высоты постов, одновременно в html существуют 6-7 постов, при желании и в зависимости от дизайна эту цифру можно поменять.

– для бесконечного скролла использовал React Intersection Observer. Подгрузка постов происходит при скролле на последний элемент, во время нее показывается лоадер. Подгрузка завершается когда все посты загружены (сравнивается общее число постов из хеадера респонса и число загруженных постов)

**Буду рад любой обратной связи, спасибо!**
