import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentVerification = () => {
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPayment = async () => {
            const params = new URLSearchParams(location.search);
            const transactionUuid = params.get('transaction_uuid');
            const statusCode = params.get('status');

            if (transactionUuid && statusCode) {
                try {
                    // Send the verification request to your backend
                    const response = await axios.post('/api/payment/verify/', {
                        transaction_uuid: transactionUuid,
                        status: statusCode
                    });

                    if (response.status === 200) {
                        setStatus('success');
                        setMessage('Payment successfully verified.');
                        setLoading(false);
                        // Optionally redirect to order summary or another page
                        setTimeout(() => navigate(`/order-summary/${transactionUuid}`), 3000);
                    }
                } catch (error) {
                    setStatus('failure');
                    setMessage('Payment verification failed. Please try again.');
                    setLoading(false);
                }
            } else {
                setStatus('failure');
                setMessage('Missing transaction data.');
                setLoading(false);
            }
        };

        verifyPayment();
    }, [location.search, navigate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Payment Status</h2>

                {loading ? (
                    <div style={{ textAlign: 'center' }}>Verifying payment...</div>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <h3>{status === 'success' ? 'Payment Successful!' : 'Payment Failed'}</h3>
                        <p>{message}</p>

                        {status === 'success' && (
                            <div>
                                <button onClick={() => navigate(`/order-summary/${transactionUuid}`)} style={{ marginTop: '20px' }}>
                                    Go to Order Summary
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentVerification;
