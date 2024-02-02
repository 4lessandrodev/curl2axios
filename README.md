# axios-curl

## Overview

axios2curl is a lightweight Axios interceptor for generating cURL commands from Axios requests. It simplifies the process of converting your Axios requests into cURL commands for easier debugging and sharing.

---

### Installation

Install the library using npm or yarn:

```sh

npm install axios2curl


```

OR

```sh

yarn add axios2curl

```

---

### Usage

Basic Usage

```js

import axios from 'axios';
import { curlInterceptor } from 'axios2curl';

axios.interceptors.request.use(curlInterceptor);

axios.get('https://api.com/item/1');


```

This will automatically generate a cURL command in the console based on the Axios request.

```sh

{
  occurredAt: '2024-02-02T22:17:45.514Z',
  curlCommand: "curl 'https://api.com/item/1' -X GET -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: '"
}

```

---

Custom Callback
You can also provide a custom callback function to handle the generated cURL command. This is useful if you want to do something specific with the command, such as logging it in a different way.

```js

import axios from 'axios';
import { curlInterceptor } from 'axios2curl';

const myCallback = (curl: string) => console.log(curl);

axios.interceptors.request.use((req) => curlInterceptor(req, myCallback));

axios.get('https://api.com/item/1');


```

In this example, the custom callback function myCallback will be called with the generated cURL command.

### Example Output

For the given Axios request:

```js

axios.get('https://api.com/item/1');

// curl 'https://api.com/item/1' -X GET -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: '


```

### Bind

```js

import axios from 'axios';
import { bindCurl } from 'axios2curl';

const instance = bindCurl(axios.create({ baseURL: 'https://pokeapi.co/api/v2' }));

await instance.get('/berry-flavor/1');

console.log(instance.curl);

// > "curl '/berry-flavor/1' -X GET -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: ' --url 'https://pokeapi.co/api/v2'"

```

### License

axios2curl is licensed under the MIT License - see the LICENSE file for details.
