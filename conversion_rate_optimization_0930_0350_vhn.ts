// 代码生成时间: 2025-09-30 03:50:24
// Import necessary modules
import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

// Define an interface for conversion rate data
interface ConversionRateData {
  id: string;
  conversionRate: number;
}

// Define a class for the ConversionRateOptimizer
class ConversionRateOptimizer {
  private data: ConversionRateData[];

  constructor() {
    // Initialize an empty array to store conversion rate data
    this.data = [];
  }

  // Method to add conversion rate data
  public addData(data: ConversionRateData): void {
    this.data.push(data);
  }

  // Method to calculate the average conversion rate
  public calculateAverage(): number {
    if (this.data.length === 0) {
      throw new Error("No data available to calculate average conversion rate.");
    }

    const totalConversionRate = this.data.reduce((sum, item) => sum + item.conversionRate, 0);
    return totalConversionRate / this.data.length;
  }

  // Method to find the minimum conversion rate
  public findMinimum(): ConversionRateData | undefined {
    return this.data.reduce<ConversionRateData | undefined>((prev, current) => {
      return (prev ? prev.conversionRate < current.conversionRate : true) ? prev : current;
    }, undefined);
  }

  // Method to find the maximum conversion rate
  public findMaximum(): ConversionRateData | undefined {
    return this.data.reduce<ConversionRateData | undefined>((prev, current) => {
      return (prev ? prev.conversionRate > current.conversionRate : true) ? prev : current;
    }, undefined);
  }
}

// Example usage
try {
  // Create an instance of the ConversionRateOptimizer
  const optimizer = new ConversionRateOptimizer();

  // Add some sample data
  optimizer.addData({ id: "1", conversionRate: 10 });
  optimizer.addData({ id: "2", conversionRate: 20 });
  optimizer.addData({ id: "3", conversionRate: 15 });

  // Calculate and print the average conversion rate
  console.log("Average Conversion Rate: ", optimizer.calculateAverage());

  // Find and print the minimum conversion rate data
  const minData = optimizer.findMinimum();
  if (minData) {
    console.log("Minimum Conversion Rate Data: ", minData);
  }

  // Find and print the maximum conversion rate data
  const maxData = optimizer.findMaximum();
  if (maxData) {
    console.log("Maximum Conversion Rate Data: ", maxData);
  }
} catch (error: any) {
  // Handle any errors that occur during the program execution
  console.error("An error occurred: ", error.message);
}