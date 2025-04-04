# 🚀 ReferralHub – Referral Management Platform

ReferralHub is a **full-stack referral management platform** that allows businesses to **create, manage, and monitor referral campaigns**, while enabling users to **participate and share personalized referral links**. Built using the **MERN stack with Zustand, and Vercel**, the platform is scalable, secure, and designed for high performance.

🔗 **Live Demo:** [ReferralHub](https://referral-hub-alpha.vercel.app/)  
📂 **Source Code:** [GitHub](https://github.com/EcstaticFly/ReferralHub.git)

## ✨ Features
- 🧠 **Campaign Management** – Businesses can create, edit, and expire referral campaigns.
- 🔗 **User Referrals** – Users receive **unique referral links** to invite others.
- 📊 **Dashboard Analytics** – Monitor referral performance & campaign stats.
- 🧾 **Referral History** – View all referred users and rewards per campaign.
- 🔒 **JWT Auth & Cookies** – Secure **authentication and session handling**.
- 💻 **Responsive Design** – Built with **TailwindCSS** for full responsiveness.


## 🛠 Tech Stack

- **Frontend:** React.js, Zustand, TailwindCSS  
- **Backend:** Node.js (ES Modules), Express.js, MongoDB (Mongoose)  
- **Authentication:** JWT, Cookies  
- **Deployment:** Vercel  

## 🚀 Installation & Setup

1️⃣ **Clone the repository:**
   ```bash
   git clone https://github.com/EcstaticFly/ReferralHub.git
   cd ReferralHub
   ```

2️⃣ **Configure server environment variables**
```bash
#setup .env file for server
cd server
touch .env
#add in server/.env
REACT_MONGODB_URL=your_mongodb_url
CLIENT_BASE_URL=your_cors_origin
JWT_SECRET=your_jwt_secret
NODE_ENV=development
MAIL_USER=your_mail_service_email
SECRET_PASSWORD=your_mail_service_password
GEMINI_API_KEY=AIzaSyBmUPvJ3EnJBKzKYjUmtYQV9GrSHAXEzAA
```

3️⃣ **Configure client environment variable**
```bash
#setup .env file for client
cd client
touch .env
#add in client/.env
VITE_API_URL=your_backend_api_url
```

4️⃣ **Run the app**
```bash
#start server
cd server
npm run dev
#start client
cd client
npm run dev
```

The app will be live at http://localhost:5173

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to **fork** the repo and submit a **pull request**.

## 📜 License
This project is licensed under the **GNU GENERAL PUBLIC LICENSE v3**.

## 📬 Contact

For inquiries, reach out to me at [Suyash Pandey](mailto:suyash.2023ug1100@iiitranchi.ac.in).