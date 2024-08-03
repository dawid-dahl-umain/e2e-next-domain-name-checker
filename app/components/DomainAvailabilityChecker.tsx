"use client"

import React from "react"
import TrendyLogo from "../../public/trendy-logo.png"

const checkDomainAvailability = async (domainName: string) => {
    const response = await fetch(
        `http://localhost:9000/check?domain=${domainName}`
    )

    return response.json()
}

export const DomainAvailabilityChecker = () => {
    const [domainName, setDomainName] = React.useState<string>("")

    const handleDomainNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => setDomainName(event.target.value)

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
                    value={domainName}
                    onChange={handleDomainNameChange}
                />
                <button className="check-button">Check Availability</button>
            </div>
            <div
                data-testid="analyses-result"
                id="analyses-result"
                className="results-list"
            ></div>
            <p>The searched domain is: {domainName}</p>
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
