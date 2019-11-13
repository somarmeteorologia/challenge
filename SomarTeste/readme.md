[![Build Status](https://travis-ci.org/gbbocchini/challengeMet.svg?branch=master)](https://travis-ci.org/gbbocchini/challengeMet)


# Challenge
API RESTFUL com Swagger, feita em Flask e library Flask-RestPlus. Endpoints buscam dados meteorologicos observados e 
previsoes advindas de arquivos ```.CSV``` fornecidos no repo original.


## Estrutura do projeto
Optei por fazer o projeto em Flask lendo informaçoes da memoria por questao de tempo. Como as informaçoes sao lidas
diretamente dos CSVs optei por: uma pasta "data" com todos os arquivos CSV (fonte dos dados), uma pasta ```repository``` 
apenas com objetos que fazem acesso e leitura de dados (todo e qualquer acesso aos arquivos CSV e feito somente
atraves das funçoes contidas em ```repository```). 

No arquivo ```app.py``` encontram-se todas as views e controlers devidamente separados e comentados. Obviamente que um 
projeto maior o mais prudente em termos de arquitetura seria separar em pastas views, controlers, models, etc. A opçao
de nao ter models tambem foi feita por questao de tempo e tambem devido a excelente capacidade do Python em lidar com
tabelas/arquivos ```.csv``` puros. As views e controlers sao testados atraves dos arquivos: ```forecast_test.py``` 
e ```observed_test.py``` no mesmo diretorio de app.py


## Execuçao local

- Clone este repositorio (```git clone ...```);
- Crie um Virtual Env em Python (```python3 -m venv venv```) e ative-o (```source venv/bin/activate```);
- Instale os requisitos necessarios para o projeto (```pip install -r requirements.txt```);
- Dentro do folder clonado: ```python app.py```
- Pronto!

Uma versao live podera ser encontrada em: https://somarapi.herokuapp.com/


## Testes

Os testes podem ser rodados com ```pytest -v``` dentro do folder clonado e cobrem todas as views bem como funçoes contidas 
na pasta repository. O repo github esta integrado com TravisCI (que alias: nunca tinha usado! Bem legal, ainda estou me entendendo
com ele!)

 
## Decisoes
Primeiramente pensei em fazer o desafio com Django e Django Rest FM, porem seria ficar em minha zona de conforto! :)
Decidi, entao, por fazer Flask lendo infos direto da memoria por nao conhecer o Lambda da AWS e API Gateway, porem, 
recentemente, na Python Brasil em Riberiao Preto, vi uma palestra bem interessante a respeito de
Lambda AWS + DynamoDB e API gateway! Quando tiver tempo, quero transportar esse projeto para la como implementaçao de estudo e com GraphQL
(que conheço muito pouco tambem: ja li artigos e tudo mais mas nunca implementei de fato).


Como dito acima, optei por nao fazer models propriamente pela excelente capacidade do Python em lidar com arquivos puros
```.CSV```, obviamente que um projeto grande e com um BD de fato, isso e impossivel de ser negligenciado assim como uma
melhor separaçao em termos de arquivos/estrutura de views, models e controlers (nao tudo dentro do ```app.py``` como fiz).
Com uma estrutura de dados mais robusta (como um BD produçao), o threading de processamento seria indispensavel em certas funçoes
bem como, a utilizaçao de funçoes ASYNC para chamada em APIs).

A library flask_restplus foi escolhida por ter uma integraçao excelente com Swagger e um sistema de parsing muito bom. 
A library webargs por facilitar a validaçao e parse de args e kwargs para urls.


