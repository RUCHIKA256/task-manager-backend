Task Manager Backend (Django + DRF)
🚀 Project Overview

This is the backend service for the Task Manager Application built using:

Backend: Django + Django REST Framework

Database: PostgreSQL (Supabase)

Third-Party Integration: Google Calendar API

Backend Deployment: Koyeb

Frontend Deployment: Vercel

The backend provides:

Full CRUD REST APIs

Data aggregation for dashboard reporting

Google Calendar event automation

Live PostgreSQL database integration

This backend is fully deployed and connected to a live production database.

🌐 Live Deployment Links
🔹 Frontend (Vercel)

👉 https://task-mang-frontend-six.vercel.app/tasks

🔹 Backend API (Koyeb)

👉 https://willowy-selma-myself22-adad783f.koyeb.app/api/tasks/

✅ Mandatory Requirements Implementation
1️⃣ Full CRUD (UI + REST APIs)
✔ CRUD via Frontend UI

Users can:

Create a task

View all tasks

Update task details

Delete tasks

All actions communicate with the live backend hosted on Koyeb.

✔ CRUD via REST APIs
Method	Endpoint	Description
GET	/api/tasks/	Fetch all tasks
GET	/api/tasks/<id>/	Fetch single task
POST	/api/tasks/	Create new task
PUT	/api/tasks/<id>/	Update entire task
PATCH	/api/tasks/<id>/	Partial update
DELETE	/api/tasks/<id>/	Delete task

All HTTP methods (POST, PUT, PATCH, DELETE) work on the LIVE deployment.

2️⃣ Data Visualization / Reporting

The frontend includes a Dashboard page that displays:

Total number of tasks

Completed tasks count

Pending tasks count

Status-wise distribution chart

The dashboard data is fetched from the live database.

Whenever tasks are:

Created

Updated

Deleted

The dashboard automatically reflects updated values.

3️⃣ Third-Party API Integration – Google Calendar

This backend integrates with the Google Calendar API.

🔹 Functionality:

When a new task is created with a due date:

The backend sends a request to Google Calendar API

A calendar event is automatically created

The event title matches the task title

The event date matches the task due date

This integration works in the live deployed environment on Koyeb.

🛠 Local Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/your-username/task-manager-backend.git
cd task-manager-backend

2️⃣ Create Virtual Environment
python -m venv venv


Activate:

Mac/Linux:

source venv/bin/activate


Windows:

venv\Scripts\activate

3️⃣ Install Dependencies
pip install -r requirements.txt

4️⃣ Environment Variables

Create a .env file in the root directory.

📄 .env.example
SECRET_KEY=your_secret_key
DEBUG=True

DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_HOST=your_supabase_host
DB_PORT=5432

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_refresh_token
GOOGLE_CALENDAR_ID=primary

5️⃣ Apply Migrations
python manage.py makemigrations
python manage.py migrate

6️⃣ Run Locally
python manage.py runserver


Backend runs at:

http://127.0.0.1:8000/


API endpoint:

http://127.0.0.1:8000/api/tasks/

💻 Running Frontend Locally

Clone frontend repository

Install dependencies:

npm install


Add .env file:

VITE_API_URL=http://127.0.0.1:8000/api


Run:

npm run dev


Frontend runs at:

http://localhost:5173/

🚀 Deployment Details
🔹 Backend – Koyeb

Hosted on Koyeb

Connected to Supabase PostgreSQL

Environment variables configured in Koyeb dashboard

Production server uses Gunicorn

🔹 Frontend – Vercel

Hosted on Vercel

Connected to live backend API (Koyeb URL)

Environment variables configured in Vercel dashboard

🧪 How to Test (Step-by-Step)
🔹 Test Full CRUD via UI

Open Live Frontend URL

Click "Add Task"

Enter task details → Submit (Create)

Confirm task appears in list (Read)

Click Edit → Modify → Save (Update)

Click Delete → Confirm (Delete)

🔹 Verify Database Persistence

Open Supabase dashboard

Navigate to Table Editor → tasks

Perform CRUD from UI

Refresh table

Confirm records update in real-time

🔹 Test Dashboard / Reporting

Navigate to /dashboard

Observe task metrics

Create or delete task

Refresh dashboard

Confirm metrics update

🔹 Test Google Calendar Integration

Create a task with a due date

Open Google Calendar

Confirm new event created automatically

📂 Project Structure
task_manager/
│
├── tasks/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│
├── task_manager/
│   ├── settings.py
│   ├── urls.py
│
├── requirements.txt
└── manage.py

📦 Tech Stack

Django

Django REST Framework

PostgreSQL (Supabase)

Google Calendar API

Gunicorn

Koyeb

Vercel

📹 Screen Recording

Drive Link:
👉 [Add your Drive link here]

The recording demonstrates:

Opening live frontend

Performing full CRUD

Showing Supabase database

Showing dashboard updates

Showing Google Calendar event creation

🎯 Conclusion

This project fulfills all mandatory requirements:

✔ Full CRUD (UI + REST APIs)
✔ Live deployment
✔ Dashboard & reporting
✔ Google Calendar third-party integration
✔ Proper documentation
