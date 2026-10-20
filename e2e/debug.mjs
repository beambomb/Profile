import { chromium } from "@playwright/test";

const browser = await chromium.launch({ channel: "msedge" });
for (const reducedMotion of ["reduce", "no-preference"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  await page.goto("http://localhost:3100/projects/turbofan-predictive-maintenance", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const info = await page.evaluate(() => {
    const sec = document.querySelector("#problem");
    const wrap = sec?.parentElement;
    return {
      wrapperStyle: wrap?.getAttribute("style"),
      wrapperOpacity: wrap ? getComputedStyle(wrap).opacity : null,
      sectionTop: sec ? Math.round(sec.getBoundingClientRect().top + scrollY) : null,
    };
  });
  console.log(reducedMotion, JSON.stringify(info), "errors:", JSON.stringify(errors));
  await ctx.close();
}
await browser.close();
