import axios from 'axios';

const IP_ADDRESS = '';
/*
Você pode trocar o endereço e a porta acima pelo IP 
do servidor/computador, localizado no projeto "server" no arquivo "server.tsx".
Não pode ser "localhost", o emulador/dispositivo não reconhece "localhost", apenas o IP.
*/

const api = axios.create({
    baseURL: IP_ADDRESS 
});

export default api;