import React from 'react' ;
import ContentLoader from "react-content-loader";
import AppContext from '../../context';
import styles from './Card.module.scss';


// props - card from app.js in components
function Card({ id, title, imageUrl, price, onFavorite, onPlus, favorited = false, loading = false }) {
    const {isItemAdded} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited); // вкл сердце
    const obj = {id, parentId: id, title, imageUrl, price}; // parentId - для ориентира после добавления в корзину

    

    const onClickPlus = () => {
        onPlus(obj); 
        
    };

    const onClickFavorite = () => {
        onFavorite(obj);
        setIsFavorite(!isFavorite);
    }; 
  
    return (
        // styles.card - take styles 'card' - bam style
    
    // logic loading/
    <div className={styles.card}> 
        {
            // skelet
            loading ? (<ContentLoader 
                speed={2}
                width={160}
                height={250}
                viewBox="0 0 155 265"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb" >
                <rect x="0" y="0" rx="10" ry="10" width="155" height="155" /> 
                <rect x="0" y="167" rx="5" ry="5" width="155" height="15" /> 
                <rect x="0" y="187" rx="5" ry="5" width="100" height="15" /> 
                <rect x="0" y="234" rx="5" ry="5" width="80" height="25" /> 
                <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
            </ContentLoader>
            ) : (
            <>
                {onFavorite && <div className={styles.favorite} onClick={onFavorite}>
                    <img  
                        onClick={onClickFavorite}
                        src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}  
                        alt="Unlicked"
                    />  
                </div>}
                <img width='100%' height={135} src={imageUrl} alt="Sneakers" />
                <h5>{title}</h5>
                <div className="d-flex justify-between align-center">
                    <div className="d-flex flex-column">
                        <span>Цена:</span>
                        <b>{price} руб.</b>
                    </div>
                    {/* if isAdded = true, then "/img/btn-checked.svg" else "/img/btn-checked.svg" */}
                    {onPlus && <img 
                        className={styles.plus} 
                        onClick={onClickPlus} 
                        src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} 
                        alt="Plus"
                    /> }
                </div>
            </>
            )}
    </div>
    );
} 

export default Card;