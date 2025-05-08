import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface RecaptchaProps {
  onVerify: (token: string | null) => void;
}

const Recaptcha: React.FC<RecaptchaProps> = ({ onVerify }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleRecaptchaChange = (token: string | null) => {
    setIsVerified(!!token);
    onVerify(token);
  };

  return (
    <div>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''} // Replace with your site key env var
        onChange={handleRecaptchaChange}
      />
      {/* You can optionally display verification status */}
      {/* {isVerified ? <p>reCAPTCHA verified!</p> : <p>Please complete reCAPTCHA.</p>} */}
    </div>
  );
};

export default Recaptcha;