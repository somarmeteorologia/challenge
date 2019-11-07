[![Build Status](https://travis-ci.org/gbbocchini/challengeMet.svg?branch=master)](https://travis-ci.org/gbbocchini/challengeMet)



# Challenge Somar Meteorologia
API RESTFUL com Swagger, feita em Flask e library Flask-RestPlus. Endpoints buscam dados meteorologicos observados e 
previsoes advindas de arquivos ```.CSV``` fornecidos no repo original.


## Estrutura do projeto
Esta versao trata-se da implementaçao "serverless" do app utilizando Zappa (https://www.zappa.io/) e infraestrutura AWS:
S3, Lambda, API Gateway e CloudFront.

Eu tento sempre seguir os conceitos de "clean code" do Uncle Bob, portanto o que refatorei em relaçao ao codigo inicialmente
comitado aqui no branch foram as funçoes da pasta ```repository```. Testes passando 100% conforme escritos inicialmente.

Uma versao live podera ser encontrada em: https://r3tbp4duud.execute-api.us-east-1.amazonaws.com/dev


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


