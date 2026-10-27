/**
 * RLibrary - Smart Campus Library Management System
 * Core Application Logic, Authentication, Student Registration & Reactive UI Controller
 */

// Simulated System Clock anchor for realistic calculation
const CURRENT_DATE_STR = "2026-10-27";
const SYSTEM_DATE = new Date(CURRENT_DATE_STR);
const DAILY_FINE_RATE = 1.50; // $1.50 per day past due date

// Storage Key for LocalStorage Persistence
const STORAGE_KEY = "RLIBRARY_DATA_V3";

// Default Initial Mock Data
const DEFAULT_DATA = {
  session: {
    isLoggedIn: false, // User starts on Login Screen with separate Student and Librarian access
    role: null,        // 'STUDENT' or 'LIBRARIAN'
    userId: null,
    userName: null
  },
  librarian: {
    id: "LIB001",
    name: "Rupashree",
    title: "Chief Librarian",
    email: "rubym292007@gmail.com",
    username: "rupashree",
    password: "admin123"
  },
  students: [
    {
      id: "STU001",
      name: "Alex Rivera",
      rollNo: "CS2024-001",
      email: "alex.rivera@campus.edu",
      department: "Computer Science",
      semester: "5th Semester",
      phone: "+1 (555) 234-8901",
      duesBalance: 4.50, // fine for overdue book
      password: "student123"
    },
    {
      id: "STU002",
      name: "Priya Sharma",
      rollNo: "IT2024-045",
      email: "priya.sharma@campus.edu",
      department: "Information Technology",
      semester: "3rd Semester",
      phone: "+1 (555) 678-1234",
      duesBalance: 0.00,
      password: "student123"
    },
    {
      id: "STU003",
      name: "Marcus Chen",
      rollNo: "EE2024-012",
      email: "marcus.chen@campus.edu",
      department: "Electrical Engineering",
      semester: "7th Semester",
      phone: "+1 (555) 456-7890",
      duesBalance: 6.00,
      password: "student123"
    },
    {
      id: "STU004",
      name: "Sophia Patel",
      rollNo: "AI2024-088",
      email: "sophia.patel@campus.edu",
      department: "Artificial Intelligence",
      semester: "3rd Semester",
      phone: "+1 (555) 345-6712",
      duesBalance: 0.00,
      password: "student123"
    },
    {
      id: "STU005",
      name: "Daniel Lee",
      rollNo: "ME2024-034",
      email: "daniel.lee@campus.edu",
      department: "Mechanical Engineering",
      semester: "5th Semester",
      phone: "+1 (555) 901-2345",
      duesBalance: 0.00,
      password: "student123"
    }
  ],
  books: [
    {
      id: "BK001",
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      author: "Robert C. Martin",
      category: "Computer Science",
      isbn: "978-0132350884",
      totalCopies: 4,
      availableCopies: 1,
      shelf: "Rack CS-01",
      bgGradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      publishedYear: 2008,
      description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. A guide on writing robust, readable software."
    },
    {
      id: "BK002",
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      category: "Computer Science",
      isbn: "978-1449373320",
      totalCopies: 3,
      availableCopies: 0, // 0 copies available -> eligible for Pre-order!
      shelf: "Rack CS-04",
      bgGradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
      publishedYear: 2017,
      description: "Data is at the center of many challenges in system design today. Explore the principles and architectures of scalable, reliable data systems."
    },
    {
      id: "BK003",
      title: "Artificial Intelligence: A Modern Approach (4th Ed)",
      author: "Stuart Russell & Peter Norvig",
      category: "Artificial Intelligence",
      isbn: "978-0134610993",
      totalCopies: 5,
      availableCopies: 2,
      shelf: "Rack AI-02",
      bgGradient: "linear-gradient(135deg, #059669, #047857)",
      publishedYear: 2020,
      description: "The authoritative, most widely used introduction to the theory and practice of artificial intelligence across machine learning, robotics, and NLP."
    },
    {
      id: "BK004",
      title: "Deep Learning with Python",
      author: "François Chollet",
      category: "Artificial Intelligence",
      isbn: "978-1617296864",
      totalCopies: 2,
      availableCopies: 0, // 0 copies available -> eligible for Pre-order
      shelf: "Rack AI-05",
      bgGradient: "linear-gradient(135deg, #d97706, #b45309)",
      publishedYear: 2021,
      description: "Written by Keras creator François Chollet, this book introduces deep learning concepts through intuitive explanations and practical Python examples."
    },
    {
      id: "BK005",
      title: "Introduction to Algorithms (CLRS 4th Ed)",
      author: "Cormen, Leiserson, Rivest, Stein",
      category: "Computer Science",
      isbn: "978-0262046305",
      totalCopies: 6,
      availableCopies: 3,
      shelf: "Rack CS-02",
      bgGradient: "linear-gradient(135deg, #4f46e5, #3730a3)",
      publishedYear: 2022,
      description: "A comprehensive update of the leading algorithms text, with new chapters on bipartite matching, online algorithms, and machine learning."
    },
    {
      id: "BK006",
      title: "Linear Algebra and Its Applications",
      author: "Gilbert Strang",
      category: "Mathematics",
      isbn: "978-0030105678",
      totalCopies: 4,
      availableCopies: 2,
      shelf: "Rack MATH-01",
      bgGradient: "linear-gradient(135deg, #0284c7, #0369a1)",
      publishedYear: 2016,
      description: "Renowned professor Gilbert Strang presents the core matrix theory and vector spaces essential for engineering, graphics, and modern data science."
    },
    {
      id: "BK007",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Literature & Fiction",
      isbn: "978-0060935467",
      totalCopies: 5,
      availableCopies: 4,
      shelf: "Rack LIT-03",
      bgGradient: "linear-gradient(135deg, #e11d48, #be123c)",
      publishedYear: 1960,
      description: "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice."
    },
    {
      id: "BK008",
      title: "The Feynman Lectures on Physics (Vol 1)",
      author: "Richard P. Feynman",
      category: "Science & Physics",
      isbn: "978-0465024933",
      totalCopies: 3,
      availableCopies: 1,
      shelf: "Rack SCI-02",
      bgGradient: "linear-gradient(135deg, #0d9488, #0f766e)",
      publishedYear: 2011,
      description: "Legendary physics lectures delivered at Caltech, covering mechanics, radiation, and heat with Feynman's characteristic clarity and wit."
    },
    {
      id: "BK009",
      title: "Principles of Management & Leadership",
      author: "Peter F. Drucker",
      category: "Management & Business",
      isbn: "978-0061252662",
      totalCopies: 2,
      availableCopies: 0, // 0 copies -> Pre-order
      shelf: "Rack MGMT-01",
      bgGradient: "linear-gradient(135deg, #475569, #334155)",
      publishedYear: 2008,
      description: "Essential insights on organizational effectiveness, innovation, decision-making, and executive responsibility."
    }
  ],
  loans: [
    {
      id: "LN001",
      studentId: "STU001", // Alex Rivera
      bookId: "BK001", // Clean Code
      issueDate: "2026-10-10",
      dueDate: "2026-10-24", // 3 days overdue! (Current: Oct 27)
      returnDate: null,
      status: "ACTIVE"
    },
    {
      id: "LN002",
      studentId: "STU001", // Alex Rivera
      bookId: "BK005", // CLRS
      issueDate: "2026-10-18",
      dueDate: "2026-10-29", // Due in 2 days! (Due Soon warning)
      returnDate: null,
      status: "ACTIVE"
    },
    {
      id: "LN003",
      studentId: "STU002", // Priya Sharma
      bookId: "BK003", // AI Modern Approach
      issueDate: "2026-10-20",
      dueDate: "2026-11-03", // Due in 7 days (Safe)
      returnDate: null,
      status: "ACTIVE"
    },
    {
      id: "LN004",
      studentId: "STU003", // Marcus Chen
      bookId: "BK008", // Feynman Lectures
      issueDate: "2026-10-05",
      dueDate: "2026-10-23", // 4 days overdue!
      returnDate: null,
      status: "ACTIVE"
    },
    {
      id: "LN005",
      studentId: "STU004", // Sophia Patel
      bookId: "BK006", // Linear Algebra
      issueDate: "2026-10-22",
      dueDate: "2026-10-28", // Due tomorrow! (Due in 1 day)
      returnDate: null,
      status: "ACTIVE"
    },
    {
      id: "LN006",
      studentId: "STU001",
      bookId: "BK007", // To Kill a Mockingbird
      issueDate: "2026-09-15",
      dueDate: "2026-09-29",
      returnDate: "2026-09-28",
      status: "RETURNED"
    }
  ],
  preorders: [
    {
      id: "PO001",
      studentId: "STU002", // Priya Sharma
      bookId: "BK002", // Designing Data-Intensive Applications
      requestDate: "2026-10-21",
      queuePosition: 1,
      status: "READY_FOR_PICKUP", // Reserved and ready at desk!
      notes: "Held at Circulation Desk 2 until Oct 30."
    },
    {
      id: "PO002",
      studentId: "STU001", // Alex Rivera
      bookId: "BK004", // Deep Learning with Python
      requestDate: "2026-10-24",
      queuePosition: 1,
      status: "PENDING",
      notes: "Awaiting return by current borrower."
    },
    {
      id: "PO003",
      studentId: "STU003", // Marcus Chen
      bookId: "BK002", // Designing Data-Intensive Applications
      requestDate: "2026-10-25",
      queuePosition: 2,
      status: "PENDING",
      notes: "Queue #2. Estimated availability: Nov 3."
    }
  ],
  messages: [
    {
      id: "MSG001",
      studentId: "STU001",
      sender: "Chief Librarian Rupashree (rubym292007@gmail.com)",
      title: "🚨 URGENT: 'Clean Code' is Past Due Date",
      body: "Your borrowed book 'Clean Code: A Handbook of Agile Software Craftsmanship' was due on Oct 24, 2026. A fine of $1.50/day is currently accruing ($4.50 total). Please return it immediately to avoid registration holds.",
      type: "OVERDUE_ALERT",
      sentAt: "2026-10-26T14:30:00Z",
      read: false
    },
    {
      id: "MSG002",
      studentId: "STU001",
      sender: "Chief Librarian Rupashree (rubym292007@gmail.com)",
      title: "⏳ Upcoming Due Date: 'Introduction to Algorithms'",
      body: "Friendly reminder that your loan for 'Introduction to Algorithms (CLRS 4th Ed)' ends in 2 days on Oct 29, 2026. If no other student has requested it, you may renew at the library desk.",
      type: "DUE_REMINDER",
      sentAt: "2026-10-27T08:00:00Z",
      read: false
    },
    {
      id: "MSG003",
      studentId: "STU002",
      sender: "Chief Librarian Rupashree (rubym292007@gmail.com)",
      title: "🎉 Pre-order Ready: 'Designing Data-Intensive Applications'",
      body: "Great news! The book you reserved has been checked in and is now ready for pickup at Desk #2. It will be reserved for you for the next 72 hours.",
      type: "PREORDER_READY",
      sentAt: "2026-10-26T10:15:00Z",
      read: true
    },
    {
      id: "MSG004",
      studentId: "STU004",
      sender: "Chief Librarian Rupashree (rubym292007@gmail.com)",
      title: "⏳ Due Date Tomorrow: 'Linear Algebra and Its Applications'",
      body: "Reminder: Your checkout for 'Linear Algebra' is due tomorrow, Oct 28. Please return or extend your loan.",
      type: "DUE_REMINDER",
      sentAt: "2026-10-27T08:15:00Z",
      read: false
    }
  ]
};

// Application State Container
let state = {};

/**
 * Initialize State from LocalStorage or Default Seed
 */
function initState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      state = JSON.parse(saved);
      state.students = state.students || [];
      state.books = state.books || [];
      state.loans = state.loans || [];
      state.preorders = state.preorders || [];
      state.messages = state.messages || [];
      state.session = state.session || { isLoggedIn: false, role: null, userId: null, userName: null };
      state.librarian = state.librarian || DEFAULT_DATA.librarian;
      // Ensure librarian details are updated
      state.librarian.name = "Rupashree";
      state.librarian.email = "rubym292007@gmail.com";
    } else {
      state = JSON.parse(JSON.stringify(DEFAULT_DATA));
      saveState();
    }
  } catch (err) {
    console.error("Error loading state, using default:", err);
    state = JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

/**
 * Save State to LocalStorage
 */
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save state to localStorage:", err);
  }
}

/**
 * Reset Demo Data Helper
 */
function resetDemoData() {
  if (confirm("Reset library portal with fresh demo data and return to login screen?")) {
    state = JSON.parse(JSON.stringify(DEFAULT_DATA));
    saveState();
    showToast("Reset to initial sample data with Chief Librarian Rupashree!", "success");
    renderRoleView();
  }
}

// -------------------------------------------------------------
// Date & Due Calculation Utilities
// -------------------------------------------------------------

function parseDate(dateStr) {
  return new Date(dateStr + "T00:00:00");
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getDaysDifference(dueDateStr) {
  const due = parseDate(dueDateStr);
  const diffTime = due.getTime() - SYSTEM_DATE.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

function calculateLoanFine(dueDateStr) {
  const diffDays = getDaysDifference(dueDateStr);
  if (diffDays < 0) {
    const overdueDays = Math.abs(diffDays);
    return overdueDays * DAILY_FINE_RATE;
  }
  return 0.00;
}

function getDueStatusInfo(dueDateStr) {
  const diff = getDaysDifference(dueDateStr);
  if (diff < 0) {
    const daysOverdue = Math.abs(diff);
    const fine = (daysOverdue * DAILY_FINE_RATE).toFixed(2);
    return {
      type: "OVERDUE",
      label: `${daysOverdue} day${daysOverdue > 1 ? "s" : ""} OVERDUE (Fine: $${fine})`,
      shortLabel: `${daysOverdue}d Overdue`,
      badgeClass: "bg-rose-100 text-rose-700 border border-rose-300 font-bold",
      color: "#e11d48",
      diff: diff
    };
  } else if (diff === 0) {
    return {
      type: "DUE_TODAY",
      label: "DUE TODAY!",
      shortLabel: "Due Today",
      badgeClass: "bg-amber-100 text-amber-800 border border-amber-300 font-bold animate-pulse",
      color: "#d97706",
      diff: diff
    };
  } else if (diff <= 3) {
    return {
      type: "DUE_SOON",
      label: `Due in ${diff} day${diff > 1 ? "s" : ""} (Expiring Soon)`,
      shortLabel: `${diff}d left`,
      badgeClass: "bg-amber-50 text-amber-700 border border-amber-200 font-semibold",
      color: "#b45309",
      diff: diff
    };
  } else {
    return {
      type: "SAFE",
      label: `${diff} days remaining`,
      shortLabel: `${diff}d left`,
      badgeClass: "bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium",
      color: "#059669",
      diff: diff
    };
  }
}

// -------------------------------------------------------------
// Authentication & Student Registration Management
// -------------------------------------------------------------

function switchAuthTab(targetRole) {
  const studentBtn = document.getElementById("authTabBtnStudent");
  const librarianBtn = document.getElementById("authTabBtnLibrarian");
  const studentPanel = document.getElementById("authStudentPanel");
  const librarianPanel = document.getElementById("authLibrarianPanel");

  if (targetRole === "STUDENT") {
    studentPanel.classList.remove("hidden");
    librarianPanel.classList.add("hidden");
    studentBtn.className = "px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bg-white text-indigo-700 shadow-sm flex items-center gap-2";
    librarianBtn.className = "px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-white/80 hover:text-white flex items-center gap-2";
  } else {
    studentPanel.classList.add("hidden");
    librarianPanel.classList.remove("hidden");
    librarianBtn.className = "px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bg-white text-slate-900 shadow-sm flex items-center gap-2";
    studentBtn.className = "px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-white/80 hover:text-white flex items-center gap-2";
  }
}

function toggleStudentAuthMode(mode) {
  const signInBox = document.getElementById("studentSignInBox");
  const registerBox = document.getElementById("studentRegisterBox");
  const btnLogin = document.getElementById("btnStudentSubLogin");
  const btnRegister = document.getElementById("btnStudentSubRegister");

  if (mode === "REGISTER") {
    signInBox.classList.add("hidden");
    registerBox.classList.remove("hidden");
    btnRegister.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-white text-indigo-700 shadow-xs";
    btnLogin.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all text-slate-600 hover:text-slate-900";
  } else {
    registerBox.classList.add("hidden");
    signInBox.classList.remove("hidden");
    btnLogin.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-white text-indigo-700 shadow-xs";
    btnRegister.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all text-slate-600 hover:text-slate-900";
  }
}

function autoFormatStandardEmail() {
  const nameInput = document.getElementById("regStudentName")?.value.trim().toLowerCase();
  const rollInput = document.getElementById("regStudentRoll")?.value.trim().toLowerCase();
  const emailInput = document.getElementById("regStudentEmail");

  if (!emailInput) return;

  if (nameInput) {
    const formatted = nameInput.replace(/[^a-z0-9]/g, ".") + "@campus.edu";
    emailInput.value = formatted;
    showToast(`Formatted to standard: ${formatted}`, "info");
  } else if (rollInput) {
    const formatted = rollInput.replace(/[^a-z0-9]/g, "") + "@campus.edu";
    emailInput.value = formatted;
    showToast(`Formatted to standard: ${formatted}`, "info");
  } else {
    emailInput.value = "student.name@campus.edu";
    showToast("Enter your name or roll number first to format automatically.", "info");
  }
}

function renderAuthSection() {
  const container = document.getElementById("quickStudentLoginsContainer");
  if (!container) return;

  container.innerHTML = state.students.slice(0, 4).map(s => {
    const loans = state.loans.filter(l => l.studentId === s.id && l.status === "ACTIVE");
    let hasOverdue = false;
    loans.forEach(l => {
      if (getDaysDifference(l.dueDate) < 0) hasOverdue = true;
    });
    const preorders = state.preorders.filter(p => p.studentId === s.id);

    let statusPill = "";
    if (hasOverdue) {
      statusPill = `<span class="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">⚠️ Overdue Book</span>`;
    } else if (preorders.length > 0) {
      statusPill = `<span class="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">🔖 Pre-order</span>`;
    } else {
      statusPill = `<span class="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Active</span>`;
    }

    return `
      <button type="button" onclick="quickLoginStudent('${s.id}')" class="p-2.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl text-left transition-all flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
            ${s.name.charAt(0)}
          </div>
          <div>
            <div class="font-bold text-xs text-slate-800 leading-tight">${escapeHtml(s.name)}</div>
            <div class="text-[10px] text-slate-400">${escapeHtml(s.rollNo)}</div>
          </div>
        </div>
        ${statusPill}
      </button>
    `;
  }).join("");
}

function handleStudentLoginSubmit(e) {
  e.preventDefault();
  const idInput = document.getElementById("loginStudentIdentifier").value.trim().toLowerCase();
  const passInput = document.getElementById("loginStudentPassword").value.trim();

  const student = state.students.find(s => 
    s.rollNo.toLowerCase() === idInput || 
    s.email.toLowerCase() === idInput ||
    s.name.toLowerCase() === idInput
  );

  if (!student) {
    showToast("Student not found! Check your Roll No or Email, or use 'Create Account' to register.", "error");
    return;
  }

  if (student.password && student.password !== passInput) {
    showToast("Incorrect password. Default password is: student123", "error");
    return;
  }

  state.session = {
    isLoggedIn: true,
    role: "STUDENT",
    userId: student.id,
    userName: student.name
  };

  saveState();
  showToast(`Welcome back, ${student.name}!`, "success");
  renderRoleView();
}

/**
 * Handle Student "Create Account" Self-Registration
 */
function handleStudentRegisterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("regStudentName").value.trim();
  const rollNo = document.getElementById("regStudentRoll").value.trim().toUpperCase();
  const dept = document.getElementById("regStudentDept").value;
  const semester = document.getElementById("regStudentSemester").value;
  const phone = document.getElementById("regStudentPhone").value.trim() || "+1 (555) 000-0000";
  const email = document.getElementById("regStudentEmail").value.trim().toLowerCase();
  const password = document.getElementById("regStudentPassword").value.trim();
  const confirmPassword = document.getElementById("regStudentConfirmPassword").value.trim();

  // Validate Standard Email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    showToast("Please provide a valid standard email address format (e.g., student.name@campus.edu).", "error");
    return;
  }

  if (password !== confirmPassword) {
    showToast("Passwords do not match! Please check again.", "error");
    return;
  }

  if (password.length < 6) {
    showToast("Password must be at least 6 characters long.", "warning");
    return;
  }

  // Duplicate Check
  const duplicateRoll = state.students.find(s => s.rollNo.toUpperCase() === rollNo);
  if (duplicateRoll) {
    showToast(`A student with Roll ID ${rollNo} already exists! Please sign in.`, "error");
    return;
  }

  const duplicateEmail = state.students.find(s => s.email.toLowerCase() === email);
  if (duplicateEmail) {
    showToast(`A student with Email ${email} already exists! Please sign in.`, "error");
    return;
  }

  // Create New Student Object
  const newStudent = {
    id: "STU" + String(Date.now()).slice(-4),
    name,
    rollNo,
    email,
    department: dept,
    semester,
    phone,
    duesBalance: 0.00,
    password
  };

  state.students.unshift(newStudent);

  // Personalized Welcome Message from Chief Librarian Rupashree
  state.messages.unshift({
    id: "MSG" + Date.now(),
    studentId: newStudent.id,
    sender: "Chief Librarian Rupashree (rubym292007@gmail.com)",
    title: "👋 Welcome to RLibrary!",
    body: `Hello ${newStudent.name}, your student account (${newStudent.rollNo}) has been registered! You can now browse our catalog, borrow titles, monitor due dates, and place pre-orders. If you need any assistance, contact Chief Librarian Rupashree at rubym292007@gmail.com.`,
    type: "GENERAL",
    sentAt: new Date().toISOString(),
    read: false
  });

  // Automatically authenticate as the new student
  state.session = {
    isLoggedIn: true,
    role: "STUDENT",
    userId: newStudent.id,
    userName: newStudent.name
  };

  saveState();
  showToast(`Account created successfully! Welcome, ${newStudent.name}.`, "success");
  renderRoleView();
}

/**
 * Handle Librarian Login
 */
function handleLibrarianLoginSubmit(e) {
  e.preventDefault();
  const idInput = document.getElementById("loginLibrarianIdentifier").value.trim().toLowerCase();
  const passInput = document.getElementById("loginLibrarianPassword").value.trim();

  const lib = state.librarian || DEFAULT_DATA.librarian;

  const isMatch = (
    idInput === "rubym292007@gmail.com" ||
    idInput === lib.email.toLowerCase() ||
    idInput === "rupashree" ||
    idInput === lib.username.toLowerCase() ||
    idInput === "librarian" ||
    idInput === "admin"
  );

  if (isMatch && (passInput === lib.password || passInput === "admin123")) {
    state.session = {
      isLoggedIn: true,
      role: "LIBRARIAN",
      userId: lib.id,
      userName: "Rupashree"
    };

    saveState();
    showToast("Welcome, Chief Librarian Rupashree!", "success");
    renderRoleView();
  } else {
    showToast("Invalid librarian credentials! Use rubym292007@gmail.com / admin123 or the 1-click test button.", "error");
  }
}

function quickLoginStudent(studentId) {
  const student = state.students.find(s => s.id === studentId);
  if (!student) return;

  state.session = {
    isLoggedIn: true,
    role: "STUDENT",
    userId: student.id,
    userName: student.name
  };

  saveState();
  showToast(`Signed in as ${student.name} (Student)`, "success");
  renderRoleView();
}

function quickLoginLibrarian() {
  state.session = {
    isLoggedIn: true,
    role: "LIBRARIAN",
    userId: "LIB001",
    userName: "Rupashree"
  };

  saveState();
  showToast("Signed in as Chief Librarian Rupashree (rubym292007@gmail.com)", "success");
  renderRoleView();
}

function handleLogout() {
  state.session = {
    isLoggedIn: false,
    role: null,
    userId: null,
    userName: null
  };
  saveState();
  showToast("You have been signed out.", "info");
  renderRoleView();
}

// -------------------------------------------------------------
// Core View Switcher (Enforcing Strict Role Isolation)
// -------------------------------------------------------------

function renderRoleView() {
  const authSection = document.getElementById("authSection");
  const studentPortal = document.getElementById("studentPortal");
  const librarianPortal = document.getElementById("librarianPortal");
  
  const headerUserProfile = document.getElementById("headerUserProfile");
  const headerUserAvatar = document.getElementById("headerUserAvatar");
  const headerUserName = document.getElementById("headerUserName");
  const headerUserRoleBadge = document.getElementById("headerUserRoleBadge");
  const headerNotifContainer = document.getElementById("headerNotifContainer");
  const headerLogoutBtn = document.getElementById("headerLogoutBtn");
  const portalBadge = document.getElementById("portalBadge");

  // If Not Logged In -> Show Auth Screen
  if (!state.session || !state.session.isLoggedIn) {
    authSection.classList.remove("hidden");
    studentPortal.classList.add("hidden");
    librarianPortal.classList.add("hidden");

    headerUserProfile.classList.add("hidden");
    headerNotifContainer.classList.add("hidden");
    headerLogoutBtn.classList.add("hidden");

    portalBadge.innerText = "Authentication";
    portalBadge.className = "px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200";

    renderAuthSection();
    return;
  }

  // User is Logged In
  authSection.classList.add("hidden");
  headerUserProfile.classList.remove("hidden");
  headerNotifContainer.classList.remove("hidden");
  headerLogoutBtn.classList.remove("hidden");

  if (state.session.role === "STUDENT") {
    // STRICT STUDENT PRIVACY ISOLATION
    studentPortal.classList.remove("hidden");
    librarianPortal.classList.add("hidden");

    const currentStudent = getActiveStudent();
    headerUserAvatar.innerText = currentStudent ? currentStudent.name.charAt(0) : "S";
    headerUserAvatar.className = "w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs";
    headerUserName.innerText = currentStudent ? currentStudent.name : "Student";
    headerUserRoleBadge.innerText = `Student (${currentStudent ? currentStudent.rollNo : ""})`;
    headerUserRoleBadge.className = "text-[10px] font-semibold text-indigo-600";

    portalBadge.innerText = "Student Portal";
    portalBadge.className = "px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200";

    renderStudentPortal();
  } else if (state.session.role === "LIBRARIAN") {
    // LIBRARIAN CONSOLE FOR RUPASHREE
    studentPortal.classList.add("hidden");
    librarianPortal.classList.remove("hidden");

    headerUserAvatar.innerText = "R";
    headerUserAvatar.className = "w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-xs";
    headerUserName.innerText = "Rupashree";
    headerUserRoleBadge.innerText = "Chief Librarian • rubym292007@gmail.com";
    headerUserRoleBadge.className = "text-[10px] font-semibold text-rose-600";

    portalBadge.innerText = "Librarian Portal";
    portalBadge.className = "px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-800 text-indigo-200 border border-slate-700";

    renderLibrarianPortal();
  }

  updateGlobalNotificationCount();
}

function getActiveStudent() {
  if (state.session && state.session.role === "STUDENT") {
    return state.students.find(s => s.id === state.session.userId) || state.students[0];
  }
  return null;
}

// -------------------------------------------------------------
// Tab Controllers
// -------------------------------------------------------------

function setStudentTab(tabId) {
  const tabs = ["catalog", "loans", "preorders", "messages"];
  tabs.forEach(t => {
    const el = document.getElementById(`studentTab-${t}`);
    const btn = document.getElementById(`sTabBtn-${t}`);
    if (el) el.classList.toggle("hidden", t !== tabId);
    if (btn) btn.classList.toggle("active", t === tabId);
  });
}

function setLibrarianTab(tabId) {
  const tabs = ["students", "reminders", "circulation", "preorders", "books"];
  tabs.forEach(t => {
    const el = document.getElementById(`libTab-${t}`);
    const btn = document.getElementById(`lTabBtn-${t}`);
    if (el) el.classList.toggle("hidden", t !== tabId);
    if (btn) btn.classList.toggle("active", t === tabId);
  });
}

// -------------------------------------------------------------
// Student Portal Rendering (Strictly Scoped to Current Student)
// -------------------------------------------------------------

function renderStudentPortal() {
  const student = getActiveStudent();
  if (!student) return;

  // Header Banner Info
  document.getElementById("bannerStudentName").innerText = student.name;
  document.getElementById("bannerStudentRoll").innerText = student.rollNo;
  document.getElementById("bannerStudentDept").innerText = student.department;

  // Recalculate fines and counts strictly for logged-in student
  const studentLoans = state.loans.filter(l => l.studentId === student.id && l.status === "ACTIVE");
  let activeOverdueCount = 0;
  let dueSoonCount = 0;
  let accruedFine = 0;

  studentLoans.forEach(l => {
    const diff = getDaysDifference(l.dueDate);
    if (diff < 0) {
      activeOverdueCount++;
      accruedFine += Math.abs(diff) * DAILY_FINE_RATE;
    } else if (diff <= 3) {
      dueSoonCount++;
    }
  });

  student.duesBalance = accruedFine;

  // Banner KPI counts
  document.getElementById("kpiBorrowedCount").innerText = studentLoans.length;
  document.getElementById("kpiDueSoonCount").innerText = activeOverdueCount > 0 ? `${activeOverdueCount} Overdue!` : dueSoonCount;
  document.getElementById("kpiStudentDues").innerText = `$${student.duesBalance.toFixed(2)}`;

  // Tab Badge counts
  document.getElementById("tabLoanBadge").innerText = studentLoans.length;
  
  const studentPreorders = state.preorders.filter(p => p.studentId === student.id);
  document.getElementById("tabPreorderBadge").innerText = studentPreorders.length;

  const studentMessages = state.messages.filter(m => m.studentId === student.id || m.studentId === "ALL");
  const unreadMsgCount = studentMessages.filter(m => !m.read).length;
  const msgBadge = document.getElementById("tabMessageBadge");
  if (unreadMsgCount > 0) {
    msgBadge.innerText = `${unreadMsgCount} New`;
    msgBadge.classList.remove("hidden");
  } else {
    msgBadge.classList.add("hidden");
  }

  // Overdue banner in Loans Tab
  const overdueWarnBox = document.getElementById("studentOverdueWarning");
  if (activeOverdueCount > 0) {
    overdueWarnBox.classList.remove("hidden");
  } else {
    overdueWarnBox.classList.add("hidden");
  }

  // Render Sub-Views (All strictly isolated to this student)
  renderBooksGrid();
  renderStudentLoans();
  renderStudentPreorders();
  renderStudentMessages();
}

/**
 * Render Book Catalog for Student
 */
function renderBooksGrid() {
  const container = document.getElementById("booksGrid");
  const noBooksFound = document.getElementById("noBooksFound");
  const searchTerm = (document.getElementById("bookSearchInput")?.value || "").toLowerCase().trim();
  const categoryFilter = document.getElementById("bookCategoryFilter")?.value || "ALL";
  const availabilityFilter = document.getElementById("bookAvailabilityFilter")?.value || "ALL";

  const student = getActiveStudent();
  const studentPreorderBookIds = student ? state.preorders
    .filter(p => p.studentId === student.id && (p.status === "PENDING" || p.status === "READY_FOR_PICKUP"))
    .map(p => p.bookId) : [];

  const studentBorrowedBookIds = student ? state.loans
    .filter(l => l.studentId === student.id && l.status === "ACTIVE")
    .map(l => l.bookId) : [];

  let filtered = state.books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm) ||
                          b.author.toLowerCase().includes(searchTerm) ||
                          b.isbn.toLowerCase().includes(searchTerm) ||
                          b.category.toLowerCase().includes(searchTerm);
    const matchesCategory = categoryFilter === "ALL" || b.category === categoryFilter;
    let matchesAvail = true;
    if (availabilityFilter === "AVAILABLE") matchesAvail = b.availableCopies > 0;
    if (availabilityFilter === "PREORDER") matchesAvail = b.availableCopies === 0;

    return matchesSearch && matchesCategory && matchesAvail;
  });

  if (filtered.length === 0) {
    container.innerHTML = "";
    noBooksFound.classList.remove("hidden");
    return;
  }
  noBooksFound.classList.add("hidden");

  container.innerHTML = filtered.map(book => {
    const isAlreadyBorrowed = studentBorrowedBookIds.includes(book.id);
    const isAlreadyPreordered = studentPreorderBookIds.includes(book.id);

    let statusPill = "";
    let actionBtn = "";

    if (book.availableCopies > 0) {
      statusPill = `<span class="px-2.5 py-0.5 text-xs font-semibold rounded-full badge-available">${book.availableCopies} of ${book.totalCopies} Available</span>`;
      if (isAlreadyBorrowed) {
        actionBtn = `
          <div class="flex items-center gap-2 mt-2">
            <span class="flex-1 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-xl border border-indigo-200 text-center">
              ✓ Already Borrowed
            </span>
            <button onclick="openBookDetailModal('${book.id}')" class="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all">
              Details
            </button>
          </div>
        `;
      } else {
        actionBtn = `
          <div class="grid grid-cols-2 gap-2 mt-2">
            <button onclick="openBookDetailModal('${book.id}')" class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all">
              Details
            </button>
            <button onclick="handleStudentBorrowBook('${book.id}')" class="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5" title="Borrow this book (14-day checkout)">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Borrow</span>
            </button>
          </div>
        `;
      }
    } else {
      statusPill = `<span class="px-2.5 py-0.5 text-xs font-semibold rounded-full badge-out">0 Copies (Pre-order Available)</span>`;
      if (isAlreadyPreordered) {
        actionBtn = `
          <div class="flex items-center gap-2 mt-2">
            <span class="flex-1 py-2 text-xs font-semibold text-amber-700 bg-amber-50 rounded-xl border border-amber-200 text-center">
              ⏳ In Queue
            </span>
            <button onclick="openBookDetailModal('${book.id}')" class="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all">
              Details
            </button>
          </div>
        `;
      } else {
        actionBtn = `
          <div class="grid grid-cols-2 gap-2 mt-2">
            <button onclick="openBookDetailModal('${book.id}')" class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all">
              Details
            </button>
            <button onclick="handlePreorderBook('${book.id}')" class="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5" title="Pre-order this book">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span>Pre-order</span>
            </button>
          </div>
        `;
      }
    }

    return `
      <div class="book-card bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
        <div>
          <!-- Gradient Styled Book Cover -->
          <div class="book-cover-art" style="background: ${book.bgGradient || 'linear-gradient(135deg, #4f46e5, #312e81)'};">
            <span class="text-[10px] font-bold text-white/70 uppercase tracking-widest">${book.shelf}</span>
            <h4 class="text-white font-extrabold text-sm sm:text-base leading-tight mt-1 line-clamp-2">${escapeHtml(book.title)}</h4>
            <p class="text-white/80 text-xs mt-0.5">${escapeHtml(book.author)}</p>
          </div>

          <!-- Book Metadata -->
          <div class="p-4 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-semibold text-slate-500 uppercase">${escapeHtml(book.category)}</span>
              ${statusPill}
            </div>
            <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              ${escapeHtml(book.description)}
            </p>
          </div>
        </div>

        <div class="p-4 pt-0">
          ${actionBtn}
        </div>
      </div>
    `;
  }).join("");
}

function filterBooks() {
  renderBooksGrid();
}

/**
 * Render Student Active Loans with Due Dates & Urgency Countdowns
 */
function renderStudentLoans() {
  const container = document.getElementById("studentLoansContainer");
  const historyContainer = document.getElementById("studentHistoryContainer");
  const student = getActiveStudent();
  if (!student) return;

  const activeLoans = state.loans.filter(l => l.studentId === student.id && l.status === "ACTIVE");
  const returnedLoans = state.loans.filter(l => l.studentId === student.id && l.status === "RETURNED");

  if (activeLoans.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-slate-400">
        <svg class="w-12 h-12 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <p class="text-sm font-medium text-slate-600">You have no active loans right now.</p>
        <p class="text-xs text-slate-400 mt-1">Browse the catalog above to borrow books.</p>
      </div>
    `;
  } else {
    container.innerHTML = activeLoans.map(loan => {
      const book = state.books.find(b => b.id === loan.bookId) || { title: "Unknown Book", shelf: "N/A" };
      const statusInfo = getDueStatusInfo(loan.dueDate);

      return `
        <div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
          <div class="flex items-start gap-4">
            <div class="w-12 h-14 rounded-xl flex items-center justify-center text-white shrink-0 font-bold text-xs p-2 text-center shadow-xs" style="background: ${book.bgGradient || '#4f46e5'}">
              📖
            </div>
            <div>
              <h4 class="font-bold text-sm text-slate-900">${escapeHtml(book.title)}</h4>
              <p class="text-xs text-slate-500 mt-0.5">Author: <span class="font-medium text-slate-700">${escapeHtml(book.author || "N/A")}</span> • Shelf: <span class="font-mono text-slate-700">${escapeHtml(book.shelf)}</span></p>
              
              <div class="flex flex-wrap items-center gap-3 mt-2 text-xs">
                <span class="text-slate-500">Issued: <strong>${formatDateDisplay(loan.issueDate)}</strong></span>
                <span class="text-slate-300">•</span>
                <span class="text-slate-500">Due Date: <strong class="text-slate-800">${formatDateDisplay(loan.dueDate)}</strong></span>
              </div>
            </div>
          </div>

          <div class="flex items-center sm:flex-col sm:items-end justify-between gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.badgeClass}">
              ${statusInfo.label}
            </span>
            <div class="flex items-center gap-2">
              <button onclick="requestLoanRenewal('${loan.id}')" class="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">
                Request Renewal (+7d)
              </button>
              <span class="text-slate-300">•</span>
              <button onclick="handleStudentReturnBook('${loan.id}')" class="text-xs font-semibold text-emerald-600 hover:text-emerald-800 hover:underline">
                Return Book
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Returned history list
  if (returnedLoans.length === 0) {
    historyContainer.innerHTML = `<p class="text-xs text-slate-400 italic">No past returns recorded for this account.</p>`;
  } else {
    historyContainer.innerHTML = `
      <div class="divide-y divide-slate-100">
        ${returnedLoans.map(loan => {
          const book = state.books.find(b => b.id === loan.bookId) || { title: "Archived Book" };
          return `
            <div class="py-2.5 flex items-center justify-between text-xs">
              <span class="font-medium text-slate-700">${escapeHtml(book.title)}</span>
              <span class="text-slate-400">Returned on ${formatDateDisplay(loan.returnDate)}</span>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }
}

/**
 * Render Student Pre-orders
 */
function renderStudentPreorders() {
  const container = document.getElementById("studentPreordersList");
  const student = getActiveStudent();
  if (!student) return;

  const preorders = state.preorders.filter(p => p.studentId === student.id);

  if (preorders.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-slate-400">
        <svg class="w-10 h-10 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        <p class="text-sm font-medium text-slate-600">No active pre-orders.</p>
        <p class="text-xs text-slate-400 mt-1">When popular books have 0 copies left, you can pre-order to join the waitlist.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = preorders.map(po => {
    const book = state.books.find(b => b.id === po.bookId) || { title: "Unknown Book" };
    
    let statusBadge = "";
    if (po.status === "READY_FOR_PICKUP") {
      statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse">🎉 Ready for Pickup at Desk</span>`;
    } else {
      statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">Queue Position: #${po.queuePosition || 1}</span>`;
    }

    return `
      <div class="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 class="font-bold text-sm text-slate-900">${escapeHtml(book.title)}</h4>
          <p class="text-xs text-slate-500 mt-0.5">Author: ${escapeHtml(book.author || "N/A")} • Requested on ${formatDateDisplay(po.requestDate)}</p>
          <p class="text-xs text-slate-600 mt-1 italic">${escapeHtml(po.notes || "Awaiting return")}</p>
        </div>

        <div class="flex items-center gap-3">
          ${statusBadge}
          <button onclick="cancelStudentPreorder('${po.id}')" class="text-xs text-rose-600 hover:text-rose-800 font-semibold">
            Cancel
          </button>
        </div>
      </div>
    `;
  }).join("");
}

/**
 * Render Student Messages & Due Date Reminders
 */
function renderStudentMessages() {
  const container = document.getElementById("studentMessagesFullList");
  const student = getActiveStudent();
  if (!student) return;

  const messages = state.messages.filter(m => m.studentId === student.id || m.studentId === "ALL");

  if (messages.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-slate-400">
        <svg class="w-10 h-10 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <p class="text-sm font-medium text-slate-600">Your message inbox is clear.</p>
        <p class="text-xs text-slate-400 mt-1">Librarian reminders and overdue alerts will appear here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = messages.map(msg => {
    let icon = "📩";
    let border = "border-slate-200";
    let bg = "bg-white";

    if (msg.type === "OVERDUE_ALERT") {
      icon = "🚨";
      border = "border-rose-200";
      bg = "bg-rose-50/50";
    } else if (msg.type === "DUE_REMINDER") {
      icon = "⏳";
      border = "border-amber-200";
      bg = "bg-amber-50/40";
    } else if (msg.type === "PREORDER_READY") {
      icon = "🎉";
      border = "border-emerald-200";
      bg = "bg-emerald-50/40";
    }

    return `
      <div class="py-4 px-3 rounded-xl ${bg} border ${border} my-2 transition-all">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-2.5">
            <span class="text-xl">${icon}</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-sm text-slate-900">${escapeHtml(msg.title)}</h4>
                ${!msg.read ? '<span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white">NEW</span>' : ''}
              </div>
              <p class="text-xs text-slate-500 mt-0.5">From: <span class="font-semibold text-slate-700">${escapeHtml(msg.sender)}</span> • ${new Date(msg.sentAt).toLocaleString()}</p>
              <p class="text-xs text-slate-700 mt-2 leading-relaxed">${escapeHtml(msg.body)}</p>
            </div>
          </div>
          ${!msg.read ? `
            <button onclick="markMessageRead('${msg.id}')" class="text-xs text-indigo-600 font-semibold hover:underline shrink-0">
              Mark Read
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join("");
}

// -------------------------------------------------------------
// Librarian Portal Rendering (Full Management of All Members)
// -------------------------------------------------------------

function renderLibrarianPortal() {
  const totalBooks = state.books.length;
  const totalCopies = state.books.reduce((acc, b) => acc + (b.totalCopies || 0), 0);
  const activeLoans = state.loans.filter(l => l.status === "ACTIVE");
  
  let overdueLoansCount = 0;
  let totalDuesSum = 0;

  activeLoans.forEach(l => {
    const diff = getDaysDifference(l.dueDate);
    if (diff < 0) {
      overdueLoansCount++;
      totalDuesSum += Math.abs(diff) * DAILY_FINE_RATE;
    }
  });

  const pendingPreorders = state.preorders.filter(p => p.status === "PENDING" || p.status === "READY_FOR_PICKUP");

  document.getElementById("libKpiBooksCount").innerText = totalBooks;
  document.getElementById("libKpiCopiesCount").innerText = `${totalCopies} physical copies`;
  document.getElementById("libKpiActiveLoans").innerText = activeLoans.length;
  document.getElementById("libKpiOverdueCount").innerText = overdueLoansCount;
  document.getElementById("libKpiPreordersCount").innerText = pendingPreorders.length;
  document.getElementById("libKpiTotalDues").innerText = `$${totalDuesSum.toFixed(2)}`;

  document.getElementById("tabRemindersBadge").innerText = `${overdueLoansCount} Overdue`;
  document.getElementById("urgentLoansCountBadge").innerText = `${overdueLoansCount} Overdue / Expiring`;

  // Render All Administrative Views
  renderStudentsTable();
  renderUrgentLoansTable();
  renderLibrarianSentLog();
  populateCirculationDropdowns();
  renderAllActiveLoansTable();
  renderLibrarianPreordersTable();
  renderLibrarianBooksTable();
}

/**
 * Render All Students Directory with Full View, Edit, and Remove Privileges
 */
function renderStudentsTable() {
  const tbody = document.getElementById("studentsTableBody");
  const searchTerm = (document.getElementById("studentSearchInput")?.value || "").toLowerCase().trim();

  let filtered = state.students.filter(s => {
    return s.name.toLowerCase().includes(searchTerm) ||
           s.rollNo.toLowerCase().includes(searchTerm) ||
           s.department.toLowerCase().includes(searchTerm) ||
           s.email.toLowerCase().includes(searchTerm);
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-slate-400">No student records found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(student => {
    const loans = state.loans.filter(l => l.studentId === student.id && l.status === "ACTIVE");
    let overdueCount = 0;
    let fineAmount = 0;

    loans.forEach(l => {
      const diff = getDaysDifference(l.dueDate);
      if (diff < 0) {
        overdueCount++;
        fineAmount += Math.abs(diff) * DAILY_FINE_RATE;
      }
    });

    student.duesBalance = fineAmount;

    return `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
              ${student.name.charAt(0)}
            </div>
            <div>
              <div class="font-bold text-slate-900">${escapeHtml(student.name)}</div>
              <div class="text-xs text-slate-400">${escapeHtml(student.rollNo)} • ${escapeHtml(student.email)}</div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 text-xs font-medium text-slate-700">${escapeHtml(student.department)}</td>
        <td class="px-6 py-4 text-xs font-semibold text-slate-800">${loans.length} books</td>
        <td class="px-6 py-4">
          ${overdueCount > 0 
            ? `<span class="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-100 text-rose-700">${overdueCount} Overdue</span>`
            : `<span class="text-xs text-slate-400">None</span>`}
        </td>
        <td class="px-6 py-4">
          ${student.duesBalance > 0
            ? `<span class="font-bold text-sm text-rose-600">$${student.duesBalance.toFixed(2)}</span>`
            : `<span class="text-xs font-medium text-emerald-600">No Dues ($0.00)</span>`}
        </td>
        <td class="px-6 py-4 text-right">
          <div class="flex items-center justify-end gap-1.5 flex-wrap">
            <button onclick="openStudentProfileModal('${student.id}')" class="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors" title="View Full Details">
              Details
            </button>
            <button onclick="openEditStudentModal('${student.id}')" class="px-2.5 py-1 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors" title="Edit Student Record">
              Edit
            </button>
            <button onclick="handleDeleteStudent('${student.id}')" class="px-2.5 py-1 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition-colors" title="Remove Student from Registry">
              Remove
            </button>
            <button onclick="openDirectMessageToStudent('${student.id}')" class="p-1 text-slate-400 hover:text-indigo-600 transition-colors" title="Send Direct Notice">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

/**
 * Open Modal to Edit Student Member Details (Librarian Privilege)
 */
function openEditStudentModal(studentId) {
  const student = state.students.find(s => s.id === studentId);
  if (!student) return;

  document.getElementById("editStudentId").value = student.id;
  document.getElementById("editStudentName").value = student.name;
  document.getElementById("editStudentRoll").value = student.rollNo;
  document.getElementById("editStudentDept").value = student.department;
  document.getElementById("editStudentSemester").value = student.semester || "1st Semester";
  document.getElementById("editStudentEmail").value = student.email;
  document.getElementById("editStudentPhone").value = student.phone || "";
  document.getElementById("editStudentDues").value = (student.duesBalance || 0).toFixed(2);

  openModal("editStudentModal");
}

/**
 * Handle Save Changes for Student Edit (Librarian Privilege)
 */
function handleEditStudentSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("editStudentId").value;
  const student = state.students.find(s => s.id === id);
  if (!student) return;

  student.name = document.getElementById("editStudentName").value.trim();
  student.rollNo = document.getElementById("editStudentRoll").value.trim();
  student.department = document.getElementById("editStudentDept").value.trim();
  student.semester = document.getElementById("editStudentSemester").value.trim();
  student.email = document.getElementById("editStudentEmail").value.trim();
  student.phone = document.getElementById("editStudentPhone").value.trim();
  student.duesBalance = parseFloat(document.getElementById("editStudentDues").value) || 0.00;

  saveState();
  closeModal("editStudentModal");
  showToast(`Updated student profile for ${student.name}!`, "success");
  
  renderLibrarianPortal();
}

/**
 * Remove / Delete Student from Library (Librarian Privilege)
 */
function handleDeleteStudent(studentId) {
  const student = state.students.find(s => s.id === studentId);
  if (!student) return;

  const activeLoans = state.loans.filter(l => l.studentId === studentId && l.status === "ACTIVE");

  if (activeLoans.length > 0) {
    const confirmForce = confirm(
      `⚠️ Warning: ${student.name} currently has ${activeLoans.length} active borrowed book(s)!\n\n` +
      `Deleting this student will return their borrowed books back into library inventory.\n\n` +
      `Are you sure you want to proceed and remove ${student.name}?`
    );
    if (!confirmForce) return;

    // Check back in books to inventory
    activeLoans.forEach(loan => {
      loan.status = "RETURNED";
      loan.returnDate = CURRENT_DATE_STR;
      const b = state.books.find(bk => bk.id === loan.bookId);
      if (b) b.availableCopies += 1;
    });
  } else {
    if (!confirm(`Are you sure you want to permanently remove student "${student.name}" (${student.rollNo}) from the library registry?`)) {
      return;
    }
  }

  // Remove student
  state.students = state.students.filter(s => s.id !== studentId);
  // Clean up student preorders & messages
  state.preorders = state.preorders.filter(p => p.studentId !== studentId);
  state.messages = state.messages.filter(m => m.studentId !== studentId);

  saveState();
  showToast(`Student ${student.name} was removed from the registry.`, "info");
  renderLibrarianPortal();
}

/**
 * Render Urgent Loans Requiring Attention (Due in <= 3 days or Overdue)
 */
function renderUrgentLoansTable() {
  const tbody = document.getElementById("urgentLoansTableBody");
  const activeLoans = state.loans.filter(l => l.status === "ACTIVE");

  const urgentLoans = activeLoans.filter(l => {
    const diff = getDaysDifference(l.dueDate);
    return diff <= 3;
  });

  if (urgentLoans.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-slate-400">All active loans are in good standing! No immediate due dates or overdue loans.</td></tr>`;
    return;
  }

  tbody.innerHTML = urgentLoans.map(loan => {
    const student = state.students.find(s => s.id === loan.studentId) || { name: "Unknown", rollNo: "N/A" };
    const book = state.books.find(b => b.id === loan.bookId) || { title: "Unknown Title" };
    const statusInfo = getDueStatusInfo(loan.dueDate);
    const fine = calculateLoanFine(loan.dueDate);

    return `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="px-6 py-4">
          <div class="font-bold text-slate-900">${escapeHtml(student.name)}</div>
          <div class="text-xs text-slate-400">${escapeHtml(student.rollNo)}</div>
        </td>
        <td class="px-6 py-4 text-xs font-semibold text-slate-800">${escapeHtml(book.title)}</td>
        <td class="px-6 py-4 text-xs font-medium text-slate-700">${formatDateDisplay(loan.dueDate)}</td>
        <td class="px-6 py-4">
          <span class="px-2.5 py-1 text-xs font-semibold rounded-full ${statusInfo.badgeClass}">
            ${statusInfo.shortLabel}
          </span>
        </td>
        <td class="px-6 py-4">
          ${fine > 0 
            ? `<span class="font-bold text-rose-600">$${fine.toFixed(2)}</span>`
            : `<span class="text-slate-400 text-xs">$0.00</span>`}
        </td>
        <td class="px-6 py-4 text-right">
          <button onclick="sendSingleLoanReminder('${loan.id}')" class="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 ml-auto">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span>Send Alert</span>
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

/**
 * Render Librarian Sent Messages Log
 */
function renderLibrarianSentLog() {
  const container = document.getElementById("librarianSentLog");
  if (!container) return;

  if (state.messages.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 py-4 text-center">No messages dispatched yet.</p>`;
    return;
  }

  const recent = [...state.messages].reverse().slice(0, 10);

  container.innerHTML = recent.map(msg => {
    const student = state.students.find(s => s.id === msg.studentId);
    const targetName = msg.studentId === "ALL" ? "All Students" : (student ? student.name : msg.studentId);

    return `
      <div class="py-3 flex items-start justify-between text-xs">
        <div>
          <div class="font-bold text-slate-800">${escapeHtml(msg.title)}</div>
          <p class="text-slate-500 mt-0.5">To: <span class="font-semibold text-slate-700">${escapeHtml(targetName)}</span> • ${escapeHtml(msg.body.substring(0, 90))}...</p>
        </div>
        <span class="text-[11px] text-slate-400 shrink-0 ml-4">${new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    `;
  }).join("");
}

/**
 * Populate Issue & Return Select Dropdowns
 */
function populateCirculationDropdowns() {
  const studentSelect = document.getElementById("issueSelectStudent");
  const bookSelect = document.getElementById("issueSelectBook");
  const issueDateInput = document.getElementById("issueDateInput");
  const returnSelect = document.getElementById("returnSelectLoan");

  if (issueDateInput) {
    issueDateInput.value = CURRENT_DATE_STR;
  }

  if (studentSelect) {
    studentSelect.innerHTML = state.students.map(s => `
      <option value="${s.id}">${s.name} (${s.rollNo})</option>
    `).join("");
  }

  if (bookSelect) {
    const availableBooks = state.books.filter(b => b.availableCopies > 0);
    if (availableBooks.length === 0) {
      bookSelect.innerHTML = `<option value="">No books currently in stock</option>`;
    } else {
      bookSelect.innerHTML = availableBooks.map(b => `
        <option value="${b.id}">${b.title} [${b.availableCopies} available on ${b.shelf}]</option>
      `).join("");
    }
  }

  if (returnSelect) {
    const activeLoans = state.loans.filter(l => l.status === "ACTIVE");
    if (activeLoans.length === 0) {
      returnSelect.innerHTML = `<option value="">No active loans circulating</option>`;
      document.getElementById("returnPreviewBox")?.classList.add("hidden");
    } else {
      returnSelect.innerHTML = `
        <option value="">-- Choose active loan to return --</option>
        ${activeLoans.map(loan => {
          const s = state.students.find(st => st.id === loan.studentId) || { name: "Unknown" };
          const b = state.books.find(bk => bk.id === loan.bookId) || { title: "Unknown" };
          return `<option value="${loan.id}">${b.title} &rarr; ${s.name} (Due: ${loan.dueDate})</option>`;
        }).join("")}
      `;
    }
  }
}

function previewReturnLoanDetails(loanId) {
  const previewBox = document.getElementById("returnPreviewBox");
  if (!loanId) {
    previewBox.classList.add("hidden");
    return;
  }

  const loan = state.loans.find(l => l.id === loanId);
  if (!loan) return;

  const student = state.students.find(s => s.id === loan.studentId) || { name: "Unknown" };
  const book = state.books.find(b => b.id === loan.bookId) || { title: "Unknown" };
  const statusInfo = getDueStatusInfo(loan.dueDate);
  const fine = calculateLoanFine(loan.dueDate);

  document.getElementById("retPrevStudent").innerText = student.name;
  document.getElementById("retPrevBook").innerText = book.title;
  document.getElementById("retPrevDueDate").innerText = formatDateDisplay(loan.dueDate);
  
  const statusEl = document.getElementById("retPrevStatus");
  statusEl.innerText = statusInfo.label;
  statusEl.className = `font-bold ${statusInfo.type === 'OVERDUE' ? 'text-rose-600' : 'text-emerald-600'}`;

  const fineEl = document.getElementById("retPrevFine");
  fineEl.innerText = `$${fine.toFixed(2)}`;
  fineEl.className = `font-extrabold text-sm ${fine > 0 ? 'text-rose-600' : 'text-slate-700'}`;

  previewBox.classList.remove("hidden");
}

function renderAllActiveLoansTable() {
  const tbody = document.getElementById("allLoansTableBody");
  const countText = document.getElementById("totalActiveLoansCountText");
  const activeLoans = state.loans.filter(l => l.status === "ACTIVE");

  if (countText) countText.innerText = `${activeLoans.length} active loan${activeLoans.length === 1 ? '' : 's'}`;

  if (activeLoans.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-slate-400">No active loans circulating right now.</td></tr>`;
    return;
  }

  tbody.innerHTML = activeLoans.map(loan => {
    const student = state.students.find(s => s.id === loan.studentId) || { name: "Unknown", rollNo: "N/A" };
    const book = state.books.find(b => b.id === loan.bookId) || { title: "Unknown Title" };
    const statusInfo = getDueStatusInfo(loan.dueDate);

    return `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="px-6 py-4 font-bold text-slate-900">${escapeHtml(student.name)}</td>
        <td class="px-6 py-4 text-xs font-semibold text-slate-800">${escapeHtml(book.title)}</td>
        <td class="px-6 py-4 text-xs text-slate-500">${formatDateDisplay(loan.issueDate)}</td>
        <td class="px-6 py-4 text-xs font-medium text-slate-700">${formatDateDisplay(loan.dueDate)}</td>
        <td class="px-6 py-4">
          <span class="px-2.5 py-1 text-xs font-semibold rounded-full ${statusInfo.badgeClass}">
            ${statusInfo.shortLabel}
          </span>
        </td>
        <td class="px-6 py-4 text-right">
          <button onclick="quickReturnLoan('${loan.id}')" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs">
            Return
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function renderLibrarianPreordersTable() {
  const tbody = document.getElementById("libPreordersTableBody");
  if (state.preorders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-slate-400">No student pre-orders registered.</td></tr>`;
    return;
  }

  tbody.innerHTML = state.preorders.map(po => {
    const student = state.students.find(s => s.id === po.studentId) || { name: "Unknown", rollNo: "N/A" };
    const book = state.books.find(b => b.id === po.bookId) || { title: "Unknown Title", availableCopies: 0 };

    let statusPill = "";
    let actionBtn = "";

    if (po.status === "READY_FOR_PICKUP") {
      statusPill = `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Ready for Pickup</span>`;
      actionBtn = `
        <button onclick="fulfillPreorderLoan('${po.id}')" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold">
          Issue to Student
        </button>
      `;
    } else {
      statusPill = `<span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">In Queue (#${po.queuePosition || 1})</span>`;
      if (book.availableCopies > 0) {
        actionBtn = `
          <button onclick="markPreorderReadyForPickup('${po.id}')" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold">
            Notify & Hold at Desk
          </button>
        `;
      } else {
        actionBtn = `<span class="text-xs text-slate-400 italic">Waiting for copy return</span>`;
      }
    }

    return `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="px-6 py-4">
          <div class="font-bold text-slate-900">${escapeHtml(student.name)}</div>
          <div class="text-xs text-slate-400">${escapeHtml(student.rollNo)}</div>
        </td>
        <td class="px-6 py-4 text-xs font-semibold text-slate-800">${escapeHtml(book.title)}</td>
        <td class="px-6 py-4 text-xs font-semibold ${book.availableCopies > 0 ? 'text-emerald-600' : 'text-slate-400'}">
          ${book.availableCopies} available
        </td>
        <td class="px-6 py-4 text-xs text-slate-500">${formatDateDisplay(po.requestDate)}</td>
        <td class="px-6 py-4">${statusPill}</td>
        <td class="px-6 py-4 text-right">${actionBtn}</td>
      </tr>
    `;
  }).join("");
}

function renderLibrarianBooksTable() {
  const tbody = document.getElementById("libBooksTableBody");
  tbody.innerHTML = state.books.map(book => {
    return `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="px-6 py-4">
          <div class="font-bold text-slate-900">${escapeHtml(book.title)}</div>
          <div class="text-xs text-slate-400">${escapeHtml(book.author)} • ISBN: ${escapeHtml(book.isbn)}</div>
        </td>
        <td class="px-6 py-4 text-xs font-medium text-slate-700">${escapeHtml(book.category)}</td>
        <td class="px-6 py-4 text-xs font-mono text-slate-800">${escapeHtml(book.shelf)}</td>
        <td class="px-6 py-4 text-xs font-bold text-slate-800">${book.totalCopies}</td>
        <td class="px-6 py-4 text-xs font-bold ${book.availableCopies > 0 ? 'text-emerald-600' : 'text-rose-600'}">
          ${book.availableCopies}
        </td>
        <td class="px-6 py-4 text-right">
          <div class="flex items-center justify-end gap-2">
            <button onclick="adjustBookCopies('${book.id}', 1)" title="Add copy" class="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold">
              +1
            </button>
            <button onclick="adjustBookCopies('${book.id}', -1)" title="Remove copy" class="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold">
              -1
            </button>
            <button onclick="deleteBook('${book.id}')" title="Delete book" class="p-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold">
              ✕
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

// -------------------------------------------------------------
// Circulation Actions: Issue, Return, Pre-order
// -------------------------------------------------------------

function handleIssueBookSubmit(e) {
  e.preventDefault();
  const studentId = document.getElementById("issueSelectStudent").value;
  const bookId = document.getElementById("issueSelectBook").value;
  const durationDays = parseInt(document.getElementById("issueDuration").value, 10);
  const issueDateStr = document.getElementById("issueDateInput").value || CURRENT_DATE_STR;

  if (!studentId || !bookId) {
    showToast("Please choose both a student and an available book", "warning");
    return;
  }

  const book = state.books.find(b => b.id === bookId);
  if (!book || book.availableCopies <= 0) {
    showToast("Selected book has 0 copies available for issue", "error");
    return;
  }

  const issueDate = parseDate(issueDateStr);
  const dueDate = new Date(issueDate);
  dueDate.setDate(dueDate.getDate() + durationDays);
  const dueDateStr = dueDate.toISOString().split("T")[0];

  const newLoan = {
    id: "LN" + String(Date.now()).slice(-5),
    studentId,
    bookId,
    issueDate: issueDateStr,
    dueDate: dueDateStr,
    returnDate: null,
    status: "ACTIVE"
  };

  book.availableCopies -= 1;
  state.loans.unshift(newLoan);
  saveState();

  const student = state.students.find(s => s.id === studentId);
  showToast(`Book issued to ${student ? student.name : 'Student'}! Due on ${formatDateDisplay(dueDateStr)}`, "success");
  
  renderLibrarianPortal();
  populateCirculationDropdowns();
}

function handleProcessReturn() {
  const loanId = document.getElementById("returnSelectLoan").value;
  if (!loanId) {
    showToast("Please select an active loan to return", "warning");
    return;
  }
  processReturnLoan(loanId);
}

function quickReturnLoan(loanId) {
  processReturnLoan(loanId);
}

function processReturnLoan(loanId) {
  const loan = state.loans.find(l => l.id === loanId);
  if (!loan) return;

  const book = state.books.find(b => b.id === loan.bookId);
  const student = state.students.find(s => s.id === loan.studentId);
  const fine = calculateLoanFine(loan.dueDate);

  loan.status = "RETURNED";
  loan.returnDate = CURRENT_DATE_STR;

  if (book) {
    book.availableCopies += 1;
  }

  // Check if someone has a pending pre-order for this book
  const pendingPo = state.preorders.find(p => p.bookId === loan.bookId && p.status === "PENDING");
  if (pendingPo && book) {
    pendingPo.status = "READY_FOR_PICKUP";
    pendingPo.notes = "Held at Circulation Desk 1 for pickup.";
    book.availableCopies -= 1;

    const preorderingStudent = state.students.find(s => s.id === pendingPo.studentId);
    state.messages.unshift({
      id: "MSG" + Date.now(),
      studentId: pendingPo.studentId,
      sender: "Chief Librarian Rupashree (rubym292007@gmail.com)",
      title: `🎉 Pre-order Ready: '${book.title}'`,
      body: `Hello ${preorderingStudent ? preorderingStudent.name : 'Student'}, your pre-ordered book '${book.title}' has just been returned and is reserved for you at the library desk for 72 hours!`,
      type: "PREORDER_READY",
      sentAt: new Date().toISOString(),
      read: false
    });
  }

  saveState();

  let msg = `Returned '${book ? book.title : 'Book'}'.`;
  if (fine > 0) {
    msg += ` Overdue fine assessed: $${fine.toFixed(2)}`;
  }
  showToast(msg, "success");

  renderLibrarianPortal();
  if (state.session && state.session.role === "STUDENT") {
    renderStudentPortal();
  }
}

/**
 * Handle Student Direct Book Borrowing
 * - Decrements availableCopies
 * - Creates an ACTIVE loan with 14-day duration
 * - Increases the student's active borrowed books count
 * - Sends official confirmation message to student inbox from Rupashree
 * - Persists to LocalStorage and updates all KPI badges with animation
 */
function handleStudentBorrowBook(bookId) {
  const student = getActiveStudent();
  if (!student) {
    showToast("Please sign in as a student to borrow books.", "error");
    return;
  }

  const book = state.books.find(b => b.id === bookId);
  if (!book) {
    showToast("Book record not found.", "error");
    return;
  }

  // Check physical availability
  if (book.availableCopies <= 0) {
    showToast(`'${book.title}' has no copies available. You can place a pre-order reservation instead.`, "warning");
    return;
  }

  // Prevent duplicate borrow of same title
  const activeLoans = state.loans.filter(l => l.studentId === student.id && l.status === "ACTIVE");
  const alreadyBorrowed = activeLoans.some(l => l.bookId === bookId);
  if (alreadyBorrowed) {
    showToast(`You already have an active borrowed copy of '${book.title}'.`, "warning");
    return;
  }

  // Maximum loan limit check (5 books)
  if (activeLoans.length >= 5) {
    showToast("You have reached the maximum borrow limit of 5 active books. Please return a book first.", "error");
    return;
  }

  // Deduct 1 available copy from book inventory
  book.availableCopies = Math.max(0, book.availableCopies - 1);

  // Compute checkout & due dates (14 days)
  const issueDateStr = CURRENT_DATE_STR;
  const dueDate = parseDate(CURRENT_DATE_STR);
  dueDate.setDate(dueDate.getDate() + 14);
  const dueDateStr = dueDate.toISOString().split("T")[0];

  // Create new active loan
  const newLoan = {
    id: "LN" + String(Date.now()).slice(-6),
    studentId: student.id,
    bookId: book.id,
    issueDate: issueDateStr,
    dueDate: dueDateStr,
    returnDate: null,
    status: "ACTIVE",
    renewalCount: 0
  };

  state.loans.unshift(newLoan);

  // If student had a pre-order for this book, clear it
  const poIndex = state.preorders.findIndex(p => p.studentId === student.id && p.bookId === bookId);
  if (poIndex !== -1) {
    state.preorders.splice(poIndex, 1);
  }

  // Official transaction notice from Chief Librarian Rupashree
  state.messages.unshift({
    id: "MSG" + Date.now(),
    studentId: student.id,
    sender: "Chief Librarian Rupashree (rubym292007@gmail.com)",
    title: `📘 Book Checked Out: '${book.title}'`,
    body: `Hello ${student.name}, you have successfully borrowed '${book.title}' (Shelf: ${book.shelf}). The return due date is ${formatDateDisplay(dueDateStr)} (14-day loan). Please return on or before the due date to avoid overdue fines of $1.50/day.`,
    type: "GENERAL",
    sentAt: new Date().toISOString(),
    read: false
  });

  saveState();

  closeModal("bookDetailModal");

  const newBorrowedCount = state.loans.filter(l => l.studentId === student.id && l.status === "ACTIVE").length;

  showToast(`🎉 Borrowed '${book.title}'! Borrowed count increased to ${newBorrowedCount}. Due: ${formatDateDisplay(dueDateStr)}.`, "success");

  // Re-render student dashboard
  renderStudentPortal();
  updateGlobalNotificationCount();

  // Animate the borrowed count badge
  const kpiBadge = document.getElementById("kpiBorrowedCount");
  if (kpiBadge) {
    kpiBadge.classList.remove("count-bump");
    void kpiBadge.offsetWidth;
    kpiBadge.classList.add("count-bump");
  }
}

/**
 * Handle Student Returning a Borrowed Book
 */
function handleStudentReturnBook(loanId) {
  const loan = state.loans.find(l => l.id === loanId);
  if (!loan) return;

  const book = state.books.find(b => b.id === loan.bookId) || { title: "this book" };

  if (confirm(`Are you sure you want to return '${book.title}'?`)) {
    processReturnLoan(loanId);

    const kpiBadge = document.getElementById("kpiBorrowedCount");
    if (kpiBadge) {
      kpiBadge.classList.remove("count-bump");
      void kpiBadge.offsetWidth;
      kpiBadge.classList.add("count-bump");
    }
  }
}

function handlePreorderBook(bookId) {
  const student = getActiveStudent();
  if (!student) return;

  const book = state.books.find(b => b.id === bookId);
  if (!book) return;

  const existing = state.preorders.find(p => p.studentId === student.id && p.bookId === bookId);
  if (existing) {
    showToast("You have already placed a pre-order for this title", "warning");
    return;
  }

  const currentPreordersCount = state.preorders.filter(p => p.bookId === bookId && p.status === "PENDING").length;

  const newPreorder = {
    id: "PO" + String(Date.now()).slice(-5),
    studentId: student.id,
    bookId: book.id,
    requestDate: CURRENT_DATE_STR,
    queuePosition: currentPreordersCount + 1,
    status: "PENDING",
    notes: `In line #${currentPreordersCount + 1}. Estimated availability within 7-14 days.`
  };

  state.preorders.push(newPreorder);
  saveState();

  closeModal("bookDetailModal");
  showToast(`Pre-order placed for '${book.title}'! You are #${newPreorder.queuePosition} in line.`, "success");
  
  renderStudentPortal();
  updateGlobalNotificationCount();
}

function cancelStudentPreorder(poId) {
  if (confirm("Are you sure you want to cancel this pre-order?")) {
    state.preorders = state.preorders.filter(p => p.id !== poId);
    saveState();
    showToast("Pre-order cancelled", "info");
    renderStudentPortal();
  }
}

function requestLoanRenewal(loanId) {
  const loan = state.loans.find(l => l.id === loanId);
  if (!loan) return;

  const diff = getDaysDifference(loan.dueDate);
  if (diff < 0) {
    showToast("Cannot renew overdue books online. Please visit the library desk to settle dues.", "error");
    return;
  }

  const currentDue = parseDate(loan.dueDate);
  currentDue.setDate(currentDue.getDate() + 7);
  loan.dueDate = currentDue.toISOString().split("T")[0];

  saveState();
  showToast(`Loan renewed! New due date: ${formatDateDisplay(loan.dueDate)}`, "success");
  renderStudentPortal();
}

function markPreorderReadyForPickup(poId) {
  const po = state.preorders.find(p => p.id === poId);
  if (!po) return;

  const book = state.books.find(b => b.id === po.bookId);
  const student = state.students.find(s => s.id === po.studentId);

  po.status = "READY_FOR_PICKUP";
  po.notes = "Held at Circulation Desk 1 for pickup.";
  if (book && book.availableCopies > 0) {
    book.availableCopies -= 1;
  }

  state.messages.unshift({
    id: "MSG" + Date.now(),
    studentId: po.studentId,
    sender: "Chief Librarian Rupashree (rubym292007@gmail.com)",
    title: `🎉 Pre-order Ready: '${book ? book.title : 'Book'}'`,
    body: `Hello ${student ? student.name : 'Student'}, your pre-ordered book '${book ? book.title : 'Book'}' is now ready for pickup at Desk #1. It will be held for 72 hours.`,
    type: "PREORDER_READY",
    sentAt: new Date().toISOString(),
    read: false
  });

  saveState();
  showToast("Pre-order set to Ready for Pickup & student notified!", "success");
  renderLibrarianPortal();
}

function fulfillPreorderLoan(poId) {
  const po = state.preorders.find(p => p.id === poId);
  if (!po) return;

  const dueDate = new Date(SYSTEM_DATE);
  dueDate.setDate(dueDate.getDate() + 14);
  const dueDateStr = dueDate.toISOString().split("T")[0];

  state.loans.unshift({
    id: "LN" + String(Date.now()).slice(-5),
    studentId: po.studentId,
    bookId: po.bookId,
    issueDate: CURRENT_DATE_STR,
    dueDate: dueDateStr,
    returnDate: null,
    status: "ACTIVE"
  });

  state.preorders = state.preorders.filter(p => p.id !== poId);
  saveState();

  const student = state.students.find(s => s.id === po.studentId);
  showToast(`Pre-order fulfilled and issued to ${student ? student.name : 'student'}!`, "success");
  renderLibrarianPortal();
}

// -------------------------------------------------------------
// Due Date Reminders & Messaging Center
// -------------------------------------------------------------

function triggerDueReminderBroadcast() {
  const activeLoans = state.loans.filter(l => l.status === "ACTIVE");
  const urgentLoans = activeLoans.filter(l => {
    const diff = getDaysDifference(l.dueDate);
    return diff <= 3;
  });

  if (urgentLoans.length === 0) {
    showToast("No loans are approaching due date or overdue today.", "info");
    return;
  }

  let countDispatched = 0;

  urgentLoans.forEach(loan => {
    const student = state.students.find(s => s.id === loan.studentId);
    const book = state.books.find(b => b.id === loan.bookId);
    if (!student || !book) return;

    const diff = getDaysDifference(loan.dueDate);
    let title = "";
    let body = "";
    let type = "DUE_REMINDER";

    if (diff < 0) {
      const daysOverdue = Math.abs(diff);
      const fine = (daysOverdue * DAILY_FINE_RATE).toFixed(2);
      type = "OVERDUE_ALERT";
      title = `🚨 Overdue Notice: '${book.title}' (${daysOverdue}d Past Due)`;
      body = `Dear ${student.name}, your borrowed book '${book.title}' was due on ${formatDateDisplay(loan.dueDate)} and is now ${daysOverdue} days past the end of the loan period. Overdue fine accrued: $${fine}. Please return immediately.`;
    } else if (diff === 0) {
      title = `⏳ FINAL NOTICE: '${book.title}' is Due Today!`;
      body = `Dear ${student.name}, this is an urgent reminder that your book '${book.title}' is due TODAY (${formatDateDisplay(loan.dueDate)}). Please return it before 5:00 PM to avoid daily overdue fines.`;
    } else {
      title = `⏳ Friendly Reminder: '${book.title}' Due in ${diff} Day${diff > 1 ? 's' : ''}`;
      body = `Dear ${student.name}, your book loan for '${book.title}' is nearing the end of its due date (${formatDateDisplay(loan.dueDate)}). You have ${diff} day${diff > 1 ? 's' : ''} remaining. Please prepare to return or renew.`;
    }

    state.messages.unshift({
      id: "MSG" + Date.now() + Math.floor(Math.random() * 100),
      studentId: student.id,
      sender: "Chief Librarian Rupashree (rubym292007@gmail.com)",
      title,
      body,
      type,
      sentAt: new Date().toISOString(),
      read: false
    });

    countDispatched++;
  });

  saveState();
  showToast(`Dispatched ${countDispatched} due date alerts to student inboxes!`, "success");
  renderLibrarianPortal();
  updateGlobalNotificationCount();
}

function sendSingleLoanReminder(loanId) {
  const loan = state.loans.find(l => l.id === loanId);
  if (!loan) return;

  const student = state.students.find(s => s.id === loan.studentId);
  const book = state.books.find(b => b.id === loan.bookId);
  if (!student || !book) return;

  const diff = getDaysDifference(loan.dueDate);
  let title = "";
  let body = "";
  let type = "DUE_REMINDER";

  if (diff < 0) {
    const daysOverdue = Math.abs(diff);
    const fine = (daysOverdue * DAILY_FINE_RATE).toFixed(2);
    type = "OVERDUE_ALERT";
    title = `🚨 OVERDUE ALERT: '${book.title}' is ${daysOverdue} Days Late`;
    body = `Dear ${student.name}, your loan for '${book.title}' is overdue by ${daysOverdue} days. A fine of $${fine} has been recorded. Please check in with the circulation desk immediately.`;
  } else {
    title = `⏳ End of Due Date Notice: '${book.title}'`;
    body = `Dear ${student.name}, your loan for '${book.title}' will expire on ${formatDateDisplay(loan.dueDate)} (${diff} days left). Please return it to avoid fines.`;
  }

  state.messages.unshift({
    id: "MSG" + Date.now(),
    studentId: student.id,
    sender: "Chief Librarian Rupashree (rubym292007@gmail.com)",
    title,
    body,
    type,
    sentAt: new Date().toISOString(),
    read: false
  });

  saveState();
  showToast(`Reminder sent to ${student.name}!`, "success");
  renderLibrarianPortal();
}

function openCustomMessageModal(preselectedStudentId = null) {
  const recipientSelect = document.getElementById("msgRecipientSelect");
  recipientSelect.innerHTML = `
    <option value="ALL">All Enrolled Students (Campus Broadcast)</option>
    ${state.students.map(s => `
      <option value="${s.id}" ${s.id === preselectedStudentId ? "selected" : ""}>
        ${s.name} (${s.rollNo} - ${s.department})
      </option>
    `).join("")}
  `;

  document.getElementById("msgTemplateSelect").value = "CUSTOM";
  document.getElementById("msgSubjectInput").value = "";
  document.getElementById("msgBodyInput").value = "";

  openModal("customMessageModal");
}

function openDirectMessageToStudent(studentId) {
  openCustomMessageModal(studentId);
}

function applyMessageTemplate(templateKey) {
  const subInput = document.getElementById("msgSubjectInput");
  const bodyInput = document.getElementById("msgBodyInput");

  if (templateKey === "DUE_REMINDER") {
    subInput.value = "Friendly Due Date Reminder: Book Loan Expiring Soon";
    bodyInput.value = "This is a friendly reminder that one or more of your borrowed books are approaching the end of their due date. Please return them to the library or renew online to avoid late penalties.";
  } else if (templateKey === "OVERDUE_URGENT") {
    subInput.value = "URGENT NOTICE: Overdue Book Loan & Accrued Fine";
    bodyInput.value = "Our circulation records show you have books that are past their due return date. A late fee of $1.50 per day is currently accumulating. Please report to the circulation desk immediately to return the books.";
  } else if (templateKey === "PREORDER_READY") {
    subInput.value = "Pre-ordered Book is Ready for Pickup";
    bodyInput.value = "Great news! Your pre-ordered book reservation is now available for collection at Circulation Desk 1. It will be reserved for you for the next 72 hours.";
  } else if (templateKey === "LIBRARY_INVENTORY") {
    subInput.value = "Semester End Book Return & Clearance Notice";
    bodyInput.value = "Please be advised that all borrowed library items must be returned before semester finals for annual stock inventory and clearance certification.";
  } else {
    subInput.value = "";
    bodyInput.value = "";
  }
}

function handleSendCustomMessage(e) {
  e.preventDefault();
  const recipientId = document.getElementById("msgRecipientSelect").value;
  const subject = document.getElementById("msgSubjectInput").value.trim();
  const body = document.getElementById("msgBodyInput").value.trim();

  if (!subject || !body) return;

  state.messages.unshift({
    id: "MSG" + Date.now(),
    studentId: recipientId,
    sender: "Chief Librarian Rupashree (rubym292007@gmail.com)",
    title: subject,
    body: body,
    type: "GENERAL",
    sentAt: new Date().toISOString(),
    read: false
  });

  saveState();
  closeModal("customMessageModal");
  showToast("Message dispatched successfully!", "success");
  renderLibrarianPortal();
  updateGlobalNotificationCount();
}

function markMessageRead(msgId) {
  const msg = state.messages.find(m => m.id === msgId);
  if (msg) {
    msg.read = true;
    saveState();
    renderStudentPortal();
    updateGlobalNotificationCount();
  }
}

function markAllNotificationsRead() {
  const student = getActiveStudent();
  if (!student) return;

  state.messages.forEach(m => {
    if (m.studentId === student.id || m.studentId === "ALL") {
      m.read = true;
    }
  });
  saveState();
  renderStudentPortal();
  updateGlobalNotificationCount();
  showToast("All messages marked as read", "info");
}

function toggleNotificationDropdown() {
  const dd = document.getElementById("notifDropdown");
  dd.classList.toggle("hidden");
  renderNotificationDropdown();
}

function renderNotificationDropdown() {
  const list = document.getElementById("notifList");
  const student = getActiveStudent();

  let messages = [];
  if (state.session && state.session.role === "STUDENT" && student) {
    messages = state.messages.filter(m => m.studentId === student.id || m.studentId === "ALL");
  } else {
    messages = state.messages;
  }

  if (messages.length === 0) {
    list.innerHTML = `<p class="text-xs text-slate-400 py-4 text-center">No messages.</p>`;
    return;
  }

  list.innerHTML = messages.slice(0, 5).map(m => `
    <div class="py-2.5 px-1 text-xs">
      <div class="flex items-center justify-between">
        <span class="font-bold text-slate-800">${escapeHtml(m.title)}</span>
        ${!m.read ? '<span class="w-2 h-2 rounded-full bg-rose-500"></span>' : ''}
      </div>
      <p class="text-slate-500 mt-1 line-clamp-2">${escapeHtml(m.body)}</p>
      <span class="text-[10px] text-slate-400 mt-1 block">${new Date(m.sentAt).toLocaleDateString()}</span>
    </div>
  `).join("");
}

function updateGlobalNotificationCount() {
  const student = getActiveStudent();
  let unread = 0;

  if (state.session && state.session.role === "STUDENT" && student) {
    unread = state.messages.filter(m => (m.studentId === student.id || m.studentId === "ALL") && !m.read).length;
  } else if (state.session && state.session.role === "LIBRARIAN") {
    unread = state.loans.filter(l => l.status === "ACTIVE" && getDaysDifference(l.dueDate) < 0).length;
  }

  const badge = document.getElementById("notifBadge");
  if (badge) {
    if (unread > 0) {
      badge.innerText = unread;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }
}

// -------------------------------------------------------------
// Modals Controllers
// -------------------------------------------------------------

function openModal(id) {
  document.getElementById(id)?.classList.remove("hidden");
}

function closeModal(id) {
  document.getElementById(id)?.classList.add("hidden");
}

window.addEventListener("click", (e) => {
  const modals = [
    "bookDetailModal",
    "studentDetailModal",
    "customMessageModal",
    "addBookModal",
    "addStudentModal",
    "editStudentModal"
  ];
  modals.forEach(id => {
    const el = document.getElementById(id);
    if (el && e.target === el) {
      closeModal(id);
    }
  });

  const dd = document.getElementById("notifDropdown");
  const bell = document.getElementById("notifBellBtn");
  if (dd && !dd.classList.contains("hidden") && !dd.contains(e.target) && !bell.contains(e.target)) {
    dd.classList.add("hidden");
  }
});

function openBookDetailModal(bookId) {
  const book = state.books.find(b => b.id === bookId);
  if (!book) return;

  const content = document.getElementById("bookDetailModalContent");
  const student = getActiveStudent();
  const isBorrowedByStudent = student ? state.loans.some(l => l.studentId === student.id && l.bookId === book.id && l.status === "ACTIVE") : false;
  const isPreorderedByStudent = student ? state.preorders.some(p => p.studentId === student.id && p.bookId === book.id) : false;

  let ctaHtml = "";
  if (book.availableCopies > 0) {
    if (isBorrowedByStudent) {
      ctaHtml = `
        <div class="mt-6 space-y-3">
          <div class="p-3 bg-indigo-50 rounded-xl border border-indigo-200 text-xs text-indigo-800 text-center font-semibold">
            ✓ You currently have this book checked out.
          </div>
          <button onclick="closeModal('bookDetailModal')" class="w-full py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-sm font-semibold transition-all">
            Close
          </button>
        </div>
      `;
    } else if (state.session && state.session.role === "STUDENT") {
      ctaHtml = `
        <div class="mt-6 space-y-3">
          <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
            <span><strong>Available Now:</strong> ${book.availableCopies} copy(ies) on shelf <strong>${escapeHtml(book.shelf)}</strong></span>
            <span class="font-bold text-emerald-700">14-Day Loan</span>
          </div>
          <div class="flex gap-2.5">
            <button onclick="closeModal('bookDetailModal')" class="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-all">
              Cancel
            </button>
            <button onclick="handleStudentBorrowBook('${book.id}')" class="w-2/3 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Confirm & Borrow Book</span>
            </button>
          </div>
        </div>
      `;
    } else {
      ctaHtml = `
        <div class="mt-6 flex flex-col gap-2">
          <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
            <strong>Available Now:</strong> ${book.availableCopies} copy(ies) are currently on shelf <strong>${escapeHtml(book.shelf)}</strong>.
          </div>
          <button onclick="closeModal('bookDetailModal')" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold">
            Close
          </button>
        </div>
      `;
    }
  } else {
    ctaHtml = `
      <div class="mt-6 space-y-3">
        <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
          <strong>All copies checked out!</strong> You can pre-order this book. As soon as a student returns a copy, your reservation will be secured and you will receive an instant notification alert.
        </div>
        ${isPreorderedByStudent ? `
          <button disabled class="w-full py-3 bg-slate-200 text-slate-500 rounded-xl text-sm font-semibold">
            Already in Your Pre-order Queue
          </button>
        ` : `
          <button onclick="handlePreorderBook('${book.id}')" class="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-semibold shadow-md flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>Confirm Pre-order / Reserve Title</span>
          </button>
        `}
      </div>
    `;
  }

  content.innerHTML = `
    <button onclick="closeModal('bookDetailModal')" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <div class="flex items-start gap-4 mb-4">
      <div class="w-16 h-20 rounded-xl flex items-center justify-center text-white shrink-0 text-2xl shadow-sm" style="background: ${book.bgGradient || '#4f46e5'}">
        📖
      </div>
      <div>
        <span class="text-xs font-semibold text-indigo-600 uppercase">${escapeHtml(book.category)}</span>
        <h3 class="text-lg font-bold text-slate-900 leading-snug">${escapeHtml(book.title)}</h3>
        <p class="text-xs text-slate-500 mt-0.5">By ${escapeHtml(book.author)} (${book.publishedYear})</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs">
      <div><span class="text-slate-400">ISBN:</span> <span class="font-mono text-slate-700">${escapeHtml(book.isbn)}</span></div>
      <div><span class="text-slate-400">Shelf Location:</span> <span class="font-semibold text-slate-700">${escapeHtml(book.shelf)}</span></div>
      <div><span class="text-slate-400">Total Copies:</span> <span class="font-bold text-slate-700">${book.totalCopies}</span></div>
      <div><span class="text-slate-400">Available:</span> <span class="font-bold ${book.availableCopies > 0 ? 'text-emerald-600' : 'text-rose-600'}">${book.availableCopies}</span></div>
    </div>

    <div class="mt-4">
      <h5 class="text-xs font-bold text-slate-700 uppercase">Synopsis</h5>
      <p class="text-xs text-slate-600 mt-1 leading-relaxed">${escapeHtml(book.description)}</p>
    </div>

    ${ctaHtml}
  `;

  openModal("bookDetailModal");
}

function openStudentProfileModal(studentId) {
  const student = state.students.find(s => s.id === studentId);
  if (!student) return;

  const content = document.getElementById("studentDetailModalContent");
  const loans = state.loans.filter(l => l.studentId === student.id && l.status === "ACTIVE");
  const preorders = state.preorders.filter(p => p.studentId === student.id);

  let fineTotal = 0;
  loans.forEach(l => {
    fineTotal += calculateLoanFine(l.dueDate);
  });
  student.duesBalance = fineTotal;

  content.innerHTML = `
    <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
      <div>
        <h3 class="text-lg font-bold text-slate-900">${escapeHtml(student.name)}</h3>
        <p class="text-xs text-slate-500">Student ID: <span class="font-mono font-bold">${escapeHtml(student.rollNo)}</span> • ${escapeHtml(student.department)}</p>
      </div>
      <button onclick="closeModal('studentDetailModal')" class="text-slate-400 hover:text-slate-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
      <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
        <span class="text-[11px] text-slate-500 block">Contact Email</span>
        <span class="text-xs font-semibold text-slate-800 break-all">${escapeHtml(student.email)}</span>
      </div>
      <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
        <span class="text-[11px] text-slate-500 block">Phone</span>
        <span class="text-xs font-semibold text-slate-800">${escapeHtml(student.phone || "N/A")}</span>
      </div>
      <div class="p-3 ${student.duesBalance > 0 ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'} rounded-xl border flex items-center justify-between">
        <div>
          <span class="text-[11px] text-slate-500 block">Accrued Dues</span>
          <span class="text-sm font-extrabold ${student.duesBalance > 0 ? 'text-rose-600' : 'text-emerald-700'}">$${student.duesBalance.toFixed(2)}</span>
        </div>
        ${student.duesBalance > 0 ? `
          <button onclick="settleStudentDues('${student.id}')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold">
            Clear Due
          </button>
        ` : ''}
      </div>
    </div>

    <!-- Active Borrowed Books -->
    <div class="mb-5">
      <h4 class="text-xs font-bold text-slate-700 uppercase mb-2">Active Borrowed Books (${loans.length})</h4>
      ${loans.length === 0 ? `<p class="text-xs text-slate-400 italic">No active books borrowed.</p>` : `
        <div class="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
          ${loans.map(loan => {
            const b = state.books.find(bk => bk.id === loan.bookId) || { title: "Unknown" };
            const status = getDueStatusInfo(loan.dueDate);
            return `
              <div class="p-3 flex items-center justify-between bg-white">
                <div>
                  <span class="font-bold text-slate-800">${escapeHtml(b.title)}</span>
                  <div class="text-[11px] text-slate-500">Issued: ${formatDateDisplay(loan.issueDate)} • Due: ${formatDateDisplay(loan.dueDate)}</div>
                </div>
                <span class="px-2 py-0.5 rounded-full font-semibold ${status.badgeClass}">${status.shortLabel}</span>
              </div>
            `;
          }).join("")}
        </div>
      `}
    </div>

    <!-- Pre-orders -->
    <div class="mb-5">
      <h4 class="text-xs font-bold text-slate-700 uppercase mb-2">Pre-orders & Reservations (${preorders.length})</h4>
      ${preorders.length === 0 ? `<p class="text-xs text-slate-400 italic">No pre-orders on file.</p>` : `
        <div class="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
          ${preorders.map(po => {
            const b = state.books.find(bk => bk.id === po.bookId) || { title: "Unknown" };
            return `
              <div class="p-3 flex items-center justify-between bg-white">
                <span class="font-bold text-slate-800">${escapeHtml(b.title)}</span>
                <span class="px-2 py-0.5 rounded-full font-semibold bg-amber-100 text-amber-800">${po.status} (Queue: #${po.queuePosition || 1})</span>
              </div>
            `;
          }).join("")}
        </div>
      `}
    </div>

    <div class="flex items-center justify-between pt-3 border-t border-slate-100">
      <div class="flex gap-2">
        <button onclick="openEditStudentModal('${student.id}'); closeModal('studentDetailModal');" class="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold">
          Edit Record
        </button>
        <button onclick="handleDeleteStudent('${student.id}'); closeModal('studentDetailModal');" class="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-semibold">
          Remove Student
        </button>
      </div>

      <div class="flex gap-2">
        <button onclick="openDirectMessageToStudent('${student.id}'); closeModal('studentDetailModal');" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span>Send Notice</span>
        </button>
        <button onclick="closeModal('studentDetailModal')" class="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50">
          Close
        </button>
      </div>
    </div>
  `;

  openModal("studentDetailModal");
}

function settleStudentDues(studentId) {
  const student = state.students.find(s => s.id === studentId);
  if (!student) return;

  if (confirm(`Clear all outstanding dues ($${student.duesBalance.toFixed(2)}) for ${student.name}?`)) {
    student.duesBalance = 0.00;
    saveState();
    showToast(`Dues cleared for ${student.name}!`, "success");
    closeModal("studentDetailModal");
    renderLibrarianPortal();
  }
}

// -------------------------------------------------------------
// Book & Student Management Forms
// -------------------------------------------------------------

function openAddNewBookModal() {
  document.getElementById("addBookForm").reset();
  openModal("addBookModal");
}

function handleAddNewBook(e) {
  e.preventDefault();
  const title = document.getElementById("newBookTitle").value.trim();
  const author = document.getElementById("newBookAuthor").value.trim();
  const category = document.getElementById("newBookCategory").value;
  const copies = parseInt(document.getElementById("newBookCopies").value, 10) || 1;
  const shelf = document.getElementById("newBookShelf").value.trim() || "Rack GEN-01";
  const year = parseInt(document.getElementById("newBookYear").value, 10) || 2024;
  const desc = document.getElementById("newBookDesc").value.trim() || "No description provided.";

  const newBook = {
    id: "BK" + String(Date.now()).slice(-4),
    title,
    author,
    category,
    isbn: "978-" + Math.floor(1000000000 + Math.random() * 9000000000),
    totalCopies: copies,
    availableCopies: copies,
    shelf,
    bgGradient: "linear-gradient(135deg, #4f46e5, #06b6d4)",
    publishedYear: year,
    description: desc
  };

  state.books.unshift(newBook);
  saveState();

  closeModal("addBookModal");
  showToast(`Added '${title}' to library catalog!`, "success");
  renderLibrarianPortal();
  renderBooksGrid();
}

function adjustBookCopies(bookId, delta) {
  const book = state.books.find(b => b.id === bookId);
  if (!book) return;

  const newTotal = book.totalCopies + delta;
  const newAvail = book.availableCopies + delta;

  if (newTotal < 1 || newAvail < 0) {
    showToast("Cannot reduce copies below circulating loans", "error");
    return;
  }

  book.totalCopies = newTotal;
  book.availableCopies = newAvail;
  saveState();

  showToast(`Adjusted copies for '${book.title}' (${book.availableCopies}/${book.totalCopies})`, "info");
  renderLibrarianPortal();
  renderBooksGrid();
}

function deleteBook(bookId) {
  const isLoaned = state.loans.some(l => l.bookId === bookId && l.status === "ACTIVE");
  if (isLoaned) {
    showToast("Cannot delete book while copies are actively checked out!", "error");
    return;
  }

  if (confirm("Are you sure you want to delete this book from catalog?")) {
    state.books = state.books.filter(b => b.id !== bookId);
    saveState();
    showToast("Book deleted from inventory", "info");
    renderLibrarianPortal();
    renderBooksGrid();
  }
}

function openAddStudentModal() {
  document.getElementById("addStudentForm").reset();
  openModal("addStudentModal");
}

function handleAddNewStudent(e) {
  e.preventDefault();
  const name = document.getElementById("newStudentName").value.trim();
  const rollNo = document.getElementById("newStudentRoll").value.trim();
  const dept = document.getElementById("newStudentDept").value.trim();
  const email = document.getElementById("newStudentEmail").value.trim();

  const newStudent = {
    id: "STU" + String(Date.now()).slice(-4),
    name,
    rollNo,
    email,
    department: dept,
    semester: "1st Semester",
    phone: "+1 (555) 000-0000",
    duesBalance: 0.00,
    password: "student123"
  };

  state.students.unshift(newStudent);
  saveState();

  closeModal("addStudentModal");
  showToast(`Enrolled student ${name}!`, "success");
  
  renderLibrarianPortal();
}

// -------------------------------------------------------------
// Toast Feedback System
// -------------------------------------------------------------

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  let icon = "ℹ️";
  if (type === "success") icon = "✅";
  if (type === "warning") icon = "⚠️";
  if (type === "error") icon = "❌";

  toast.innerHTML = `
    <span>${icon}</span>
    <span class="text-xs font-semibold text-slate-800">${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// -------------------------------------------------------------
// Application Initialization
// -------------------------------------------------------------

function initApp() {
  initState();
  renderRoleView();
}

window.addEventListener("DOMContentLoaded", () => {
  initApp();
});
