import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://172.20.10.5:8080",
  realm: "myrealm",
  clientId: "myclient",
});

export default keycloak;
