import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';



function App() {
  // переменная массива api объектов
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);// add to cart
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');// search
  const [cartOpened, setCartOpened] = React.useState(false); 

  // React.useEffect - for first render js create function fetch(apply serv API)
  React.useEffect(() => {
    // fetch('https://626135f6327d3896e276e9b1.mockapi.io/items')
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    // });

    axios.get('https://626135f6327d3896e276e9b1.mockapi.io/items').then((res) => {
      setItems(res.data);
    });
    axios.get('https://626135f6327d3896e276e9b1.mockapi.io/cart').then((res) => {
      setCartItems(res.data);
    });
    axios.get('https://626135f6327d3896e276e9b1.mockapi.io/favorites').then((res) => {
      setFavorites(res.data);
    });
  }, []);// and enough


  const onAddToCart = (obj) => {
    axios.post('https://626135f6327d3896e276e9b1.mockapi.io/cart', obj); //post - pushing
    setCartItems((prev) => [...prev, obj]);// pushing all from previous items (cartItems) and add new obj
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
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://626135f6327d3896e276e9b1.mockapi.io/favorites/${obj.id}`); 
      } else {
        const { data } = await axios.post('https://626135f6327d3896e276e9b1.mockapi.io/favorites', obj); // await - дождись ответа от бекенда (новое ид от фаворитов)
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить товар в фавориты');
    }
   
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };


  return (
  <div className="wrapper clear"> 
    {/* onClose - close cart */}
    {/* cartOpened && <Drawer onClose={() => setCartOpened(false)} />*/}
    {cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} /> : null}  
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
          searchValue={searchValue} 
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
        />}
      />
      {/* items={Favorites} - render all items from Favorites */}
      <Route path='/favorites' element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />}/> 
    </Routes>
    
  </div>
  );
 
}

export default App;
