"use client"

import TrendyLogo from "../../public/trendy-logo.png"

const checkDomainAvailability = async (domainName: string) => {
    const response = await fetch(
        `http://localhost:9000/check?domain=${domainName}`
    )

    return response.json()
}

export const DomainAvailabilityChecker = () => {
    return (
        <div data-testid="main" className="domain-availability-container">
            <img src={TrendyLogo.src} alt="Logo" className="logo" />
            <div className="input-container" data-testid="inner">
                <label htmlFor="domainNameInput">Enter a domain name:</label>
                <input
                    data-test="domain-field"
                    type="text"
                    id="domainNameInput"
                    className="domain-input"
                />
                <button className="check-button">Check Availability</button>
            </div>
            <div
                data-testid="analyses-result"
                id="analyses-result"
                className="results-list"
            ></div>
        </div>
    )
}

/* Here is the initial markup:

import TrendyLogo from "../../public/trendy-logo.png";

export const DomainAvailabilityChecker = () => {
  return (
    <div data-testid="main" className="domain-availability-container">
      <img src={TrendyLogo.src} alt="Logo" className="logo" />
      <div className="input-container" data-testid="inner">
        <label htmlFor="domainNameInput">Enter a domain name:</label>
        <input
          data-test="domain-field"
          type="text"
          id="domainNameInput"
          className="domain-input"
        />
        <button className="check-button">Check Availability</button>
      </div>
      <div
        data-testid="analyses-result"
        id="analyses-result"
        className="results-list"
      ></div>
    </div>
  );
};

*/
