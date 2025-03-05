import { LocalCodegenPreferenceOptions, SelectPreferenceOptions } from "types";

export const preferenceOptions: LocalCodegenPreferenceOptions[] = [
  {
    itemType: "individual_select",
    propertyName: "jsx",
    label: "React (JSX)",
    description: 'Render "class" attributes as "className"',
    isDefault: false,
    includedLanguages: ["HTML", "Tailwind"],
  },
  {
    itemType: "individual_select",
    propertyName: "optimizeLayout",
    label: "Optimize layout",
    description: "Attempt to auto-layout suitable element groups",
    isDefault: true,
    includedLanguages: ["HTML", "Tailwind", "Flutter", "SwiftUI"],
  },
  {
    itemType: "individual_select",
    propertyName: "showLayerNames",
    label: "Layer names",
    description: "Include layer names in classes",
    isDefault: false,
    includedLanguages: ["HTML", "Tailwind"],
  },
  {
    itemType: "individual_select",
    propertyName: "roundTailwindValues",
    label: "Round values",
    description:
      "Round pixel values to nearest Tailwind sizes (within a 15% range)",
    isDefault: false,
    includedLanguages: ["Tailwind"],
  },
  {
    itemType: "individual_select",
    propertyName: "roundTailwindColors",
    label: "Round colors",
    description: "Round color values to nearest Tailwind colors",
    isDefault: false,
    includedLanguages: ["Tailwind"],
  },
  {
    itemType: "individual_select",
    propertyName: "customTailwindColors",
    label: "Color variables",
    description: "Use color variable names as custom color names",
    isDefault: false,
    includedLanguages: ["HTML", "Tailwind"],
  },
  {
    itemType: "individual_select",
    propertyName: "embedImages",
    label: "Embed Images",
    description: "Convert images to Base64 and embed them in the code.",
    isDefault: false,
    includedLanguages: ["HTML"],
  },
  {
    itemType: "individual_select",
    propertyName: "embedVectors",
    label: "Embed Vectors",
    description: "Convert vectors in the code.",
    isDefault: false,
    includedLanguages: ["HTML", "Tailwind"],
  },
  // Add your preferences data here
];

export const selectPreferenceOptions: SelectPreferenceOptions[] = [
  {
    itemType: "select",
    propertyName: "flutterGenerationMode",
    label: "Mode",
    options: [
      { label: "Full App", value: "fullApp" },
      { label: "Widget", value: "stateless" },
      { label: "Snippet", value: "snippet" },
    ],
    includedLanguages: ["Flutter"],
  },
  {
    itemType: "select",
    propertyName: "swiftUIGenerationMode",
    label: "Mode",
    options: [
      { label: "Preview", value: "preview" },
      { label: "Struct", value: "struct" },
      { label: "Snippet", value: "snippet" },
    ],
    includedLanguages: ["SwiftUI"],
  },
];
