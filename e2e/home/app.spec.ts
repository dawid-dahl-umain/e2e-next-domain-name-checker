import { test, expect } from "@playwright/test"

test.describe("/", () => {
    test.describe("Check Domain Availability", () => {
        test("should check and display domain availability results", async ({
            page
        }) => {
            // Given I open the domain checker page
            await page.goto("/")

            // Setting up request interception for specific domain check
            await page.route(
                "http://localhost:9000/check?domain=www.tddrocks.com",
                route =>
                    route.fulfill({
                        status: 200,
                        contentType: "application/json",
                        body: JSON.stringify({
                            domain: "www.tddrocks.com",
                            isAvailable: true,
                            isPremium: true,
                            discountCode: "DISCOUNT_50"
                        })
                    })
            )

            // When I provide a domain
            await page.fill(
                'input[data-test="domain-field"]',
                "www.tddrocks.com"
            )

            // And I click on check button
            await page.click(".check-button")

            // Then I see the availability of the domain
            // Access the results list and check the content of each list item
            const h3Result = page.locator("#analyses-result h3")
            const results = page.locator("#analyses-result li")

            // Check that the first item displays the domain name checked
            await expect(h3Result).toHaveText(
                "The searched domain is: www.tddrocks.com",
                { timeout: 5000 } // Optionally specify timeout for waiting for the text
            )

            // Check that the second item identifies the domain as a premium domain
            await expect(results.nth(0)).toHaveText("Premium domain")

            // Check that the third item offers a discount for the domain
            await expect(results.nth(1)).toHaveText("50% OFF")
        })
    })

    test.describe("Check Domain Links", () => {
        test("should navigate to the about page", async ({ page }) => {
            await page.goto("/")

            await page.click("text=About")

            await expect(page).toHaveURL("/about")

            await expect(page.locator("h1")).toContainText("About")
        })
    })
})
