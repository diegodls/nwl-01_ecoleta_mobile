# nwl-01_ecoleta_mobile
Projeto desenvolvido na Next Week Level pela RocketSeat.

# :question: Por quê? 
Aplicativo desenvolvido em React Native utilizando Typescrypt localizar os pontos de coleta do sistema Ecoleta, podendo localizar por cidade, verificar a localidade, os items que o ponto recebe e as informações como email ou whatsapp </br>

# :camera: Screenshot
![Screenshot](https://github.com/diegodls/nwl-01_ecoleta_mobile/blob/asset/mobile_asset_git.png?raw=true)</br>

# :rocket: Iniciando
Para executar esse aplicativo, você deverá:

* Clonar o repositório com o comando `git clone` ([veja mais](https://help.github.com/pt/github/creating-cloning-and-archiving-repositories/cloning-a-repository)), ou fazer o download.
* Abra um prompt de comando (famoso cmd/terminal) na pasta raiz ou navegue até ela, e insira o comando `npx isntall` ou `npm install` ou `yarn install`, dependendo do gerenciador de pacotes que você usa, este comando serve para instalar os pacotes/módulos utilizado nesse projeto
* Abra o arquivo `AndroidManifest.xml`(\android\app\src\main\) e insira sua [API_KEY ](https://developers.google.com/maps/documentation/javascript/get-api-key), se não o mapa não irá funcionar.
* Antes de executar esse aplicativo, você deverá primeiro configurar a parte do servidor e deixa-lo executando, você pode obtê-lo logo abaixo.
* Após configurar corretamente o servidor (abaixo), você já pode iniciar o servidor com o comando `yarn android` ou `react-native run-android` ou `npx react-native run-android` (troque o android por ios, se for o caso), dependendo do gerenciador de pacotes que você usa, este comando serve para instalar o projeto no emulador/dispositivo.

# :hammer: Aplicativos
Fazem parte deste projeto os seguintes aplicativos: </br>
[Server](https://github.com/diegodls/nwl-01_ecoleta_server) - Desenvolvido utilizando Typescript.</br>
[Web](https://github.com/diegodls/nwl-01_ecoleta_web) - Desenvolvido em ReactJS, utilizando Typescript.

# :nut_and_bolt: Módulos
Neste projeto foram utilizado os seguintes módulos:</br>
[@react-navigation/native](https://reactnavigation.org/) - *Criação de rotas e navegação entre telas*</br>
[@react-navigation/stack](https://reactnavigation.org/docs/stack-navigator/) - *Navegação entre telas no formato pilha*</br>
[react-native-vector-icons](https://oblador.github.io/react-native-vector-icons/) - *Pacote com icones*</br>
[react-native-maps](https://github.com/react-native-community/react-native-maps) - *Componente para o uso de mapas*</br>
[react-native-svg](https://github.com/react-native-community/react-native-svg) - *Suporte para o uso de SVG*</br>
[axios](https://github.com/axios/axios) - *Cliente HTTP para comunicação com a API/Servidor*</br>
[react-native-location](https://github.com/timfpark/react-native-location) - *Suporte nativo ao GPS*</br>
[@react-native-community/picker](https://github.com/react-native-community/react-native-picker) - *Componente de seleção*</br>
**E todas as dependências desses módulos que estão presentes em suas respectivas paginas.**

# :clap: Agradecimentos
Agradecimentos a todos os desenvolvedores dos módulos acima e a equipe RocketSeat.

# :rotating_light: Notas/Problemas
Me diga =)

# :warning: Licença
Você pode usar este aplicativos para estudos, e apenas para estudo, está proibido a sua publicação ou apropriação do código.
