import {StyleSheet, Text, View} from 'react-native';
import {SafeScreen} from '@/components/templates';
import type {Paths} from '@/navigation/paths';
import type {RootScreenProps} from '@/navigation/types';

function DeletedItems({
  route: {params: deletedItems},
}: RootScreenProps<Paths.DeletedItems>) {
  return (
    <SafeScreen style={styles.root}>
      <Text style={styles.title}>Deleted Items:</Text>
      <View style={styles.itemsContainer}>
        {deletedItems.map((item, index) => (
          <Text key={index}>
            {item.text}
            {index < deletedItems.length - 1 ? ', ' : ''}
          </Text>
        ))}
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  root: {
    gap: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DeletedItems;
