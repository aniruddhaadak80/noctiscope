import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("landing renders headline", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "subconscious",
  );
});

test("atlas lists amygdala", async ({ page }) => {
  await page.goto("/atlas");
  await expect(page.getByText("Amygdala")).toBeVisible();
});

test("a11y on landing", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
