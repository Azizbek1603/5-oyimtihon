const $signinForm = document.querySelector('#loginform')
const $signinEmail = document.querySelector('#lodinemail')
const $signinPassword = document.querySelector('#loginpassword')
const $warning = document.querySelector('#warning')
$signinForm.addEventListener("submit", SignIn)

function SignIn(e){
    e.preventDefault()

    if($signinEmail.value.length > 0 && $signinPassword.value.length > 0){
        fetch("https://api.escuelajs.co/api/v1/auth/login",{
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                "email": $signinEmail.value,
                "password": $signinPassword.value,
            })
        })
            .then(response => response.json())
            .then(user => mainWindow(user))           
            
    }
}
function mainWindow(user){
    console.log(user);
    if(!user.statusCode){
        setTimeout(() => {
            window.location.replace(window.origin + "/index.html")
        }, 5000);
    }
    else{
        $warning.innerHTML = "Wrong email or password"
    }
}