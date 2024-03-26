const data = {
  students: [
    {
      name: "John Doe",
      age: 20,
      major: "Software Engineer",
      gpa: 3.5,
      experience: 2,
      img: `https://source.unsplash.com/random/150x150/?portrait`,
    },
    {
      name: "Jane Smith",
      age: 21,
      major: "Software Engineer",
      gpa: 3.8,
      experience: 3,
      img: `https://source.unsplash.com/random/150x150/?portrait`,
    },
    {
      name: "Alice Johnson",
      age: 19,
      major: "Software Engineer",
      gpa: 3.2,
      experience: 1,
      img: `https://source.unsplash.com/random/150x150/?portrait`,
    },
    {
      name: "Bob Brown",
      age: 22,
      major: "Business",
      gpa: 3.6,
      experience: 5,
      img: `https://source.unsplash.com/random/150x150/?portrait`,
    },
    {
      name: "Eve Wilson",
      age: 20,
      major: "Business",
      gpa: 3.4,
      experience: 1,
      img: `https://source.unsplash.com/random/150x150/?portrait`,
    },
    {
      name: "Charlie Davis",
      age: 21,
      major: "Business",
      gpa: 3.7,
      experience: 3,
      img: `https://source.unsplash.com/random/150x150/?portrait`,
    },
    {
      name: "Grace Martinez",
      age: 19,
      major: "Business",
      gpa: 3.1,
      experience: 2,
      img: `https://source.unsplash.com/random/150x150/?portrait`,
    },
    {
      name: "David Thompson",
      age: 22,
      major: "English",
      gpa: 3.9,
      experience: 2,
      img: `https://source.unsplash.com/random/150x150/?portrait`,
    },
    {
      name: "Sophia Lee",
      age: 20,
      major: "English",
      gpa: 3.3,
      experience: 1,
      img: `https://source.unsplash.com/random/150x150/?portrait`,
    },
    {
      name: "Michael Perez",
      age: 21,
      major: "English",
      gpa: 3.0,
      experience: 4,
      img: `https://source.unsplash.com/random/150x150/?portrait`,
    },
  ],
  companies: [
    {
      name: "English Tutor Company",
      industry: "English",
      location: "Nakhon Pathom",
      img: `https://source.unsplash.com/random/150x150/?portrait`,
    },
    {
      name: "Business Company",
      industry: "Business",
      location: "Bangkok",
      img: `https://source.unsplash.com/random/150x150/?portrait`,
    },
    {
      name: "Software House",
      industry: "Software Engineer",
      location: "Ratchaburi",
      img: `https://source.unsplash.com/random/150x150/?portrait`,
    },
  ],
};

function matchStudentsAndCompanies(data) {
  const matchedPairs = [];

  data.students.forEach((student) => {
    data.companies.forEach((company) => {
      if (student.major === company.industry) {
        matchedPairs.push({
          student: student.name,
          studentMajor: student.major,
          studentAge: student.age,
          studentGPA: student.gpa,
          studentExperience: student.experience,
          company: company.name,
          companyIndustry: company.industry,
          companyLocation: company.location,
        });
      }
    });
  });

  return matchedPairs;
}

const matchedPairs = matchStudentsAndCompanies(data);
const matchedPairsElement = document.getElementById("matchedPairs");

matchedPairs.forEach((pair) => {
  const row = document.createElement("tr");
  row.innerHTML = `<td><a href="#" class="student-link" data-bs-toggle="modal" data-bs-target="#studentModal">${pair.student}</a></td><td>${pair.studentMajor}</td><td><a href="#" class="company-link" data-bs-toggle="modal" data-bs-target="#companyModal">${pair.company}</a></td><td>${pair.companyIndustry}</td>`;
  matchedPairsElement.appendChild(row);
});

// Set modal content when links are clicked
document.querySelectorAll(".student-link").forEach((link, index) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const studentIndex = matchedPairs.findIndex(
      (pair) => pair.student === link.textContent
    );
    document.getElementById("studentImage").src =
      data.students[studentIndex].img;
    document.getElementById("studentName").textContent =
      matchedPairs[studentIndex].student;
    document.getElementById("studentAge").textContent =
      matchedPairs[studentIndex].studentAge;
    document.getElementById("studentMajor").textContent =
      matchedPairs[studentIndex].studentMajor;
    document.getElementById("studentGPA").textContent =
      matchedPairs[studentIndex].studentGPA;
    document.getElementById("studentExperience").textContent =
      matchedPairs[studentIndex].studentExperience;
  });
});

document.querySelectorAll(".company-link").forEach((link, index) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const companyName = link.textContent;
    const matchedPair = matchedPairs.find(
      (pair) => pair.company === companyName
    );
    if (matchedPair) {
      const companyIndex = data.companies.findIndex(
        (company) => company.name === companyName
      );
      document.getElementById("companyImage").src =
        data.companies[companyIndex].img;
      document.getElementById("companyName").textContent = matchedPair.company;
      document.getElementById("companyIndustry").textContent =
        matchedPair.companyIndustry;
      document.getElementById("companyLocation").textContent =
        matchedPair.companyLocation;
    }
  });
});

// add new student and company
// Add new student form
const addStudentForm = document.getElementById("addStudentForm");
addStudentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("studentName").value;
  const age = parseInt(document.getElementById("studentAge").value);
  const major = document.getElementById("studentMajor").value;
  const gpa = parseFloat(document.getElementById("studentGPA").value);
  const experience = parseInt(
    document.getElementById("studentExperience").value
  );
  const img = document.getElementById("studentImg").value;

  addNewStudent(name, age, major, gpa, experience, img);
  addStudentForm.reset();
});

// Add new company form
const addCompanyForm = document.getElementById("addCompanyForm");
addCompanyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("companyName").value;
  const industry = document.getElementById("companyIndustry").value;
  const location = document.getElementById("companyLocation").value;
  const img = document.getElementById("companyImg").value;

  addNewCompany(name, industry, location, img);
  addCompanyForm.reset();
});

// Function to add a new student
function addNewStudent(name, age, major, gpa, experience, img) {
  data.students.push({
    name: name,
    age: age,
    major: major,
    gpa: gpa,
    experience: experience,
    img: img,
  });

  // Re-run the matching and display function to update the table
  const matchedPairs = matchStudentsAndCompanies(data);
  displayMatchedPairs(matchedPairs);
}

// Function to add a new company
function addNewCompany(name, industry, location, img) {
  data.companies.push({
    name: name,
    industry: industry,
    location: location,
    img: img,
  });

  // Re-run the matching and display function to update the table
  const matchedPairs = matchStudentsAndCompanies(data);
  displayMatchedPairs(matchedPairs);
}

// Function to display the matched pairs in the table
function displayMatchedPairs(matchedPairs) {
  const matchedPairsElement = document.getElementById("matchedPairs");
  matchedPairsElement.innerHTML = "";

  matchedPairs.forEach((pair) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td><a href="#" class="student-link" data-bs-toggle="modal" data-bs-target="#studentModal">${pair.student}</a></td><td>${pair.studentMajor}</td><td><a href="#" class="company-link" data-bs-toggle="modal" data-bs-target="#companyModal">${pair.company}</a></td><td>${pair.companyIndustry}</td>`;
    matchedPairsElement.appendChild(row);
  });

  setModalContent();
}

// Function to set modal content when links are clicked
function setModalContent() {
  document.querySelectorAll(".student-link").forEach((link, index) => {
    link.addEventListener("click", () => {
      document.getElementById("studentImage").src = data.students[index].img;
      document.getElementById("studentName").textContent =
        matchedPairs[index].student;
      document.getElementById("studentAge").textContent =
        matchedPairs[index].studentAge;
      document.getElementById("studentMajor").textContent =
        matchedPairs[index].studentMajor;
      document.getElementById("studentGPA").textContent =
        matchedPairs[index].studentGPA;
      document.getElementById("studentExperience").textContent =
        matchedPairs[index].studentExperience;
    });
  });

  document.querySelectorAll(".company-link").forEach((link, index) => {
    link.addEventListener("click", () => {
      document.getElementById("companyImage").src = data.companies[index].img;
      document.getElementById("companyName").textContent =
        matchedPairs[index].company;
      document.getElementById("companyIndustry").textContent =
        matchedPairs[index].companyIndustry;
      document.getElementById("companyLocation").textContent =
        matchedPairs[index].companyLocation;
    });
  });
}

document
  .getElementById("showStudentForm")
  .addEventListener("click", function () {
    var addStudentModal = new bootstrap.Modal(
      document.getElementById("addStudentModal")
    );
    addStudentModal.show();
  });

document
  .getElementById("showCompanyForm")
  .addEventListener("click", function () {
    var addCompanyModal = new bootstrap.Modal(
      document.getElementById("addCompanyModal")
    );
    addCompanyModal.show();
  });
