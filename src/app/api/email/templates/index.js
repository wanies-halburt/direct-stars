import fs from "fs";

export function parseHtmlFile(htmlFile, variables) {
  const htmlContent = fs.readFileSync(htmlFile, "utf-8");

  let processedContent = htmlContent;
  // Replace variables with corresponding values
  variables.forEach(({ variable, value }) => {
    const regex = new RegExp(`(?<!<svg[^>]*>){{${variable}}}(?!</svg>)`, "g");
    processedContent = processedContent.replace(regex, value);
  });

  return processedContent;
}
