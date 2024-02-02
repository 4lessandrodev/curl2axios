import { Axios, AxiosStatic, InternalAxiosRequestConfig } from 'axios';
/**
 * Interceptor para gerar comandos cURL a partir de requisições Axios.
 *
 * @param {IInternalAxiosRequestConfig<any>} req - Configuração da requisição Axios.
 * @param {(curl: string) => void} [callback] - Função de retorno de chamada para manipular o comando cURL gerado.
 * @returns {void}
 */
export declare function curlInterceptor(req: InternalAxiosRequestConfig<any>, callback?: (curl: string) => void): InternalAxiosRequestConfig<any>;
/**
 * Binds cURL functionality to an Axios instance or Axios static.
 *
 * @param {Axios | AxiosStatic} axios - The Axios instance or Axios static to bind cURL functionality.
 * @returns {Axios & { curl: string }} - The Axios instance with an additional 'curl' property.
 */
export declare function bindCurl(axios: Axios | AxiosStatic): Axios & {
    curl: string;
};
declare const _default: {
    bindCurl: typeof bindCurl;
    curlInterceptor: typeof curlInterceptor;
};
export default _default;
