
import styles from './Card.module.scss' ;

console.log(styles);

// props - card from app.js in components
function Card(props) {
    // const onClickButton = () => {
    //     alert(props.title);
    // };

    return (
        // styles.card - take styles 'card' - bam style
    <div className={styles.card}> 
        <div className={styles.favorite}>
            <img src="/img/heart-unliked.svg" alt="Unlicked"/>  
        </div>
        <img width={133} height={112} src={props.imageUrl} alt="Sneakers" />
        <h5>{props.title}</h5>
        <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{props.price} руб.</b>
            </div>
            <button className="button" onClick={props.onClick}> {/* onClick from App.js */}
                <img width={11} height={11} src="/img/plus.svg" alt="Plus"/>
            </button>
        </div>
    </div>
    );
} 

export default Card;