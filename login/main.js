const $form = document.querySelector('#signupform')
const $name = document.querySelector('#name')
const $password = document.querySelector('#password')
const $signupbtn = document.querySelector('.signupbtn')
const $email = document.querySelector('#email')
const $avatar = document.querySelector('#avatar')


$form.addEventListener("submit", SignUp)
function SignUp(e){
    e.preventDefault()
    // console.log("a");

    if($name.value.trim().length > 0){
        fetch("https://api.escuelajs.co/api/v1/users", {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                "email": $email.value,
                "name": $name.value,
                "password": $password.value,
                "avatar": $avatar.value
            })
        })
            .then(response => response.json())
            .then(user => console.log(user))  

            setTimeout(() => {
                window.location.replace(window.origin + "/index.html")
            }, 5000);
        
    }
} 
