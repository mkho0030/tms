import { test, expect } from "@playwright/test";

// login in before all tests
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.waitForURL("http://localhost:3000/auth/login");
  await page.getByLabel("Email *").click();
  await page.getByLabel("Email *").fill("test@mail.com");
  await page.getByLabel("Password *").click();
  await page.getByLabel("Password *").fill("password");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL("http://localhost:3000/tasks");
});

test("create project", async ({ page }) => {
  await page.getByRole("button", { name: "Create new Team" }).click();
  await page.getByPlaceholder("Team Name").click();
  await page.getByPlaceholder("Team Name").fill("Test Project");
  await page.getByRole("button", { name: "Create new team" }).click();
  await page.waitForURL("http://localhost:3000/teams/*-*-*-*-*");
  // await expect(
  //   page.getByRole("button", { name: "Test Project", exact: true })
  // ).toBeVisible();
});
