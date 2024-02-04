declare module models {
  type RegisterFormData = {
    name: string;
    email: string;
    password: string;
  };

  type LoginFormData = {
    email: string;
    password: string;
  };

  type TypeMessageViewProps = {
    type?: 'error' | 'success';
  };

  type ToastTypeVariations = {
    success: ReturnType<typeof import('styled-components').css>;
    error: ReturnType<typeof import('styled-components').css>;
  };

  type ToastContainerProps = {
    message: models.ToastMessage | null;
    removeToast: () => void;
  };

  type ToastProps = {
    message: models.ToastMessage;
    removeToast: () => void;
  };

  type ToastContextData = {
    addToast: (toastMessage: Omit<ToastMessage, 'id'>) => void;
    removeToast: () => void;
  };

  type ToastMessage = {
    id: string;
    type: 'success' | 'error';
    message: string;
  };

  type BagProps = BottomSheetProps & {
    items: Food[];
    subtotal: number;
    removeItem: (id: string) => void;
    removeAllItems: () => void;
  };

  type BottomSheetProps = DefaultComponentProps & {
    isVisible: boolean;
    setIsVisible(isVisible: boolean): void;
  };

  type BagBarProps = {
    items: Food[];
    subtotal: number;
    openModal: () => void;
  };

  type BagContextData = {
    items: Food[];
    subtotal: number;
    addItem: (food: Food) => void;
    removeItem: (id: string) => void;
    removeAllItems: () => void;
    openModal: () => void;
    closeModal: () => void;
    hideBar: () => void;
    showBar: () => void;
  };

  type Food = {
    bagFoodId: string;
    id: string;
    name: string;
    resume: string;
    description: string;
    imageUrl: string;
    price: number;
  };

  type FoodCardProps = DefaultComponentProps & {
    variant?: 'vertical' | 'horizontal';
    food: Food;
    isLastItem?: boolean;
    disabled?: boolean;
    onPress?: () => void;
  };

  type Restaurant = {
    id: string;
    name: string;
    imageUrl: string;
    wallpaperUrl: string;
    phoneNumber: string;
    address: string;
    rate: number;
    liked: boolean;
    foods: Food[];
  };

  type RestaurantCardProps = DefaultComponentProps & {
    restaurant: Restaurant;
    isLastItem?: boolean;
  };

  type RestaurantCardContainerProps = {
    isLastItem?: boolean;
  };

  type DefaultComponentProps = {
    children?: React.ReactNode;
    containerStyle?: import('react-native').ViewStyle;
  };

  type ButtonProps = DefaultComponentProps &
    import('react-native-gesture-handler').RectButtonProps & {
      variant?: 'filled' | 'outlined';
      textColor?: string;
      backgroundColor?: string;
      loading?: boolean;
      disabled?: boolean;
    };

  type InputProps = DefaultComponentProps &
    import('react-native').TextInputProps & {
      disabled?: boolean;
      control: import('react-hook-form').Control<any, any, any>;
      error?: string;
      name: string;
      required?: boolean;
    };

  type SearchInputProps = DefaultComponentProps &
    import('react-native').TextInputProps & {
      disabled?: boolean;
      control: import('react-hook-form').Control<any, any, any>;
      name: string;
    };

  type ContentInputProps = {
    isFocused: boolean;
  };

  type LogoProps = SvgProps & {
    variant?: 'all-white' | 'colored';
  };

  type SvgProps = {
    height?: import('react-native-svg').NumberProp;
    width?: import('react-native-svg').NumberProp;
  };

  type HeaderProps = {
    variant?: 'page' | 'modal' | 'home';
    title?: string;
    color?: string;
    onPress?: () => void;
  };

  type HeaderTitleProps = {
    color: string;
  };
}
