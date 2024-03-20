import { StyleSheet } from 'react-native';


export const characterDetailStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#436850',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 100,
      marginBottom: 20,
    },
    text: {
      color:'#fff',
      fontSize: 18,
      marginBottom: 10,
      fontWeight: 'bold',
    },
  });


export const mainStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#12372A',
        padding: 20,
        flexDirection: 'row', // Satır düzlemini kullan
        justifyContent: 'center', // Metni yatayda ortala
        alignItems: 'center', // Elemanları dikeyde ortala
    },
    headerText: {
        fontSize: 22,
        color: '#fff',
        textAlign: 'center', // Yazıyı yatayda ortala
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        top: -20,
        fontWeight: 'bold',
    },
    headerButton: {
        backgroundColor: '#FBFADA',
        fontSize: 14, // Küçük yazı boyutu
        paddingVertical: 5, // Dikey paddingi azalt
        paddingHorizontal: 10, // Yatay paddingi azalt
        color: '#000000',
        borderRadius: 5,
        position: 'absolute', // Mutlak pozisyon
        top: 0, // Üst kenardan 20 birim aşağı
        right: -130, // Sağ kenardan 20 birim içeride
        fontWeight: 'bold',
    },
    

    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#436850',
    },
    mainItem: {
        backgroundColor: '#fff', // Öğe arka plan rengi
        padding: 10, // Öğe içeriği ile arka plan arasındaki boşluk
        marginVertical: 5, // Öğeler arasındaki dikey boşluk
        marginHorizontal: 20, // Öğeler arasındaki yatay boşluk
        borderRadius: 10, // Öğe köşelerinin yuvarlatılması
        elevation: 3, // Android için gölge efekti
    },
    mainItemText: {
        fontSize: 16, // Öğe ismi yazı boyutu
        fontWeight: 'bold', // Öğe ismi yazı kalınlığı
    },
    footer: {
        backgroundColor: '#12372A',
        padding: 20,
        alignItems: 'center',
    },
    characterItem: {
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    characterImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    characterOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    characterDetails: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        padding: 5, // Sabit bir iç boşluk
        marginLeft: 5, // Sabit bir sol kenar boşluğu
        marginRight: 5, // Sabit bir sağ kenar boşluğu
        width: 260, // Sabit bir genişlik
        height: 120, // Sabit bir yükseklik
        borderRadius: 10, // Sabit bir köşe yarıçapı
    },
    
    
    characterName: {
        color: 'white',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%', // Modal içeriğinin genişliğini ayarla
        backgroundColor: '#ADBC9F',
        borderRadius: 10, // Modal köşelerini yuvarla
        padding: 20, // İçeriğe padding ekle
    },
    modalHeader: 
    {
        marginBottom: 10, // Başlık ile diğer içerikler arasına boşluk bırak
    },
    modalMain:
    {
        maxHeight: '60vh', // Ana içeriğin maksimum yüksekliğini ayarla
    },
    ModalHaderText: 
    {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 120,
        borderRadius: 10,
        paddingTop: Platform.OS === 'android' ? 30 : 10, // Platform bağımsız üstten padding
    },
    
    closeButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 40 : 40, // iOS için üst kısımdan 40 birim aşağıda, diğer platformlar için 10 birim aşağıda
        right: 30,
        fontSize: 18,
        color: '#fff',
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    
    
    closeButtonText: 
    {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,
    },favoriteButton: {
        paddingVertical: 4, // Yükseklik ayarı
        paddingHorizontal: 8, // Genişlik ayarı
        borderRadius: 10, // Köşe yuvarlaklığı
        color: '#fff', // Metin rengi
        fontSize: 16, // Metin boyutu
        fontWeight: 'bold', // Kalınlık
      },
      
});