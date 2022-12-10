var selectedRow = null;
function onFormSubmit() {
  if (IsValid()) 
  {
    var frmData = readFormData();
    if (selectedRow == null) {
      insertNewRecord(frmData);
    } else {
      updateRecord(frmData);
    }

    resetform();
  }
}

function autofilltitle(){
  // var fn=document.getElementById('fullName');
  // var emp=document.getElementById('empCode');

  // var data =fn.value;
  // emp.value=fn.value;

}
function OnStartSubmit()
{
  //var tempData = { foo: "sample", bar: "sample" }
  //document.getElementById("myJson").innerHTML = JSON.stringify(tempData, undefined, 2);
  //getData();
  FetchTempData();
}
async function FetchTempData() {
  //var data = { foo: "sample", bar: "sample" }
  console.log("start fetching...");
  const tempData = await GetGitUsers();
  console.log("2:" + tempData);
  document.getElementById("myJson").innerHTML = JSON.stringify(tempData, undefined, 2);
  console.log("done....");
}

function readFormData() {
  var frmData = {};
  frmData["fullName"] = document.getElementById("fullName").value;
  frmData["empCode"] = document.getElementById("empCode").value;
  frmData["salary"] = document.getElementById("salary").value;
  frmData["city"] = document.getElementById("city").value;
  return frmData;
}

function insertNewRecord(data) {
  var table = document
    .getElementById("employeeList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.fullName;

  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.empCode;

  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.salary;

  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.city;

  cell4 = newRow.insertCell(4);
  cell4.innerHTML = `<a onClick="onEdit(this)"> Edit</a>
                        <a onClick="onDelet(this)"> Delete</a>`;
}

function resetform() {
  document.getElementById("fullName").value = "";
  document.getElementById("empCode").value = "";
  document.getElementById("salary").value = "";
  document.getElementById("city").value = "";
  selectedRow = null;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
  document.getElementById("empCode").value = selectedRow.cells[1].innerHTML;
  document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
  document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.fullName;
  selectedRow.cells[1].innerHTML = formData.empCode;
  selectedRow.cells[2].innerHTML = formData.salary;
  selectedRow.cells[3].innerHTML = formData.city;
}

function onDelet(td) {
  if (confirm("Are you want to delete")) {
    row = td.parentElement.parentElement;
    document.getElementById("employeeList").deleteRow(row.rowIndex);
    resetform();
  }
}

function IsValid() {
  try {
    // if( value ) {
    // }
    // will evaluate to true if value is not:

    // null
    // undefined
    // NaN
    // empty string ("")
    // 0
    // false
    var isValid = true;
    let fulname = document.getElementById("fullName").value;
    if (!fulname) {
      isValid = false;
      document
        .getElementById("fullNameValidationError")
        .classList.remove("hide");
    } else {
      isValid = true;
      if (
        !document
          .getElementById("fullNameValidationError")
          .classList.contains("hide")
      ) {
        document
          .getElementById("fullNameValidationError")
          .classList.add("hide");
      }
    }
  } catch (error) {}
  return isValid;
}
