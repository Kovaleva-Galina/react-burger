import { useNavigate } from "react-router-dom";
import { memo } from "react";
import useIngredientFromParams from "../../hooks/use-ingredient-from-params";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const IngredientInModal = () => {

  const ingredient = useIngredientFromParams();

  const navigate = useNavigate();
  const onClose = () => {
    navigate('/')
  }
  return (
    <Modal onClose={onClose} header="Детали ингредиента">
      <IngredientDetails item={ingredient} />
    </Modal>
  )
}

export default memo(IngredientInModal);

