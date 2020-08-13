import React, { Component } from "react";

import OrdersDataService from "../services/order.service";
import ProductsDataService from "../services/product.service";
import { Form } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class OrdersAdd extends Component {
    constructor(props) {
        super(props);
        this.onChangeCodeOrigin = this.onChangeCodeOrigin.bind(this);
        this.onChangeCodeDestiny = this.onChangeCodeDestiny.bind(this);
        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
        this.getProducts = this.getProducts.bind(this);

        this.state = {
            codeOrigin: "",
            codeDestiny: "",
            products_id:"",
            products: [],
        };

            
       
    }
    componentDidMount() {
        this.getProducts()
    }

    onChangeCodeOrigin(e) {
        this.setState({
            codeOrigin: e.target.value,
        });
        console.log(this.state);
    }
    onChangeCodeDestiny(e) {
        console.log(e);
        this.setState({
            codeDestiny: e.target.value,
        });
        console.log(this.state);
    }
    onChangeProduct(e) {
        this.setState({
            products_id: e.target.value,
        });
        console.log(this.state);
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

    saveOrder(e) {

        e.preventDefault();

        console.log(this.state);

        this.setState({
            message: "",
        });

        var data = {
            codeOrigin: this.state.codeOrigin,
            codeDestiny: this.state.codeDestiny,
            products_id: this.state.products_id,
        };

        OrdersDataService.create(data)
            .then(response => {
                this.props.history.push("/orders");
                window.location.reload();
            })
            .catch(e => {
                const resMessage = 
                    (e.response &&
                        e.response.data &&
                        e.response.data.message) ||
                    e.message ||
                    e.toString();

                this.setState({
                    message: resMessage,
                    loading: false,
                });

                console.log(e);
            });
    }

    render() {
        const { products } = this.state;
        return (
            <Container fluid style={{marginTop:'2%'}}>
                <Row className="justify-content-md-center">
                    <Card className="text-center mr-3" style={{ width: '50%', padding:'1%'}}>
                        <Card.Body>
                            <Row className="justify-content-md-center">
                                <Card.Title style={{ paddingBottom:'2%'}}>Criar Pedido</Card.Title>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Form>
                                    <Row style={{ padding:'3%'}}>
                                        <Col controlId="formBasicEmail">
                                            <Form.Label>CEP de Origem</Form.Label>
                                            <Form.Control type="number" placeholder="Informe um CEP" value={this.state.codeOrigin} onChange={this.onChangeCodeOrigin}/>
                                        </Col>
                                        <Col>
                                            <Form.Label>CEP de Destino</Form.Label>
                                            <Form.Control type="number" placeholder="Informe um CEP" value={this.state.codeDestiny} onChange={this.onChangeCodeDestiny}/>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-md-center" style={{ padding:'3%'}}>
                                        <Form.Label>Produto</Form.Label>
                                        <Form.Control as="select" onChange={this.onChangeProduct}>
                                        {products &&
                                            products.map((product, index) => (
                                             <option value={product.id} key={index} >{product.name}</option>
                                             ))}
                                        </Form.Control>
                                    </Row>
                                    <Row className="justify-content-md-center" style={{ padding:'3%'}}> 
                                        <Col>
                                            <Button variant="danger" color="secondary" href="/orders">Voltar</Button>
                                        </Col>
                                        <Col>
                                            <Button variant="primary" onClick={this.saveOrder}>Cadastrar</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Row>
                        </Card.Body>

                    </Card>
                </Row>
            </Container>
         );
     }
    
}