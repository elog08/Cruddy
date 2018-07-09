const Console = console;

// Simple helper to get Payload from JWT
// Adopted from here: https://stackoverflow.com/a/38552302

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

// Executed for the following scenario
// 1. User logs in
// 2. User leaves browser
// 3. User comes back
// Feathers detects the JWT token but doesn't automatically populate Vuex with the user info

export async function initialAuthenticate(app) {
  try {
    const { accessToken } = await app.authenticate();
    Console.info('Initialize Feathers', 'Got accessToken', { accessToken });
    const { userId } = parseJwt(accessToken);
    Console.info('Initialize Feathers', 'Parsed userId', { userId });
    // const user = await app.service('users').get(userId);
    // Console.info('Initialize Feathers', 'Fetched current user info', {user});
    return userId;
  } catch (e) {
    Console.error('Initialize Feathers', 'Auth Error', e.message);
    throw e;
  }
}
