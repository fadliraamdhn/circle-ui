🌐 Circle — Social Media App

A lightweight, fast, and modern social media web application built with React + TypeScript + Vite, featuring real-time updates, infinite scroll, likes, replies, and user authentication.

🚀 Features
💬 Core Features

🔥 Real-time Threads — update otomatis via WebSocket

📜 Infinite Scroll untuk feed

❤️ Like system (optimistic UI + sync backend)

💭 Replies & Thread Detail Page

📷 Upload Foto Profil & Gambar Post

👤 User Authentication (Register, Login, JWT)

📊 Responsive UI mirip Twitter / Threads

🛠 Tech Stack

Frontend: React, TypeScript, Vite

State Management: Redux Toolkit

Real-Time: WebSocket (socket.io client)

Backend API: Express + Prisma (optional)

Styling: TailwindCSS

Icons: Lucide React

⚙️ Installation
1. Clone repository
git clone https://github.com/username/circle-app.git
cd circle-app

2. Install dependencies
npm install

3. Setup environment

Buat file .env:

VITE_API_URL=http://localhost:3000
VITE_WS_URL=http://localhost:3000

4. Run development server
npm run dev