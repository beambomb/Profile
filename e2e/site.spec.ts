import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const projectSlugs = [
  "vanigrow",
  "aemads",
  "turbofan-predictive-maintenance",
  "weather-elt-pipeline",
  "carikos",
];

test.describe("routes", () => {
  test("home page renders the main sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Johannes De Deo Dimas Aryobimo");
    for (const id of ["about", "skills", "projects", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    await expect(page.locator("#certificates")).toBeAttached();
  });

  for (const slug of projectSlugs) {
    test(`project page /projects/${slug} renders`, async ({ page }) => {
      const response = await page.goto(`/projects/${slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("heading", { level: 2, name: "The problem" })).toBeAttached();
    });
  }

  test("unknown project slug returns 404", async ({ page }) => {
    const response = await page.goto("/projects/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });

  test("sitemap and robots are served", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain("/projects/vanigrow");
    expect((await request.get("/robots.txt")).status()).toBe(200);
  });
});

test.describe("accessibility (axe, automated only)", () => {
  for (const path of ["/", "/projects/vanigrow", "/projects/turbofan-predictive-maintenance"]) {
    test(`no serious or critical violations on ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.reload();
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      const blocking = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(blocking.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    });
  }
});

test.describe("responsive layout", () => {
  for (const width of [375, 768, 1024, 1440]) {
    for (const path of ["/", "/projects/aemads"]) {
      test(`no horizontal scroll at ${width}px on ${path}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        await page.emulateMedia({ reducedMotion: "reduce" });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }
  }
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("all sections are visible in the initial HTML", async ({ page }) => {
    await page.goto("/");
    const heading = page.getByRole("heading", { name: "Get in touch" });
    await expect(heading).toBeVisible();
    await expect(heading.locator("xpath=..")).toHaveCSS("opacity", "1");
    await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
  });
});

test.describe("motion and keyboard", () => {
  test("reduced motion shows the full tagline with no skip button", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Skip animation" })).toHaveCount(0);
    await expect(page.locator("#about")).toBeVisible();
  });

  test("the typing animation can be skipped", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const skip = page.getByRole("button", { name: "Skip animation" });
    await skip.click();
    await expect(skip).toHaveCount(0);
  });

  test("first Tab reveals the skip link, which moves focus to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("mobile menu opens and Esc closes it", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("navigation", { name: "Mobile" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });

  test("scroll progress bar and active nav follow the reader", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await page.locator("#skills").scrollIntoViewIfNeeded();
    await page.evaluate(() => document.querySelector("#skills")?.scrollIntoView({ block: "start" }));
    await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Skills" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect
      .poll(async () =>
        page.evaluate(() => {
          const bar = document.querySelector('[class*="origin-left"]') as HTMLElement | null;
          const m = bar?.style.transform.match(/scaleX\(([\d.]+)\)/);
          return m ? Number(m[1]) : 0;
        }),
      )
      .toBeGreaterThan(0.95);
  });

  test("below-the-fold sections reveal on scroll", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await expect(page.locator('[data-reveal="hidden"]').first()).toBeAttached();
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    const heading = page.getByRole("heading", { name: "Get in touch" });
    await expect(heading.locator("xpath=..")).toHaveAttribute("data-reveal", "shown");
    await expect(heading.locator("xpath=..")).toHaveCSS("opacity", "1");
  });

  test("project cards follow the cursor with a spotlight", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const card = page.getByRole("article").first();
    await card.scrollIntoViewIfNeeded();
    const box = await card.boundingBox();
    if (!box) throw new Error("card not visible");
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.move(box.x + box.width / 2 + 20, box.y + box.height / 2 + 10);
    const mx = await card.evaluate((el) => (el as HTMLElement).style.getPropertyValue("--mx"));
    expect(mx).toMatch(/px$/);
    const transform = await card.evaluate((el) => (el as HTMLElement).style.transform);
    expect(transform).toContain("perspective");
  });

  test("reduced motion disables tilt", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const card = page.getByRole("article").first();
    await card.scrollIntoViewIfNeeded();
    const box = await card.boundingBox();
    if (!box) throw new Error("card not visible");
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.move(box.x + box.width / 2 + 20, box.y + box.height / 2 + 10);
    expect(await card.evaluate((el) => (el as HTMLElement).style.transform)).toBe("");
  });

  test("certificate image opens in a dialog and Esc closes it", async ({ page }) => {
    await page.goto("/");
    const opener = page.getByRole("button", { name: /View certificate image: Associate Data Engineer in SQL/ });
    await opener.scrollIntoViewIfNeeded();
    await opener.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("img")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(opener).toBeFocused();
  });

  test("copy email button gives feedback", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await page.getByRole("button", { name: "Copy email" }).click();
    await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
  });

  test("project filter narrows the grid", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("button", { name: "Data", exact: true }).click();
    await expect(page.getByText("Showing 2 of 5 projects")).toBeVisible();
  });
});
