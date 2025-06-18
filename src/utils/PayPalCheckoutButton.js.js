import React from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalCheckoutButton = ({ total }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
           value: Number(total).toFixed(2), // e.g., "12.99"
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
      // TODO: clear cart or redirect as needed
    });
  };

  return (
    <div className="my-4">
      {isPending ? (
        <p>Processing PayPal options...</p>
      ) : (
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={onCreateOrder}
          onApprove={onApproveOrder}
        />
      )}
    </div>
  );
};

export default PayPalCheckoutButton;
