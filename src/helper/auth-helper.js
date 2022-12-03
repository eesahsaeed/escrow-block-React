
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

function setForm(values){
  localStorage.setItem("form", JSON.stringify(values));
}

function isFirstDone(){
  if (localStorage.getItem("form")){
    return JSON.parse(localStorage.getItem("form")).firstForm;
  }else{
    return false;
  }
}  

function getForm(){
  if (localStorage.getItem("form")){
    return JSON.parse(localStorage.getItem("form"));
  }else{
    return {};
  }
}

function updateForm(name, value){
  let userData = JSON.parse(localStorage.getItem("form"));
  let tempData = {...userData, [name]: value};
  localStorage.setItem("form", JSON.stringify(tempData));
}

function clearForm(){
  if (typeof window !== "undefined"){
    localStorage.setItem("firstForm", JSON.stringify({
        userName: "",
        firstName: "",
        address: "",
        middleName: "",
        lastName: "",
        email: "",
        preferredCommunication: "Telegram",
        gender: "Male",
        country: "",
        phoneNumber: "",
        dateOfBirth: new Date(),
        telegram: "",
        employmentStatus: "Employed",
        occupation: "Not Applicable",
        purposeOfEscrowAccount: "",
        sourceOfFunds: "",
        socialSecurityNumber: "",
        expectedTransactionSizePerTrade: "",
        identification: "",
        proofOfAddress: "",
        bankStatement: "",
        forgotPasswordToken: "",
        password: "",
        confirmPassword: "",
        firstForm: false,
        id: ""
      })
    );
  }
}

function resetForm() {
  localStorage.setItem("form", JSON.stringify({
    userName: "",
    firstName: "",
    address: "",
    middleName: "",
    lastName: "",
    email: "",
    preferredCommunication: "Telegram",
    gender: "Male",
    country: "",
    phoneNumber: "",
    dateOfBirth: new Date(),
    telegram: "",
    employmentStatus: "Employed",
    occupation: "Not Applicable",
    purposeOfEscrowAccount: "",
    sourceOfFunds: "",
    socialSecurityNumber: "",
    expectedTransactionSizePerTrade: "",
    identification: "",
    proofOfAddress: "",
    bankStatement: "",
    transactions: [],
    forgotPasswordToken: "",
    password: "",
    confirmPassword: "",
    firstForm: false,
    secondForm: false,
    id: ""
  }));
}

export default {authenticate, isAuthenticated, clearUser, setForm, isFirstDone, clearForm, getForm, updateForm, resetForm};
