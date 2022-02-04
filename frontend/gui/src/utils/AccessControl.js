
import rules from "./rule"

const checkPermissions = (userPermissions, allowedPermissions) => {
  // console.log(userPermissions,allowedPermissions)
  if (allowedPermissions.length === 0) {
    return true;
  }

  return userPermissions.some(permission =>
    allowedPermissions.includes(permission)
  );
};

const AccessControl = ({
  user,
  allowedPermissions,
  children,
  renderNoAccess,
}) => {
  let userPermissions = rules[user]
  // console.log(user)
  const permitted = checkPermissions(userPermissions, allowedPermissions);
  if (permitted === false) {
    return renderNoAccess();
  }
  else if(permitted === true){
    return children;
  }

};

AccessControl.defaultProps = {
  user: "guest",
  allowedPermissions: [],
  renderNoAccess: () => null,
};

export default AccessControl;