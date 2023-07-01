import { useNavigate } from "react-router-dom";
import { useDispatch } from '../../services/types/hooks';
import { memo } from "react";
import useIngredientFromParams from "../../hooks/use-ingredient-from-params";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { deleteDetailsIngredient } from "../../services/actions/detail-ingredient";

const IngredientInModal = () => {
  const dispatch = useDispatch();
  const ingredient = useIngredientFromParams();

  const navigate = useNavigate();

  const onClose = () => {
    dispatch(deleteDetailsIngredient());
    navigate('/')
  }
  return (
    <Modal onClose={onClose} header="Детали ингредиента">
      <IngredientDetails item={ingredient} />
    </Modal>
  )
}

export default memo(IngredientInModal);

