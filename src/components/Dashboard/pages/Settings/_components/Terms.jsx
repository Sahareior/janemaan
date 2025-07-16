import React from "react";

import Privacy from "./Privacy";

const Terms = () => {
  const text = `1. Acceptance of Terms
By downloading, installing, or using the [Your Hunting App Name] (the “App”), you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, do not use the App.By downloading, installing, or using the [Your Hunting App Name] (the “App”), you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, do not use the App.
`;

  return (
    <div>
      <Privacy isText={text} />
    </div>
  );
};

export default Terms;
