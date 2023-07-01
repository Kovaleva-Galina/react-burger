import { useNavigate } from "react-router-dom";
import { memo } from "react";
import useBurgerFromParams from "../../hooks/use-burger-from-params";
import Modal from "../modal/modal";
import BurgerDetails from "../burger-details/burger-details";
import { TOrder } from "../../services/types/data";

const IngredientInModal = () => {

  const burger: TOrder | null | undefined = useBurgerFromParams();

  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1)
  }

  return (
    <>
    !!burger &&
    <Modal onClose={onClose} header={'#' + String(burger?.number)}>
      <BurgerDetails burger ={burger} />
    </Modal>
    </>
  )
}

export default memo(IngredientInModal);
