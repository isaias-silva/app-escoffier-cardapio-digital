  <h1>Escoffier API</h1>
  <p>A API Escoffier é um sistema de gerenciamento de cardápios desenvolvido com TypeScript, NestJS, MongoDB (Prisma ORM) e Redis.</p>

  <h2>Instalação e Execução</h2>
  <ol>
    <li>Clone o repositório do projeto.</li>
    <li>Navegue até o diretório raiz do projeto.</li>
    <li>Crie um arquivo <code>.env</code> na raiz do projeto com as seguintes variáveis de ambiente:</li>
  </ol>

  <pre>
# API
PORT=porta onde a api irá ficar disponível
SECRET=string responsavel pela geração de jsonwebtokens

# Redis
REDIS_HOST=host do redis
REDIS_PORT=porta onde o redis ficará disponível
REDIS_PASS=senha do redis

# Gmail OAuth2
OAUTH_CLIENT_MAIL=email do usuario oauth2
OAUTH_CLIENTID=id do usuario oauth2
OAUTH_CLIENT_SECRET= codigo secreto do oauth2
OAUTH_REFRESH_TOKEN= refresh token do usuário oauth2

# Prisma MongoDB
DATABASE_URL=url do banco de dados mongodb

# Frontend
FRONT_LINK=link do frontend
  </pre>

  <ol start="4">
    <li>Instale as dependências do projeto com o comando:</li>
  </ol>

  <pre>
yarn install
  </pre>

  <ol start="5">
    <li>inicie o prismaORM:</li>
  </ol>

  <pre>
yarn db-pull
  </pre>


  <ol start="6">
    <li>Execute a API com o comando:</li>
  </ol>

  <pre>
yarn start
  </pre>

  <h2>Contribuindo</h2>
  <p>Por favor, leia o guia de contribuição antes de criar uma issue ou enviar um pull request.</p>

  <h2>Licença</h2>
  <p>Este projeto é licenciado sob a Licença MIT - veja o arquivo <a href="LICENSE">LICENSE</a> para mais detalhes.</p>
</body>
</html>