import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import ProductsList from "./components/products-list.component";
import OrdersList from './components/orders-list.component';
import ProductsAdd from './components/product-add.component';
import OrdersAdd from './components/orders-add.component';
import QuotationsView from './components/quotations-view.component.js';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';



function App() {

  return (
    <Router>
      <Navbar bg="dark" variant="dark" className="justify-content-center">
        <Nav className="flex-column flex-sm-column">
          <Navbar.Brand style={{ padding: '.5rem' }}>Teste Consultas</Navbar.Brand>
        </Nav>
      </Navbar>
      <Container fluid style={{marginTop:'1%'}}>
                <Row className="justify-content-md-center">
                <Card className="text-center mr-3" style={{ width: '90%', padding:'1%'}}>
                    <Card.Body>
                        <Row className="justify-content-md-center">
                            <Card.Title style={{ padding: '.5rem'}}>Bem-vindo, selecione uma opção.</Card.Title>
                        </Row>
                        <Row className="justify-content-md-center">
                          <Nav>
                            <Nav.Link href="/products">Produtos</Nav.Link>
                            <Nav.Link href="/orders">Pedidos</Nav.Link>  
                          </Nav>
                        </Row>
                    </Card.Body>
                </Card>
                </Row>
            </Container>
      <Switch>
        <Route exact path="/products" component={ProductsList} />
        <Route exact path="/products/add" component={ProductsAdd} />
        <Route exact path="/orders" component={OrdersList} />
        <Route exact path="/orders/add" component={OrdersAdd} />
        <Route exact path="/quotations/:id" component={QuotationsView} />
      </Switch>
    </Router>
  );
}

export default App;
