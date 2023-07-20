import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

// todo: turned off, becausae of duplicate renders in dev mode
pb.autoCancellation(false);

export default pb;
