import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import AppContext from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';


function App() {
  // переменная массива api объектов
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);// add to cart
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');// search
  const [cartOpened, setCartOpened] = React.useState(false); 
  const [isLoading, setIsLoading] = React.useState(true);//skelet


  


  // React.useEffect - for first render js create function fetch(apply serv API)
  React.useEffect(() => {
    // fetch('https://626135f6327d3896e276e9b1.mockapi.io/items')
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    // });

    // axios.get('https://626135f6327d3896e276e9b1.mockapi.io/items').then((res) => {
    //   setItems(res.data);
    // });
    // axios.get('https://626135f6327d3896e276e9b1.mockapi.io/cart').then((res) => {
    //   setCartItems(res.data);
    // });
    // axios.get('https://626135f6327d3896e276e9b1.mockapi.io/favorites').then((res) => {
    //   setFavorites(res.data);
    // });

    // logic async
    async function fetchData() {
      // setIsLoading(true);// sketet 
      
      const cartResponce = await axios.get('https://626135f6327d3896e276e9b1.mockapi.io/cart');
      const favoritesResponce = await axios.get('https://626135f6327d3896e276e9b1.mockapi.io/favorites');
      const itemsResponce = await axios.get('https://626135f6327d3896e276e9b1.mockapi.io/items');
      
      setIsLoading(false);// then skelet

      setCartItems(cartResponce.data);
      setFavorites(favoritesResponce.data);
      setItems(itemsResponce.data);

    }

    fetchData();
  }, []);// and enough

  const onAddToCart = (obj) => {
    // when checked buy - show in cart, if unchecked - delete 
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) { //Number перевод в число, так как по умолч id текст
      axios.delete(`https://626135f6327d3896e276e9b1.mockapi.io/cart/${obj.id}`); // delete from serv
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));// pushing all from previous items (cartItems) and add new obj/ delete from front
    } else {
      axios.post('https://626135f6327d3896e276e9b1.mockapi.io/cart', obj); //post - pushing 
      setCartItems((prev) => [...prev, obj]);
    }

  };
  
  const onRemoveItem = (id) => {
    axios.delete(`https://626135f6327d3896e276e9b1.mockapi.io/cart/${id}`); 
    setCartItems((prev) => prev.filter((item) => item.id !== id)); 

    // setCartItems((prev) => [...prev, obj]);
  };

  const onAddToFavorite = async (obj) => { // асинхронн
    // try for searching errors
    try {
      // if i will found same id in favorites, then i will delete
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://626135f6327d3896e276e9b1.mockapi.io/favorites/${obj.id}`); 
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://626135f6327d3896e276e9b1.mockapi.io/favorites', obj); // await - дождись ответа от бекенда (новое ид от фаворитов)
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log('Error');
    }
   
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id)); 
  }

  return (
    // value - передача компонентов, которые будут доступны везде без прокидки пропсов
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems}}>
        <div className="wrapper clear"> 

        {/* onClose - close cart */}
        {/* cartOpened && <Drawer onClose={() => setCartOpened(false)} />*/}
        <Drawer 
          items={cartItems} 
          onClose={() => setCartOpened(false)} 
          onRemove={onRemoveItem} 
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} /> 
        
        {/* <Home 
          items={items} 
          searchValue={searchValue} 
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
        /> */}
        <Routes>
          <Route path='/' element={  
            <Home 
              items={items} 
              cartItems = {cartItems}
              searchValue={searchValue} 
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />}
          />
          {/* items={Favorites} - render all items from Favorites */}
          <Route path='/favorites' element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />}/> 
          <Route path='/orders' element={<Orders items={favorites} onAddToFavorite={onAddToFavorite} />}/> 
        </Routes>
        
      </div>
    </AppContext.Provider>
  );
 
}

export default App;
