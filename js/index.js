let users = [];
var mainIndex = 0;
// Get Data From API
const getData = () => {
  fetch("http://localhost:5000/users")
    .then((respopnse) => respopnse.json())
    .then((ResponseData) => {
      if (ResponseData.message == "Success") {
        users = ResponseData.result;
        getAll(users);
      }
      console.log(users);
    });
};
// For LOOP For Users
const getAll = (list) => {
  var container = ``;
  for (let i = 0; i < list.length; i++) {
    container += `<tr>
      <td>${list[i].id}</td>
      <td>${list[i].name}</td>
      <td>${list[i].email}</td>
      <td>${list[i].password}</td>
      <td>${list[i].age}</td>
      <td>
      <a href="#editUserModal" class="edit" data-toggle="modal" onclick="update(${i})"
      ><i
        class="material-icons"
        data-toggle="tooltip"
        title="Edit"
        >&#xE254;</i
      ></a
    >
      </td>
      <td>
        <a class="delete fw-bold fst-italic mb-2"
              id="deleteBtn" onclick="deleteUser(${list[i].id})">
              <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
        </a>
      </td>
    </tr>`;
  }
  document.getElementById("tableData").innerHTML = container;
};
getData();
//Add Method
const addUser = () => {
  const userName = document.getElementById("userName").value;
  const userEmail = document.getElementById("userEmail").value;
  const userPassword = document.getElementById("userPassword").value;
  const userAge = document.getElementById("userAge").value;
  let inputOBJ = {
    name: userName,
    email: userEmail,
    password: userPassword,
    age: userAge,
  };
  console.log(inputOBJ);
  fetch("http://localhost:5000/addUser", {
    method: "POST",
    body: JSON.stringify(inputOBJ),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == "Success") {
        getData();
      }
    });
  console.log("Success");
  clearForm();
  $("#addUserModal").modal("hide");
};
const clearForm = (flag) => {
  useruId.value = flag ? flag.id : "";
  useruName.value = flag ? flag.name : "";
  useruEmail.value = flag ? flag.email : "";
  useruPassword.value = flag ? flag.password : "";
  useruAge.value = flag ? flag.age : "";
};
const deleteUser = (j) => {
  let inputOBJ = {
    id: j,
  };
  console.log(inputOBJ);
  fetch("http://localhost:5000/deleteUser", {
    method: "POST",
    body: JSON.stringify(inputOBJ),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == "Success") {
        getData();
      }
    });
  console.log("Success");
};
const update = (index) => {
  clearForm(users[index]);
};
const updateUser = () => {
  console.log("ok");
  const useruId = document.getElementById("useruId").value;
  const useruName = document.getElementById("useruName").value;
  const useruEmail = document.getElementById("useruEmail").value;
  const useruPassword = document.getElementById("useruPassword").value;
  const useruAge = document.getElementById("useruAge").value;
  let inputOBJ = {
    id: useruId,
    name: useruName,
    email: useruEmail,
    password: useruPassword,
    age: useruAge,
  };
  console.log(inputOBJ);
  fetch("http://localhost:5000/updateUser", {
    method: "POST",
    body: JSON.stringify(inputOBJ),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == "Success") {
        getData();
      }
    });
  clearForm();
  $("#editUserModal").modal("hide");
};

const search = (searchKey) => {
  const searchlist = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].name.toLowerCase().includes(searchKey.toLowerCase())) {
      searchlist.push(users[i]);
    }
  }
  getAll(searchlist);
};
// function validateSiteName() {
//     const regex = /^[A-Za-z]{1,}$/
//     if (regex.test(siteName.value)) {
//         document.getElementById("errorName").classList.add("d-none")

//         return true
//     } else {
//         document.getElementById("errorName").classList.remove("d-none")

//         return false
//     }
// }
