# Backend Challenge

## Como participar
Crie um novo fork e branch com seu nome-sobrenome e faça um pull request quando estiver pronto.

*Lembrando, valorizamos muito mais que você se preocupe com a qualidade e as melhores práticas do que o tempo de entrega
 do desafio, use o tempo que achar necessário pra se comprometer com o mesmo da melhor maneira.*

## Sobre o challenge
A finalidade do challenge é criar uma API REST que cumpra as seguintes especificações descritas abaixo:
 1. Todos os endpoints devem respeitar os seguintes possíveis argumentos de query:
    - Data da pesquisa
        - Data inicial e data final.
        - Dias, tomando como inicio o dia atual.
    - Local para a busca:
        - Latitude e Longitude
        - Cidade
 2. Deve conter ao menos os seguintes endpoints:
    - Previsão do tempo
    - Dados observados do tempo
 3. O metódo e nomenclatura de cada rota fica a sua escolha, porém devem ser explicitamente separadas.
 4. O retorno dos endpoints deve seguir o modelo abaixo:
    ```json
    {
      "periods": [],
      "points": {
        "location": {
          "latitude": "float",
          "longitude": "float",
          "elevation": "integer",
          "sunrise": "string",
          "sunset": "string",
          "timezone": "integer",
          "reference": "string"    
        },
        "data": {
          "precipitation": [],
          "temperature": [],
          "max_temperature": [],
          "min_temperature": [],
          "rel_humidity": [],
          "wind_speed": [],
          "wind_direction": [],
          "pressure": []
    }
      },
      "meta": {
        "updated_at": "string-ISODate",
        "units": {
          "precipitation": "mm",
          "temperature": "C",
          "humidity": "%",
          "wind_speed": "m/s",
          "wind_direction": "deg",
          "pressure": "hpa"    
        }
      }
    }
    ```
 5. Os dados para utilizar como base estão nas pastas do projeto, o nome do arquivo representa o 
 `NomeDaCidade-Latitude-Longitude`
 6. Se quiser faz um desafio bônus pode implementar um endpoint que receba multiplos pontos para pesquisa, por exemplo:
    `{"Cidade": ["SaoPaulo", "RioDeJaneiro"]}` e disponibilizar todos os valores na mesma resposta. 

Obs: Os arquivos estão congelados em um momento do tempo, sendo assim, lembre-se de validar essa condições.

## Recomendações
Utilize tecnologias disponíveis na AWS, tais como, API Gateway, Lambda Functions, DynamoDB, S3 e o que mais julgar 
necessário, só cuidado para não sair do freetier :see_no_evil:, ou se preferir pode fazer tudo usando flask e usar 
memória para guardar as informações.

Utilize o framework [Serverless](https://serverless.com/) para  facilitar a criação e controle da sua aplicação caso
utilize Lambda Functions para sua API.

## Requisitos
 - A aplicação deve ser implementada em Python e a descrição do projeto deve explicar todos os passos necessários para 
 executá-lo.
 - Caso haja testes unitários, também descrever como executá-los.
 - Uma seção dedicada para explicar as suas decisões de bibliotecas e arquitetura.
 - Uma exlicação da estrutura do repositório e o que se espera encontrar dentro de casa pasta.

### Seria legal ter
 - Relatório de cobertura dos testes unitários, contendo as linhas que não fazem parte da cobertura (não esqueça das 
 instruções de como gerar o relatório).
 - Utilização de [Travis CI](https://travis-ci.org/) e badge do status do build.
 - Ambiente funcional para consulta da API.
 - GraphQL :heart_eyes:


## O que nós gostamos
 - Performance e legibilidade de código, lembre-se que ambas podem e devem andar juntas.
 - CleanCode.
 - Swagger da aplicação.
 - Pipeline de deploy automatizada.
 - Diante de dúvidas sobre qual caminho seguir, lembre-se do Zen do Python.
 
## Critérios de avaliação
Iremos realizar o codereview em ao menos duas pessoas diferentes da Somar Meteorologa e os critérios que iremos considerar
são:
 - **Git**: Commits e organização das alterações realizadas - não é obrigatório multiplas branches, se julgar
 necessário fique a vontade.
 - **Organização do código**: Os escopos das funções estão bem definidos e simples?
 - **Objetividade**: O projeto ataca o proposta de forma simples e objetiva?
 - **Manutenibilidade**: Quão difícil é para outro desenvolvedor realizar alterações?

 ## Resultado
Assim que finalizarmos o code review iremos entrar em contato para marcarmos um papo, é bem melhor conversar com o 
desenvolvedor para explicar o seu próprio código. 

Se tiver vontade de aprimorar alguma característica do desafio fique a vontade.

**May the Force be with you!**

w6kgdW0gdGlwbyBkZSBudXZlbSBxdWUgY29icmUgdW1hIGFyZWEgZ3JhbmRlIGlndWFsIGVzc2UgcHJvamV0bwo

<p align="center">
  <img src="./challenge_accepted.jpg" alt="Challange Accepted" />
</p>