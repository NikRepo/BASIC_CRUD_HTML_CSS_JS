var selectedUser = null;
var subjectObject = {
  "Front-end": {
    "HTML": ["Links", "Images", "Tables", "Lists"],
    "CSS": ["Borders", "Margins", "Backgrounds", "Float"],
    "JavaScript": ["Variables", "Operators", "Functions", "Conditions"]    
  },
  "Back-end": {
    "PHP": ["Variables", "Strings", "Arrays"],
    "SQL": ["SELECT", "UPDATE", "DELETE"]
  }
}
var usersArr = [];
async function OnGetGitUsers() 
{
  usersArr = await GetGitUsers();
  console.log(usersArr);
  if(usersArr)
  {
    var subjectSel = document.getElementById("users");
    usersArr.forEach(user => {
      console.log(user.login);
      subjectSel.options[subjectSel.options.length] = new Option(user.login, user.id);
    });
  }
  subjectSel.onchange = function () {
    //this.value will get on  change event
    console.log(this.value);
    var user = null;

    for(let i = 0; i < usersArr.length; i++) 
    {
      let obj = usersArr[i];
      console.log(obj.id);
      //this.Value is string and obj.id is integer
      if(obj.id.toString()===this.value)
      {
        user = obj;
        console.log(JSON.stringify(user));
        break;
      }
    }
  };
}

// window.onload = function() {
//   var subjectSel = document.getElementById("users");
//   var topicSel = document.getElementById("topic");
//   for (var x in subjectObject) {
//     subjectSel.options[subjectSel.options.length] = new Option(x, x);
//   }
//   subjectSel.onchange = function() {
//     //empty Topics- dropdowns
//     topicSel.length = 1;
//     //display correct values
//     //this.value will get on  change event
//     for (var y in subjectObject[this.value]) {
//       topicSel.options[topicSel.options.length] = new Option(y, y);
//     }
//   }
// }

var selectedRow = null;
function InitialTask()
{
  var mybar = document.getElementById("myBar");
  mybar.textContent = "";
  mybar.style.width = 0 + "%";
}
function onFormSubmit() {
  if (IsValid()) 
  {
    console.log(document.getElementById("users").value);
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


var intervalId = null;
var val = 0;
var isComplete = false;

async function OnStartSubmit()
{
  //var tempData = { foo: "sample", bar: "sample" }
  //document.getElementById("myJson").innerHTML = JSON.stringify(tempData, undefined, 2);
  //getData();

  var mybar = document.getElementById("myBar");
  mybar.style.width = 0 + "%";
  mybar.textContent = "";

  intervalId = setInterval(DisplayProgress, 500);
  console.log("Time consuming process started");
  isComplete  = await PerformDummyProcess();
  console.log("Time consuming process done");

  if(isComplete)
  {
    console.log("Clearing interval");
    clearInterval(intervalId);
    var mybar = document.getElementById("myBar");
    mybar.style.width = 100 + "%";
    mybar.textContent = "SUCESS";
  }
  else
  {
    var mybar = document.getElementById("myBar");
    mybar.style.width = 100 + "%";
    mybar.textContent = "FAILED";
  }
  console.log("done");
}


function DisplayProgress ()
{
  var time  = Date();
  //console.log(time);
  var mybar = document.getElementById("myBar");
  if(val===100)
  {
    val = 10;
  }
  else{
    val = val + 10;
  }
  mybar.style.width = val + "%";
}

async function PerformDummyProcess()
{  
  console.log("Time consuming process ....");
  for (let index = 0; index < 1000; index++) {
    const tempData = await GetGitUsers();
    console.log(index);
    //var elem = document.getElementById("myBar");
    //elem.style.width = index/10 + "%";
  }
  return true;
}


function waitFor(conditionFunction) {

    const poll = resolve => {
    if(conditionFunction())
    {
      var elem = document.getElementById("myBar");
      elem.style.width = 2 + "%";
      resolve();
    } 
    else
    {
      var elem = document.getElementById("myBar");
      var num = Math.floor(Math.random() * 101);
      //console.log("random val " + num);
      elem.style.width = num + "%";
      setTimeout(_ => poll(resolve), 400);
    } 
  }

  return new Promise(poll);
}
async function demo() {
 // await waitFor(_ => flag === true);
  await waitFor(Test1);
  console.log('the wait is over!');
}
var i = 0;
function move() {


  // if (i == 0) {
  //   i = 1;
  //   var elem = document.getElementById("myBar");
  //   var width = 1;
  //   var id = setInterval(frame, 10);
  //   function frame() {
  //     if (width >= 100) {
  //       clearInterval(id);
  //       i = 0;
  //     } else {
  //       width++;
  //       elem.style.width = width + "%";
  //     }
  //   }
  // }
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
