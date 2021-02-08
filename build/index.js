const loggedUser = document.querySelector("#loggedUser");
const loggedUserSpecial = document.querySelector("#loggedUserSpecial");
const allBooks = document.querySelector("#allBooks");
const makeAdminForm = document.querySelector("#makeAdminForm");
const isAdmin = document.querySelector("#isAdmin");
const renderData = () => {
  // creating form to add new book
  allBooks.innerHTML = "";
  if (isAdmin.innerText === "ADMIN") {
    const addBookForm = document.createElement("form");
    addBookForm.className = "addNewBookForm";
    addBookForm.innerHTML = `<label for="newBookName">Book Name: </label>
    <input id="newBookName" name="newBookName" type="text"/> <br/><br/>
    <label for="newBookWriter">Book Writer: </label>
    <input id="newBookWriter" name="newBookWrite" type="text"/><br/><br/>
    <button type="submit">Add New Book</button>`;
    addBookForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = e.target.newBookName.value;
      const writer = e.target.newBookWriter.value;
      addBookForm.reset();
      db.collection("books").add({ name, writer });
      renderData();
    });
    allBooks.appendChild(addBookForm);
  }

  //added addNewBookForm to the bookList
  db.collection("books")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((eachDoc) => {
        const data = eachDoc.data();
        const id = eachDoc.id;
        const eachBook = document.createElement("div");
        eachBook.className = "eachBook";
        eachBook.setAttribute("docId", id);
        const eachBookName = document.createElement("p");
        eachBookName.innerText = data.name;
        const eachBookWriter = document.createElement("p");
        eachBookWriter.innerText = data.writer;
        eachBook.appendChild(eachBookName);
        eachBook.appendChild(eachBookWriter);
        allBooks.appendChild(eachBook);
      });
    })
    .catch((err) => console.log(err));
};

const signUpForm = document.querySelector("#signUpForm");
const signInForm = document.querySelector("#signInForm");
const signOutButton = document.querySelector("#signOutButton");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.userEmail.value;
  const password = e.target.userPassword.value;
  const special = e.target.userSpecial.value;
  signUpForm.reset();
  try {
    let credentials = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    // putting data to 'users' collection in the firestore
    await db
      .collection("users")
      .doc(credentials.user.uid)
      .set({ email, password, special });
    console.log("*******");
    console.log("New user creation success");
    console.log("Credentials are ", credentials);
    console.log("user info is ", credentials.user);
    alert("Signed Up and Logged In!");
  } catch (err) {
    console.log("*******");
    console.log("New User Creation Failed!");
    console.log(err);
  }
});

signOutButton.addEventListener("click", async (e) => {
  try {
    await auth.signOut();
    console.log("*******");
    console.log("User Log Out Success");
    signInForm.style.display = "block";
    signUpForm.style.display = "block";
    alert("Log Out Success!");
  } catch (err) {
    console.log("*******");
    console.log("User Logging Out Failed!");
    console.log(err);
  }
});

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.userEmail.value;
  const password = e.target.userPassword.value;
  signInForm.reset();
  try {
    let credentials = await auth.signInWithEmailAndPassword(email, password);
    console.log("*******");
    console.log("User Logging in success");
    console.log("Credentials are ", credentials);
    console.log("user info is ", credentials.user);
    alert("You have Logged In!");
  } catch (err) {
    console.log("*******");
    console.log("User Logging in Failed!");
    console.log(err);
    alert("Invalid Email or Password!");
  }
});

auth.onAuthStateChanged(async (user) => {
  if (user) {
    const idTokenResult = await user.getIdTokenResult();
    if (idTokenResult.claims.admin) {
      isAdmin.innerText = "ADMIN";
    } else {
      isAdmin.innerText = "";
    }
    const userInfo = await db.collection("users").doc(user.uid).get();
    loggedUserSpecial.innerText = userInfo.data().special;
    console.log("*******");
    console.log("From the Auth Tracker");
    console.log("A User has just logged In");
    loggedUser.innerText = `Logged In as ${user.email}`;
    loggedUser.style.color = "blue";
    allBooks.innerHTML = "";
    renderData();
    signOutButton.style.display = "block";
    makeAdminForm.style.display = "block";
    signUpForm.style.display = "none";
    signInForm.style.display = "none";
  } else {
    isAdmin.innerText = "";
    allBooks.innerHTML = `<div class="eachBook">Log In To See the books!</div>`;
    loggedUser.innerText = "Not Logged In!";
    loggedUserSpecial.innerText = "";
    loggedUser.style.color = "red";
    console.log("*******");
    console.log("From the Auth Tracker");
    console.log("No User is currently Logged in");
    signOutButton.style.display = "none";
    makeAdminForm.style.display = "none";
  }
});

makeAdminForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.newAdminEmail.value;
  makeAdminForm.reset();
  const addAdminRole = functions.httpsCallable("addAdminRole");
  try {
    const res = await addAdminRole({ email });
    console.log("Making admin sucess");
    console.log(res);
  } catch (err) {
    console.log(err);
  }
});
