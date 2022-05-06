import React from 'react' ;
import styles from './Card.module.scss' ;

// props - card from app.js in components
function Card({ id, title, imageUrl, price, onFavorite, onPlus, favorited = false }) {
    const [isAdded, setIsAdded] = React.useState(false);// default false
    const [isFavorite, setIsFavorite] = React.useState(favorited); // вкл сердце

    const onClickPlus = () => {
        onPlus({title, imageUrl, price}); 
        setIsAdded(!isAdded);// make change button pluse(checked/unchecked)/after function true/ !isAdded - inversion(true to false)
    };

    const onClickFavorite = () => {
        onFavorite({id, title, imageUrl, price});
        setIsFavorite(!isFavorite);
    } 
  
    return (
        // styles.card - take styles 'card' - bam style
    <div className={styles.card}> 
        <div className={styles.favorite} onClick={onFavorite}>
            <img  
                onClick={onClickFavorite}
                src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}  
                alt="Unlicked"
            />  
        </div>
        <img width={133} height={112} src={imageUrl} alt="Sneakers" />
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} руб.</b>
            </div>
            {/* if isAdded = true, then "/img/btn-checked.svg" else "/img/btn-checked.svg" */}
            <img 
                className={styles.plus} 
                onClick={onClickPlus} 
                src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} 
                alt="Plus"
            /> 
        </div>
    </div>
    );
} 

export default Card;