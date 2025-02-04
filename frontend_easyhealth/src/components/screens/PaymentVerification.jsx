import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PaymentVerification = () => {
    const [verificationStatus, setVerificationStatus] = useState('Verifying...');
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                // Extract query parameters from eSewa response
                const searchParams = new URLSearchParams(location.search);
                const transactionCode = searchParams.get('transaction_code');
                const status = searchParams.get('status');
                const transactionUuid = searchParams.get('transaction_uuid');

                // Call backend to verify payment
                const response = await axios.post('/api/verify-payment/', {
                    transaction_code: transactionCode,
                    status: status,
                    transaction_uuid: transactionUuid
                });

                // Check the payment status and update the UI
                if (status === 'COMPLETED') {
                    setVerificationStatus('Payment Successful');
                } else {
                    setVerificationStatus('Payment Failed');
                }

                setPaymentDetails({
                    transactionCode,
                    status,
                    transactionUuid
                });

            } catch (error) {
                // Handle errors gracefully
                setVerificationStatus('Verification Failed');
                setError(error.response?.data?.error || 'An error occurred');
            }
        };

        verifyPayment();
    }, [location]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f4f4f4'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                width: '400px',
                textAlign: 'center'
            }}>
                <h2>{verificationStatus}</h2>

                {error && (
                    <div style={{ color: 'red', marginBottom: '15px' }}>
                        {error}
                    </div>
                )}

                {paymentDetails && (
                    <div>
                        <p>Transaction Code: {paymentDetails.transactionCode}</p>
                        <p>Status: {paymentDetails.status}</p>
                        <p>Transaction UUID: {paymentDetails.transactionUuid}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentVerification;
