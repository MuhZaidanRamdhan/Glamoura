<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $table = 'payments';
    protected $fillable = ['order_id','payment_method','payment_status','transaction_id','amount','payment_url'];
    public $timestamps = false;
}
