import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites({onAddToFavorite}) {
    
    const {favorites} = React.useContext(AppContext);



    return (
        <div className="content p-40 ">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки</h1>
            </div>
            <div className="d-flex flex-wrap">        
            {favorites.map((item)=>{
                return ( 
                <Card 
                    key={item.id} // от чего отталкивается уникальность
                    id={item.id} // передача id
                    favorited={true} // автоматически включено сердце
                    onFavorite={onAddToFavorite} // возможность выкл сердце
                    title={item.title}  
                    price={item.price} 
                    imageUrl={item.imageUrl}
                    // {...item} // все остальные объекты передать
                />)
            })}
            </div>
    </div>
    )
}

export default Favorites;