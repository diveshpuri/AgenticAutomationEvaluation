const { expect } = require('@playwright/test');

class Helpers {
  static async waitForElement(page, selector, timeout = 10000) {
    try {
      await page.waitForSelector(selector, { timeout, state: 'visible' });
      return true;
    } catch (error) {
      console.warn(`Element not found: ${selector}`);
      return false;
    }
  }

  static async waitForShadowElement(page, hostSelector, shadowSelector, timeout = 10000) {
    try {
      const host = await page.waitForSelector(hostSelector, { timeout });
      if (host) {
        await page.waitForSelector(`${hostSelector} >> ${shadowSelector}`, { timeout, state: 'visible' });
        return true;
      }
      return false;
    } catch (error) {
      console.warn(`Shadow element not found: ${hostSelector} >> ${shadowSelector}`);
      return false;
    }
  }

  static async clickWithRetry(page, selector, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        await page.click(selector, { timeout: 5000 });
        return true;
      } catch (error) {
        if (i === maxRetries - 1) {
          throw error;
        }
        await page.waitForTimeout(1000);
      }
    }
    return false;
  }

  static async typeWithClear(page, selector, text) {
    await page.fill(selector, '');
    await page.type(selector, text);
  }

  static async waitForPageLoad(page, timeout = 30000) {
    await Promise.all([
      page.waitForLoadState('networkidle', { timeout }),
      page.waitForLoadState('domcontentloaded', { timeout })
    ]);
  }

  static async waitForApiResponse(page, urlPattern, timeout = 15000) {
    return page.waitForResponse(response => 
      response.url().includes(urlPattern) && response.status() === 200,
      { timeout }
    );
  }

  static async takeScreenshot(page, name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `screenshots/${name}-${timestamp}.png`;
    await page.screenshot({ path: filename, fullPage: true });
    return filename;
  }

  static async scrollIntoView(page, selector) {
    await page.locator(selector).scrollIntoViewIfNeeded();
  }

  static async getElementText(page, selector) {
    try {
      return await page.textContent(selector);
    } catch (error) {
      console.warn(`Could not get text for selector: ${selector}`);
      return '';
    }
  }

  static async isElementVisible(page, selector) {
    try {
      return await page.isVisible(selector);
    } catch (error) {
      return false;
    }
  }

  static async waitForElementToDisappear(page, selector, timeout = 10000) {
    try {
      await page.waitForSelector(selector, { state: 'hidden', timeout });
      return true;
    } catch (error) {
      return false;
    }
  }

  static async handleShadowRoot(page, hostSelector, shadowSelector) {
    const flexibleSelectors = [
      `${hostSelector} >> ${shadowSelector}`,
      `${hostSelector} ${shadowSelector}`,
      shadowSelector
    ];

    for (const selector of flexibleSelectors) {
      try {
        if (await this.isElementVisible(page, selector)) {
          return selector;
        }
      } catch (error) {
        continue;
      }
    }
    
    throw new Error(`Could not find element with any selector variation for ${hostSelector} >> ${shadowSelector}`);
  }

  static async verifyElementCount(page, selector, expectedCount) {
    const elements = await page.locator(selector).count();
    expect(elements).toBe(expectedCount);
  }

  static async verifyTextContains(page, selector, expectedText) {
    const text = await this.getElementText(page, selector);
    expect(text.toLowerCase()).toContain(expectedText.toLowerCase());
  }

  static async verifyElementExists(page, selector) {
    const exists = await this.isElementVisible(page, selector);
    expect(exists).toBe(true);
  }

  static generateTestId() {
    return `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

module.exports = Helpers;
