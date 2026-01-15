# Project Name: PERN E-Commerce

- ### PERN E-Commerce is a **full-stack commerce application** built on the **PERN stack (PostgreSQL, Express, React, Node.js)**, designed with a strong focus on **security, scalability, and modern frontend architecture**. It serves as a production-ready template for **secure online stores and enterprise-grade web applications**.

## 🛠 Tech Stack

**Frontend:**
- Core: React 19 (Latest) + Vite
- State Management: Zustand (Minimal and performant global state)
- Routing: React Router DOM v7
- Styling: Tailwind CSS 4 + DaisyUI + Lucide Icons
- HTTP Client: Axios
- Notifications: React Hot Toast

**Backend:**
- Runtime: Node.js (ES Modules)
- Server: Express 5 (Latest)
- Database: PostgreSQL (Neon Serverless)
- Security:
  - Arcjet (Bot protection & rate limiting)
  - Helmet (Secure HTTP headers)
  - CORS (Cross-origin control)
- Logging: Morgan
- Environment Management: Dotenv

**Tools:**
- Nodemon
- Git
- Postman

## ✨ Key Features
- **Full PERN Stack Architecture:** PostgreSQL + Express + React + Node.js
- **Modern React 19 Frontend:** Built with Vite for fast development and builds
- **Secure API Layer:** Protected with Arcjet, Helmet, and CORS
- **Global State Management:** Lightweight and scalable state handling via Zustand
- **Responsive UI:** Mobile-first design using Tailwind CSS and DaisyUI
- **Production-ready Setup:** Optimized build pipeline for frontend + backend

## 🧠 Challenges & Learnings
- **Challenge:** Designing a scalable API architecture with secure request handling
- **Solution:** Implemented layered middleware with Arcjet, Helmet, and centralized routing
- **Learning:** Gained deeper experience with serverless PostgreSQL, security-first API design, and PERN stack workflows

## 🔧 Installation & Setup

### 1. Clone the Repo
- Put the command line below:  
git clone https://github.com/TEHYIHEN/simple_e_commerce_page.git  
cd pern-e-commerce  or your_created_folderName

### 2. Backend Configuration
- Create a .env file in the backend folder:  
  
PGUSER='your_owner'  
PGPASSWORD='your_password'  
PGHOST='ep-lively-field-a1y7t7pm-pooler.ap-southeast-1.aws.neon.tech'  
PGDATABASE='neondb'  

ARCJET_KEY=your_arcjet_key  
ARCJET_ENV=development  

NODE_ENV=production  

### 3. Install & Build
- Put the command line below:  
npm run build   # Installs backend & frontend dependencies and builds frontend
npm start

### Optional
> [!TIP]
> If Seed Sample Data needed
>npm run seed

git clone https://github.com/your-username/pern-e-commerce.git
cd pern-e-commerce
