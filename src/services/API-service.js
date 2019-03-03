import { sleep } from 'utils/utils';
import { setTotalNumComments } from 'utils/count-properties';


class APIService {
  constructor() {
    this.baseUrl = process.env.API_URL;
  }

  async get(uri) {
    try {
      const response = await fetch(`${this.baseUrl}${uri}`);
      await sleep(1000);

      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      console.warn('Error', error); // eslint-disable-line no-console
      return { error };
    }
  }

  async post(body, uri) {
    try {
      const response = await fetch(`${this.baseUrl}${uri}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return true;
    } catch (error) {
      console.warn('Error', error); // eslint-disable-line no-console
      return { error };
    }
  }

  async put(body, uri) {
    try {
      const response = await fetch(`${this.baseUrl}${uri}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return true;
    } catch (error) {
      console.warn('Error', error); // eslint-disable-line no-console
      return { error };
    }
  }

  async getPaginate(uri) {
    try {
      console.log('JAFP - URI==>', uri );

      const response = await fetch(`${this.baseUrl}${uri}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Expose-Headers': 'Link'
        }
      });
      
      if (!response.ok) {
        throw Error(response.statusText);
      }
    
      //Guardamos el valor de la cabecera en un objeto properties.
      setTotalNumComments(response.headers.get('X-Total-Count'));

      return response.json();

    } catch (error) {
      console.warn('Error', error); // eslint-disable-line no-console
      return { error };
    }
  }

}

export default APIService;

