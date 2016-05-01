const client = require.context('../src', true, /-test\.js$/);
client.keys().forEach(client);