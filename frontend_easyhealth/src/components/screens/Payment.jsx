import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EsewaPayment = ({ totalPrice }) => {
    const [amount, setAmount] = useState(totalPrice || '');
    const [taxAmount, setTaxAmount] = useState('0');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [transactionUuid, setTransactionUuid] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const uuid = `TID-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setTransactionUuid(uuid);
        setAmount(Number(totalPrice).toFixed(2));
    }, [totalPrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = {
            amount: Number(amount),
            tax_amount: Number(taxAmount),
            transaction_uuid: transactionUuid
        };

        try {
            // Send payment details to backend for processing
            const response = await axios.post('/api/process-payment/', formData);
            const esewaPaymentData = response.data;

            // Prepare form for eSewa payment
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

            Object.keys(esewaPaymentData).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = esewaPaymentData[key];
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();

            // After form submission, navigate to payment verification
            // In the backend, you should handle payment verification and
            // then return success, redirecting to the OrderSuccess page.
            // Example navigation after verification:
            navigate(`/order-success?transaction_uuid=${transactionUuid}`);
        } catch (error) {
            console.error('Payment Error:', error);
            setError(error.response?.data?.error || 'Payment failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>eSewa Payment</h2>

                {error && (
                    <div style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>
                            Amount (NPR)
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ddd'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>
                            Tax Amount (Optional)
                        </label>
                        <input
                            type="number"
                            value={taxAmount}
                            onChange={(e) => setTaxAmount(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ddd'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Processing...' : 'Pay with eSewa'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EsewaPayment;
