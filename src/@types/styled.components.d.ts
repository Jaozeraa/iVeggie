import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primaryLight: string;
      primary: string;
      secondary: string;
      gray1: string;
      gray2: string;
      gray3: string;
      gray4: string;
      gray5: string;
      yellow: string;
      yellowDark: string;
      red: string;
    };
    fonts: {
      interRegular: string;
      interMedium: string;
      tolyerMedium: string;
      interSemiBold: string;
    };
  }
}
