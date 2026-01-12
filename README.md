Employee Attendance & Payroll System

Project Status: 🚀 Active Development

Overview

This is a web-based Employee Management System designed to:

Record employee name, ID, date, check-in, and check-out times.

Calculate total hours worked.

Compute daily salary based on hours worked and day of the week.

Apply bonus logic:

Work more than 24 days → +1000

Full month → +2000

Display employee salary and hours dynamically.

View grouped hours and salary by week, month, or year.

Export employee data to Excel/CSV format for reporting.

The interface is modern and professional, with compact cards, subtle shadows, gradient headers, and a responsive layout.

Features
✅ Core Features

Input employee details: Name, ID, Date, Check-in, Check-out.

Automatic calculation of worked hours.

Daily salary computation with weekday and Sunday bonuses.

Monthly salary calculation with bonus logic.

Display today’s work hours and total monthly salary.

Grouped hours: view total hours and salary by week, month, or year.

Export data to Excel for reporting purposes.

🔮 Planned Features

Multi-employee dashboard with filters and search.

Export summarized payroll reports.

Advanced UI analytics with charts and graphs.

Integration with a backend database for persistent storage.

Tech Stack

HTML – Structure

CSS – Modern and responsive styling

JavaScript – Logic for attendance, salary, and Excel export

How to Use (Current Version)

Open the index.html file in a browser.

Enter employee details and click Check In.

At the end of the workday, click Check Out to log hours and calculate daily salary.

Click Show Salary to view today’s hours and monthly salary.

Select Week/Month/Year from the dropdown to view grouped hours and salary.

Click Export Data to download all employee records as an Excel/CSV file.

Folder Structure
project-root/
│
├─ index.html          # Main HTML page
├─ style.css           # Stylesheet
├─ js/
│   ├─ data.js         # Local storage and employee data
│   ├─ attendance.js   # Check-in/check-out logic
│   ├─ salary.js       # Salary calculation logic
│   ├─ ui.js           # UI helper functions
│   └─ graph.js        # Grouped hours functions
└─ README.md

Screenshot (Optional)


Modern interface with attendance cards, salary summary, grouped hours table, and export button.

Notes

Data is currently stored in localStorage, so it persists only in the browser.

Future updates will include backend integration, multi-employee management, and analytics dashboard.

Author

Pamith Kodekal
Web Developer & Project Creator

Project Type: Web-based Employee Attendance & Payroll System