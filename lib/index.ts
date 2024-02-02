import { Axios, AxiosRequestConfig, AxiosStatic, InternalAxiosRequestConfig } from 'axios';

/**
 * Represents the Axios library.
 * @typedef {import('axios').Axios} Axios
 */

/**
 * Represents the Axios request configuration.
 * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
 */

/**
 * Represents the Axios static class.
 * @typedef {import('axios').AxiosStatic} AxiosStatic
 */

/**
 * Represents the internal Axios request configuration.
 * @typedef {import('axios').InternalAxiosRequestConfig} InternalAxiosRequestConfig
 */

/**
 * Generates a cURL command from the provided Axios request configuration.
 *
 * @param {AxiosRequestConfig} options - The Axios request configuration.
 * @returns {string} - The generated cURL command.
 */
function generateCurlCommand(options: AxiosRequestConfig): string {
    let curlCommand = 'curl';

    if (options.params) {
        const search = new URLSearchParams(options.params);
        const params = search.toString();
        curlCommand += ` '${options.url}?${params}'`;
    } else {
        curlCommand += ` '${options.url}'`;
    }

    curlCommand += ` -X ${options.method!.toUpperCase()}`;

    if (options.headers) {
        for (const [key, value] of Object.entries(options.headers)) {
            if (value !== undefined) {
                curlCommand += ` -H '${key}: ${value}'`;
            } else {
                curlCommand += ` -H '${key}: '`;
            }
        }
    }

    if (options.baseURL) {
        curlCommand += ` --url '${options.baseURL}'`;
    }

    if (options.data) {
        curlCommand += ` --data-raw '${JSON.stringify(options.data)}'`;
    }

    if (options.auth) {
        const { username, password } = options.auth;
        if (username && password) {
            curlCommand += ` --user '${username}:${password}'`;
        }
    }

    return curlCommand;
}

/**
 * Interceptor para gerar comandos cURL a partir de requisições Axios.
 *
 * @param {IInternalAxiosRequestConfig<any>} req - Configuração da requisição Axios.
 * @param {(curl: string) => void} [callback] - Função de retorno de chamada para manipular o comando cURL gerado.
 * @returns {void}
 */
export function curlInterceptor(req: InternalAxiosRequestConfig<any>, callback?: (curl: string) => void) {
    const params: AxiosRequestConfig = {
        baseURL: req.baseURL,
        method: req.method!,
        headers: req.headers,
        data: req.data,
        url: req.url!,
        auth: req.auth,
        params: req.params
    };
    const curlCommand = generateCurlCommand(params);

    if (typeof callback === 'function') {
        callback(curlCommand);
    } else {
        print(curlCommand);
    }
    return req;
};

function print (curlCommand: string): void {
    const occurredAt = new Date().toISOString();
    console.log({ occurredAt, curlCommand });
}

/**
 * Binds cURL functionality to an Axios instance or Axios static.
 *
 * @param {Axios | AxiosStatic} axios - The Axios instance or Axios static to bind cURL functionality.
 * @returns {Axios & { curl: string }} - The Axios instance with an additional 'curl' property.
 */
export function bindCurl(axios: Axios | AxiosStatic): Axios & { curl: string } {
    const axiosCurl = { ...axios, curl: '' };
    const callback = (curl: string) => {
        axiosCurl.curl = curl;
        print(curl);
    }
    axiosCurl.interceptors.request.use((req) => curlInterceptor(req, callback));
    return axiosCurl as Axios & { curl: string };
}

export default { bindCurl, curlInterceptor };
