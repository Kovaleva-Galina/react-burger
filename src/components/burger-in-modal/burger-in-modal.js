import { useNavigate } from "react-router-dom";
import { memo } from "react";
import useBurgerFromParams from "../../hooks/use-burger-from-params";
import Modal from "../modal/modal";
import BurgerDetails from "../burger-details/burger-details";

const IngredientInModal = () => {

  const burger = useBurgerFromParams();

  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1)
  }

  return (
    !!burger &&
    <Modal onClose={onClose} header={`#${burger.number}`}>
      <BurgerDetails burger={burger} />
    </Modal>
  )
}

export default memo(IngredientInModal);
