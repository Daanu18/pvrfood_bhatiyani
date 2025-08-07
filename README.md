# 🎬 PVR Food Ordering System – Bhatiyani Assessment

An end-to-end full-stack food ordering platform for cinema customers. Built with a responsive and accessible React frontend and a Python backend, it allows users to browse a menu, place seat-based orders, and view food statistics.

---

## 🚀 Live URLs

- 🔗 **Frontend** (Netlify): [https://pvrfood-bhatiyani.netlify.app](https://pvrfood-bhatiyani.netlify.app)
- 🔗 **Backend** (Render): [https://pvrfood-bhatiyani.onrender.com](https://pvrfood-bhatiyani.onrender.com)

---

## 🛠️ Tech Stack

### 🖥️ Frontend
- **React** (with Vite)
- **TypeScript**
- **shadcn/ui** (Tailwind + Radix + components)
- **Chart.js** (via `react-chartjs-2`) – For food stats visualization
- **Netlify** – Frontend Deployment
- **JSON Server** – For local frontend testing/mock data

### ⚙️ Backend
- **Flask** (Python)
- **RESTful API** – Full CRUD for orders and food items
- **Render** – Backend Deployment

---

## 📦 Features

- ✅ Seat-based food ordering (with city, location, screen & seat number)
- ✅ Cart management (add/update/remove items)
- ✅ Payment simulation + order success UI
- ✅ Food stats chart with Chart.js
- ✅ Reusable UI components with shadcn
- ✅ Fully responsive and mobile-friendly UI
- ✅ Environment-based API URL config
- ✅ Clean and commented codebase

---

## 📁 Project Structure

```bash
pvrfood_bhatiyani/
├── backend/                 # Flask backend
│   └── app.py               # Main Flask app
├── frontend/                # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # UI components (LoginForm, Cart, FoodItem, etc.)
│   │   ├── hooks/           # Custom hooks like use-toast
│   │   ├── pages/           # Main FoodMenu page
│   ├── public/
│   ├── .env                 # Contains VITE_API_URL
│   └── index.html
├── prompts.md               # AI prompts used
├── README.md                # You're here!
```

---

## 🧪 How to Run Locally

### 🔹 Backend (Flask)
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 🔹 Frontend (React)
```bash
cd frontend
npm install
cp .env.example .env   # Add your VITE_API_URL here
npm run dev
```

> Ensure the backend is running at the URL used in `.env`.

---

## 📊 Food Stats

Integrated using `Chart.js` via `react-chartjs-2`, displayed on the main menu page to show stats like most popular items and quantities ordered.

---

## 💡 AI Usage Documentation

- All AI prompts used for code, logic suggestions, UI layout, deployment setup are included in [`prompts.md`](./prompts.md)
- Tools used: **ChatGPT** (for architecture guidance, error resolution, deployment help), **GitHub Copilot** (for inline code assistance)

---

## ✅ Assessment Checklist

| Requirement                         | Status |
|-------------------------------------|--------|
| React with shadcn/ui                | ✅     |
| React Flow or Chart.js              | ✅ (Chart.js) |
| JSON Server used                    | ✅     |
| Python backend with CRUD            | ✅     |
| Frontend deployed                   | ✅ Netlify |
| Backend deployed                    | ✅ Render |
| GitHub repo named `pvrfood_bhatiyani` | ✅ |
| `README.md` and `prompts.md` included | ✅ |
| Commented code                      | ✅     |
| Responsive frontend                 | ✅     |
| Clean Git commit history            | ✅     |
| AI usage documented                 | ✅     |

---

## 👨‍💻 Author

**Daanu**  
📧 Email: [danesh.hiremath18@gmail.com]  
🌐 GitHub: [https://github.com/Daanu18](https://github.com/Daanu18)

---

## 📌 Notes

- You can preview the food items, add to cart, proceed to payment, and simulate a checkout flow.
- Orders are saved in the backend and tied to the user’s email and seat info.
- App uses `.env` variable (`VITE_API_URL`) to dynamically connect to backend.