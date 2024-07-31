import React from "react"
import { render } from "@testing-library/react"
import { DomainAvailabilityChecker } from "./DomainAvailabilityChecker"

describe("DomainAvailabilityChecker", () => {
    it("should display domain name when specified by user", () => {
        render(<DomainAvailabilityChecker />)
    })
})
