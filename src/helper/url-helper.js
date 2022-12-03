
export function getUrl(){
  if (process.env.NODE_ENV === "development"){
    return "https://gj400s9yo9.execute-api.us-east-1.amazonaws.com/latest"
  } else {
    return "https://escrow-block.herokuapp.com";
  }
}
