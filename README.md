### Motivations
- Wanted to learn how authentication and authorizations are handled in modern apps.
- To create a template since the process is similar for all apps
- Increase my knowledge of web security and vunerabilities 

### Expectations
- Able to complete the implementation in a timely manner
- Reduce the amount of 'magic' parts of the JWT flow

### Challenges
- 

## Project Learning Process
- Began researching on JWT and why JWT
- Learning implementation methods through conferences.
- Youtube tutorials are not extensive enough or have inherent vunerabilities

- Set up my project 


# What is JWT? 
JSON Web Token(JWT) is a compact and self-contained way for securely transmitting information between parties as a JSON object. [Read more about JWTs here.](https://jwt.io/introduction/) This information can be verified and trusted because it can be digitally signed. JWTs can be signed using a secret (with the **HMAC** algorithm) or a public/private key pair using **RSA** or **ECDSA**. 

To ensure integrity of the claims contained within the token, we can use signed tokens. To hide claims from the other party, we can encrypt the token. When tokens are signed with public/private key pairs, the signature also certifies that only the party holding the private is the one that signed it.

# Why JWT?
- Authorization: Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services and resources that are permitted with that token. Single Sign On is a feature that widely uses JWT.

- Information Exchange: With signed JWTs, we can be sure the senders are who they say they are, Additionally, the signature can be calculated using the header and the payload so we can verify that the content has not been tampered with.

# JWT Structure

In its compact form, JWT consists of three parts separated with dots (.),

- Header
- Payload
- Signature

A JWT will look something like:
xxxxx.yyyyy.zzzzz

# Header

A JWT typically consists of two parts: type (which is JWT) and signing algorithm used (e.g HMAC SHA256 or RSA)

Example:
`
{
  "alg": "HS256,
  "type": "JWT"
}
`
This header will Base64Url encoded to form the first part of the JWT.

# Payload

Payload contains claims. Claims are statements about an entity (typically, the user) and additional data. This payload can be read by anyone unless the JWT is encrypted. There are three types of claims: registered, public and private.

  - Registered claims: There are recommended predefined claims which are not mandatory. [They can be found here.](https://tools.ietf/html/rfc7519#section-4.1)
  - Public claims: You can define any pairs here however to avoid collision refer to [IANA JSON Web Token Registry](https://www.iana.org/assignments/jwt/jwt.xhtml) or defined as a URI that contains a collision resistant namespace.
  - Private claims: Custom claims to share information between parties that agree on using them and are neither registered nor public claims.

Example: 
`
{
  "sub": "1234567",
  "name": "User",
  "admin": true
}
`
The payload will be Base64Url encoded to form the second part.

# Signature

To create the signature, use the algorithm specified in the header to sign the encoded header, encoded payload and a secret.

Example: 
`
  HMACSHA256(
    base64UrlEncode(header) + '.' +
    base64UrlEncode(payload),
    secret
  )
`

The attacker would need to know the secret to be able to forge the signature and tamper the claims or header.

# Complete JWT

The final output is three Base64-Url strings separated by dots. To mess around with JWT, head over to [jwt.io Debugger](https:/jwt.io/#debugger.io)

## JWT Best Practices
  - Keep it secret. Keep it safe.
  - Do not add sensitive data to the payload.
  - Give tokens an expiration. / have an expiring and revoking strategy
  - Embrace Https
  - Consider all of your authorization use cases.









# What are this words???
- [] JWT
- [] HMAC algorithm
- [] RSA
- [] ECDSA
- [] claims
- [] Single Sign On
- [] refresh tokens
 
## References
[JWT resource](https://jwt.io/introduction/)
[auth0 blog post](https://auth0.com/learn/token-based-authentication-made-easy/#!)