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
      hiring: "English",
      location: "Nakhon Pathom",
      img: `https://source.unsplash.com/random/150x150/?company`,
    },
    {
      name: "Business Company",
      hiring: "Business",
      location: "Bangkok",
      img: `https://source.unsplash.com/random/150x150/?company`,
    },
    {
      name: "Software House",
      hiring: "Software Engineer",
      location: "Ratchaburi",
      img: `https://source.unsplash.com/random/150x150/?company`,
    },
  ],
};

function matchStudentsWithCompanies(data) {
  const companyMap = data.companies.reduce((map, company) => {
    if (!map[company.hiring]) {
      map[company.hiring] = [];
    }
    map[company.hiring].push(company);
    return map;
  }, {});

  const matches = [];

  data.students.forEach((student) => {
    const companiesForMajor = companyMap[student.major] || [];
    companiesForMajor.forEach((company) => {
      matches.push({
        student: student.name,
        major: student.major,
        company: company.name,
        hiring: company.hiring,
        studentInfo: student,
        companyInfo: company,
      });

      const tableBody = document.getElementById("matchedPairs");
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="student-name" data-student='${JSON.stringify(student)}'>${
        student.name
      }</td>
        <td>${student.major}</td>
        <td class="company-name" data-company='${JSON.stringify(company)}'>${
        company.name
      }</td>
        <td>${company.hiring}</td>
      `;
      tableBody.appendChild(row);
    });
  });

  return matches;
}

const matchedData = matchStudentsWithCompanies(data);

document.getElementById("matchedPairs").addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("student-name")) {
    const student = JSON.parse(target.getAttribute("data-student"));
    displayStudentModal(student);
  } else if (target.classList.contains("company-name")) {
    const company = JSON.parse(target.getAttribute("data-company"));
    displayCompanyModal(company);
  }
});

function displayStudentModal(student) {
  const modal = new bootstrap.Modal(document.getElementById("studentModal"));
  document.getElementById("studentImage").src = student.img;
  document.getElementById("studentName").textContent = student.name;
  document.getElementById("studentAge").textContent = student.age;
  document.getElementById("studentMajor").textContent = student.major;
  document.getElementById("studentGPA").textContent = student.gpa;
  document.getElementById("studentExperience").textContent = student.experience;
  modal.show();
}

function displayCompanyModal(company) {
  const modal = new bootstrap.Modal(document.getElementById("companyModal"));
  document.getElementById("companyImage").src = company.img;
  document.getElementById("companyName").textContent = company.name;
  document.getElementById("companyHiring").textContent = company.hiring;
  document.getElementById("companyLocation").textContent = company.location;
  modal.show();
}

document.getElementById("showStudentForm").addEventListener("click", () => {
  const modal = new bootstrap.Modal(document.getElementById("addStudentModal"));
  modal.show();
});

document.getElementById("showCompanyForm").addEventListener("click", () => {
  const modal = new bootstrap.Modal(document.getElementById("addCompanyModal"));
  modal.show();
});
