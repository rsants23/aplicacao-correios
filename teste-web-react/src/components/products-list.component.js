import React, { Component } from "react";
import ProductsDataService from "../services/product.service";

import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';

export default class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.getProducts = this.getProducts.bind(this);
        this.deleteProducts = this.deleteProducts.bind(this);

        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts() {
        ProductsDataService.getAll()
        .then(response => {
            this.setState({
                products: response.data.data
            });
        })
        .catch(e => {

            console.log(e);
        })
        
    }

    deleteProducts(id) {

        this.setState({
            message: "",
        });

        ProductsDataService.delete(id).then(
            response => {
                this.getProducts();
            },
            error => {
                const resMessage = 
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    message: resMessage,
                });
            }
        )
    }

    render() {
        const { products } = this.state;

        return (
            <Container fluid style={{marginTop:'2%'}}>
                <Row className="justify-content-md-center">
                <Card className="text-center mr-3" style={{ width: '90%', padding:'1%'}}>
                    <Card.Body>
                        <Row className="justify-content-md-center">
                            <Card.Title style={{ paddingBottom:'2%'}}>Produtos</Card.Title>
                        </Row>
                        <Row style={{paddingBottom:'2%'}}>
                            <Button variant="primary" href="/products/add">Novo Produto</Button>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Table aria-label="customized table">
                                <thead>
                                    <tr>
                                        <th align="center">ID</th>
                                        <th align="center">Nome</th>
                                        <th align="center">Largura</th>
                                        <th align="center">Comprimento</th>
                                        <th align="center">Altura</th>
                                        <th align="center">Peso</th>
                                        <th align="center">Excluir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products &&
                                        products.map((product, index) => (
                                        <tr key={index}>
                                            <th align="center">{product.id}</th>
                                            <th align="center">{product.name}</th>
                                            <th align="center">{product.width}</th>
                                            <th align="center">{product.length}</th>
                                            <th align="center">{product.height}</th>
                                            <th align="center">{product.weight}</th>

                                            <th align="center">
                                                <Button variant="danger" onClick={() => this.deleteProducts(product.id)}>Excluir</Button>
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </Card.Body>
                </Card>
                </Row>
            </Container>
        );
    }
    
}