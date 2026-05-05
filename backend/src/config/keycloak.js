const jwksClient = require("jwks-rsa");

// config Keycloak
const client = jwksClient({
  jwksUri: "http://localhost:8080/realms/myrealm/protocol/openid-connect/certs",
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

module.exports = getKey;
