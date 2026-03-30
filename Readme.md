# Launchpad

##  Tech Stack

![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.2.1-black)
![MongoDB](https://img.shields.io/badge/MongoDB-9.1.3-47A248?logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Zustand](https://img.shields.io/badge/Zustand-4.5-000545)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-1.15.15-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38BDF8?logo=tailwindcss&logoColor=white)

![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED)
![Docker%20Compose](https://img.shields.io/badge/Docker%20Compose-2496ED)
![Microsoft Azure](https://img.shields.io/badge/Azure-Cloud-0078D4)
![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-D24939)


## Features

- 👥 **Team Collaboration**  
  Work seamlessly with your team in a shared workspace, enabling real-time collaboration and improved productivity.

- 📂 **Projects & Issues**  
  Organize your workflow by creating projects and managing tasks through structured issues.

- 👤 **Project Members**  
  Add, manage, and assign members to specific projects with clear ownership.

- 🤖 **AI Assistant**  
  Get smart assistance for tasks, planning, and productivity with AI-powered suggestions.

- 🔐 **Secure Authentication**  
  Robust and secure authentication system to protect user data.

---

## Tech Stack

- Frontend: React + Vite  
- Backend: Node.js + Express  
- Database: MongoDB  
- DevOps: Docker, Docker Compose, Jenkins  
- Cloud: Azure  
- Orchestration: Kubernetes  (Soon)

---


## Installation

 1. Clone the repository
 ``` bash
 git clone https://github.com/codebydeep/Launchpad.git
 cd Launchpad
 ```

 2. Install the required dependencies

 ``` bash
 cd server
 npm install
 ```
 ``` bash
 cd client
 npm install
 ```

 3. Create the .env files
 ```bash
 cd server
 PORT=your-port
 MONGO_URI=your-database-url
 JWT_SECRET=your-secret
 JWT_EXPIRY=your-expiry
 RESEND_API_KEY=your-api-key
 ```
 ```bash
 cd frontend
 VITE_API_BASE_URL=http://localhost:your-port/api/v1

 ```
 4. Run the Server
 ```bash
 cd server
 npm run dev
 ```
 ```bash
 cd client
 npm run dev
 ```
 5. Open the browser
 ```bash
 Checkout on - http://localhost:5173/
 ```
### Run Locally with Docker

```bash
docker compose up --build
```

## License

This project is licensed under the **MIT License**.

You are free to use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the software.  
See the [LICENSE](./LICENSE) file for more details.