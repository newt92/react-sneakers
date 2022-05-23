import React from 'react';
import axios from 'axios'
import Info from './Info';
import {useCart} from '../hooks/useCart'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({onClose, onRemove, items = []}) {
    const {cartItems, setCartItems, totalPrice} = useCart();
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    
    
    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://626135f6327d3896e276e9b1.mockapi.io/orders', {
                items: cartItems,
            });
           
            setOrderId(data.id);
            setIsOrderComplete(true);// first push api
            setCartItems([]);// then delete api in state

            // костыль по удалению чере 1 секунду заказы после оформления
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://626135f6327d3896e276e9b1.mockapi.io/cart/' + item.id);// delet cart in api
                await delay(1000);
            }
        } catch (error) {
            alert('Ошибка при создании заказа');
        }
        setIsLoading(false);
    };
   

    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">
                    Корзина <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="Close"/>
                </h2>
                {/* if kolvo items > 0 then using items else cartEmpty */}
                {items.length > 0 ? 
                    (
                    <div className="d-flex flex-column flex">
                        <div className="items"> 
                        {items.map((obj) => (
                            <div key= {obj.id} className="cartItem d-flex align-center mb-20">
                                <div 
                                    style={{backgroundImage: `url(${obj.imageUrl})` }} 
                                    className="cartItemImg">
                                </div>
                                <div className="mr-20 flex">
                                    <p className="mb-5">{obj.title}</p>
                                    <b>{obj.price} руб.</b>
                                </div>
                                <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/>
                            </div>
                        ))}
                        </div>
                        <div className="cartTotalBlock">
                        <ul>
                            <li>
                                <span>Итого:</span>
                                <div></div>
                                <b>{totalPrice} руб.</b>
                            </li>
                            <li>
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>{totalPrice/100 * 5} руб.</b>
                            </li>
                        </ul>
                        <button disabled={isLoading} className="greenButton" onClick={onClickOrder}>Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/> </button>
                        </div> 
                    </div>
                    ) : ( // else
                    <Info 
                        title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"} 
                        description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте пару кроссовок, чтобы сделать заказ" }
                        image={isOrderComplete ? "/img/completed-order.jpg" : "/img/empty-cart.jpg"} />
                )}

                   
            </div>
        </div>    
    );
}

export default Drawer;