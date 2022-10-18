
function validateFirstForm(values){

}

export async function signUp1(event, values){
  event.preventDefault();

  let valid = validateFirstForm(values);

  let userData = new FormData();
  values.userName && userData.append("userName", values.userName);
  values.firstName && userData.append("firstName", values.firstName);
  values.lastName && userData.append("lastName", values.lastName);
  values.middleName && userData.append("middleName", values.middleName)
  values.email && userData.append("email", values.email);
  values.gender && userData.append("gender", values.gender);
  values.countryOfOrigin && userData.append("country", values.countryOfOrigin);
  values.phoneNumber && userData.append("phoneNumber", values.phoneNumber);
  values.dateOfBirth && userData.append("dateOfBirth", values.dateOfBirth);
  values.password && userData.append("password", values.password);
  values.confirmPassword && userData.append("confirmPassword", values.confirmPassword);

  const abortController = new AbortController();
  const signal = abortController.signal;

  async function register(user){
    try{
     let response = await fetch(`${getUrl()}/users/register`, {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: user
      })

      return await response.json();
    } catch(err){
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  register(userData).then(data => {
    console.log(data);
    if (data.success){
      navigate("/welcome/" + values.firstName);
    } else if (data.errors){
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setErrors(data.errors)
    } else if (data.message){
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setExist(data)
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setWrong(data.error)
    }
  }).catch(err => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  })

  /*const config = {
    headers: { 
      "Accept": "application/json" 
    },
  };

  axios.post(
    "https://escrow-block.herokuapp.com//users/register",
    {body: userData},
    config
  ).then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });*/
}

export async function signUp2(event) {
  event.preventDefault();
  let userData = new FormData();
  values.userName && userData.append("userName", values.userName);
  values.firstName && userData.append("firstName", values.firstName);
  values.lastName && userData.append("lastName", values.lastName);
  values.middleName && userData.append("middleName", values.middleName);
  values.email && userData.append("email", values.email);
  values.preferredCommunication && userData.append("preferredCommunication", values.preferredCommunication);
  values.gender && userData.append("gender", values.gender);
  values.countryOfOrigin && userData.append("country", values.countryOfOrigin);
  values.phoneNumber && userData.append("phoneNumber", values.phoneNumber);
  values.dateOfBirth && userData.append("dateOfBirth", values.dateOfBirth);
  values.occupation && userData.append("occupation", values.occupation);
  values.employmentStatus && userData.append("employmentStatus", values.employmentStatus);
  values.telegram && userData.append("telegram", values.telegram);
  values.sourceOfFunds && userData.append("sourceOfFunds", values.sourceOfFunds);
  values.purposeOfEscrowAccount && userData.append("purposeOfEscrowAccount", values.purposeOfEscrowAccount);
  values.expectedTransactionSizePerTrade && userData.append("expectedTransactionSizePerTrade", values.expectedTransactionSizePerTrade);
  values.password && userData.append("password", values.password);
  values.confirmPassword && userData.append("confirmPassword", values.confirmPassword);

  const abortController = new AbortController();
  const signal = abortController.signal;

  async function register(user){
    try{
     let response = await fetch(`${getUrl()}/users/register`, {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: user
      })

      return await response.json();
    } catch(err){
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  register(userData).then(data => {
    console.log(data);
    if (data.success){
      navigate("/welcome/" + values.firstName);
    } else if (data.errors){
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setErrors(data.errors)
    } else if (data.message){
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setExist(data)
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setWrong(data.error)
    }
  }).catch(err => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  })

  /*const config = {
    headers: { 
      "Accept": "application/json" 
    },
  };

  axios.post(
    "https://escrow-block.herokuapp.com//users/register",
    {body: userData},
    config
  ).then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });*/
}
