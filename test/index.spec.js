"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const node_test_1 = require("node:test");
const lib_1 = require("../lib");
const node_assert_1 = __importDefault(require("node:assert"));
(0, node_test_1.describe)('curl-generator', () => {
    (0, node_test_1.it)('[1] should generate curl from simple GET', async () => {
        var command = '';
        const expected = "curl 'https://pokeapi.co/api/v2/berry-flavor/1' -X GET -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: '";
        const instance = axios_1.default.create();
        const callback = (cmd) => command = cmd;
        instance.interceptors.request.use((req) => (0, lib_1.curlInterceptor)(req, callback));
        await instance.get('https://pokeapi.co/api/v2/berry-flavor/1');
        (0, node_assert_1.default)(command === expected, 'O curl [1] gerado ficou diferente');
    });
    (0, node_test_1.it)('[2] should generate curl from GET with params', async () => {
        var command = '';
        const expected = "curl 'https://pokeapi.co/api/v2/berry-flavor/1?animal=berry' -X GET -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: '";
        const instance = axios_1.default.create();
        const callback = (cmd) => command = cmd;
        instance.interceptors.request.use((req) => (0, lib_1.curlInterceptor)(req, callback));
        await instance.get('https://pokeapi.co/api/v2/berry-flavor/1', {
            params: { animal: 'berry' }
        });
        (0, node_assert_1.default)(command === expected, 'O curl [2] gerado ficou diferente');
    });
    (0, node_test_1.it)('[3] should generate curl from GET with auth', async () => {
        var command = '';
        const expected = "curl 'https://pokeapi.co/api/v2/berry-flavor/1' -X GET -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: ' --user 'berry:12345'";
        const instance = axios_1.default.create();
        const callback = (cmd) => command = cmd;
        instance.interceptors.request.use((req) => (0, lib_1.curlInterceptor)(req, callback));
        await instance.get('https://pokeapi.co/api/v2/berry-flavor/1', {
            auth: { username: 'berry', password: '12345' }
        });
        (0, node_assert_1.default)(command === expected, 'O curl [3] gerado ficou diferente');
    });
    (0, node_test_1.it)('[4] should generate curl from POST with auth', async () => {
        var command = '';
        const expected = `curl 'https://jsonplaceholder.typicode.com/posts' -X POST -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: application/json' -H 'Authorization: Bearer token...' --data-raw '{"userName":"sample"}'`;
        const instance = axios_1.default.create();
        const callback = (cmd) => command = cmd;
        instance.interceptors.request.use((req) => (0, lib_1.curlInterceptor)(req, callback));
        await instance.post('https://jsonplaceholder.typicode.com/posts', { userName: 'sample' }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer token...'
            }
        });
        (0, node_assert_1.default)(command === expected, 'O curl [4] gerado ficou diferente');
    });
    (0, node_test_1.it)('[5] should generate curl from GET using baseURL', async () => {
        var command = '';
        const expected = "curl '/berry-flavor/1' -X GET -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: ' --url 'https://pokeapi.co/api/v2'";
        const instance = axios_1.default.create({ baseURL: 'https://pokeapi.co/api/v2' });
        const callback = (cmd) => command = cmd;
        instance.interceptors.request.use((req) => (0, lib_1.curlInterceptor)(req, callback));
        await instance.get('/berry-flavor/1');
        (0, node_assert_1.default)(command === expected, 'O curl [5] gerado ficou diferente');
    });
    (0, node_test_1.it)('[6] should generate curl from GET using baseURL', async () => {
        const expected = "curl '/berry-flavor/1' -X GET -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: ' --url 'https://pokeapi.co/api/v2'";
        const instance = (0, lib_1.bindCurl)(axios_1.default.create({ baseURL: 'https://pokeapi.co/api/v2' }));
        await instance.get('/berry-flavor/1');
        (0, node_assert_1.default)(instance.curl === expected, 'O curl [6] gerado ficou diferente');
    });
});
