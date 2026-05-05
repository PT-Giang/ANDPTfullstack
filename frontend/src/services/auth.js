import keycloak from "../keycloak";
export const logout = () => {
  keycloak.logout({
    redirectUri: window.location.origin + "/login",
  });
};

export const getToken = () => keycloak.token;

export const getUser = () => keycloak.tokenParsed?.preferred_username;

export const getRoles = () => keycloak.tokenParsed?.realm_access?.roles || [];

export const hasRole = (role) => getRoles().includes(role);
