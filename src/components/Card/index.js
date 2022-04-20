import React from 'react' ;
import styles from './Card.module.scss' ;

console.log(styles);

// props - card from app.js in components
function Card(props) {
    const [isAdded, setIsAdded] = React.useState(false);// default false

    const onClickPlus = () => {
        setIsAdded(!isAdded);// after function true/ !isAdded - inversion(true to false)
    };


    return (
        // styles.card - take styles 'card' - bam style
    <div className={styles.card}> 
        <div className={styles.favorite} onClick={props.onFavorite}>
            <img src="/img/heart-unliked.svg" alt="Unlicked"/>  
        </div>
        <img width={133} height={112} src={props.imageUrl} alt="Sneakers" />
        <h5>{props.title}</h5>
        <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{props.price} руб.</b>
            </div>
            {/* if isAdded = true, then "/img/btn-checked.svg" else "/img/btn-checked.svg" */}
            <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus"/> 
        </div>
    </div>
    );
} 

export default Card;