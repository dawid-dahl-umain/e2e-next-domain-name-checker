import React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { DomainAvailabilityChecker } from "./DomainAvailabilityChecker"

describe("DomainAvailabilityChecker", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    const testCases = [
        {
            domainName: "www.tddrocks.com",
            displayName: "TDD Rocks",
            mockedResponse: { domain: "tddrocks.com", isPremium: true }
        },
        {
            domainName: "www.lifetastesgreat.com",
            displayName: "Life Tastes Great",
            mockedResponse: { domain: "lifetastesgreat.com", isPremium: false }
        }
    ]

    it.each(testCases)(
        "should display base domain check '$displayName' when specified by user",
        async ({ domainName, displayName, mockedResponse }) => {
            fetchMock.mockResponseOnce(JSON.stringify(mockedResponse))

            render(<DomainAvailabilityChecker />)

            enterDomainNameAndClickCheckButton(domainName)

            await waitFor(() => {
                expect(
                    screen.getByText(`The searched domain is: ${domainName}`)
                ).toBeInTheDocument()
            })

            await waitFor(() => {
                const premiumText = mockedResponse.isPremium
                    ? "Premium domain"
                    : "Standard domain" // Adjust this line according to your component logic
                expect(screen.getByText(premiumText)).toBeInTheDocument()
            })

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`/check?domain=${domainName}`)
            )
        }
    )
})

/* Helper fns */

const enterDomainNameAndClickCheckButton = (domain: string) => {
    const inputField = screen.getByRole("textbox")

    fireEvent.change(inputField, { target: { value: domain } })

    const button = screen.getByRole("button")

    fireEvent.click(button)
}
