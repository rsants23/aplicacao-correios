import React, { Component } from "react";


import QuotationsDataService from '../services/quotations.service';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';


export default class QuotationsView extends Component {
    constructor(props) {
        super(props);
        this.onChangeQuotations = this.onChangeQuotations.bind(this);

        this.state = {
            pac:[],
            sedex:[],
        };       
    }

    componentDidMount() {
        this.onChangeQuotations()
    }
    
    onChangeQuotations() {
        this.setState({
            message:"",
        });
        var data={
            order_id:this.props.match.params.id,
            codeService:"04510"

        };
        QuotationsDataService.consult(data).then(
            response => {
                this.setState({
                    pac: response.data.data
                });
            }
        ).catch(e => {

            console.log(e);
        });

        data ={
            order_id:this.props.match.params.id,
            codeService:"04014"
        };
        QuotationsDataService.consult(data).then(
            response => {
                this.setState({
                    sedex: response.data.data
                });
            }
        ).catch(e => {

            console.log(e);
        });
    }

    render() {
        const { pac } = this.state;
        const { sedex } = this.state;
        return (
            <Container fluid style={{marginTop:'3%'}}>
                <Row className="justify-content-md-center">
                <Card className="text-center mr-3" style={{ width: '90%', padding:'1%'}}>
                    <Card.Body>
                        <Row className="justify-content-md-center">
                            <Card.Title style={{ paddingBottom:'2%'}}>Cotação</Card.Title>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Table aria-label="customized table">
                                <thead>
                                    <tr>
                                        <th align="center">Código Serviço</th>
                                        <th align="center">Serviço</th>
                                        <th align="center">Preço</th>
                                        <th align="center">Prazo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th align="center">{pac.codeService}</th>
                                        <th align="center">PAC</th>
                                        <th align="center">R${pac.value}</th>
                                        <th align="center">{pac.time} dias</th>
                                    </tr>
                                    <tr>
                                        <th align="center">{sedex.codeService}</th>
                                        <th align="center">SEDEX</th>
                                        <th align="center">R${sedex.value}</th>
                                        <th align="center">{sedex.time} dias</th>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                        <Button href="/orders" variant="info">Voltar</Button>
                    </Card.Body>
                </Card>
                </Row>
            </Container>
         );
     }
    
}