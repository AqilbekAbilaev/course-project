const checkUser = (usr) => {
  if (!usr) {
    alert("Unauthenticated users have limited permissions");
    return false;
  }
  return true;
};

export default checkUser;
