import "./QuantitySelector.css";

export interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const QuantitySelector = ({
  quantity,
  onIncrement,
  onDecrement,
}: QuantitySelectorProps) => {
  return (
    <div className="quantity-selector">
      <button
        type="button"
        className="quantity-selector__button"
        onClick={onDecrement}
      >
        -
      </button>

      <div className="quantity-selector__value">{quantity}</div>

      <button
        type="button"
        className="quantity-selector__button"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  );
};
