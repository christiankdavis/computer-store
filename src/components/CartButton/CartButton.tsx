import "./CartButton.css";

export interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

export const CartButton = ({ itemCount, onClick }: CartButtonProps) => {
  const badgeLabel = itemCount > 999 ? "999+" : itemCount.toString();

  return (
    <button className="cart-button" type="button" onClick={onClick}>
      <span className="cart-button__label">Cart</span>

      {itemCount > 0 && (
        <span className="cart-button__badge">{badgeLabel}</span>
      )}
    </button>
  );
};
