import { useState, memo, useRef, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { updateDetailsIngredient } from '../../redux/actions/detail-ingredient';

const BurgerIngredients = () => {

  const dispatch = useDispatch();
  const [current, setCurrent] = useState('bun');
  const positions = useSelector((state) => state.ingredients.items);

  const breads = positions.filter((item) => item.type === 'bun');
  const sauce = positions.filter((item) => item.type === 'sauce');
  const main = positions.filter((item) => item.type === 'main');

  const refContainer = useRef();
  const refTitle = useRef({ bun: createRef(), sauce: createRef(), main: createRef() });

  const setModalActive = (item) => {
    dispatch(updateDetailsIngredient(item));
  };

  const handleClickTab = (newCurrent) => {
    setCurrent(newCurrent);
    refTitle.current?.[newCurrent]?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const handleScroll = (event) => {
    const scrollPosition = event.target.scrollTop + event.target.clientHeight / 2;
    Object.entries(refTitle.current).forEach(([tab, ref]) => {
      if (ref.current.offsetTop <= scrollPosition) {
        setCurrent(tab)
      }
    })
  }

  return (
    <section className={style.burger_ingredients}>
      <p className="text text_type_main-large pb-5">
        Соберите бургер
      </p>

      <div className={`pb-10 ${style.menu}`}>
        <Tab value="bun" active={current === 'bun'} onClick={handleClickTab}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={handleClickTab}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={handleClickTab}>
          Начинки
        </Tab>
      </div>
      <ul className={style.ingredients} ref={refContainer} onScroll={handleScroll}>
        <p className="text text_type_main-medium" ref={refTitle.current.bun} >Булки</p>
        <ul className={`pt-6 pr-4 pb-10 mb-10 ${style.list}`}>
          {breads.map((ingredient) => (
            <Link className={`${style.link}`} to={`ingredients/${ingredient._id}`} key={ingredient._id} state={{ Id: ingredient._id }} >
              <Ingredient ingredient={ingredient} type="bun" onClick={setModalActive} />
            </Link>
          ))}
        </ul>
        <p className="text text_type_main-medium" ref={refTitle.current.sauce}>Соусы</p>
        <ul className={`pt-6 pr-4 pb-10 mb-10 ${style.list}`}>
          {sauce.map((ingredient) => (
            <Link className={`${style.link}`} to={`ingredients/${ingredient._id}`} key={ingredient._id} state={{ ingredientId: ingredient._id }} >
              <Ingredient ingredient={ingredient} type="filling" onClick={setModalActive} />
            </Link>
          ))}
        </ul>
        <p className="text text_type_main-medium" ref={refTitle.current.main}>Начинки</p>
        <ul className={`pt-6 pr-4 pb-10 mb-10 ${style.list}`}>
          {main.map((ingredient) => (
            <Link className={`${style.link}`} to={`ingredients/${ingredient._id}`} key={ingredient._id} state={{ ingredientId: ingredient._id }} >
              <Ingredient ingredient={ingredient} type="filling" onClick={setModalActive} />
            </Link>
          ))}
        </ul>
      </ul>
    </section>
  )
}

export default memo(BurgerIngredients);
