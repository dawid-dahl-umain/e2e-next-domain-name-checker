import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { DomainAvailabilityChecker } from "./DomainAvailabilityChecker"

describe("DomainAvailabilityChecker", () => {
    it("should display domain name when specified by user", () => {
        render(<DomainAvailabilityChecker />)

        const inputField = screen.getByRole("textbox")

        fireEvent.change(inputField, { target: { value: "www.tddrocks.com" } })

        const button = screen.getByRole("button")

        fireEvent.click(button)

        expect(
            screen.getByText("The searched domain is: www.tddrocks.com")
        ).toBeInTheDocument()
    })

    it("should display another domain name when specified by user", () => {
        render(<DomainAvailabilityChecker />)

        const inputField = screen.getByRole("textbox")

        fireEvent.change(inputField, {
            target: { value: "www.lifetastesgreat.com" }
        })

        const button = screen.getByRole("button")

        fireEvent.click(button)

        expect(
            screen.getByText("The searched domain is: www.lifetastesgreat.com")
        ).toBeInTheDocument()
    })
})
