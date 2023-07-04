const students = [
    { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
    { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
    { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree: 'Arts', email: 'charlie@example.com' }
  ];
  
  const studentTableBody = document.getElementById('studentTableBody');
  const studentForm = document.getElementById('studentForm');
  const addStudentBtn = document.getElementById('addStudentBtn');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  
  function displayStudents() {
    studentTableBody.innerHTML = '';
  
    for (const student of students) {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
          <button onclick="editStudent(${student.ID})">&#9998;</button>
          <button onclick="deleteStudent(${student.ID})">&#128465;</button>
        </td>
      `;
  
      studentTableBody.appendChild(row);
    }
  }
  
  function addStudent(event) {
    event.preventDefault();
  
    const name = document.getElementById('nameInput').value;
    const age = document.getElementById('ageInput').value;
    const grade = document.getElementById('gradeInput').value;
    const degree = document.getElementById('degreeInput').value;
    const email = document.getElementById('emailInput').value;
  
    const newStudent = {
      ID: students.length + 1,
      name,
      age,
      grade,
      degree,
      email
    };
  
    students.push(newStudent);
    displayStudents();
    studentForm.reset();
  }
  
  function editStudent(studentID) {
    const student = students.find(s => s.ID === studentID);
  
    if (student) {
      document.getElementById('nameInput').value = student.name;
      document.getElementById('ageInput').value = student.age;
      document.getElementById('gradeInput').value = student.grade;
      document.getElementById('degreeInput').value = student.degree;
      document.getElementById('emailInput').value = student.email;
      addStudentBtn.textContent = 'Edit Student';
  
      addStudentBtn.onclick = function(event) {
        event.preventDefault();
  
        student.name = document.getElementById('nameInput').value;
        student.age = document.getElementById('ageInput').value;
        student.grade = document.getElementById('gradeInput').value;
        student.degree = document.getElementById('degreeInput').value;
        student.email = document.getElementById('emailInput').value;
  
        displayStudents();
        studentForm.reset();
        addStudentBtn.textContent = 'Add Student';
        addStudentBtn.onclick = addStudent;
      };
    }
  }
  
  function deleteStudent(studentID) {
    const index = students.findIndex(s => s.ID === studentID);
  
    if (index !== -1) {
      students.splice(index, 1);
      displayStudents();
    }
  }
  

  function filterStudents() {
    const searchValue = searchInput.value.toLowerCase();
    const filteredStudents = students.filter(student => {
      return (
        student.name.toLowerCase().includes(searchValue) ||
        student.email.toLowerCase().includes(searchValue) ||
        student.degree.toLowerCase().includes(searchValue)
      );
    });
  
    studentTableBody.innerHTML = '';
  
    for (const student of filteredStudents) {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
          <button onclick="editStudent(${student.ID})">Edit</button>
          <button onclick="deleteStudent(${student.ID})">Delete</button>
        </td>
      `;
  
      studentTableBody.appendChild(row);
    }
  }
  
  studentForm.addEventListener('submit', addStudent);
  searchInput.addEventListener('input', filterStudents);
  
  displayStudents();