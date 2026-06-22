import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 1500})

        print("Navigating to insurance page...")
        await page.goto("http://localhost:3000/insurance", wait_until="networkidle")
        print("Page loaded.")

        # --- HERO screenshot ---
        # The hero is the top navy section; screenshot the top portion
        hero_clip = {"x": 0, "y": 0, "width": 1280, "height": 500}
        await page.screenshot(
            path="C:/Projects/orlando-derm-website/.tmp-screenshots/insurance-hero.png",
            clip=hero_clip
        )
        print("Hero screenshot saved.")

        # Grab the opening line text from the hero section
        # Try to find the paragraph in the hero/navy section
        hero_texts = await page.locator("section").first.inner_text()
        print("Hero section text (first 500 chars):")
        print(hero_texts[:500])

        # --- Scroll to Verify Your Coverage section ---
        verify_section = page.locator('section:has(h2:has-text("Verify Your Coverage"))')
        count = await verify_section.count()
        print(f"Verify section count: {count}")

        if count > 0:
            await verify_section.scroll_into_view_if_needed()
            await page.wait_for_timeout(500)
            # Try element screenshot
            await verify_section.screenshot(
                path="C:/Projects/orlando-derm-website/.tmp-screenshots/insurance-verify.png"
            )
            print("Verify section element screenshot saved.")
            verify_text = await verify_section.inner_text()
            print("Verify section text:")
            print(verify_text)
        else:
            # Fallback: scroll and viewport screenshot
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.7)")
            await page.wait_for_timeout(500)
            await page.screenshot(
                path="C:/Projects/orlando-derm-website/.tmp-screenshots/insurance-verify.png"
            )
            print("Fallback verify screenshot saved.")

        # --- Get ALL page text for verification ---
        full_text = await page.inner_text("body")
        print("\n=== FULL PAGE TEXT ===")
        print(full_text[:4000])

        await browser.close()

asyncio.run(main())
