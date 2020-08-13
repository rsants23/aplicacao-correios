<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    protected $fillable = [
        'id',
        'codeOrigin',
        'codeDestiny',
        'products_id',
    ];

    public function products() 
    {
        return $this->hasMany('App\Products');
    }

    public function getcodeOrigin(){
        return $this->codeOrigin;
    }

}