import React, { useState, useEffect } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise=loadStripe("pk_test_51SQYIqDSFdmXUPuAdpn858BkByLjb1BitthcYkNAasMDsiDDueTJKWRbVOyZWvjwvJqFpc8Hva9vF43pleUT7Pli00tpyk7dXh");

function StripeCheckoutForm({ total, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    fetch("https://flask-backend-production-ada1.up.railway.app/create-payment-intent", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ amount: total })
    })

      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));

  }, [total]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaying(true);
    if (!stripe || !elements || !clientSecret) {
      setPaying(false);
      return;
    }
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) }
    });
    setPaying(false);
    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      alert("Payment Successful!");
      onPaymentSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe || !clientSecret || paying}
        style={{
          marginTop: 18, background: "#1976d2", color: "#fff", border: "none", borderRadius: 5, padding: "10px 30px"
        }}>
        {paying ? "Processing..." : `Pay ₹${total}`}
      </button>
    </form>
  );
}

// Default export for correct import in CheckoutPage!
const StripeCheckout = (props) => (
  <Elements stripe={stripePromise}>
    <StripeCheckoutForm {...props} />
  </Elements>
);

export default StripeCheckout;
