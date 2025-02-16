import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const EsewaPayment = ({ totalPrice }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [transactionUuid, setTransactionUuid] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [paymentMessage, setPaymentMessage] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const uuid = `TID-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setTransactionUuid(uuid);
        setAmount(totalPrice ? Number(totalPrice).toFixed(2) : '');

        const params = new URLSearchParams(location.search);
        const encodedData = params.get('data');
        if (encodedData) {
            handlePaymentCallback(encodedData);
        }
    }, [location.search, totalPrice]);

    const handlePaymentCallback = async (encodedData) => {
        setLoading(true);
        try {
            const response = await axios.get('/api/process-payment/', {
                params: { data: encodedData }
            });

            if (response.data.status === 'success') {
                setPaymentStatus('success');
                setPaymentMessage('Payment successful! Redirecting to order summary...');

                // Get the order ID from the response (you can adjust this based on your backend response structure)
                const orderId = response.data.orderId;

                // Redirect to OrderSuccessScreen with the orderId in URL
                setTimeout(() => {
                    setAmount('');
                    setPaymentMessage('');
                    setPaymentStatus(null);
                    setTransactionUuid(null);
                    navigate(`/payment-success/`);
                }, 50000); // Redirect after 5 seconds
            } else {
                throw new Error(response.data.message || 'Payment verification failed');
            }
        } catch (error) {
            setPaymentStatus('failure');
            setPaymentMessage(error.response?.data?.message || 'Payment verification failed. Please try again.');
            setTimeout(() => {
                navigate('/payment-failed');
            }, 50000);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const formData = {
                amount: Number(amount),
                transaction_uuid: transactionUuid
            };

            const response = await axios.post('/api/process-payment/', formData);

            // Reset state after initiating payment
            setAmount('');
            setTransactionUuid('');

            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

            Object.entries(response.data).forEach(([key, value]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            setError(error.response?.data?.message || 'Payment initialization failed');
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', width: '400px' }}>
                <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>eSewa Payment</h2>

                {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#fee2e2', borderRadius: '4px' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Amount (NPR)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            disabled={loading}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', marginTop: '0.5rem' }}
                        />
                    </div>

                    <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', backgroundColor: loading ? '#93c5fd' : '#2563eb', color: 'white', fontWeight: 'bold', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {loading ? (
                            <>
                                <Loader2 style={{ marginRight: '0.5rem', animation: 'spin 1s linear infinite' }} size={20} /> Processing...
                            </>
                        ) : (
                            'Pay with eSewa'
                        )}
                    </button>
                </form>

                {paymentStatus && (
                    <div style={{ marginTop: '1rem', textAlign: 'center', color: paymentStatus === 'success' ? 'green' : 'red' }}>
                        {paymentMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EsewaPayment;
