# 🕵️‍♂️ Lost & Found - Community Portal

A full-stack, aesthetic web application designed to bridge the gap between finders and owners. This portal allows users to report lost items or list things they've found, featuring a real-time dashboard and a dedicated admin control panel.

## ✨ Key Features
* **Aesthetic UI/UX:** Clean, modern design with glassmorphism effects and intuitive navigation.
* **Dual Reporting:** Separate workflows for reporting **Lost** items (Urgent Red) and **Found** items (Success Green).
* **Image Previews:** Instant image preview during the upload process for better accuracy.
* **Admin Dashboard:** Exclusive control panel for administrators to manage reports and users.
* **Personal Profile:** Users can track their own reports and manage their activity.
* **Secure Auth:** JWT-based authentication with role-based access control (RBAC).

## 🚀 Tech Stack
* **Frontend:** React.js, TypeScript, Bootstrap 5, Axios.
* **Backend:** Node.js, Express.js.
* **Database:** PostgreSQL (Sequelize ORM).
* **State Management:** React Context API.

## 🛠️ Setup Instructions
1. Clone the repo: `git clone https://github.com/ShahjahanVighio/lostandfoundportal.git`
2. Install frontend dependencies: `cd frontend && npm install`
3. Install backend dependencies: `cd backend && npm install`
4. Set up your `.env` variables for Database and JWT.
5. Run the development server: `npm start`
