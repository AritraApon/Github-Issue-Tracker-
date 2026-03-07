document.getElementById('login-button')
.addEventListener('click',()=>{
    const userName = document.getElementById('user-name');
    const userPassword = document.getElementById('user-password');

    const name = userName.value;
    const password = userPassword.value;
    // console.log(name , password)
    if(name === 'admin' && password === 'admin123'){
        alert(`Sing in successful ✅
 Welcome to GitHub Issue Tracker 🎉
`)
 window.location.assign("home.html")
    }else{
        alert(` ⚠️ Login Failed
    Your Username and Password is incorrect.
Default userName: admin Default password: admin123`)
    }

})