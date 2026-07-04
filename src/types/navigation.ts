export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Details: { id: string };
};

export type SearchStackParamList = {
  Search: undefined;
  SearchResults: { query: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  ProfileTab: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
  Settings: undefined;
};
