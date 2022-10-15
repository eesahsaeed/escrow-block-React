
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
  /*signout().then( ( data ) => {
    document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  } );*/
}

export default { authenticate, isAuthenticated, clearUser };
