# Auto Task Distribution to Agent App

Live App: [auto-task-distribution-to-agent-app.netlify.app](https://auto-task-distribution-to-agent-app.netlify.app/)  
GitHub Repository: [github.com/ParitoshBarman/Auto-Task-Distribution-to-Agent-App](https://github.com/ParitoshBarman/Auto-Task-Distribution-to-Agent-App)


## 🎥 Demo Video

Watch the full working demo of the project here:  
🔗 [Click to watch on Google Drive](https://drive.google.com/file/d/111STFrt97-xM-OrGTv1sKv-R8lWl0tQg/view?usp=drivesdk)


---
### Test Credentials

#### 🔑 Admin Login
- **Email/Username**: `newadmin@example.com`
- **Password**: `admin123`

#### 🧑‍💼 Agent Login
- **Email/Username**: `pariagent@example.com`
- **Password**: `123`

---

## 🧠 Objective

Build a MERN stack application to manage agents and automatically distribute tasks uploaded via CSV equally among them.

---

## ✨ Features

### 1. Admin Login
- JWT-based authentication.
- Login with email and password.
- Redirect to dashboard on success.

### 2. Agent Management
- Admin can add agents.
- Agent details: Name, Email, Mobile Number (with Country Code), Password.
- View all registered agents.

### 3. Task Upload and Distribution
- Upload CSV with fields: FirstName, Phone, Notes.
- File validation: accepts only .csv, .xlsx, .xls.
- Tasks distributed equally among all agents.
- Remaining tasks assigned sequentially.

### 4. Task Viewing
- Admin can view all tasks assigned to an agent in a modal.
- Total task count shown.
- Agents can also view their own tasks.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt

---

## 🧪 How to Run Locally

### Backend Setup

```bash
git clone https://github.com/ParitoshBarman/Auto-Task-Distribution-to-Agent-App.git
cd Auto-Task-Distribution-to-Agent-App/backend
npm install
```
Create a `.env` file in the `backend` directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
```

```bash
npm run dev
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

---

### 🔧 Environment Setup

> **Note:** Make sure to create the `.env` files in both `frontend` and `backend` directories.

#### ✅ For Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_BASE_URL=http://localhost:5000
```

#### ✅ For Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/admin-agent-app
JWT_SECRET=yourSecretKey
```

> Replace `yourSecretKey` with a strong secret of your choice.

---

## 🚀 Routes Overview

### Auth Routes
- `POST /api/auth/login` – Login
- `POST /api/auth/register` – Register

### Agent Routes
- `POST /api/agents/create` – Add agent (Admin only)
- `GET /api/agents` – View all agents

### CSV Routes
- `POST /api/csv/upload` – Upload task file (Admin only)
- `GET /api/csv/agent/:id` – Get tasks for specific agent

### Task Routes
- `GET /api/tasks/my` – Get my tasks (Agent only)
- `GET /api/tasks/:agentId` – Get tasks by agent (Admin only)

---
## 📸 Screenshots

| Screenshot Name                          | Preview                                                                 |
|------------------------------------------|-------------------------------------------------------------------------|
| Admin Dashboard                          | ![Admin Dashboard](./screenshots/admin_dashboard.JPG)                   |
| Agent Create Modal Form                  | ![Agent Create Modal Form](./screenshots/Agent%20create%20modal%20form.JPG) |
| Agent Dashboard                          | ![Agent Dashboard](./screenshots/agent%20dashboard.JPG)                 |
| Agent Mobile View                        | ![Agent Mobile View](./screenshots/agent%20mobile%20view.JPG)          |
| File and Agent Creation Button           | ![File and Agent Creation Button](./screenshots/file%20and%20agent%20creation%20button.JPG) |
| File Upload                              | ![File Upload](./screenshots/file%20upload.JPG)                         |
| List of Tasks Assigned to the Agent      | ![List of Tasks](./screenshots/list%20of%20task%20that%20assigned%20to%20the%20agent.JPG) |
| Responsive Navbar (Closed)               | ![Responsive Navbar Closed](./screenshots/responsive%20navbar%20closed.JPG) |
| Responsive Navbar (Expanded)             | ![Responsive Navbar Expanded](./screenshots/responsive%20navbar%20expand.JPG) |
| View Tasks Button                        | ![View Tasks Button](./screenshots/View%20tasks%20button.JPG)           |


---

## 📦 Deliverables

- ✅ All required features completed.
- ✅ Clean and readable code.
- ✅ Live Deployment.
- ✅ Demo video included.
- ✅ Complete `.env` configuration sample provided.


---

**Made with ❤️ by Paritosh Barman**