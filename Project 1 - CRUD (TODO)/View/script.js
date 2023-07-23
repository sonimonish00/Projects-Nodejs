// Declaring Global Empty (Array of Objects) to store Values : [{},{},....{}]
let personArr = [];
let idForUpdate;

async function addData() {
  // Checking if the call is for updatedata()
  if (document.getElementById("add").innerText == "Update") {
    let toBeUpdatedfName = document.getElementById("fName").value;
    let toBeUpdatedlName = document.getElementById("lName").value;
    let conditionCheckForUpdate = Boolean(
      toBeUpdatedfName != "" &&
        toBeUpdatedlName != "" &&
        toBeUpdatedfName.trim() != "" &&
        toBeUpdatedlName.trim() != ""
    );

    // If Above Condition Satisfies (i.e. No empty string in update section..then only update else alert)
    if (conditionCheckForUpdate) {
      // Calling PUT METHOD for Updating 
      personObj = {firstN: toBeUpdatedfName, lastN: toBeUpdatedlName};
      await fetch(`http://localhost:3000/users/${idForUpdate}`,{
        method : "PUT",
        mode: 'cors',
        body : JSON.stringify(personObj),
        headers : {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(() => console.log('UPDATED SUCCESFULLY !! Check DB'))
      .catch(error => console.log(error))
      
      // Clearing personArr to get latest updated value.  
      personArr = [];
      await fetch("http://localhost:3000/users", {
        method: "GET",
        mode: 'cors',
      })
        .then((response) => response.json())
        .then((data) =>
          data.forEach((obj) => {
            personArr.push(obj);
          })
        );

      // Clearing Input Field for new input
      document.getElementById("fName").value = null;
      document.getElementById("lName").value = null;

      // Changing Update to Add Button
      document.querySelector("#add").innerHTML =
        '<i class="fas fa-plus-circle"></i>' + "Add";

      // remove Global idForUpdate value (Not Required), but just for safety in future.
      idForUpdate = null;
    } else {
      alert("Both Field : First Name & Last Name Are required");
    }
  } else {
    // First Time Creation into object - adding new data & getting First Name & Last Name values
    let fName = document.getElementById("fName").value;
    let lName = document.getElementById("lName").value;

    let conditionCheckForAdd = Boolean(
      fName == "" || lName == "" || fName.trim() == "" || lName.trim() == ""
    );

    if (conditionCheckForAdd) {
      alert("Both Field : First Name & Last Name Are required");
    } else {
      // creating an object to push into DB using POST API Call
      personObj = {firstN: fName, lastN: lName};
      await fetch("http://localhost:3000/users", {
        method: "POST",
        mode: 'cors',
        body : JSON.stringify(personObj),
        headers : {"Content-type": "application/json; charset=UTF-8"}
      })
        .then(response => response.json())
        .then(data => console.log(data));
    
      personArr = [];
      await fetch("http://localhost:3000/users", {
        method: "GET",
        mode: 'cors',
      })
        .then((response) => response.json())
        .then((data) =>
          data.forEach((obj) => {
            personArr.push(obj);
          })
        );

      // Clearing Input Field for new input
      document.getElementById("fName").value = null;
      document.getElementById("lName").value = null;
    }
  }

  // Calling renderTable Function to Render HTMLTable : For Both Update & Delete
  renderTable(personArr);
}

// RenderTable Function : For Rendering Table
function renderTable(personArr) {
  let html = "<table>";
  personArr.forEach((person) => {
    html += "<tr>";
    html += "<td>" + person.firstN + "</td>";
    html += "<td>" + person.lastN + "</td>";
    html += `<td><button type="button" class="btn btn-success" id=${person._id} onclick="editData(this)">Edit</button></td>`;
    html += `<td><button type="button" class="btn btn-danger" id=${person._id} onclick="deleteData(this)">Delete</button></td>`;
    html += "</tr>";
  });
  html += "</table>";
  document.getElementById("renderTable").innerHTML = html;
}

async function deleteData(currentButton) {
    await fetch(`http://localhost:3000/users/${currentButton.id}`,{
      method : "DELETE",
      mode: 'cors',
    })
    .then(() => console.log('DELETED SUCCESFULLY !! Check DB'))
    .catch(error => console.log(error))
  
  // Resetting PersonArr (Empty) to get the data again from backend DB
  personArr = [];
  await fetch("http://localhost:3000/users", {
    method: "GET",
    mode: 'cors',
  })
    .then((response) => response.json())
    .then((data) =>
      data.forEach((obj) => {
        personArr.push(obj);
      })
    );
  renderTable(personArr);
}

function editData(currentButton) {
  // Getting index of current button element
  const index = personArr.findIndex((item) => item._id ==currentButton.id);

  // Change value of first,last name and add button to update.
  document.getElementById("fName").value = personArr[index].firstN;
  document.getElementById("lName").value = personArr[index].lastN;
  document.querySelector("#add").innerHTML = "Update";

  // Storing ID Globally for future use (Update)
  idForUpdate = currentButton.id;
}

async function renderData() {
  // Getting Array of object from DB in data
  personArr = [];
  await fetch("http://localhost:3000/users", {
    method: "GET",
    mode: 'cors',
  })
    .then((response) => response.json())
    .then((data) =>
      data.forEach((obj) => {
        personArr.push(obj);
      })
    );
  renderTable(personArr);
}
