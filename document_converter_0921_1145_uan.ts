// 代码生成时间: 2025-09-21 11:45:10
import { existsSync, readFileSync, writeFileSync } from 'https://deno.land/std/fs/mod.ts';
import { parse } from 'https://deno.land/std/flags/mod.ts';
import { encode } from 'https://deno.land/x/yaml/mod.ts';

// Define the command line interface options
const options = parse(Deno.args);

// Check if the input file path is provided
if (!options['input']) {
    console.error('Error: Please provide an input file path using --input');
    Deno.exit(1);
}

// Check if the output file path is provided
if (!options['output']) {
    console.error('Error: Please provide an output file path using --output');
    Deno.exit(1);
}

// Function to convert document formats
function convertDocument(inputPath: string, outputPath: string, targetFormat: string): void {
    // Check if the input file exists
    if (!existsSync(inputPath)) {
        throw new Error(`Input file not found: ${inputPath}`);
    }

    // Read the input file content
    const content = readFileSync(inputPath);

    // Perform the conversion based on the target format
    let convertedContent;
    switch (targetFormat) {
        case 'yaml':
            convertedContent = encode(JSON.parse(content.toString()));
            break;
        // Add more cases for other formats if needed
        default:
            throw new Error(`Unsupported format: ${targetFormat}`);
    }

    // Write the converted content to the output file
    writeFileSync(outputPath, convertedContent);
    console.log(`Document converted successfully and saved to ${outputPath}`);
}

// Main function to run the converter
async function main(): Promise<void> {
    try {
        // Extract the input and output file paths from the command line options
        const inputPath = options['input'];
        const outputPath = options['output'];
        const targetFormat = options['format'] || 'yaml';

        // Call the conversion function
        convertDocument(inputPath, outputPath, targetFormat);
    } catch (error) {
        console.error('Error:', error.message);
        Deno.exit(1);
    }
}

// Run the main function
main();