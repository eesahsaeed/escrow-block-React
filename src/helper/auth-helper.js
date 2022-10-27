
function authenticate( user, cb ){
  if ( typeof window !== "undefined" ){
    localStorage.setItem( "user", JSON.stringify( user ) );
    cb();
  }
}

function isAuthenticated(){
  if ( typeof window === "undefined" ){
    return false;
  }

  if ( localStorage.getItem( "user" ) ){
    return JSON.parse( localStorage.getItem( "user" ) );
  } else {
    return false;
  }
}

function clearUser( cb ){
  if ( typeof window !== "undefined" ){
    localStorage.removeItem( "user" );
  }

  cb();
}

function setFirstForm(values){
  localStorage.setItem("firstForm", JSON.stringify(values));
}

function isFirstDone(){
  if (localStorage.getItem("firstForm")){
    return JSON.parse(localStorage.getItem("firstForm"))["_doc"].firstForm;
  }else{
    return false;
  }
}  

function getForm(){
  if (localStorage.getItem("firstForm")){
    return JSON.parse(localStorage.getItem("firstForm"))["_doc"];
  }else{
    return {};
  }
}

function clearForm(){
  if (typeof window !== "undefined"){
    localStorage.setItem("firstForm", JSON.stringify({
      _doc:{
        userName: "", 
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        gender: "Male",
        country: "",
        phoneNumber: "",
        dateOfBirth: new Date(),
        firstForm: false,
        _id: ""
      }
    }));
  }
}

export default {authenticate, isAuthenticated, clearUser, setFirstForm, isFirstDone, clearForm, getForm};
