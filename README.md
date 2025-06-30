

## 📦 React CRUD Product Manager

A simple React + TypeScript application to manage a product list.
You can **add**, **edit**, **delete**, and **view** products — each with title, description, price, image, category, and colors.

---

## 📌 Features

✅ Display product list
✅ Add new product via modal
✅ Edit existing product via modal
✅ Delete product with confirmation dialog
✅ Add / remove product colors
✅ Product category selection
✅ Form validation before submitting

---

## 📦 Built With

* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **Vite**
* **SweetAlert2** — for beautiful alert dialogs
* **uuid** — to generate unique product IDs
* **Headless UI** — for modals
* **HeroIcons** — for icons

---

## 📦 Install & Run

### 1️⃣ Install dependencies:

```bash
npm install
```

### 2️⃣ Run development server:

```bash
npm run dev
```

### 3️⃣ Build production version:

```bash
npm run build
```

---

## 📌 State Management

App state is handled using **React useState hooks**:

* Modal open/close states
* Product list state
* New product / edit product forms
* Temporary colors list
* Form validation errors

---

## 📁 Project Structure

```
src/
├── Components/
│   ├── ProductCard/
│   ├── ui/
│   ├── ImageComponent/
├── data/
├── interfaces/
├── utils/
├── types/
├── App.tsx
├── main.tsx
├── index.css
```

---

## 📌 Main Files

* `App.tsx` — main application logic
* `ProductCard.tsx` — renders a single product card
* `Modal.tsx` — reusable modal component
* `CircleColor.tsx` — renders color circles
* `validation.ts` — input validation functions
* `data/index.ts` — default product, color, and category data

---

## 📌 Future Improvements

* Save product list to **localStorage**
* Add product search functionality
* Pagination or infinite scroll
* Upload product image instead of a URL
* Animate product cards with **Framer Motion**
* Multi-language support with **i18n**

---

## 📎 Demo

> *https://react-crud-app-ebon.vercel.app/*

---


