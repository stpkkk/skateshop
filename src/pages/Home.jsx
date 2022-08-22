import { React, useContext } from "react";
import Card from "../components/card";
import Slider from "../components/slider/Slider";
import AppContext from "../contexts/context";
import { sliderData } from "../components/slider/sliderData";

const Home = ({
  searchValue,
  onChangeSearchInput,
  onClearSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
  items,
}) => {
  const { isItemAdded } = useContext(AppContext);

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    ); //строка поиска ?!!!
    return (isLoading ? [...Array(8)] : filteredItems) //Если загрузка идет у нас будет массив из 8 фейковых  карточек со значением underfined иначе возвращаем отфильтрованные карточки

      .map((item, index) => (
        <Card
          key={index}
          onCart={(obj) => onAddToCart(obj)}
          onFavorite={(obj) => onAddToFavorite(obj)} //для значка сердечка в избранном
          loading={isLoading}
          added={isItemAdded(item && item.id)}
          {...item} //передаем весь обьект (id, title price и т.д.)
        />
      ));
  };

  return (
    <div className="content p-40">
		<Slider slides = {sliderData}/>
      <div className="d-flex justify-between align-center mb-40">
        <h1>{searchValue ? `Search by: "${searchValue}"` : "All decks"}</h1>
        <div className="search-block d-flex">
          {searchValue && (
            <img
              onClick={onClearSearchInput}
              className="inputClear"
              src="/img/x.svg"
              alt="Clear"
            />
          )}
          <img src="/img/search.svg" alt="search" />
          <input
            onChange={onChangeSearchInput}
            value={searchValue} //чтобы импут был контролируемым, чтобы например добавить в импут кнопку стереть, т.е. привязываемся к этому value
            placeholder="search..."
          />
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
};

export default Home;
