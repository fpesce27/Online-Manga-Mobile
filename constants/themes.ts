import { MD3LightTheme as DefaultTheme } from "react-native-paper";

const mytheme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    primary: "#F8BBD0",
    primaryContainer: "#F06292",
    secondary: "#B2EBF2",
    secondaryContainer: "#26C6DA",
    tertiary: "#FFF59D",
    tertiaryContainer: "#FFB900",
    surface: "#F5F5F5",
    surfaceVariant: "#EEEEEE",
    background: "#FFFFFF",
    error: "#E57373",
    errorContainer: "#D32F2F",
    onPrimary: "#FFFFFF",
    onPrimaryContainer: "#FFFFFF",
    onSecondary: "#000000",
    onSecondaryContainer: "#000000",
    onTertiary: "#000000",
    onTertiaryContainer: "#000000",
    onSurface: "#000000",
    onSurfaceVariant: "#000000",
    onError: "#FFFFFF",
    onErrorContainer: "#FFFFFF",
    onBackground: "#000000",
    outline: "#BDBDBD",
    outlineVariant: "#757575",
    inverseSurface: "#212121",
    inverseOnSurface: "#FFFFFF",
    inversePrimary: "#FFFFFF",
    shadow: "#000000",
  },
};
export default mytheme;
