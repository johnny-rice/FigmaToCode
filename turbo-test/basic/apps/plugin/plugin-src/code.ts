import {
  run,
  flutterMain,
  tailwindMain,
  swiftuiMain,
  convertIntoNodes,
  htmlMain,
  PluginSettings,
} from "backend";

let userPluginSettings: PluginSettings;

const defaultPluginSettings = {
  framework: "HTML",
  jsx: true,
  optimize: true,
  layerName: true,
  inlineStyle: true,
};

// A helper type guard to ensure the key belongs to the PluginSettings type
function isKeyOfPluginSettings(key: string): key is keyof PluginSettings {
  return key in defaultPluginSettings;
}

const getUserSettings = async () => {
  const possiblePluginSrcSettings =
    (await figma.clientStorage.getAsync("userPluginSettings")) ?? {};

  const updatedPluginSrcSettings = {
    ...defaultPluginSettings,
    ...Object.keys(defaultPluginSettings).reduce((validSettings, key) => {
      if (
        isKeyOfPluginSettings(key) &&
        key in possiblePluginSrcSettings &&
        typeof possiblePluginSrcSettings[key] ===
          typeof defaultPluginSettings[key]
      ) {
        validSettings[key] = possiblePluginSrcSettings[key] as any;
      }
      return validSettings;
    }, {} as Partial<PluginSettings>),
  };

  userPluginSettings = updatedPluginSrcSettings as PluginSettings;
};

const initSettings = async () => {
  await getUserSettings();
  figma.ui.postMessage({
    type: "pluginSettingChanged",
    data: userPluginSettings,
  });

  safeRun(userPluginSettings);
};

const safeRun = (settings: PluginSettings) => {
  try {
    run(settings);
  } catch (e) {
    console.log(e);

    if (e && typeof e === "object" && "message" in e) {
      figma.ui.postMessage({
        type: "error",
        data: e.message,
      });
    }
  }
};

const standardMode = async () => {
  figma.showUI(__html__, { width: 450, height: 550, themeColors: true });
  await initSettings();
  figma.on("selectionchange", () => {
    safeRun(userPluginSettings);
  });
  figma.ui.onmessage = (msg) => {
    console.log("[node] figma.ui.onmessage", msg);

    if (msg.type === "pluginSettingChanged") {
      (userPluginSettings as any)[msg.key] = msg.value;
      figma.clientStorage.setAsync("userPluginSettings", userPluginSettings);
      figma.ui.postMessage({
        type: "pluginSettingChanged",
        data: userPluginSettings,
      });
      safeRun(userPluginSettings);
    }
  };
};

switch (figma.mode) {
  case "default":
  case "panel":
    standardMode();
    break;
  case "codegen":
    initSettings();
    // figma.codegen.on("preferenceschange", (preferences) => {

    // });

    figma.codegen.on("generate", ({ language, node }) => {
      const convertedSelection = convertIntoNodes([node], null);

      switch (language) {
        case "html":
          return [
            {
              title: `HTML`,
              code: htmlMain(convertedSelection, node.parent?.id, true),
              language: "HTML",
            },
          ];
        case "tailwind":
          return [
            {
              title: `Whole Code`,
              code: tailwindMain(
                convertedSelection,
                node.parent?.id,
                true,
                false
              ),
              language: "HTML",
            },
            {
              title: `Layout`,
              code: tailwindMain(
                convertedSelection,
                node.parent?.id,
                true,
                false
              ),
              language: "HTML",
            },
            {
              title: `Style`,
              code: tailwindMain(
                convertedSelection,
                node.parent?.id,
                true,
                false
              ),
              language: "HTML",
            },
            {
              title: `Colors`,
              code: tailwindMain(
                convertedSelection,
                node.parent?.id,
                true,
                false
              ),
              language: "HTML",
            },
          ];
        case "flutter":
          return [
            {
              title: `Flutter`,
              code: flutterMain(convertedSelection, node.parent?.id, true),
              language: "SWIFT",
            },
          ];
        case "swiftui":
          return [
            {
              title: `SwiftUI`,
              code: swiftuiMain(convertedSelection, node.parent?.id),
              language: "SWIFT",
            },
          ];
        default:
          break;
      }

      const blocks: CodegenResult[] = [
        {
          title: `Tailwind Code`,
          code: tailwindMain(convertedSelection, node.parent?.id, true, false),
          language: "HTML",
        },
        {
          title: `Flutter`,
          code: flutterMain(convertedSelection, node.parent?.id, true),
          language: "SWIFT",
        },
        {
          title: `SwiftUI`,
          code: swiftuiMain(convertedSelection, node.parent?.id),
          language: "SWIFT",
        },
        {
          title: `Settings`,
          code: "To change settings, export to\n CodeSandbox, and see a preview,\n click in the 'Plugins' tab above",
          language: "JSON",
        },
        // {
        //   title: `Tailwind Colors`,
        //   code: JSON.stringify(colors).split(", ").join(",\n"),
        //   language: "JSON",
        // },
      ];

      figma.showUI(__html__, { visible: false });
      return blocks;
    });
  default:
    break;
}