"use client"

import React from "react"
import TrendyLogo from "../../public/trendy-logo.png"
import { CheckItem } from "../../mock-server/server"
import DomainCheckResults from "./DomainCheckResults"

const checkDomainAvailability = async (domainName: string) =>
    fetch(`http://localhost:9000/check?domain=${domainName}`)

export const DomainAvailabilityChecker = () => {
    const [hasRequestFailed, setHasRequestFailed] =
        React.useState<boolean>(false)
    const [domainCheck, setDomainCheck] = React.useState<CheckItem | null>(null)
    const [domainNameInput, setDomainNameInput] = React.useState<string>("")

    const handleDomainNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDomainNameInput(event.target.value)
        setDomainCheck(null)
    }

    const handleCheckDomain = async () => {
        try {
            const domainResponse = await checkDomainAvailability(
                domainNameInput
            )

            if (domainResponse.ok) {
                const domainData = await domainResponse.json()
                setDomainCheck(domainData)
            } else {
                setDomainCheck({})
            }
        } catch (error) {
            console.error("Error fetching data: ", error)
            setHasRequestFailed(true)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault()
            handleCheckDomain()
        }
    }

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
                    value={domainNameInput}
                    onChange={handleDomainNameChange}
                    onKeyDown={handleKeyDown}
                />
                <button className="check-button" onClick={handleCheckDomain}>
                    Check Availability
                </button>
            </div>
            <div
                data-testid="analyses-result"
                id="analyses-result"
                className="results-list"
            >
                <h3>
                    {domainNameInput &&
                        `The searched domain is: ${domainNameInput}`}
                </h3>
                <DomainCheckResults
                    domainCheck={domainCheck}
                    hasRequestFailed={hasRequestFailed}
                />
            </div>
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
