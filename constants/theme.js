import { Dimensions } from "react-native";
import { getFontScale } from "react-native/Libraries/Utilities/PixelRatio";
const { width, height } = Dimensions.get("window");
const scale = getFontScale();
export const COLORS = {
    primary: "#C0E6BA",     // Light purple
    secondary:"#4CA771",
    light: "#EAF9E7",   // Dark purple
    backgroundOpacity:'rgba(51,134,254,.75)',
    dark: "#013237",

    white: "#ffffff",
    green: "#37E39F",
    red: "#F9A8BA",
    gray: "#6A6A6A",
    lightGray: "#dbdbdb",
    lightGray1: "#f5f6fa"
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    // h1: 22,
    // h2: 18,
    // h3: 14,
    // h4: 12,
    // body1: 20,
    // body2: 16,
    // body3: 14,
    // body4: 12,
    // body5: 8,

     h1:scale<1 ? 30 : 24,
     h2:scale<1 ? 22 : 18,
     h3:scale<1 ? 16 : 12,
     h4:scale<1 ? 14 : 10,
     body1:scale<1 ? 28 : 22,
     body2:scale<1 ? 20 : 16,
     body3:scale<1 ? 16 : 14,
     body4:scale<1 ? 14 : 10,
     body5:scale<1 ? 12 : 8,

    // app dimensions
    width,
    height
};
export const FONTS = {
    h1: { fontFamily: "Baloo2-Bold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Baloo2-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Baloo2-Regular", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Baloo2-Regular", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Baloo2-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Baloo2-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Baloo2-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Baloo2-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Baloo2-Regular", fontSize: SIZES.body5, lineHeight: 22 },
};

export const IMGSIZES= {
    md:{ width:width-100 , height:width-100 }
}

const appTheme = { COLORS, SIZES, FONTS , IMGSIZES};

export default appTheme;
