<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductTest extends TestCase
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

    public function testGetProducts()
    {
        $response = $this->get('api/products');

        $response->assertStatus(200);
        $response
            ->assertJson([
                'success' => true,
            ]);
    }

    public function testGetProductsId()
    {
        $response = $this->get('api/products/1');

        $response->assertStatus(200);
        $response
            ->assertJson([
                'success' => true,
            ]);
    }


    public function testUpdateProducts()
    {
        $response = $this->put('api/products/1',['name'=>'CapaceteMuda','width'=>20,'length'=>20,'height'=>2,'weight'=>1]);

        $response->assertStatus(204);
    }

    public function testDeleteProducts()
    {
        $response = $this->delete('api/products/1');

        $response->assertStatus(204);
    }

}
