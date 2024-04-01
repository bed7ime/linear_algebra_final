// สร้าง array สำหรับเก็บข้อมูลของนักศึกษาและบริษัท
let students = [];
let companies = [];

function addCompany(event) {
  event.preventDefault();
  const form = document.getElementById("addCompanyForm");
  const companyName = form.companyName.value;
  const hiring = form.hiring.value;
  const companyPicInput = form.companyPicture;
  const companyPicFile = companyPicInput.files[0];

  if (companyName && hiring && companyPicFile) {
    const companyPicPath = `imgs/${companyPicFile.name}`;
    companies.push({ companyName, hiring, companyPic: companyPicPath });

    // Move the uploaded file to the 'imgs' folder
    const reader = new FileReader();
    reader.readAsDataURL(companyPicFile);
    reader.onload = function (e) {
      const a = document.createElement("a");
      a.href = e.target.result;
      a.download = companyPicPath;
      a.click();
    };

    form.reset();
    updateMatchTable();
  } else {
    alert("Please fill out all fields.");
  }
}

function addStudent(event) {
  event.preventDefault();
  const form = document.getElementById("addStudentForm");
  const studentName = form.studentName.value;
  const major = form.major.value;
  const experience = form.experience.value;
  const studentPicInput = form.profilePicture;
  const studentPicFile = studentPicInput.files[0];

  if (studentName && major && experience && studentPicFile) {
    const studentPicPath = `imgs/${studentPicFile.name}`;
    students.push({
      studentName,
      major,
      experience,
      studentPic: studentPicPath,
    });

    // Move the uploaded file to the 'imgs' folder
    const reader = new FileReader();
    reader.readAsDataURL(studentPicFile);
    reader.onload = function (e) {
      const a = document.createElement("a");
      a.href = e.target.result;
      a.download = studentPicPath;
      a.click();
    };

    form.reset();
    updateMatchTable();
  } else {
    alert("Please fill out all fields.");
  }
}

function updateMatchTable() {
  const matchTableBody = document.getElementById("matchTableBody");
  matchTableBody.innerHTML = "";

  students.forEach((student) => {
    const matchingCompany = companies.find(
      (company) => company.hiring === student.major
    );

    const companyData = matchingCompany
      ? `
          <td>
            <a href="#" onclick="showCompanyInfo('${matchingCompany.companyName}')">
              ${matchingCompany.companyName}
            </a>
          </td>
          <td>${matchingCompany.hiring}</td>
        `
      : `
          <td>No matched</td>
          <td>No matched</td>
        `;

    const row = `
        <tr>
          <td>
            <a href="#" onclick="showStudentInfo('${student.studentName}')">
              ${student.studentName}
            </a>
          </td>
          <td>${student.major}</td>
          ${companyData}
        </tr>
      `;

    matchTableBody.innerHTML += row;
  });
}

// เพิ่ม event listener สำหรับฟอร์มการเพิ่มข้อมูลนักศึกษาและบริษัท
document
  .getElementById("addStudentForm")
  .addEventListener("submit", addStudent);
document
  .getElementById("addCompanyForm")
  .addEventListener("submit", addCompany);

console.log(students);
console.log(companies);

function showCompanyInfo(companyName) {
  const matchingCompany = companies.find(
    (company) => company.companyName === companyName
  );

  if (matchingCompany) {
    const modal = new bootstrap.Modal(
      document.getElementById("companyInfoModal")
    );
    const modalBody = document.getElementById("companyInfoModalBody");

    modalBody.innerHTML = `
        <p><strong>Company Name:</strong> ${matchingCompany.companyName}</p>
        <p><strong>Hiring:</strong> ${matchingCompany.hiring}</p>
        <img src="${matchingCompany.companyPic}" alt="Company Picture" style="max-width: 100%;">
      `;

    modal.show();
  }
}

function showStudentInfo(studentName) {
  const matchingStudent = students.find(
    (student) => student.studentName === studentName
  );

  if (matchingStudent) {
    const modal = new bootstrap.Modal(
      document.getElementById("studentInfoModal")
    );
    const modalBody = document.getElementById("studentInfoModalBody");

    modalBody.innerHTML = `
        <p><strong>Student Name:</strong> ${matchingStudent.studentName}</p>
        <p><strong>Major:</strong> ${matchingStudent.major}</p>
        <p><strong>Experience (Years):</strong> ${matchingStudent.experience}</p>
        <img src="${matchingStudent.studentPic}" alt="Student Picture" style="max-width: 100%;">
      `;

    modal.show();
  }
}
