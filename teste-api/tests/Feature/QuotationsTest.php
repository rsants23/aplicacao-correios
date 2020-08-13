<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class QuotationsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testReleaseQuotations()
    {
        $response = $this->post('api/quotations',['order_id'=>1,'codeService'=>'04014']);

        $response->assertStatus(200);
        $response
            ->assertJson([
                'success' => true,
            ]);
    }

}
