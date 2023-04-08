import PropTypes from 'prop-types';

export const ingredientType = PropTypes.shape({
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  _id: PropTypes.string.isRequired,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  type: PropTypes.oneOf(['bun', 'sauce', 'main']),
});



