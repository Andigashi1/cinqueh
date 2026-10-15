import { expect, test } from "@playwright/test";

const routes = ["/", "/chi-siamo", "/elettricisti", "/carpentieri"];
const sizes = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 667, height: 375 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
];

for (const viewport of sizes) {
  test(`pages and navigation at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("body")).toContainText("tutta Italia");
      await expect(page.locator("body")).not.toContainText(/Venezia|provincia/);
      expect(await page.locator('script[type="application/ld+json"]').evaluate((el) => JSON.parse(el.textContent!).areaServed)).toEqual({ "@type": "Country", name: "Italia" });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      if (viewport.width < 768) {
        await page.getByRole("button", { name: "Apri menu" }).click();
        const contact = page.locator("#mobile-navigation").getByRole("link", { name: "Contatti" });
        await contact.scrollIntoViewIfNeeded();
        await contact.click();
        await expect(page.getByRole("button", { name: "Apri menu" })).toHaveAttribute("aria-expanded", "false");
      } else {
        await page.locator("header").getByRole("link", { name: "Contatti", exact: true }).click();
      }
      await expect(page.locator("#contatti")).toBeInViewport();
      await expect(page.locator('#contatti a[href="tel:+393277363410"]')).toBeVisible();
      for (const section of await page.locator(".reveal").all()) {
        await section.scrollIntoViewIfNeeded();
        await expect(section).toHaveCSS("opacity", "1");
      }
      expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
    }
    expect(errors).toEqual([]);
  });
}

test("mobile menu handles keyboard and desktop resize", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Apri menu" });
  await toggle.click();
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator("#mobile-navigation").getByRole("link", { name: "Contatti" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Chiudi menu" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(page.locator("#mobile-navigation")).toHaveAttribute("inert", "");
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
  await page.setViewportSize({ width: 390, height: 844 });
  await toggle.click();
  await page.locator("#mobile-navigation").getByRole("link", { name: "Elettricisti", exact: true }).click();
  await expect(page).toHaveURL(/\/elettricisti$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("content remains visible when IntersectionObserver is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    Reflect.deleteProperty(window, "IntersectionObserver");
  });
  await page.goto("/");
  for (const section of await page.locator(".reveal").all()) {
    await expect(section).toHaveCSS("opacity", "1");
  }
});

test("content remains visible without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  for (const section of await page.locator(".reveal").all()) {
    await expect(section).toHaveCSS("opacity", "1");
  }
  await context.close();
});

test("reduced motion keeps content visible and disables smooth scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  for (const section of await page.locator(".reveal").all()) {
    await expect(section).toHaveCSS("opacity", "1");
  }
});

test("inquiry validates, reviews locally, and invalidates a stale summary", async ({ page }) => {
  const transmitted: string[] = [];
  page.on("request", (request) => {
    if (request.postData()?.includes("inquiry-check@example.com")) transmitted.push(request.url());
  });
  await page.goto("/");
  const contact = page.locator("#contatti");
  await contact.getByRole("button", { name: "Rivedi la richiesta", exact: true }).click();
  await expect(page.getByLabel("Nome o azienda")).toBeFocused();
  await expect(contact.locator('[aria-invalid="true"]')).toHaveCount(5);
  await page.getByLabel("Nome o azienda").fill("Verifica 5H");
  await page.getByLabel("Indirizzo email").fill("invalid");
  await page.getByLabel("Servizio", { exact: true }).selectOption("both");
  await page.getByLabel("Località e paese del progetto").fill("Lione, Francia");
  await page.getByLabel("Descrizione del progetto").fill("Verifica locale del modulo di richiesta.");
  await contact.getByRole("button", { name: "Rivedi la richiesta", exact: true }).click();
  await expect(page.getByLabel("Indirizzo email")).toBeFocused();
  await page.getByLabel("Indirizzo email").fill("inquiry-check@example.com");
  await contact.getByRole("button", { name: "Rivedi la richiesta", exact: true }).click();
  await expect(contact.getByRole("heading", { name: "La tua richiesta, da rivedere" })).toBeFocused();
  await expect(contact.locator(".form-review")).toContainText("Lione, Francia");
  await expect(contact.locator(".form-review")).toContainText("La richiesta non è stata inviata.");
  await expect(contact.locator('[aria-invalid="true"]')).toHaveCount(0);
  expect(transmitted).toEqual([]);
  await page.getByLabel("Nome o azienda").fill("Nome aggiornato");
  await expect(contact.locator(".form-review")).toHaveCount(0);
  await expect(page.getByLabel("Indirizzo email")).toHaveValue("inquiry-check@example.com");
});

test("work viewer supports navigation, Escape, and focus restoration", async ({ page }) => {
  await page.goto("/elettricisti");
  const opener = page.getByRole("button", { name: /^Ingrandisci:/ }).first();
  await opener.click();
  const viewer = page.getByRole("dialog", { name: "Galleria fotografica" });
  await expect(viewer).toBeVisible();
  await expect(viewer).toContainText("Foto 1 di 4");
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.keyboard.press("ArrowRight");
  await expect(viewer).toContainText("Foto 2 di 4");
  await page.keyboard.press("ArrowLeft");
  await expect(viewer).toContainText("Foto 1 di 4");
  await viewer.getByRole("button", { name: "Successiva" }).click();
  await expect(viewer).toContainText("Foto 2 di 4");
  await page.keyboard.press("Escape");
  await expect(viewer).not.toBeVisible();
  await expect(opener).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});
