import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LATIHAN PERTEMUAN 2</Text>
      
      <Text>Nama Lengkap: Ibrahim Hilal</Text>
      <Text>Tempat Tanggal Lahir: Cirebon, 19 Desember 2005</Text>
      <Text>Cita-Cita: Menjadi Programmer Handal</Text>
      <Text>Rencana Hidup: Ingin Bekerja di Jepang</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});