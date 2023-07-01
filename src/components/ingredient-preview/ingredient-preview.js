import { memo } from 'react';
import styles from './ingredient-preview.module.css';

const IngredientPreview = ({ ingredient, index, count }) => {

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
