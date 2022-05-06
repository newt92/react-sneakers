import Card from '../components/Card';// search index.js from Card

function Home({items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart}) {
    return (
        <div className="content p-40 ">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
                <div className="search-block d-flex">
                
                <img src="/img/search.svg" alt="Search"/>
                {/* if setSearchValue there is, then Clear will be make ... */}
                {searchValue && (
                    <img 
                    onClick={() => setSearchValue('')} 
                    className="clear cu-p" 
                    src="/img/btn-remove.svg" 
                    alt="Clear"
                    />
                )}
                <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
                </div>
            </div>

            {/* {} - вкл возможность добавить js-код */}
            <div className="d-flex flex-wrap">        
                {/* выстраиваем логику отображения объектов */}
                {items
                .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())) // search logic /toLowerCase - нижн рег
                .map((item)=>{
                return ( 
                <Card 
                    key={item.id} // от чего отталкивается уникальность
                    id={item.id}
                    title={item.title} 
                    price={item.price} 
                    imageUrl={item.imageUrl} 
                    onFavorite={(obj) => onAddToFavorite(obj)}
                    onPlus={(obj) => onAddToCart(obj)} // take obj from cerd/index.js in onClickPlus
                />)
                })}
            </div>
    </div>
    )
}

export default Home;