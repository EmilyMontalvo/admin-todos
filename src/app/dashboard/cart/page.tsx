import { cookies } from 'next/headers';
import React from 'react'
import { ProductCard } from '../../../products/components/ProductCard';
import { Product, products } from '@/products/data/products';
import { ItemCard } from '@/shopping-cart';
import { WidgetItem } from '../../../components/widgets/WidgetItem';


export const metadata = {
    title: 'Carrito de Compras',
    description: 'Carrito de Compras',
};


interface ProductInCart {
    product: Product;
    quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }) => {

    const productsInCart: ProductInCart[] = [];
    for (const id of Object.keys(cart)) {
        const product = products.find(prod => prod.id === id);
        if (product) {
            productsInCart.push({ product, quantity: cart[id] })
        }

    }

    return productsInCart
}


const CartPage = () => {

    const cookiesStore = cookies();
    const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}') as { [id: string]: number }
    const productsInCart = getProductsInCart(cart);

    const totalPay = productsInCart.reduce((prev, current) => (current.product.price * current.quantity) + prev,0)


    return (
        <>
            <h1 className='text-3xl'>Productos en el carrito</h1>
            <hr className='mr-2' />
            <div className='flex flex-col sm:flex-row gap-2 w-full'>
                <div className='flex flex-col gap-2 w-full sm:w-8/12'>
                    {
                        productsInCart.map(({ product, quantity }) => (
                            <ItemCard key={product.id} product={product} quantity={quantity} />
                        ))
                    }

<div className='flex flex-col w-full sm:w-4/12'>
    <WidgetItem title='Total a pagar'>
        
            <div className='mt-2 flex justify-center gap-4'>
            <h3 className='text-2xl font-bold text-gray-700'>Total: $ {(totalPay * 1.15).toFixed(2)}</h3>
            </div>
            <span className='font-bold text-center text-gray-500'>Impuesto 15%: {(totalPay * 0.15).toFixed(2)} </span>
        
    </WidgetItem>

</div>



                </div>


            </div>

        </>
    )
}

export default CartPage
