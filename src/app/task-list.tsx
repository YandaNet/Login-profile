import { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

const SAMPLE_TASKS = [
  { id: '1', title: 'Перевірити авторизацію в AuthContext', done: true },
  { id: '2', title: 'Допрацювати маршрут /task-list', done: false },
  { id: '3', title: 'Протестувати редирект для неавторизованих', done: false },
];

export default function TaskListScreen() {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      router.replace('/');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Список задач (/task-list)</Text>
      <Text style={styles.subtext}>Користувач: {currentUser.name}</Text>

      <FlatList
        data={SAMPLE_TASKS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>
              {item.done ? '✅' : '⬜'} {item.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  subtext: { fontSize: 14, color: '#666', marginBottom: 16 },
  taskItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  taskText: { fontSize: 16 },
});