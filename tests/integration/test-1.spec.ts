import { expect, test } from "@playwright/test";
import "dotenv/config";
import clientPromise from "../../utils/mongodb";

test.beforeAll(async () => {
  const dbName = "playwright-test";
  const client = (await clientPromise).db(dbName);
  await client.dropDatabase();
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    // Get a unique place for the screenshot.
    const screenshotPath = testInfo.outputPath(`failure.png`);
    // Add it to the report.
    testInfo.attachments.push({
      name: "screenshot",
      path: screenshotPath,
      contentType: "image/png",
    });
    // Take the screenshot itself.
    await page.screenshot({ path: screenshotPath, timeout: 5000 });
  }
});

// login in before all tests
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.waitForURL(`/auth/login`);
  await page.getByLabel("Email *").click();
  await page.getByLabel("Email *").fill("test@mail.com");
  await page.getByLabel("Password *").click();
  await page.getByLabel("Password *").fill("password");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL(`/tasks`);
});

test("create project", async ({ page }) => {
  await page.getByRole("button", { name: "Create new project" }).click();
  await page.getByPlaceholder("Team Name").click();
  await page.getByPlaceholder("Team Name").fill("Test Project");
  await page.getByRole("button", { name: "Create new project" }).click();
  await page.waitForURL(`/teams/*-*-*-*-*`);
});

test("create task", async ({ page }) => {
  await page.getByRole("button", { name: "Create new project" }).click();
  await page.getByPlaceholder("Team Name").click();
  await page.getByPlaceholder("Team Name").fill("Test Project");
  await page.getByRole("button", { name: "Create new project" }).click();
  await page.waitForURL(`/teams/*-*-*-*-*`);
});

test("edit task", async ({ page }) => {
  await page.getByRole("button", { name: "Create new project" }).click();
  await page.getByPlaceholder("Team Name").click();
  await page.getByPlaceholder("Team Name").fill("Test Project");
  await page.getByRole("button", { name: "Create new project" }).click();
  await page.waitForURL(`/teams/*-*-*-*-*`);
});

test("create subtask", async ({ page }) => {
  await page.getByRole("button", { name: "Create new project" }).click();
  await page.getByPlaceholder("Team Name").click();
  await page.getByPlaceholder("Team Name").fill("Test Project");
  await page.getByRole("button", { name: "Create new project" }).click();
  await page.waitForURL(`/teams/*-*-*-*-*`);
});

test("link subtask", async ({ page }) => {
  await page.getByRole("button", { name: "Create new project" }).click();
  await page.getByPlaceholder("Team Name").click();
  await page.getByPlaceholder("Team Name").fill("Test Project");
  await page.getByRole("button", { name: "Create new project" }).click();
  await page.waitForURL(`/teams/*-*-*-*-*`);
});

test("delete task", async ({ page }) => {
  await page.getByRole("button", { name: "Create new project" }).click();
  await page.getByPlaceholder("Team Name").click();
  await page.getByPlaceholder("Team Name").fill("Test Project");
  await page.getByRole("button", { name: "Create new project" }).click();
  await page.waitForURL(`/teams/*-*-*-*-*`);
});
