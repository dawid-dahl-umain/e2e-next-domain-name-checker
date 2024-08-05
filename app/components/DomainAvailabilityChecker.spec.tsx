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

    describe("When domain specified by user", () => {
        it("should display base domain check for non-premium domains", async () => {
            // Arrange
            const domainName = "lifetastesgreat.com"
            const mockedResponse = {
                domain: domainName,
                isPremium: false,
                isAvailable: false
            }
            fetchMock.mockResponseOnce(JSON.stringify(mockedResponse))
            render(<DomainAvailabilityChecker />)

            // Act
            enterDomainNameAndClickCheckButton(domainName)

            // Assert
            await waitFor(() => {
                expect(
                    screen.getByText(`The searched domain is: ${domainName}`)
                ).toBeInTheDocument()
            })
            await waitFor(() => {
                expect(screen.queryByText("Premium domain")).toBeNull()
            })
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`/check?domain=${domainName}`)
            )
        })

        it("should display 'No results available' when the API return 404", async () => {
            // Arrange
            const domainName = "cool.com"
            const mockedResponse = {}
            fetchMock.mockResponseOnce(JSON.stringify(mockedResponse), {
                status: 404
            })
            render(<DomainAvailabilityChecker />)

            // Act
            enterDomainNameAndClickCheckButton(domainName)

            // Assert
            await waitFor(() => {
                expect(
                    screen.getByText(`The searched domain is: ${domainName}`)
                ).toBeInTheDocument()
            })
            await waitFor(() => {
                expect(
                    screen.getByText("No results available")
                ).toBeInTheDocument()
            })
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`/check?domain=${domainName}`)
            )
        })

        it("should display base domain check for premium domains", async () => {
            // Arrange
            const domainName = "tddrocks.com"
            const mockedResponse = {
                domain: domainName,
                isPremium: true,
                isAvailable: false
            }
            fetchMock.mockResponseOnce(JSON.stringify(mockedResponse))
            render(<DomainAvailabilityChecker />)

            // Act
            enterDomainNameAndClickCheckButton(domainName)

            // Assert
            await waitFor(() => {
                expect(
                    screen.getByText(`The searched domain is: ${domainName}`)
                ).toBeInTheDocument()
            })
            await waitFor(() => {
                expect(screen.getByText("Premium domain")).toBeInTheDocument()
            })
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`/check?domain=${domainName}`)
            )
        })

        it("should display domain not available when availability flag is false", async () => {
            // Arrange
            const domainName = "google.com"
            const mockedResponse = { domain: domainName, isAvailable: false }

            fetchMock.mockResponseOnce(JSON.stringify(mockedResponse))

            render(<DomainAvailabilityChecker />)

            // Act
            enterDomainNameAndClickCheckButton(domainName)

            // Assert
            await waitFor(() => {
                expect(
                    screen.getByText("This domain is not available")
                ).toBeInTheDocument()
            })
        })

        it("should reset previous domain check results when typing", async () => {
            // Arrange
            const domainName = "tddrocks.com"
            const mockedResponse = {
                domain: domainName,
                isPremium: true,
                isAvailable: false
            }
            fetchMock.mockResponseOnce(JSON.stringify(mockedResponse))
            render(<DomainAvailabilityChecker />)

            // Act
            enterDomainNameAndClickCheckButton(domainName)

            // Assert
            await waitFor(() => {
                expect(screen.getByText("Premium domain")).toBeInTheDocument()
                const inputField = screen.getByRole("textbox")
                fireEvent.change(inputField, { target: { value: "something" } })
                expect(screen.queryByText("Premium domain")).toBeNull()
            })
        })

        describe("Discounts", () => {
            it("should not display any discount message when there is no discount code", async () => {
                // Arrange
                const domainName = "lifetastesgreat.com"
                const mockedResponse = {
                    domain: domainName,
                    isPremium: false,
                    isAvailable: false
                }
                fetchMock.mockResponseOnce(JSON.stringify(mockedResponse))
                render(<DomainAvailabilityChecker />)

                // Act
                enterDomainNameAndClickCheckButton(domainName)

                // Assert
                await waitFor(() => {
                    expect(screen.queryByText("20% OFF")).toBeNull()
                })
            })

            const discountCodes = [
                { code: "DISCOUNT_20", expectedText: "20% OFF" },
                { code: "DISCOUNT_50", expectedText: "50% OFF" },
                {
                    code: "RENEWAL_DISCOUNT_90",
                    expectedText: "90% RENEWAL DISCOUNT"
                }
            ]

            test.each(discountCodes)(
                "should display $expectedText when discount code is $code",
                async ({ code, expectedText }) => {
                    // Arrange
                    const domainName = "lifetastesgreat.com"
                    const mockedResponse = {
                        domain: domainName,
                        isPremium: false,
                        isAvailable: false,
                        discountCode: code
                    }
                    fetchMock.mockResponseOnce(JSON.stringify(mockedResponse))
                    render(<DomainAvailabilityChecker />)

                    // Act
                    enterDomainNameAndClickCheckButton(domainName)

                    // Assert
                    await waitFor(() => {
                        expect(
                            screen.getByText(expectedText)
                        ).toBeInTheDocument()
                    })
                }
            )
        })

        describe("User interactions", () => {
            it("should submit the form when the Enter key is pressed", async () => {
                // Arrange
                const domainName = "example.com"
                const mockedResponse = {
                    domain: domainName,
                    isPremium: false,
                    isAvailable: true
                }
                fetchMock.mockResponseOnce(JSON.stringify(mockedResponse))
                render(<DomainAvailabilityChecker />)

                // Act
                const inputField = screen.getByRole("textbox")
                fireEvent.change(inputField, { target: { value: domainName } })
                fireEvent.keyDown(inputField, {
                    key: "Enter",
                    code: "Enter",
                    charCode: 13
                })

                // Assert
                await waitFor(() => {
                    expect(
                        screen.getByText(
                            `The searched domain is: ${domainName}`
                        )
                    ).toBeInTheDocument()
                })
                expect(global.fetch).toHaveBeenCalledWith(
                    expect.stringContaining(`/check?domain=${domainName}`)
                )
            })
        })

        describe("Error handling", () => {
            it("should display 'Error while fetching data' in case of API error", async () => {
                // Arrange
                const domainName = "lifetastesgreat.com"
                fetchMock.mockReject(new Error("API is down"))
                render(<DomainAvailabilityChecker />)

                // Act
                enterDomainNameAndClickCheckButton(domainName)

                // Assert
                await waitFor(() => {
                    expect(
                        screen.getByText("Error while fetching data")
                    ).toBeInTheDocument()
                })
            })
        })
    })
})

/* Helper fns */

const enterDomainNameAndClickCheckButton = (domain: string) => {
    const inputField = screen.getByRole("textbox")
    fireEvent.change(inputField, { target: { value: domain } })
    const button = screen.getByRole("button")
    fireEvent.click(button)
}
