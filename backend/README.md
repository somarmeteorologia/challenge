- Estrutura
Temos dois arquivos e uma pasta: A pasta data com os arquivos.csv do desafio, app.py
onde temos a aplicação rodando em flask e graphqlConsumer herdando o nome de
 uma das especificações do desafio anterior.

-Optei por fazem em Flask como nas recomendações por acreditar ser a forma mais simples
de atacar o problema usando Python. O desafio serviu de grande aprendizado e praticamente
todas as ferramentas que utilizei eu aprendi para o desafio.
OS - foi usado para acessar os arquivos ao inves de usar uma database.
Pandas - Usado para a extração dos dados
Cerberus - Validação dos dados
Graphene - Implementação do servidor GraphQL feita a posteriori.

Como usar :
  A aplicação em Flask tem dois endpoints : '/' e '/graphql'
  No primeiro, pode ser feito query utilizando ?query="{}". Um exemplo deste
  dicionário a ser enviado como string é apresentado em '/'.

  Mas a interface grafíca do graphql está habilitada e pode ser usada com muita mais
  facilidade em '/graphql'

  É necessario que a pasta 'data' esteja junto aos arquivos.py.

Deploy no aws beanstalk : http://challenge-enviroment.eba-mmufkdyp.sa-east-1.elasticbeanstalk.com

Próximos passos :
 CircleCI
