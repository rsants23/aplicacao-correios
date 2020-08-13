<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Quotations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;
use App\Http\Resources\QuotationsResources;

class QuotationsController extends Controller
{

    public function quotation(Request $request)
    {
        $data = $request->all();
        
        $validator = Validator::make($data, [
            'order_id' => 'required',
            'codeService' => 'required',
        ]);

        if($validator->fails())
        {
            $code = 404;
            $response['success'] = false;
            $response['data'] = $validator->errors();
            $response['message'] = 'Erro ao criar cotação';
            return response()->json($response, $code);
        }
        
        $order = DB::table('orders')
                    ->select('orders.id','orders.codeOrigin','orders.codeDestiny','orders.products_id')
                    ->where('orders.id','=',$data['order_id'])
                    ->get();

        $product = DB::table('products')
                    ->select('products.id','products.name','products.width','products.length','products.height','products.weight')
                    ->where('products.id','=',$order[0]->products_id)
                    ->get();

        $responseCorreios = Http::get('http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=08082650&sDsSenha=564321&sCepOrigem='.$order[0]->codeOrigin.'&sCepDestino='.$order[0]->codeDestiny.'&nVlPeso='.$product[0]->weight.'&nCdFormato=1&nVlComprimento='.$product[0]->length.'&nVlAltura='.$product[0]->height.'&nVlLargura='.$product[0]->width.'&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico='.$data["codeService"].'&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3');
        $correios=json_encode(simplexml_load_string($responseCorreios->body()));
        $array = json_decode($correios,TRUE);
        
        $rdado['codeService']=$array['cServico']['Codigo'];
        $rdado['value']=$array['cServico']['Valor'];
        $rdado['time']=$array['cServico']['PrazoEntrega'];

        $code = 200;
        $response['success']=true;
        $response['data']=$rdado;
        $response['message'] = 'Cotação criada com sucesso';
        return response()->json($response, $code);

    }


}