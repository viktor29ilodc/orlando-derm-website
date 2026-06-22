import asyncio
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 1500})

        print("Navigating to insurance page...")
        await page.goto("http://localhost:3000/insurance", wait_until="networkidle")
        print("Page loaded.")

        # --- HERO screenshot ---
        hero_clip = {"x": 0, "y": 0, "width": 1280, "height": 500}
        await page.screenshot(
            path="C:/Projects/orlando-derm-website/.tmp-screenshots/insurance-hero.png",
            clip=hero_clip
        )
        print("Hero screenshot saved.")

        # Get hero section text
        hero_texts = await page.locator("section").first.inner_text()
        print("Hero section text (first 600 chars):")
        print(repr(hero_texts[:600]))

        # --- Verify Your Coverage section ---
        verify_section = page.locator('section:has(h2:has-text("Verify Your Coverage"))')
        count = await verify_section.count()
        print(f"Verify section count: {count}")

        if count > 0:
            await verify_section.scroll_into_view_if_needed()
            await page.wait_for_timeout(500)
            await verify_section.screenshot(
                path="C:/Projects/orlando-derm-website/.tmp-screenshots/insurance-verify.png"
            )
            print("Verify section element screenshot saved.")
            verify_text = await verify_section.inner_text()
            print("Verify section text (repr):")
            print(repr(verify_text))
        else:
            print("Verify section NOT FOUND, taking fallback viewport screenshot")
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.7)")
            await page.wait_for_timeout(500)
            await page.screenshot(
                path="C:/Projects/orlando-derm-website/.tmp-screenshots/insurance-verify.png"
            )

        # --- Full page text ---
        full_text = await page.inner_text("body")
        print("\n=== FULL PAGE TEXT (repr) ===")
        print(repr(full_text[:5000]))

        await browser.close()
        print("Done.")

asyncio.run(main())
