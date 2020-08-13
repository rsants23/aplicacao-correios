<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quotations extends Model
{
    protected $fillable = [
        'id',
        'codeService',
        'orders_id',
    ];

    public function orders() 
    {
        return $this->hasMany('App\Orders');
    }

}