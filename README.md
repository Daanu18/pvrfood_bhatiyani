# PVR Food Ordering System - Bhatiyani Assessment

A full-stack web application that allows cinema-goers to browse, select, and order food based on their seat and auditorium, replicating the seamless food ordering experience found at PVR cinemas.

> 🚀 This project was developed as part of the Full Stack Developer Assessment - Bhatiyani.

---

## ✨ Features

- 🍿 Seat- and audi-based food ordering system tailored for cinema settings
- 📱 Fully responsive and mobile-friendly UI design using Tailwind CSS and shadcn/ui components
- 📊 Interactive data visualizations powered by Chart.js for admin insights
- 🛒 Add to cart, update quantities, and remove items with live UI feedback
- 📋 Checkout functionality capturing audi number, seat number, and user details
- 🔄 Complete CRUD backend API built with FastAPI for managing orders and food items
- 🤖 Documented AI-assisted coding and development process to showcase problem-solving
- 💾 JSON Server integration to mock additional backend data for suggestions
- 🛠 Clean, well-commented codebase and a logical Git commit history

---

## 🔧 Tech Stack

### Frontend

- React (JavaScript/TypeScript)
- shadcn/ui — UI components and design system
- Chart.js — for generating charts and visual data insights
- Tailwind CSS — utility-first CSS framework for styling
- JSON Server — mock backend for suggestions feature

### Backend

- Python 3.10+ with FastAPI framework
- SQLAlchemy ORM for database interactions
- Uvicorn ASGI server for running FastAPI app
- PostgreSQL/SQLite (depending on deployment or local setup)

---

## 📁 Project Structure

pvrfood_bhatiyani/
├── frontend/ # React app using shadcn UI and Tailwind CSS
│ ├── components/
│ ├── pages/
│ ├── assets/
│ └── ...
├── backend/ # FastAPI backend with CRUD APIs
│ └── app/
│ ├── main.py
│ ├── crud.py
│ ├── models.py
│ ├── schemas.py
│ └── database.py
├── json-server/ # JSON Server mock data for suggestions feature
├── public/ # Static files used by frontend
├── README.md
└── prompts.md # Documentation of AI-assisted development prompts

---

## 🚀 Deployment

- 🔗 Frontend Live URL: [your-netlify/vercel-link]
- 🔗 Backend Live URL: [your-heroku/render-link]

*(Replace the above URLs with your actual live deployment links.)*

---

## 🧪 Setup Instructions

### Frontend

cd frontend
npm install # Install dependencies
npm start # Start development server (usually http://localhost:5173)


### Backend

cd backend
python -m venv venv # Create virtual environment (if not already created)
source venv/bin/activate # Activate virtual environment (Linux/Mac); use .\venv\Scripts\activate on Windows
pip install -r requirements.txt # Install Python dependencies
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 # Start FastAPI server


### JSON Server (Mock Data)

npx json-server --watch json-server/db.json --port 5001


---

## 📌 Assessment Checklist

- [x] React with shadcn UI components applied
- [x] Chart.js integrated for data visualization
- [x] JSON Server used effectively for mock backend data (suggestions)
- [x] Python backend with full CRUD API implemented using FastAPI
- [x] Frontend and Backend deployed to live URLs
- [x] GitHub repo named `pvrfood_bhatiyani` with clean commit history
- [x] Complete and professional README.md and prompts.md documentation
- [x] Well-commented code demonstrating clear intent and maintainability
- [x] Responsive UI across devices
- [x] AI-assisted development documented thoughtfully

---

## 👨‍💻 Author

- **Name**: Daanu  
- **Assessment**: Bhatiyani Full Stack Developer Assessment

---

## 📝 Additional Notes

- **Authentication:** Basic email-domain based admin access implemented for assignment scope.  
- **Database:** SQLite used locally; can be swapped with any SQL DB for production.  
- **Environment Variables:** Ensure `.env` files contain necessary configuration and are excluded from Git.  
- **Testing:** Manual tests conducted; automated testing is a possible future enhancement.

---

## 📖 Resources & References

- [FastAPI Documentation](https://fastapi.tiangolo.com/)  
- [React Documentation](https://reactjs.org/)  
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)  
- [shadcn/ui](https://ui.shadcn.com/)  
- [JSON Server GitHub](https://github.com/typicode/json-server)

---
