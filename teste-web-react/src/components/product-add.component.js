import React, { Component } from "react";

import ProductsDataService from "../services/product.service";

import { Form } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default class ProductsAdd extends Component {
    
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeWidth = this.onChangeWidth.bind(this);
        this.onChangeLength = this.onChangeLength.bind(this);
        this.onChangeHeight = this.onChangeHeight.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.saveProduct = this.saveProduct.bind(this);

        this.state = {
            name: "",
            width: "",
            length:"",
            height:"",
            weight:"",
        };
    }
    
    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }
    onChangeWidth(e) {
        this.setState({
            width: e.target.value,
        });
    }
    onChangeLength(e) {
        this.setState({
            length: e.target.value,
        });
    }
    onChangeHeight(e) {
        this.setState({
            height: e.target.value,
        });
    }
    onChangeWeight(e) {
        this.setState({
            weight: e.target.value,
        });
    }


    saveProduct(e) {
        e.preventDefault();

        console.log(this.state);

        this.setState({
            message: "",
        });

        var data = {
            name: this.state.name,
            width: this.state.width,
            length: this.state.length,
            height: this.state.height,
            weight: this.state.weight,
        };

        ProductsDataService.create(data)
            .then(response => {
                this.props.history.push("/products");
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
        
        return (

            <Container fluid style={{marginTop:'2%'}}>
                <Row className="justify-content-md-center">
                    <Card className="text-center mr-3" style={{ width: '50%', padding:'1%'}}>
                        <Card.Body>
                            <Row className="justify-content-md-center">
                                <Card.Title style={{ paddingBottom:'2%'}}>Criar Produto</Card.Title>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Form>
                                    <Row style={{ padding:'3%'}}>
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control type="text" placeholder="Nome do Produto" value={this.state.name} onChange={this.onChangeName}/>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Label>Comprimento</Form.Label>
                                            <Form.Control type="number" min="16" max="105" placeholder="Comprimento" value={this.state.length} onChange={this.onChangeLength}/>
                                        </Col>
                                        <Col>
                                            <Form.Label>Largura</Form.Label>
                                            <Form.Control type="number" min="11" max="105" placeholder="Largura" value={this.state.width} onChange={this.onChangeWidth}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Label>Altura</Form.Label>
                                            <Form.Control type="number" min="2" max="105" placeholder="Altura" value={this.state.height} onChange={this.onChangeHeight}/>
                                        </Col>
                                        <Col>
                                            <Form.Label>Peso</Form.Label>
                                            <Form.Control type="number" max="30" placeholder="Peso" value={this.state.weight} onChange={this.onChangeWeight}/>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-md-center" style={{ padding:'3%'}}> 
                                        <Col>
                                            <Button variant="danger" color="secondary" href="/products">Voltar</Button>
                                        </Col>
                                        <Col>
                                            <Button variant="primary" onClick={this.saveProduct}>Cadastrar</Button>
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