# 🤖 prompts.md – AI Usage Documentation

This file documents all the AI-related prompts and tools used during the development of the `pvrfood_bhatiyani` full-stack assessment project.

---

## 📌 Purpose

As required in the Bhatiyani assessment, this document tracks the use of AI tools like ChatGPT and GitHub Copilot to assist with design decisions, implementation logic, error resolution, and deployment processes.

---

## 🧠 AI Tools Used

| Tool        | Purpose                                              |
|-------------|------------------------------------------------------|
| ChatGPT     | Architecture planning, React structure, Flask CRUD setup, Vite config help, Chart.js integration, README creation, and debugging help |
| GitHub Copilot | Auto-generating repetitive component boilerplate and basic UI logic suggestions |

---

## 💬 Prompts Log

### ✅ Frontend (React + Vite)
- **Prompt:** "Generate a React component for a food item card with add-to-cart button using Tailwind."  
  *Used for:* `FoodItem.tsx` component UI.
  
- **Prompt:** "How do I manage multiple UI views in a single React component using state?"  
  *Used for:* Switching between login, menu, cart, payment, success in `FoodMenu.tsx`.

- **Prompt:** "How to use Chart.js in React with dynamic food stats?"  
  *Used for:* `FoodStats.tsx` chart integration.

- **Prompt:** "Fix ReferenceError: Can't find variable: process in Vite React app."  
  *Used for:* Switching to `import.meta.env.VITE_API_URL` usage.

### ✅ Backend (Flask)
- **Prompt:** "Generate a Flask API with POST and GET endpoints for food orders."  
  *Used for:* Creating endpoints in `app.py`.

- **Prompt:** "How to connect frontend (React) with Flask backend using fetch?"  
  *Used for:* Implementing API requests in `submitOrder` and `fetchFoodItems`.

### ✅ Deployment
- **Prompt:** "How to deploy Vite React app to Netlify with env variables?"  
  *Used for:* Final deployment setup.

- **Prompt:** "How to deploy Flask API to Render with public API endpoint?"  
  *Used for:* Publishing backend on Render.

### ✅ Documentation & Repo Structure
- **Prompt:** "Create a complete README.md for a full-stack React + Flask app with shadcn UI and Chart.js."  
  *Used for:* Final README file.

- **Prompt:** "Write prompts.md file listing all AI prompts used in this project."  
  *Used for:* This file itself 😄

---

## 📎 Notes

- AI tools were used to **accelerate development**, not replace manual effort.
- All critical logic was reviewed, modified, and tested manually.

---

## 👨‍💻 Maintainer

**Daanu** – [https://github.com/Daanu18](https://github.com/Daanu18)