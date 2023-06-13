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

export const burgerType = PropTypes.shape({
  price: PropTypes.number,
  name: PropTypes.string,
  _id: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['done', 'created', 'pending']),
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  number: PropTypes.number,
})

