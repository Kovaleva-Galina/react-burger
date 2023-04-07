import style from './price.module.css';
import posittions from '../../utils/data';

const Price = () => {
  return (
    <section className={style.price}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={posittions[0].image}
      />
      <ConstructorElement
        text="Краторная булка N-200i (верх)"
        price={50}
        thumbnail={posittions[0].image}
      />
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={posittions[0].image}
      />
    </section>
  )
}

export default Price;
