export const userHasRole = (authContext, roles) => {
    if (authContext.authInformation.authenticated == false) return false;
    if (roles.length <= 0) return true;
    let userRoles = authContext.authInformation.roles;
    let result = userRoles.some(i => roles.includes(i));
    return result;
};