<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $products = Products::all();

        $code = 200;
        $response['success'] = true;
        $response['data'] = $products;
        $response['message'] = 'Produtos recuperados com sucesso';

        return response()->json($response);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        $data = $request->all();
        

        $validator = Validator::make($data, [
            'name' => 'required',
            'width' => 'required',
            'length' => 'required',
            'height' => 'required',
            'weight' => 'required',
        ]);

        if($validator->fails())
        {
            $code = 404;
            $response['success'] = false;
            $response['data'] = $validator->errors();
            $response['message'] = 'Erro ao criar produto';
            return response()->json($response, $code);
        }
        
        $product = Products::create($data);

        $code = 201;
        $response['success'] = true;
        $response['data'] = $product;
        $response['message'] = 'Produto criado com sucesso';

        return response()->json($response, $code);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Products  $product
     * @return \Illuminate\Http\Response
     */

    public function show(Products $product)
    {
        $code = 200;
        $response['success'] = true;
        $response['data'] = $product;
        $response['message'] = 'Produto recuperado com sucesso';

        return response()->json($response, $code);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Products  $product
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, Products $product)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'name' => 'required',
            'width' => 'required',
            'length' => 'required',
            'height' => 'required',
            'weight' => 'required',
        ]);

        if($validator->fails())
        {
            $code = 404;
            $response['success'] = false;
            $response['data'] = $validator->errors();
            $response['message'] = 'Erro ao atualizar produto';

            return response()->json($response, $code);
        }

        $product->update($data);

        $code = 204;

        return response()->json(true, $code);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Products  $product
     * @return \Illuminate\Http\Response
     */

    public function delete(Products $product)
    {
        $product->delete();
        
        $code = 204;

        return response()->json(null, $code);
    }
}