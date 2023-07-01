import { useState, memo, useRef, createRef, UIEvent } from 'react';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { Link } from 'react-router-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { updateDetailsIngredient } from '../../services/actions/detail-ingredient';
import { TIngredient } from '../../services/types/data';

export enum Refs {
  bun = 'bun',
  sauce = 'sauce',
  main = 'main'
}

type TRef = {
  current: HTMLDivElement | null
}

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState<string>(Refs.bun);
  const positions = useSelector((state) => state.ingredients.items);

  const breads = positions.filter((item: TIngredient) => item.type === Refs.bun);
  const sauce = positions.filter((item: TIngredient) => item.type === Refs.sauce);
  const main = positions.filter((item: TIngredient) => item.type === Refs.main);

  const refContainer =  useRef<HTMLUListElement>(null);

  const refTitle = useRef({ [Refs.bun]: createRef<HTMLDivElement>(), [Refs.sauce]: createRef<HTMLDivElement>(), [Refs.main]: createRef<HTMLDivElement>() });

  const setModalActive = (item: TIngredient) => {
    dispatch(updateDetailsIngredient(item));
  };

  const handleClickTab = (newCurrent: string) => {
    setCurrent(newCurrent);
    refTitle.current[newCurrent as Refs]?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const handleScroll = (e: UIEvent<HTMLDListElement>)=> {
    const scrollPosition = (e.target as HTMLDivElement).scrollTop + (e.target as HTMLDivElement).clientHeight / 2;
    Object.entries(refTitle.current).forEach(([tab, ref]: [string, TRef]) => {
      if (ref.current && ref.current.offsetTop <= scrollPosition) {
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
        <Tab value={Refs.bun} active={current === Refs.bun} onClick={handleClickTab}>
          Булки
        </Tab>
        <Tab value={Refs.sauce} active={current === 'sauce'} onClick={handleClickTab}>
          Соусы
        </Tab>
        <Tab value={Refs.main} active={current === 'main'} onClick={handleClickTab}>
          Начинки
        </Tab>
      </div>
      <ul className={style.ingredients} ref={refContainer} onScroll={handleScroll}>
        <p className="text text_type_main-medium" ref={refTitle.current.bun} >Булки</p>
        <ul className={`pt-6 pr-4 pb-10 mb-10 ${style.list}`}>
          {breads.map((ingredient: TIngredient) => (
            <Link className={`${style.link}`} to={`ingredients/${ingredient._id}`} key={ingredient._id} state={{ Id: ingredient._id }} >
              <Ingredient ingredient={ingredient} type="bun" onClick={() => setModalActive} />
            </Link>
          ))}
        </ul>
        <p className="text text_type_main-medium" ref={refTitle.current.sauce}>Соусы</p>
        <ul className={`pt-6 pr-4 pb-10 mb-10 ${style.list}`}>
          {sauce.map((ingredient: TIngredient) => (
            <Link className={`${style.link}`} to={`ingredients/${ingredient._id}`} key={ingredient._id} state={{ ingredientId: ingredient._id }} >
              <Ingredient ingredient={ingredient} type="filling" onClick={() => setModalActive} />
            </Link>
          ))}
        </ul>
        <p className="text text_type_main-medium" ref={refTitle.current.main}>Начинки</p>
        <ul className={`pt-6 pr-4 pb-10 mb-10 ${style.list}`}>
          {main.map((ingredient: TIngredient) => (
            <Link className={`${style.link}`} to={`ingredients/${ingredient._id}`} key={ingredient._id} state={{ ingredientId: ingredient._id }} >
              <Ingredient ingredient={ingredient} type="filling" onClick={() => setModalActive} />
            </Link>
          ))}
        </ul>
      </ul>
    </section>
  )
}

export default memo(BurgerIngredients);
