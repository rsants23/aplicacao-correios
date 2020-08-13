# Aplicação Correios

O projeto é construido com uma aplicação em ReactJS para o Front-End e uma API em Laravel para atuar no Back-End. Fazendo assim possível gerir produtos, pedidos e cotações de frete para o transporte deste produto para seus determinados CEP's.

# Requisitos

# Front
- ReactJS
- Gerir produtos
- Gerir pedidos
- Cotar frete em 2 opções.

# Back

- API em Laravel
- Listar e gerir produtos
- Listar e gerir pedidos
- Criar cotações na API externa dos Correios

# Construção

- [React](https://pt-br.reactjs.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [PHP 7.x](https://www.php.net)
- [Laravel 7.x](https://laravel.com)
- [MySQL](https://www.mysql.com)

# Execução

git clone https://github.com/ValdirJunior/seller-project.git

## Front

cd teste-web-react
npm install
yarn start

## Back

cd teste-api
composer install
msql>create database teste
#adicionar ao .env os dados corretos de conexão com o banco
php artisan migrate
php artisan serve

## API

## Criar produto

*Endpoint:*
/products

*Metodo:*
Post

*Parâmetros:*
'name','width','length','height','weight'

*Resposta:*
```json
{
    "success":true
    data:[
        "id":1,
        "name":"Relógio",
        "width":20,
        "length":20,
        "height":2,
        "weight":1,
    ]
    "message": "Produtos criado com sucesso"
}
```
## Listar produtos

*Endpoint:*
'/products'

*Metodo:*
'Get'

*Resposta:*
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Relógio",
      "width": "20",
      "length": "20",
      "height": "2",
      "weight": "1"
    },
    {
      "id": 2,
      "name": "Pulseira",
      "width": "20",
      "length": "20",
      "height": "2",
      "weight": "1"
    }
    "message": "Produtos recuperados com sucesso"
}
```
##Criar pedido

*Endpoint:*
'/orders'

*Metodo:*
'Post'

*Parâmetros:*
'codeOrigin','codeDestiny','products_id'

*Resposta:*
```json
{
    "success": true,
    "data": [
        "id": 1,
        "codeOrigin": "12345678",
        "codeDestiny": "87654321",
        "products_id": 1,
    ],
    "message": "Pedido criado com sucesso"
}
```
##Listar pedidos

*Endpoint:*
'/orders'

*Metodo:*
'Get'

*Resposta:*
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "codeOrigin": "Relógio",
      "codeDestiny": "20",
      "products_id": "20"
    },
    {
      "id": 2,
      "codeOrigin": "Pulseira",
      "codeDestiny": "20",
      "products_id": "20"
    }
    "message": "Pedidos recuperados com sucesso"
}
```
##Realizar cotações


*Endpoint:*
'/quotations'

*Metodo:*
'Post'

*Parâmetros:*
'codeService','orders_id'

*Resposta:*
```json
{
  "success": true,
  "data": [
    {
      "codeService": "04510",
      "time": "8",
      "value": "15,70"
    }
    "message": "Cotação feita com sucesso"
}
```

