// 代码生成时间: 2025-10-02 20:34:38
// Import necessary modules from Deno
import { BufReader, BufWriter } from "https://deno.land/std/io/bufio.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

// Define an interface for the security test configuration
interface SecurityTestConfig {
  allowHtml: boolean;
  allowScriptTags: boolean;
}

// Define the SecurityTestTool class
class SecurityTestTool {
  // Configuration for the security tests
  private config: SecurityTestConfig;

  constructor(config: SecurityTestConfig) {
    this.config = config;
  }

  /**
   * Test if the input data is safe to use.
   * @param data The input data to test.
   * @returns A boolean indicating if the data is safe.
   */
  public testInput(data: string): boolean {
    try {
      // Check if HTML tags are allowed
      if (!this.config.allowHtml) {
        const htmlRegex = /<[^>]*>/g;
        if (htmlRegex.test(data)) {
          throw new Error("HTML tags are not allowed");
        }
      }

      // Check if script tags are allowed
      if (!this.config.allowScriptTags) {
        const scriptTagRegex = /<script[^>]*>([\s\S]*?)</script>/gi;
        if (scriptTagRegex.test(data)) {
          throw new Error("Script tags are not allowed");
        }
      }

      // If data passes all tests, it is considered safe
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

// Example usage of the SecurityTestTool
const config: SecurityTestConfig = {
  allowHtml: false,
  allowScriptTags: false
};

const securityTestTool = new SecurityTestTool(config);

// Test a sample input
const sampleInput = "<script>alert('XSS')</script>";
const isInputSafe = securityTestTool.testInput(sampleInput);
console.log(`Is input safe? ${isInputSafe}`);