import { Client } from '@elastic/elasticsearch';

class Client_meredith {
  static instance: Client;

  constructor() {
    throw new Error('Use Singleton.getInstance()')
  }

  static getInstance() {
    if (!Client_meredith.instance) {
      Client_meredith.instance = new Client({
        node: process.env.DB_MEREDITH_URL,
        auth: {
          username: process.env.DB_MEREDITH_USERNAME,
          password: process.env.DB_MEREDITH_PASSWORD,
        }
      })
    }
    return Client_meredith.instance;
  }
}

const redis = Client_meredith.getInstance()

export default redis