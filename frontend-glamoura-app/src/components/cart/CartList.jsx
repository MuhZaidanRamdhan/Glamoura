import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Minus } from 'lucide-react';
import ProductImage1 from "../../assets/images/red_tshirt.jpg";
import ProductImage2 from "../../assets/images/black_jacket.jpg";
import ProductImage3 from "../../assets/images/blue_jeans.jpg";
import ProductImage4 from "../../assets/images/running_shoes.jpg";
import ProductImage5 from "../../assets/images/summer_dress.jpg";
import ProductImage6 from "../../assets/images/leather_wallet.jpg";
import ProductImage7 from "../../assets/images/white_tshirt.jpg";
import ProductImage8 from "../../assets/images/red_dress.jpg";
import ProductImage9 from "../../assets/images/high_heels.jpg";
import ProductImage10 from "../../assets/images/blue_scarf.jpg";
import ProductImage11 from "../../assets/images/T-Shirt1.jpg";
import ProductImage12 from "../../assets/images/T-Shirt2.jpg";
import ProductImage13 from "../../assets/images/T-Shirt3.jpg";
import ProductImage14 from "../../assets/images/T-Shirt4.jpg";
import ProductImage15 from "../../assets/images/Jacket1.jpg";
import ProductImage16 from "../../assets/images/Jacket2.jpg";
import ProductImage17 from "../../assets/images/jacket3.jpg";
import ProductImage18 from "../../assets/images/Jacket4.jpg";
import ProductImage20 from "../../assets/images/Pant1.jpg";
import ProductImage21 from "../../assets/images/Pant2.jpg";
import ProductImage22 from "../../assets/images/Pant3.jpg";
import ProductImage23 from "../../assets/images/Pant4.jpg";
import ProductImage24 from "../../assets/images/Pant5.jpg";
import ProductImage25 from "../../assets/images/shoes1.jpg";
import ProductImage26 from "../../assets/images/shoes2.jpg";
import ProductImage27 from "../../assets/images/shoes3.jpg";
import ProductImage29 from "../../assets/images/Dresses1.jpg";
import ProductImage30 from "../../assets/images/Dresses2.jpg";
import ProductImage31 from "../../assets/images/Dresses3.jpg";
import ProductImage33 from "../../assets/images/Kacamata-Hitam-Unisex.jpg";
import ProductImage34 from "../../assets/images/cincin-emas.jpg";
import ProductImage35 from "../../assets/images/gesper.jpg";
import ProductImage36 from "../../assets/images/kalung.jpg";
import ProductImage37 from "../../assets/images/topi.jpg";
import ProductImage38 from "../../assets/images/topi3.jpg";
import ProductImage39 from "../../assets/images/topi4.jpg";
import ProductImage40 from "../../assets/images/topi5.jpg";
import ProductImage41 from "../../assets/images/topi6.jpg";
import ProductImage42 from "../../assets/images/topi7.jpg";

const productImages = {
  "red_tshirt.jpg": ProductImage1,
  "black_jacket.jpg": ProductImage2,
  "blue_jeans.jpg": ProductImage3,
  "running_shoes.jpg": ProductImage4,
  "summer_dress.jpg": ProductImage5,
  "leather_wallet.jpg": ProductImage6,
  "white_tshirt.jpg": ProductImage7,
  "red_dress.jpg": ProductImage8,
  "high_heels.jpg": ProductImage9,
  "blue_scarf.jpg": ProductImage10,
  "T-Shirt1.jpg": ProductImage11,
  "T-Shirt2.jpg": ProductImage12,
  "T-Shirt3.jpg": ProductImage13,
  "T-Shirt4.jpg": ProductImage14,
  "Jacket1.jpg": ProductImage15,
  "Jacket2.jpg": ProductImage16,
  "jacket3.jpg": ProductImage17,
  "Jacket4.jpg": ProductImage18,
  "Pant1.jpg": ProductImage20,
  "Pant2.jpg": ProductImage21,
  "Pant3.jpg": ProductImage22,
  "Pant4.jpg": ProductImage23,
  "Pant5.jpg": ProductImage24,
  "shoes1.jpg": ProductImage25,
  "shoes2.jpg": ProductImage26,
  "shoes3.jpg": ProductImage27,
  "Dresses1.jpg": ProductImage29,
  "Dresses2.jpg": ProductImage30,
  "Dresses3.jpg": ProductImage31,
  "Kacamata-Hitam-Unisex.jpg": ProductImage33,
  "cincin-emas.jpg": ProductImage34,
  "gesper.jpg": ProductImage35,
  "kalung.jpg": ProductImage36,
  "topi.jpg": ProductImage37,
  "topi3.jpg": ProductImage38,  
  "topi4.jpg": ProductImage39,
  "topi5.jpg": ProductImage40,
  "topi6.jpg": ProductImage41,
  "topi7.jpg": ProductImage42,
};

const CartList = ({ cartItems, fetchCartItems }) => {
  if (!cartItems) {
    return (
      <div className="w-full max-w-4xl mx-auto p-2 sm:p-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>
        <div className="text-center p-4 sm:p-8 text-gray-500">Your cart is empty</div>
      </div>
    );
  }

  const updateQuantity = async (id, quantity) => {
    try {
      await axios.put(
        `/api/carts/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      fetchCartItems();
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`/api/carts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchCartItems();
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>
      {(!cartItems.items || cartItems.items.length === 0) ? (
        <div className="text-center p-4 sm:p-8 text-gray-500">Your cart is empty</div>
      ) : (
        <>
          <div className="space-y-3 sm:space-y-4">
            {cartItems.items.map((item) => {
              const displayImage = productImages[item.image] || "https://via.placeholder.com/300x400";
              return (
                <div key={item.id} className="bg-white rounded-lg shadow-md">
                  <div className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <img
                        src={displayImage}
                        alt={item.product}
                        className="w-full sm:w-24 h-48 sm:h-24 object-contain rounded-md"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <div>
                            <h3 className="font-semibold">{item.product}</h3>
                            <p className="text-gray-600">Price: ${item.price}</p>
                          </div>
                          <div className="flex justify-between sm:justify-end items-center gap-3 sm:gap-4">
                            <div className="flex items-center gap-2">
                              <button
                                className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              className="p-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">Subtotal: ${item.product_price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <div className="text-lg sm:text-xl font-bold text-right">
              Total: ${cartItems.total_price}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartList;