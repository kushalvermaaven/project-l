export const processPayment = async (orderData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('txn_' + Math.random().toString(36).substr(2, 9));
    }, 1000);
  });
};

export const calculateCommission = (amount, rate = 0.12) => {
  return amount * rate;
};

export const getPaymentStatus = async (paymentId) => {
  return 'completed';
};
