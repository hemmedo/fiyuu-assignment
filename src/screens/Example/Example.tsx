import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeScreen} from '@/components/templates';
import SwipeableListItem from '@/components/atoms/SwipeableListItem/SwipeableListItem';
import Animated from 'react-native-reanimated';
import {Paths} from '@/navigation/paths';
import type {RootScreenProps} from '@/navigation/types';

export interface Item {
  id: string;
  text: string;
}

function Example({navigation}: RootScreenProps<Paths.Example>) {
  const [data, setData] = useState<Item[]>([
    {id: '1', text: 'Courier 1'},
    {id: '2', text: 'Courier 2'},
    {id: '3', text: 'Courier 3'},
    {id: '4', text: 'Courier 4'},
  ]);

  const [deletedItems, setDeletedItems] = useState<Item[]>([]);

  const removeItem = (id: string) => {
    setData(prevData => prevData.filter(item => item.id !== id));
    setDeletedItems(prevDeletedItems => [
      ...prevDeletedItems,
      data.find(item => item.id === id) as Item,
    ]);
  };

  return (
    <SafeScreen style={styles.root}>
      <Animated.FlatList
        contentContainerStyle={styles.gap}
        data={data}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerText}>Couriers: </Text>
          </View>
        }
        renderItem={({item}) => (
          <SwipeableListItem
            onSwipeLeftComplete={() => removeItem(item.id)}
            onSwipeRightComplete={() => removeItem(item.id)}>
            <Text style={styles.text}>{item.text}</Text>
          </SwipeableListItem>
        )}
        style={styles.listContainer}
      />
      <View style={styles.footer}>
        <View style={styles.alignCenter}>
          <Text>Deleted Items: {deletedItems.length}</Text>
          <Text>Remaining Items: {data.length}</Text>
        </View>

        <Pressable
          onPress={() => navigation.navigate(Paths.DeletedItems, deletedItems)}
          style={styles.nextBtn}>
          <Text style={styles.text}>NEXT</Text>
        </Pressable>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
    gap: 24,
    marginTop: 16,
  },
  gap: {gap: 16},
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'semibold',
  },
  listContainer: {paddingHorizontal: 16},
  nextBtn: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    width: '90%',
  },
  root: {
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Example;
