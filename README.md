# Front End Challenge

## Como participar
1. Crie um novo fork e branch com seu nome-sobrenome e faça um pull request quando estiver pronto.
2. Envie um email para challenge@somar.io para marcarmos uma conversa e fornecermos para você um token de uso da nossa API.

## Sobre o challenge

É claro que, além de uma boa conversa que queremos ter com você, estamos disponibilizando esse pequeno challenge onde queremos observar um pouco do seu comprometimento técnico, como, boas práticas na implementação, organização do projeto, performance, testes e é claro, resolver o problema proposto.

Os dados do propótipo são apenas ilustrativos, os reais você poderá obter na nossa API Nimbus que iremos-lhe fornecer o token de uso.

Fique a vontade para fazer a implementação estética como quiser, utilizando alguma UI library ou também algo para o gráfico.

O **APP Minha Semana** se consiste nos seguintes passos,
- Pedir as informações da semana atual com base na latitude e longitude para a Nimbus
- Exibir os seguintes dados em uma tabela, **temperatura máxima**, **temperatura mínima** e **média de humidade** de cada dia
- Exibir os mesmos dados em um gráfico de linha e barras.

**Quanto a exibição na tabela**
- A primeira linha da tabela, **temperatura máxima**
- Já na segunda linha, **temperatura mínima**
- Por último, representa a **média de humidade**

**Quanto a exibição no gráfico**
- Na linha em vermelho é a **temperatura máxima**
- Em ciano, **temperatura mínima**
- Barras em azul, **média de humidade**.

## Consumindo a API
[Aqui você encontra mais informações](https://doc.nimbus.somar.io/#introduction) sobre a Nimbus, nesse momento iremos utilizar para o challenge apenas os recursos de `forecast` e `observed`.

- Para **temperatura máxima**, consumindo da `forecast` utilizar propriedade `temperature_daily_max` e na `observed` utilizar `max_temperature`
- Para **temperatura mínima**, consumindo da `forecast` utilizar propriedade `temperature_daily_min` e na `observed` utilizar `min_temperature`
- Para **média de humidade**, consumindo da `forecast` utilizar propriedade `rel_humidity_daily_avg` e na `observed` é necessário somar as propriedades `max_rel_humidity` e `min_rel_humidity` e dividir por dois.



### APP Minha Semana
<img src="https://i.imgur.com/IFVoz14.png"/>

[Acesse aqui o protótipo.](https://www.figma.com/file/QflwpTxjCgrYd3akVjOheq/Challenge?node-id=7753%3A4396)
