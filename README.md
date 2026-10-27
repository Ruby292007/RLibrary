# 📚 RLibrary - Smart Campus Library Management Portal

A full-featured, responsive, and role-based web application tailored for college & university libraries. **RLibrary** provides **separate authentication & logins for Students and the Librarian**, a dedicated **Student Self-Registration ("Create Account")** portal with standard institutional email validation, **strict student privacy isolation**, full **member directory management (editing and removing students)**, live book availability tracking, due date countdowns, pre-orders/reservations, dues & fine calculation, and an automated messaging system for end-of-due-date alerts.

---

## 🚀 Quick Start (Running the Application)

You can run and explore **RLibrary** immediately using either method below:

### Method 1: Instant Browser Launch (Zero Setup)
Simply double-click [`index.html`](file:///c:/Rupashree%20%20M/my%20projects/RLibrary/index.html) or right-click and choose **"Open with Chrome / Edge / Firefox"**. All styles, logic, and state management work 100% locally.

### Method 2: Local Node.js Server
Open your terminal in this project folder and run:
```bash
npm start
# or: node server.js
```
Then visit: **`http://localhost:3000`** in your web browser.

---

## 🔐 Separate Portals & Role Management

### 1. Student Portal (Sign In & Create Account)
* **Student Self-Registration ("Create Account")**:
  * Dedicated registration sub-tab on the student screen.
  * Form fields: Full Name, Roll ID (e.g. `CS2026-099`), Department, Semester, Phone, Standard Institutional Email, Password, and Password Confirmation.
  * **Standard Email Format Requirement**: Enforces standard email formatting (`name@campus.edu` or standard `user@domain.ext`) via regex validation `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`.
  * Includes a handy **"⚡ Format as @campus.edu"** auto-fill button that generates a standard campus email address from the student's name in 1 click.
  * Immediately logs the new student into their personal dashboard upon creation and automatically delivers a welcome notice to their inbox from Chief Librarian Rupashree.
* **Student Sign In**:
  * **Credentials**: Student Roll ID (e.g. `CS2024-001`) or Email (`alex.rivera@campus.edu`) + Password (`student123`).
  * **Instant Demo Logins**: Includes 1-click test cards for:
    * **Alex Rivera (CS2024-001)** — Has an overdue loan & active pre-order.
    * **Priya Sharma (IT2024-045)** — Has a pre-order ready for pickup at the desk.
    * **Marcus Chen (EE2024-012)** — Has accumulated overdue fines.
    * **Sophia Patel (AI2024-088)** — Has a loan due tomorrow.
* **🔒 Strict Student Privacy**:
  * **Students only see their own details**.
  * They have no access to other students' personal records, borrowed books, or dues.
  * The administrative console and other student profiles are completely hidden and inaccessible to any logged-in student.

---

### 2. Librarian Staff Portal (Chief Librarian Rupashree)
* **Chief Librarian Profile**:
  * **Name**: Rupashree
  * **Email**: `rubym292007@gmail.com`
  * **Username**: `rupashree` or `rubym292007@gmail.com`
  * **Password**: `admin123`
* **Instant Demo Login**: 1-click button to sign in directly as **Chief Librarian Rupashree**.
* **Administrative Oversight**:
  * Full access to the student directory with all member records.
  * **✏️ Edit Student**: Modify student Full Name, Roll ID, Department, Semester, Email, Phone, and Dues balance.
  * **🗑️ Remove Student**: Delete a student account from the system (with book recall safety checks to protect inventory).
  * **Auto-Dispatch Reminders**: Broadcast personalized end-of-due-date warnings to all students with loans due soon or overdue.

---

## 🎯 Key Features & Requirements Matrix

### 👨‍🎓 1. Student Portal
* **Available Books Catalog & Instant Borrowing**:
  * Real-time search by Title, Author, Category, or ISBN with copy counts (`X of Y Available`).
  * **⚡ Direct "Borrow Book" Button**:
    * Each available book card has a prominent **"Borrow"** button and a **"Details"** button.
    * In the Book Details modal, students can click **"Confirm & Borrow Book (14-Day Loan)"**.
    * **Automatic Counter Increment**: Clicking Borrow instantly increases the student's **"Borrowed Books" KPI counter** (with animation pop) and the **"My Borrowed Books" tab badge** by 1!
    * Deducts 1 physical copy from inventory.
    * Issues a new active loan with 14-day countdown due date.
    * Dispatches an official transaction confirmation notice to the student's inbox from Chief Librarian Rupashree.
    * Instantly updates the Librarian's student directory and circulation counts.
  * Duplicate check: Prevents re-borrowing a book title the student already has checked out.
* **Personal Borrowed Books & Due Dates**:
  * Visual cards showing all currently checked-out books for the logged-in student.
  * Real-time countdown urgency badges:
    * 🟢 **Safe** (> 3 days remaining)
    * 🟡 **Due Soon** (1–3 days left)
    * 🔴 **Overdue** (Accruing fine at **$1.50/day**)
  * **"Request 7-Day Renewal"** button for active loans.
  * **"Return Book"** button allowing students to check in books directly from their dashboard (decreases borrowed count and restores inventory).
  * Complete personal return history log.
  * **"Request 7-Day Renewal"** button for active loans.
  * Complete personal return history log.
* **Pre-order / Book Reservations**:
  * When a book has **0 copies available**, students can click **"Pre-order / Reserve"**.
  * Shows personal queue position (e.g. *Queue #1*, *Queue #2*).
  * Automatically notifies the student when a returned copy is ready for pickup at the circulation desk.
  * Cancel pre-order anytime.
* **Librarian Messages & End-of-Due-Date Alerts**:
  * Private student inbox receiving official notices from Chief Librarian Rupashree.
  * Badges for unread notices with 1-click "Mark Read".
* **Personal Dues & Fines**:
  * Real-time calculation of late fees with breakdown.

---

### 👩‍🏫 2. Librarian Administrative Portal
* **Student Directory & Member Management**:
  * Searchable table of all enrolled students (ID, name, email, department, borrowed books count, overdue count, and outstanding balance).
  * **View Details**: Full profile modal showing student info, active loans, pre-orders, and dues.
  * **✏️ Edit Student**: Modify student Full Name, Roll ID, Department, Semester, Email, Phone, and Dues balance.
  * **🗑️ Remove Student**: Delete a student account from the system (with book recall safety checks to prevent orphan loans).
  * **Enroll New Student**: Register new students with academic info.
* **Executive Dashboard**:
  * Live KPI statistics: Total titles, physical copies count, active loans, overdue items, pending pre-orders, and total outstanding dues.
* **Due Date Reminders & Messaging Center ("Messages to End of Due Dates")**:
  * Auto-filtered table of all loans due within ≤ 3 days or already overdue.
  * **"Auto-Dispatch All Due Reminders"** (1-Click Broadcast): Generates personalized warning messages from Rupashree and sends them to each student's inbox.
  * Individual loan reminder button.
  * **Custom Notice Composer**: Send announcements or notices to individual students or broadcast campus-wide with pre-built templates (*Friendly Due Date Reminder*, *Urgent Overdue Notice*, *Pre-order Ready for Pickup*, *Clearance Notice*).
* **Issue & Return Circulation Desk**:
  * **Rapid Issue**: Pick a student, pick an available book, select loan duration (7, 14, 21, or 30 days) and issue with 1 click.
  * **Rapid Return**: Select loan to return, preview overdue fines, and return the book.
  * **Smart Pre-order Matching**: When a book is returned, if another student has pre-ordered it, RLibrary automatically sets the pre-order status to *"Ready for Pickup"* and dispatches an instant notification to that student!
* **Book Inventory Management**:
  * Add new books (title, author, category, copies count, shelf location, synopsis).
  * Quick increment/decrement of copies (`+1` / `-1`).
  * Remove books with circulation safety checks.

---

## 📁 Project Structure

```
c:\Rupashree  M\my projects\RLibrary\
├── index.html       # Single-page web application UI with separate login, role views & modals
├── style.css        # Custom responsive styles, badges, cards & typography
├── app.js           # Core state management, authentication, role isolation & calculations
├── server.js        # Zero-dependency local Node.js HTTP server
├── package.json     # NPM scripts and project metadata
└── README.md        # Comprehensive documentation & user guide
```

---

## 💡 Recommended Test Walkthrough

1. **Test Student "Create Account"**:
   * Open the app (you will see the **RLibrary Login** screen).
   * In the Student portal box, switch to the **"Create Account"** tab.
   * Fill in your details (or click **"⚡ Format as @campus.edu"** to auto-generate a valid standard email).
   * Submit the form. You are automatically logged in to your newly created private dashboard!
   * Notice the welcome notice in your inbox from **Chief Librarian Rupashree (`rubym292007@gmail.com`)**.
   * Click **"Sign Out"** in the top header.

2. **Test Separate Student Login & Data Privacy**:
   * Back on the login screen, click **"Alex Rivera"** under Instant Test Profiles (or log in with `CS2024-001` / `student123`).
   * Notice that the student **only sees Alex Rivera's data**: his 2 borrowed books (*Clean Code* and *CLRS*), his pre-order, and his notices. There is no way to see or switch to other students' profiles.
   * Click **"Sign Out"**.

3. **Test Borrowing a Book & Increasing Borrowed Count**:
   * Sign in as **"Alex Rivera"** (currently has 2 borrowed books).
   * Look at the top banner: **Borrowed: 2**, and on the **"My Borrowed Books & Due Dates"** tab: **2**.
   * Under **"Available Books & Pre-orders"**, locate any available book (e.g., *Linear Algebra and Its Applications*).
   * Click the indigo **"Borrow"** button (or click **"Details"** and then **"Confirm & Borrow Book"**).
   * **Watch the counter bump**: The **Borrowed** count in the header immediately increases from **2 to 3**, and the tab badge becomes **3**!
   * Switch to the **"My Borrowed Books & Due Dates"** tab: the new title is displayed with its 14-day return countdown badge!
   * Check **"Librarian Messages & Due Alerts"**: a checkout confirmation receipt has been delivered by **Chief Librarian Rupashree**.
   * Click **"Return Book"** on that loan to test checking it back in; the borrowed count automatically decreases back to **2**!

4. **Test Librarian Login (Rupashree) & Member Management (Edit / Remove)**:
   * On the login screen, switch to the **"Librarian Portal"** tab.
   * Click **"Rupashree (rubym292007@gmail.com)"** (or type `rubym292007@gmail.com` and `admin123`).
   * In the **"Students Directory & Dues"** tab, notice all students are listed, with their live borrowed book counts synchronized.
   * Click **"Edit"** on any student (e.g. change department, name, or dues) and click **"Save Member Changes"**.
   * Click **"Remove"** on a student to delete their account from the system.
   * Go to **"Messages & Due Alerts"** and click **"Auto-Dispatch All Due Reminders"** to test sending batch end-of-due-date messages.
