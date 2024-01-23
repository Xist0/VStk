import React, { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import './css/QrScaner.css'

function QRcodeScaner() {
    const [isEnabled, setEnable] = useState(false);
    const [qrMessage, setQrMessenge] = useState('');

    useEffect(() => {
        const config = { fps: 10, qrbox: { width: 200, height: 200 } };
        const html5QrCode = new Html5Qrcode('qrCodeContainer');

        const startScanner = () => {
            try {
                html5QrCode.start({ facingMode: 'environment' }, config, qrCodeSuccess);
                setQrMessenge('');
            } catch (error) {
                console.error('Error starting QR Code scanner:', error);
            }
        };

        const stopScanner = () => {
            try {
                if (html5QrCode && html5QrCode.isScanning) {
                    html5QrCode.stop().then(() => console.log('Scanner stopped')).catch(() => console.log('Scanner stop error'));
                }
            } catch (error) {
                console.error('Error stopping QR Code scanner:', error);
            }
        };

        const qrCodeSuccess = (decodedText) => {
            setQrMessenge(decodedText);
            setEnable(false);
        };

        if (isEnabled) {
            startScanner();
        } else {
            stopScanner();
        }

        return () => {
            stopScanner();
        };
    }, [isEnabled]);

    return (
        <div className='visible'>
            <div id='qrCodeContainer' className={`scaner ${isEnabled ? 'visible' : 'hidden'}`}></div>
            {qrMessage && <div className='qr-message'>{qrMessage}</div>}
            <button className='start-button' onClick={() => setEnable(!isEnabled)}>
                {isEnabled ? 'Выкл' : 'Сканировать QRCode'}
            </button>
        </div>
    );
}

export default QRcodeScaner