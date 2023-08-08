import { memo, FC } from 'react';
import styles from './ingredient-preview.module.css';
import { TIngredient } from '../../services/types/data';

type TIngredientPreviewProps = {
  ingredient: TIngredient,
  index: number,
  count: number
}

const IngredientPreview: FC<TIngredientPreviewProps> = ({ ingredient, index, count}) => {
  if (index < 4 && ingredient) {
    return (
      <li key={index} className={`${styles.ingredient_preview}`} style={{ zIndex: `-${index}` }}>
        <img className={`${styles.ingredient_preview__image} `} src={ingredient.image} alt={ingredient.name} />
      </li>
    )
  } else if (index === 4 && ingredient) {
    return (
      <li key={index} className={`${styles.ingredient_preview}`} style={{ zIndex: `-${index}` }}>
        <img className={`${styles.ingredient_preview__image} `} src={ingredient.image} alt={ingredient.name} />
        <p className={`text text_type_digits-default ${styles.ingredient_preview__text} `}>+{count}</p>
      </li>
    )
  }
  return null
}

export default memo(IngredientPreview);
