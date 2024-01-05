import React from "react";
import './Error.css'

const ErrorPage = ({ error }) => (
    <div className="error">
      <h2>Error!</h2>
      <p>It appears something went wrong</p>
      <h3>{error}</h3>
    </div>
  );

  export default ErrorPage