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
JSON Web Token(JWT) is a compact and self-contained way for securely transmitting information between parties as a JSON object. [Read more about JWTs here](https://jwt.io/introduction/) This information can be verified and trusted because it can be digitally signed. JWTs can be signed using a secret (with the **HMAC** algorithm) or a public/private key pair using **RSA** or **ECDSA**. 

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
This json will Base64Url encoded to form the first part of the JWT.

# Payload

Payload contains claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public and private.

  - Registered claims: There are recommended predefined claims which are not mandatory. [They can be found here](https://tools.ietf/html/rfc7519#section-4.1)










# What are this words???
[] JWT
[] HMAC algorithm
[] RSA
[] ECDSA
[] claims
[] Single Sign On


## References
[JWT resource](https://jwt.io/introduction/)
