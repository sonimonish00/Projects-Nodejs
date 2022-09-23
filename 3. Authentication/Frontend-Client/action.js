// On Clicking Login Button 
async function handleLogin(){
    // await fetch("http://localhost:3000/", {
    //     method: "POST",
    //     // mode: 'no-cors',
    //     // body : JSON.stringify(personObj),
    //     // headers : {"Content-type": "application/json; charset=UTF-8"}
    //     })
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(err => {console.warn('Something went wrong', err)});
    let emailID = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    loginInfo = {
        email : emailID,
        password : pass
    }
    await fetch('http://localhost:3000/',{
        method: 'POST',
        body : JSON.stringify(loginInfo),
        headers : {"Content-type": "application/json; charset=UTF-8"}
    }).then(function (response) {
        // The API call was successful!
        if (response.ok) {
            console.log("API CALLED>>>>>>")
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        // This is the JSON from our response
        console.log("data........",data);
    // Now render json to html here 
    // https://medium.com/fuzzy-code/rendering-json-data-in-html-e54346b0ec0d#:~:text=Renderjson%20is%20a%20simple%20JavaScript,it%20wherever%20it%20is%20useful.&text=The%20code%20renders%20the%20JSON,by%20clicking%20the%20disclosure%20icons.
    // OR Redirect using location.href or history etc. here 
    changeurl();
    // window.location.replace("http://localhost:3000/dashboard")
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });

}
function changeurl(){
    // This will have a history (back button - 1 step) - use replace if you dont want history
    window.location.href = "http://localhost:3000/dashboard"
}
