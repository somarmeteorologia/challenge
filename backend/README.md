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

### Modelo do json
Como é difícil encontrar um modelo de json que segue essa ideia vamos explicar um pouquinho como ele funciona e adicionar
 um exemplo:
```json
{
    "periods": [
        "2019-09-11 06:00",
        "2019-09-11 07:00",
        "2019-09-11 08:00",
        "2019-09-11 09:00",
        "2019-09-11 10:00",
        "2019-09-11 11:00",
        "2019-09-11 12:00",
        "2019-09-11 13:00",
        "2019-09-11 14:00",
        "2019-09-11 15:00",
        "2019-09-11 16:00",
        "2019-09-11 17:00"
    ],
    "points": {
        "location": {
            "latitude": -23.54,
            "longitude": -46.63,
            "elevation": 626,
            "sunrise": "06:07",
            "sunset": "17:59",
            "timezone": -3,
            "ref": "None"
        },
        "observed": {
            "precipitation": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "temperature": [
                21.399999618530273,
                20.799999237060547,
                20.100000381469727,
                19.899999618530273,
                21.200000762939453,
                23.399999618530273,
                26.299999237060547,
                29.700000762939453,
                30.899999618530273,
                31.899999618530273,
                33.20000076293945,
                33.099998474121094
            ],
            "rel_humidity": [
                58.0,
                60.0,
                63.0,
                66.0,
                63.0,
                52.0,
                41.0,
                31.0,
                28.0,
                24.0,
                24.0,
                21.0
            ],
            "wind_speed": [
                0.10000000149011612,
                0.20000000298023224,
                0.20000000298023224,
                0.20000000298023224,
                0.4000000059604645,
                1.7000000476837158,
                1.399999976158142,
                2.0,
                2.299999952316284,
                1.600000023841858,
                1.2999999523162842,
                1.2999999523162842
            ],
            "wind_direction": [
                279,
                288,
                246,
                197,
                50,
                173,
                26,
                132,
                67,
                336,
                39,
                113
            ],
            "wind_gust": [
                2.0999999046325684,
                1.5,
                1.7999999523162842,
                1.2999999523162842,
                1.899999976158142,
                3.5,
                3.5999999046325684,
                4.099999904632568,
                5.699999809265137,
                5.099999904632568,
                5.099999904632568,
                4.599999904632568
            ],
            "pressure": [
                1014,
                1014,
                1014,
                1015,
                1015,
                1014,
                1014,
                1012,
                1011,
                1010,
                1009,
                1008
            ]
        }
    },
    "meta": {
        "updated_at": "2019-09-11 17:42",
        "units": {
            "precipitation": "mm.period",
            "temperature": "C",
            "humidity": "%",
            "wind_speed": "m/s",
            "wind_direction": "deg",
            "pressure": "hpa"
        }
    }
}
```

Quando você realiza a transposição para tabela a relação que deve ser respeita é a posição que você se encontra dentro
 da chave `periods` para as demais, por exemplo:
 - `"2019-09-11 06:00" ["periods"][0] >> ["temperature"][0]: 21.399999618530273`
 - `"2019-09-11 16:00" ["periods"][10] >> ["pressure"][10]: 1009`


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
    <img src="/backend/challenge-accepted.png" alt="Challenge Accepted">
</p>