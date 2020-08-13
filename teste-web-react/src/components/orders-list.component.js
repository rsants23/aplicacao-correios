import React, { Component } from "react";
import OrderDataService from "../services/order.service";


import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';

export default class OrdersList extends Component {
    constructor(props) {
        super(props);
        this.getOrders = this.getOrders.bind(this);
        this.deleteOrders = this.deleteOrders.bind(this);

        this.state = {
            orders: [],
        };
    }

    componentDidMount() {
        this.getOrders()
    }

    getOrders() {
        OrderDataService.getAll()
        .then(response => {
            this.setState({
                orders: response.data.data
            });
        })
        .catch(e => {

            console.log(e);
        })
    }

    deleteOrders(id) {

        this.setState({
            message: "",
        });

        OrderDataService.delete(id).then(
            response => {
                this.getOrders();
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
        const { orders } = this.state;
        console.log(this.state);

        return (

            <Container fluid style={{marginTop:'2%'}}>
                <Row className="justify-content-md-center">
                    <Card className="text-center mr-3" style={{ width: '90%', padding:'1%'}}>
                        <Card.Body>
                            <Row className="justify-content-md-center">
                                <Card.Title style={{ paddingBottom:'2%'}}>Pedidos</Card.Title>
                            </Row>
                            <Row style={{paddingBottom:'2%'}}>
                                <Button variant="primary" href="/orders/add">Novo Pedido</Button>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Table aria-label="customized table">
                                    <thead>
                                        <tr>
                                            <th align="center">ID</th>
                                            <th align="center">CEP Origem</th>
                                            <th align="center">CEP Destino</th>
                                            <th align="center">Produto</th>
                                            <th align="center">Frete</th>
                                            <th align="center">Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders && orders.map((order, index) => (
                                            <tr key={index}>
                                                    <th align="center">{order.id}</th>
                                                    <th align="center">{order.codeOrigin}</th>
                                                    <th align="center">{order.codeDestiny}</th>
                                                    <th align="center">{order.name}</th>
                                                    <th align="center">
                                                        <Button variant="secondary" href={'/quotations/'+order.id}>Ver Frete</Button>
                                                    </th>
                                                    <th align="center">
                                                        <Button variant="danger" onClick={() => this.deleteOrders(order.id)}>Excluir</Button>
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