import { test, expect } from "@playwright/test";

test("register", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.waitForURL("http://localhost:3000/auth/login");
  await page.getByLabel("Email *").click();
  await page.getByLabel("Email *").fill("test@mail.com");
  await page.getByLabel("Password *").click();
  await page.getByLabel("Password *").fill("password");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL("http://localhost:3000/tasks");
});
