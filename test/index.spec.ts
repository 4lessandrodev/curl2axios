import axios from "axios";
import { describe, it } from "node:test";
import { bindCurl, curlInterceptor } from "../lib";
import assert from "node:assert";

describe('curl-generator', () => {

    it('[1] should generate curl from simple GET', async () => {

        var command = '';
        const expected = "curl 'https://pokeapi.co/api/v2/berry-flavor/1' -X GET -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: application/json'";

        const instance = axios.create();
        const callback = (cmd: string) => command = cmd;

        instance.interceptors.request.use((req) => curlInterceptor(req, callback));

        await instance.get('https://pokeapi.co/api/v2/berry-flavor/1');

        assert(command === expected, 'O curl [1] gerado ficou diferente');
    });

    it('[2] should generate curl from GET with params', async () => {

        var command = '';
        const expected = "curl 'https://pokeapi.co/api/v2/berry-flavor/1?animal=berry' -X GET -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: application/json'";

        const instance = axios.create();
        const callback = (cmd: string) => command = cmd;

        instance.interceptors.request.use((req) => curlInterceptor(req, callback));

        await instance.get('https://pokeapi.co/api/v2/berry-flavor/1', {
            params: { animal: 'berry' }
        });

        assert(command === expected, 'O curl [2] gerado ficou diferente');
    });

    it('[3] should generate curl from GET with auth', async () => {

        var command = '';
        const expected = "curl 'https://pokeapi.co/api/v2/berry-flavor/1' -X GET -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: application/json' --user 'berry:12345'";

        const instance = axios.create();
        const callback = (cmd: string) => command = cmd;

        instance.interceptors.request.use((req) => curlInterceptor(req, callback));

        await instance.get('https://pokeapi.co/api/v2/berry-flavor/1', {
            auth: { username: 'berry', password: '12345' }
        });

        assert(command === expected, 'O curl [3] gerado ficou diferente');
    });

    it('[4] should generate curl from POST with auth', async () => {

        var command = '';
        const expected = `curl 'https://jsonplaceholder.typicode.com/posts' -X POST -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: application/json' -H 'Authorization: Bearer token...' --data-raw '{"userName":"sample"}'`;
        const instance = axios.create();
        const callback = (cmd: string) => command = cmd;

        instance.interceptors.request.use((req) => curlInterceptor(req, callback));

        await instance.post('https://jsonplaceholder.typicode.com/posts', { userName: 'sample' },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer token...'
                }
            }
        );

        assert(command === expected, 'O curl [4] gerado ficou diferente');
    });

    it('[5] should generate curl from GET using baseURL', async () => {

        var command = '';
        const expected = "curl '/berry-flavor/1' -X GET -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: application/json' --url 'https://pokeapi.co/api/v2'";

        const instance = axios.create({ baseURL: 'https://pokeapi.co/api/v2' });
        const callback = (cmd: string) => command = cmd;

        instance.interceptors.request.use((req) => curlInterceptor(req, callback));

        await instance.get('/berry-flavor/1');

        assert(command === expected, 'O curl [5] gerado ficou diferente');
    });

    it('[6] should generate curl from GET using baseURL', async () => {

        const expected = "curl '/berry-flavor/1' -X GET -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: application/json' --url 'https://pokeapi.co/api/v2'";

        const instance = bindCurl(axios.create({ baseURL: 'https://pokeapi.co/api/v2' }));

        await instance.get('/berry-flavor/1');

        assert(instance.curl === expected, 'O curl [6] gerado ficou diferente');
    });

    it('[7] should generate curl from POST with auth and content type text', async () => {

        var command = '';
        const expected = `curl 'https://jsonplaceholder.typicode.com/posts' -X POST -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: application/text' -H 'Authorization: Bearer token...' --data-raw '{"userName":"sample"}'`;
        const instance = axios.create();
        const callback = (cmd: string) => command = cmd;

        instance.interceptors.request.use((req) => curlInterceptor(req, callback));

        await instance.post('https://jsonplaceholder.typicode.com/posts', { userName: 'sample' },
            {
                headers: {
                    'Content-Type': 'application/text',
                    'Authorization': 'Bearer token...'
                }
            }
        );

        assert(command === expected, 'O curl [7] gerado ficou diferente');
    });
});
