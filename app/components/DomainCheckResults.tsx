import React from "react"
import { CheckItem } from "../../mock-server/server"

const getDiscountMessage = (discountCode: string | undefined) => {
    switch (discountCode) {
        case "DISCOUNT_20":
            return "20% OFF"
        case "DISCOUNT_50":
            return "50% OFF"
        case "RENEWAL_DISCOUNT_90":
            return "90% RENEWAL DISCOUNT"
        default:
            return null
    }
}

const DomainCheckResults = ({
    domainCheck,
    hasRequestFailed = false
}: {
    domainCheck: CheckItem | null
    hasRequestFailed: boolean
}) => {
    const discountMessage = getDiscountMessage(domainCheck?.discountCode)

    if (hasRequestFailed) {
        return <p>Error while fetching data</p>
    }

    return domainCheck && Object.keys(domainCheck).length === 0 ? (
        <p>No results available</p>
    ) : (
        <ul>
            {domainCheck?.isPremium && <li>Premium domain</li>}
            {domainCheck?.isAvailable === false && (
                <li>This domain is not available</li>
            )}
            {discountMessage && <li>{discountMessage}</li>}
        </ul>
    )
}

export default DomainCheckResults
