Project Overview:
The Mini HR Tool is a web-based system designed to help small teams or organizations manage basic HR activities in a simple and organized way. The main purpose of this system is to track employees, attendance, and leave requests, while allowing an admin to manage and monitor everything from one place.
Employees can:
  1. Mark their daily attendance
  2. Apply for leave
  3. View their pending leave requests

Admin can:
  1. View all registered employees
  2. See attendance records of all employees
  3. Approve or reject leave requests
  4.Automatically update employee leave balance after approval

● Tech Stack & Justification: 
  Frontend-React
  Backend- Node and Express
  Database- MongoDB
  Authentication- JWT
  Deployment-
    Frontend-Vercel
    Backend- Render

● Installation Steps: Clear steps to run the project locally.
1. Clone the Repositories
   git clone https://github.com/siddharth-rishabh/mini-HR-tool.git

2.Backend setup
    i. cd backend
    ii. npm install
    iii. create .env file
    iv. npm run dev

3.Frontend setup
    i. cd frontend
    ii. npm install
    iii. Update the API base URL in src/api/axios.js- baseURL: "http://localhost:5000/api"
    iv. npm run dev

● Environment Variables:
      PORT=5000
      MONGO_URI=<your-mongodb-connection-string>
      JWT_SECRET=<your-jwt-secret>

● API Endpoints:
    /api/auth/register - POST - Register a new employee
    /api/auth/login - POST -Login user
    /api/attendance	- POSt - Mark daily attendance
    /api/attendance/me - GET - View logged-in employee’s attendance history
    /api/leave - POST - Apply for leave
    /api/leave/me - GET	-	View own leave requests
    /api/leave/:id - DELETE	-	Cancel a pending leave request
    /api/admin/users - GET	-	View all registered employees
    /api/admin/leaves - GET	-	View all leave requests
    /api/admin/leaves/:id/status - PATCH	-	Approve or reject a leave request
    /api/admin/attendance - GET	-	View attendance of all employees

● Database Models:
  User Model
    name – Employee/Admin name
    email – Unique identifier
    password – Hashed password
    role –employee or admin
    leaveBalance – Remaining leave days
    dateOfJoining – Employee joining date

  Attendance Model
    user – Reference to the User who marked attendance
    date – Date of attendance
    status – Attendance status (present or absent)

  Leave Model
    user – Reference to the User who applied for leave
    leaveType – Type of leave
    startDate – Leave start date
    endDate – Leave end date
    totalDays – Total leave duration
    status – Leave status (pending, approved, rejected)

● Admin Credentials: 
    Name- Kritika Sharma
    Email- hr@fixl.com
    password- test

● AI Tools Declaration: Disclose all AI tools used and their contribution.
  ChatGPT:
    i.Debugging errors and understanding issues in the code
    ii.Building the authentication system using JWT
    iii.Writing frontend UI/UX code based on a Figma design screenshot
    iv.Creating database models by specifying required fields and relationships

  Blackbox AI:
    i.Debugging support
    ii.Final code review to check for inconsistencies and mistakes

● Known Limitations: Any known issues or limitations in the project
  1.Employees can mark their attendance more than once in a day
  2.Employees can apply for leave using past dates
  
● Time Spent: around 25-30hrs
