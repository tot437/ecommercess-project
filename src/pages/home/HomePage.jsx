// eslint-disable-next-line no-unused-vars
import React from 'react';
import Header from '../../components/header';
import ProductList from './productes'; 
import products from '../../../products';
import './homepages.css'; // تأكد أن الملف موجود في نفس المجلد
import '../../components/header.css';// تأكد أن هذا المسار يجلب مصفوفة المنتجات بشكل صحيح

export default function HomePage({ cartItems, setCart }) {
  
  // دالة إضافة منتج للكارت (يتم تمريرها للمكونات إذا احتجت لاستخدامها)
  const addItemToCart = (product, quantity) => {
    if (typeof setCart !== 'function') return;

    setCart((currentCart) => {
      const safeCurrentCart = Array.isArray(currentCart) ? currentCart : [];
      const existingItem = safeCurrentCart.find((item) => (item.productId ?? item.product?.id) === product.id);

      if (existingItem) {
        return safeCurrentCart.map((item) =>
          (item.productId ?? item.product?.id) === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...safeCurrentCart, { productId: product.id, product, quantity }];
    });
  };

  return (
    <>
      <Header cartItems={cartItems} />
      <div className="home-page">
        {/* تم إزالة الخطأ هنا: قمنا بتمرير المصفوفة فقط للمكون */}
        <ProductList Products={products} addItemToCart={addItemToCart} />
      </div>
    </>
  );
}