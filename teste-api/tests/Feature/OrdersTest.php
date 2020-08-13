<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OrdersTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testCreateProducts()
    {
        $response = $this->post('api/products/',['name'=>'Braçadeira','width'=>20,'length'=>20,'height'=>2,'weight'=>1]);

        $response->assertStatus(201);
        $response
            ->assertJson([
                'success' => true,
            ]);
    }

    public function testCreateOrders()
    {
        $response = $this->post('api/orders/',['codeOrigin'=>'17522660','codeDestiny'=>'19000123','products_id'=>1]);

        $response->assertStatus(201);
        $response
            ->assertJson([
                'success' => true,
            ]);
    }

    public function testGetOrders()
    {
        $response = $this->get('api/orders');

        $response->assertStatus(200);
        $response
            ->assertJson([
                'success' => true,
            ]);
    }

    public function testGetOrdesId()
    {
        $response = $this->get('api/orders/1');

        $response->assertStatus(200);
        $response
            ->assertJson([
                'success' => true,
            ]);
    }

    public function testUpdateOrders()
    {
        $response = $this->put('api/orders/1',['codeOrigin'=>'19000123','codeDestiny'=>'17525123','products_id'=>1]);

        $response->assertStatus(204);
    }

    public function testDeleteOrders()
    {
        $response = $this->delete('api/orders/1');

        $response->assertStatus(204);
    }
}
