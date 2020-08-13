<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        // $orders = Orders::all();
        $orders = DB::table('orders')
                        ->select('orders.id','orders.codeOrigin','orders.codeDestiny','orders.products_id','products.name')
                        ->leftJoin('products','orders.products_id','=','products.id')
                        ->groupBy('orders.id')
                        ->get();

        $code = 200;
        $response['success'] = true;
        $response['data'] = $orders;
        $response['message'] = 'Pedidos recuperados com sucesso';

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
            'products_id' => 'required',
            'codeOrigin' => 'required',
            'codeDestiny' => 'required',
        ]);

        if($validator->fails())
        {
            $code = 404;
            $response['success'] = false;
            $response['data'] = $validator->errors();
            $response['message'] = 'Erro ao criar Pedido';
            return response()->json($response, $code);
        }
        
        $order = Orders::create($data);

        $code = 201;
        $response['success'] = true;
        $response['data'] = $order;
        $response['message'] = 'Pedido criado com sucesso';

        return response()->json($response, $code);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Orders  $order
     * @return \Illuminate\Http\Response
     */

    public function show(Orders $order)
    {
        $code = 200;
        $response['success'] = true;
        $response['data'] = $order;
        $response['message'] = 'Produto recuperado com sucesso';

        return response()->json($response, $code);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Orders  $order
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, Orders $order)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'products_id' => 'required',
            'codeOrigin' => 'required',
            'codeDestiny' => 'required',
        ]);

        if($validator->fails())
        {
            $code = 404;
            $response['success'] = false;
            $response['data'] = $validator->errors();
            $response['message'] = 'Erro ao atualizar pedido';

            return response()->json($response, $code);
        }

        $order->update($data);

        $code = 204;

        return response()->json(null, $code);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Orders  $order
     * @return \Illuminate\Http\Response
     */

    public function delete(Orders $order)
    {
        $order->delete();
        
        $code = 204;

        return response()->json(null, $code);
    }
}