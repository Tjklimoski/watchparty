// is handling the errors returned by NextAuth too.
// will be sent as a url query param:
// ex. http://localhost:3000/auth?error=Configuration
// Read what values can be sent for error here: https://next-auth.js.org/configuration/pages
// Setup this page to handle both user sign in and sign up, along with handling errors being sent back by next auth.
// Also use url query params to determine if coming for sign in or sign up.
// for credential login, will need to pass a csrf Token with the login info: https://next-auth.js.org/configuration/pages

import React from "react";

export default function authPage() {
  return <div>Auth</div>;
}
