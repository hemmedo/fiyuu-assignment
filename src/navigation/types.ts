import type { StackScreenProps } from '@react-navigation/stack';
import type { Paths } from '@/navigation/paths';
import type { Item } from '@/screens/Example/Example';

export type RootStackParamList = {
  [Paths.DeletedItems]: Item[];
  [Paths.Example]: undefined;
  [Paths.Startup]: undefined
};

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;
