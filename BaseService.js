const userAction1 = async () => {
    const response = await fetch('https://api.github.com/users');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    return myJson;
  }

  const userAction2 = async () => {
    const response = await fetch('http://example.com/movies.json', {
      method: 'POST',
      body: myBody, // string or object
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
  }
  async function  Test()
  {
    console.log("Inside Fetch url");
    const response = await fetch('https://api.github.com/users');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson);
    //document.getElementById("myJson").innerHTML = JSON.stringify(myJson, undefined, 2);
    return myJson;
  }  n
  
  const  GetGitUsers = async () => {
    console.log("Inside Fetch url"); nbbbb
    const response = await fetch('https://api.github.com/users');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson);
    //document.getElementById("myJson").innerHTML = JSON.stringify(myJson, undefined, 2);
    return myJson;
  }

  function getData(){
    console.log("Started getData")
    url = "https://api.github.com/users";
    fetch(url).then((response)=>{
        console.log("Inside first then")
        return response.json();
    }).then((data)=>{
        console.log("Inside second then")
        console.log(data);
    })
}


function postData(){
    url = "http://dummy.restapiexample.com/api/v1/create";
    data = '{"name":"WhatsInTheName","salary":"123","age":"23"}'
    params = {
        method:'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    }
    fetch(url, params).then(response=> response.json())
    .then(data => console.log(data)
    )
}

// console.log("Before running getData")
// getData()
// console.log("After running getData")
//postData()