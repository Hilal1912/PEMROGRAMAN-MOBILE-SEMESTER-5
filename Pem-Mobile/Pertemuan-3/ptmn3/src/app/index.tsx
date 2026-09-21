import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Switch,
  Modal,
  ActivityIndicator,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Linking
} from 'react-native';

// ============================================
// 1. DATA PROFIL PRIBADI
// ============================================
const PROFILE_DATA = {
  name: "Ibrahim Hilal",
  role: "Informatics Student & Web Developer",
  bio: "Mahasiswa Informatika UIN Siber Syekh Nurjati Cirebon yang tertarik pada Web Development, IoT, dan Cryptography.",
  avatar: require('../../assets/images/Pem-Mob 3.jpeg'),
  email: "ibrahimhilal477@gmail.com",
  phone: "+6281234567890",
  location: "Cirebon, Jawa Barat",
};

// ============================================
// 2. DATA SKILLS
// ============================================
const SKILLS_DATA = [
  { id: '1', name: 'React Native', level: 80, color: '#0284c7', desc: 'Pengembangan aplikasi mobile lintas platform.' },
  { id: '2', name: 'PHP & Laravel', level: 85, color: '#dc2626', desc: 'Pengembangan backend & RESTful API.' },
  { id: '3', name: 'Node.js & REST API', level: 80, color: '#16a34a', desc: 'Layanan backend asynchronous dan arsitektur API.' },
  { id: '4', name: 'Cryptography (RSA/AES)', level: 75, color: '#9333ea', desc: 'Keamanan data dan implementasi enkripsi hybrid.' },
  { id: '5', name: 'IoT Prototyping (ESP32)', level: 70, color: '#ea580c', desc: 'Pemrograman mikrokontroler dan kontrol otomatisasi.' },
];

// ============================================
// 3. DATA RIWAYAT (Sections)
// ============================================
const HISTORY_DATA = [
  {
    title: 'Pengalaman Proyek & Pengembangan',
    data: [
      { id: 'h1', title: 'Pengembang Adab-Track', subtitle: 'Proyek Aplikasi Mobile Habit Tracking (2026)', desc: 'Merancang UI/UX, user flow, dan database schema untuk aplikasi pelacak kebiasaan harian.' },
      { id: 'h2', title: 'Pengembang SecureVault', subtitle: 'Proyek End-to-End Encrypted Web App (2026)', desc: 'Mengimplementasikan modul enkripsi RSA-2048-OAEP dan AES-256-GCM.' },
    ],
  },
  {
    title: 'Riwayat Pendidikan',
    data: [
      { id: 'e1', title: 'S1 Informatika', subtitle: 'UIN Siber Syekh Nurjati Cirebon (2024 - Sekarang)', desc: 'Fokus pada pemrograman web, sistem tertanam IoT, dan jaringan komputer.' },
    ],
  },
];

// ============================================
// 4. DATA SOCIAL MEDIA (Persis Modul Dosen)
// ============================================
const SOCIAL = [
  { id: 's1', label: 'Github', icon: '🏅', url: 'https://github.com/Hilal1912' },
  { id: 's2', label: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com' },
  { id: 's3', label: 'Email', icon: '✉️', url: 'mailto:ibrahimhilal477@gmail.com' },
];

// ============================================
// 5. SUB-COMPONENTS (SkillCard & TimelineCard)
// ============================================
const SkillCard = ({ item, onPress }: { item: typeof SKILLS_DATA[0]; onPress: (item: any) => void }) => (
  <TouchableOpacity style={styles.skillCard} onPress={() => onPress(item)} activeOpacity={0.7}>
    <View style={styles.skillHeader}>
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillLevel}>{item.level}%</Text>
    </View>
    <View style={styles.progressBarBg}>
      <View style={[styles.progressBarFill, { width: `${item.level}%`, backgroundColor: item.color }]} />
    </View>
  </TouchableOpacity>
);

const TimelineCard = ({ item, onPress }: { item: any; onPress: (item: any) => void }) => (
  <TouchableOpacity style={styles.timelineCard} onPress={() => onPress(item)} activeOpacity={0.7}>
    <Text style={styles.timelineTitle}>{item.title}</Text>
    <Text style={styles.timelineSubtitle}>{item.subtitle}</Text>
    <Text style={styles.timelineDesc} numberOfLines={2}>{item.desc}</Text>
  </TouchableOpacity>
);

// ============================================
// 6. KOMPONEN UTAMA
// ============================================
export default function App() {
  // State Management
  const [isOpenToWork, setIsOpenToWork] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  // Handler Konfirmasi Bukti Social Media (Kompatibel Web Chrome & Mobile)
  const handleSocialPress = (label: string, url: string) => {
    if (Platform.OS === 'web') {
      window.alert(`[Bukti Social ${label}]\n\nURL Tautan: ${url}`);
    } else {
      Alert.alert(
        `Bukti Social ${label}`,
        `URL Tautan: ${url}`,
        [
          { text: 'Tutup', style: 'cancel' },
          { text: 'Buka Tautan', onPress: () => Linking.openURL(url) }
        ]
      );
    }
  };

  // Handler Alert Umum (Kompatibel Web & Mobile)
  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`[${title}]\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // Handler Form Kontak
  const handleSendMessage = () => {
    if (!contactName.trim() || !contactMessage.trim()) {
      showAlert('Peringatan', 'Silakan isi Nama dan Pesan terlebih dahulu!');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showAlert('Sukses', `Terima kasih ${contactName}, pesan Anda telah terkirim!`);
      setContactName('');
      setContactMessage('');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* HEADER BAR */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => showAlert('CV Digital', 'Aplikasi CV Digital milik Ibrahim Hilal')}>
          <Text style={styles.headerTitle}>CV Digital 📱</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.switchContainer} 
          onPress={() => setIsOpenToWork(!isOpenToWork)}
          activeOpacity={0.8}
        >
          <Text style={styles.switchLabel}>Available</Text>
          <Switch
            value={isOpenToWork}
            onValueChange={setIsOpenToWork}
            trackColor={{ false: '#cbd5e1', true: '#22c55e' }}
            thumbColor={isOpenToWork ? '#ffffff' : '#f8fafc'}
          />
        </TouchableOpacity>
      </View>

      {/* TAB NAVIGASI */}
      <View style={styles.tabContainer}>
        {['All', 'Skills', 'Riwayat', 'Kontak'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* SECTION PROFIL */}
          {(activeTab === 'All' || activeTab === 'Info') && (
            <View style={styles.profileSection}>
              <TouchableOpacity onPress={() => showAlert('Foto Profil', 'Ibrahim Hilal - Mahasiswa Informatika UIN Siber Syekh Nurjati Cirebon')}>
                <Image source={PROFILE_DATA.avatar} style={styles.avatar} />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => showAlert('Nama Lengkap', PROFILE_DATA.name)}>
                <Text style={styles.name}>{PROFILE_DATA.name}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => showAlert('Profesi', PROFILE_DATA.role)}>
                <Text style={styles.role}>{PROFILE_DATA.role}</Text>
              </TouchableOpacity>
              
              {isOpenToWork && (
                <TouchableOpacity 
                  style={styles.badge} 
                  onPress={() => showAlert('Status Kerja', 'Saat ini terbuka untuk posisi Web / Mobile Developer Intern.')}
                >
                  <Text style={styles.badgeText}>#OpenToWork</Text>
                </TouchableOpacity>
              )}

              <Text style={styles.bio}>{PROFILE_DATA.bio}</Text>

              {/* SOSIAL MEDIA (MENAMPILKAN BUKTI SOCIAL URL) */}
              <View style={styles.socialContainer}>
                {SOCIAL.map((item) => (
                  <TouchableOpacity 
                    key={item.id} 
                    style={styles.socialBtn} 
                    onPress={() => handleSocialPress(item.label, item.url)}
                  >
                    <Text style={styles.socialText}>{item.icon} {item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* SECTION SKILLS */}
          {(activeTab === 'All' || activeTab === 'Skills') && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>Keahlian & Kompetensi</Text>
              <FlatList
                data={SKILLS_DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <SkillCard
                    item={item}
                    onPress={(selected) => {
                      setSelectedItem({ title: selected.name, subtitle: `Tingkat Penguasaan: ${selected.level}%`, desc: selected.desc });
                      setModalVisible(true);
                    }}
                  />
                )}
                scrollEnabled={false}
              />
            </View>
          )}

          {/* SECTION RIWAYAT */}
          {(activeTab === 'All' || activeTab === 'Riwayat') && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>Riwayat & Pengalaman</Text>
              <SectionList
                sections={HISTORY_DATA}
                keyExtractor={(item) => item.id}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={styles.sectionHeader}>{title}</Text>
                )}
                renderItem={({ item }) => (
                  <TimelineCard
                    item={item}
                    onPress={(selected) => {
                      setSelectedItem({ title: selected.title, subtitle: selected.subtitle, desc: selected.desc });
                      setModalVisible(true);
                    }}
                  />
                )}
                scrollEnabled={false}
              />
            </View>
          )}

          {/* SECTION FORM KONTAK */}
          {(activeTab === 'All' || activeTab === 'Kontak') && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>Hubungi Saya</Text>
              
              {/* Info Kontak Langsung */}
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity 
                  style={[styles.socialBtn, { backgroundColor: '#25D366', marginBottom: 8, alignItems: 'center' }]} 
                  onPress={() => handleSocialPress('WhatsApp', `https://wa.me/6281234567890`)}
                >
                  <Text style={[styles.socialText, { color: '#fff' }]}>💬 Hubungi via WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.socialBtn, { backgroundColor: '#ea4335', marginBottom: 8, alignItems: 'center' }]} 
                  onPress={() => handleSocialPress('Email', `mailto:${PROFILE_DATA.email}`)}
                >
                  <Text style={[styles.socialText, { color: '#fff' }]}>✉️ Kirim Email ({PROFILE_DATA.email})</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => showAlert('Lokasi', PROFILE_DATA.location)}>
                  <Text style={{ color: '#64748b', fontSize: 12, marginTop: 4, textAlign: 'center' }}>
                    📍 Lokasi: {PROFILE_DATA.location}
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={[styles.sectionTitle, { fontSize: 14, marginTop: 5 }]}>Atau Tinggalkan Pesan:</Text>

              <TextInput
                style={styles.textInput}
                placeholder="Nama Anda"
                placeholderTextColor="#94a3b8"
                value={contactName}
                onChangeText={setContactName}
              />
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Pesan Anda"
                placeholderTextColor="#94a3b8"
                multiline
                numberOfLines={3}
                value={contactMessage}
                onChangeText={setContactMessage}
              />

              {isLoading ? (
                <ActivityIndicator size="large" color="#0284c7" style={{ marginTop: 10 }} />
              ) : (
                <View style={{ marginTop: 10 }}>
                  <Button title="Kirim Pesan" onPress={handleSendMessage} color="#0284c7" />
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODAL DETAIL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
            <Text style={styles.modalSubtitle}>{selectedItem?.subtitle}</Text>
            <Text style={styles.modalDesc}>{selectedItem?.desc}</Text>
            <View style={{ marginTop: 15 }}>
              <Button title="Tutup" onPress={() => setModalVisible(false)} color="#dc2626" />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ============================================
// 7. STYLESHEET (LIGHT THEME)
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  switchLabel: {
    color: '#475569',
    marginRight: 8,
    fontSize: 13,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#f1f5f9',
  },
  tabButtonActive: {
    backgroundColor: '#0284c7',
  },
  tabText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  role: {
    fontSize: 14,
    color: '#0284c7',
    marginTop: 2,
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  badgeText: {
    color: '#15803d',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bio: {
    color: '#334155',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 13,
    lineHeight: 18,
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  socialBtn: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  socialText: {
    color: '#0284c7',
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
  },
  skillCard: {
    marginBottom: 10,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  skillName: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '500',
  },
  skillLevel: {
    color: '#64748b',
    fontSize: 12,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  sectionHeader: {
    color: '#0284c7',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 6,
  },
  timelineCard: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  timelineTitle: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: 13,
  },
  timelineSubtitle: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 2,
  },
  timelineDesc: {
    color: '#334155',
    fontSize: 12,
    marginTop: 4,
  },
  textInput: {
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
  },
  modalTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalSubtitle: {
    color: '#0284c7',
    fontSize: 13,
    marginTop: 4,
  },
  modalDesc: {
    color: '#334155',
    fontSize: 13,
    marginTop: 10,
    lineHeight: 18,
  },
});