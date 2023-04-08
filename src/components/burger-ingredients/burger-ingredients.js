import React from 'react';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientType } from '../../utils/types';

const BurgerIngredients = ({ posittions }) => {
  const [current, setCurrent] = React.useState('Булки')
  const breads = posittions.filter((item) => item.type === 'bun');
  const sauce = posittions.filter((item) => item.type === 'sauce');
  const main = posittions.filter((item) => item.type === 'main');
  const [modalActive, setModalActive] = React.useState(null);

  return (
    <section className={style.burger_ingredients}>
      <p className="text text_type_main-large pb-5">
        Соберите бургер
      </p>

      <div className={`pb-10 ${style.menu}`}>
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <ul className={style.ingredients}>
        <p className="text text_type_main-medium">Булки</p>
        <ul className={`pt-6 pr-4 pb-10 mb-10 ${style.list}`}>
          {breads.map((item) => (
            <Ingredient item={item} onClick={setModalActive} key={item._id} />
          ))}
        </ul>
        <p className="text text_type_main-medium">Соусы</p>
        <ul className={`pt-6 pr-4 pb-10 mb-10 ${style.list}`}>
          {sauce.map((item) => (
            <Ingredient item={item} onClick={setModalActive} key={item._id} />
          ))}
        </ul>
        <p className="text text_type_main-medium">Начинки</p>
        <ul className={`pt-6 pr-4 pb-10 mb-10 ${style.list}`}>
          {main.map((item) => (
            <Ingredient item={item} onClick={setModalActive} key={item._id} />
          ))}
        </ul>
      </ul>
      {!!modalActive && (
        <Modal onClose={() => setModalActive(false)} header="Детали ингредиента">
          <IngredientDetails item={modalActive} />
        </Modal>
      )}
    </section>
  )
}

export default memo(BurgerIngredients);

BurgerIngredients.propTypes = {
  posittions: PropTypes.arrayOf(
    ingredientType,
  )
}
