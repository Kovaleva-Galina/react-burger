import { memo, FC } from 'react';
import style from './ingredient-details.module.css';
import { TIngredient } from '../../services/types/data';

type TIngredientDetailsProps = {
  item: TIngredient | undefined,
}

const IngredientDetails: FC<TIngredientDetailsProps> = ({ item }) => {
  if (!item) return null;
  return (
    <div className={`pl-10 pr-10 ${style.content}`}>
      <img src={item.image} alt='Галочка' className={`mb-4 ${style.image}`}></img>
      <p className='text text_type_main-medium pb-8'>{item.name}</p>
      <ul className={`mt-8 ${style.structure}`}>
        <li className="pr-5">
          <p className="text text_type_main-default text_color_inactive text text_type_main-small pb-2">Калории,ккал</p>
          <p className="text text_type_main-default text_color_inactive text text_type_main-medium">{item.calories}</p>
        </li>
        <li className="pr-5">
          <p className="text text_type_main-default text_color_inactive text text_type_main-small pb-2">Белки, г</p>
          <p className="text text_type_main-default text_color_inactive text text_type_main-medium">{item.proteins}</p>
        </li>
        <li className="pr-5">
          <p className="text text_type_main-default text_color_inactive text text_type_main-small pb-2">Жиры, г</p>
          <p className="text text_type_main-default text_color_inactive text text_type_main-medium">{item.fat}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive text text_type_main-small pb-2">Углеводы, г</p>
          <p className="text text_type_main-default text_color_inactive text text_type_main-medium">{item.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

export default memo(IngredientDetails);
