const signUpForm = document.querySelector('#signUpForm');
const signInForm = document.querySelector('#signInForm');
const signOutButton = document.querySelector('#signOutButton');

signUpForm.addEventListener('submit',async (e) =>{
    e.preventDefault();
    const email = e.target.userEmail.value;
    const password = e.target.userPassword.value;
    signUpForm.reset();
    try{
        let credentials = await auth.createUserWithEmailAndPassword(email,password);
        console.log('New user creation success');
        console.log('Credentials are ',credentials);
        console.log('user info is ',credentials.user);        
    }catch(err){
        console.log('New User Creation Failed!');
        console.log(err);
    }
});

signOutButton.addEventListener('click', async (e) =>{
    try{
        await auth.signOut();
        console.log('User Log Out Success');
    }catch(err){
        console.log('User Logging Out Failed!');
        console.log(err);
    }
});

signInForm.addEventListener('submit',async (e) =>{
    e.preventDefault();
    const email = e.target.userEmail.value;
    const password = e.target.userPassword.value;
    signInForm.reset();
    try{
        let credentials = await auth.signInWithEmailAndPassword(email,password);
        console.log('User Logging in success');
        console.log('Credentials are ',credentials);
        console.log('user info is ',credentials.user);        
    }catch(err){
        console.log('User Logging in Failed!');
        console.log(err);
    }
});

auth.onAuthStateChanged(user =>{
    if(user){
        console.log('From the Auth Tracker');
        console.log('A User has just logged In');
    }else{
        console.log('From the Auth Tracker');
        console.log('No User is currently Logged in');
    }
})

