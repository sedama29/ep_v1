import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker';
import { styles } from './style/style_home';
import Data90DaysView from './data/Data90DaysView';
import ContactDetailsView from './data/ContactDetailsView';
import GraphView from './GraphView';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


import About from './legend/About';
// import Harte from './legend/Harte';
import Tglo from './legend/Tglo';

const Drawer = createDrawerNavigator();
const initialLayout = { width: Dimensions.get('window').width };


const Home = () => {
  const [siteOptions, setSiteOptions] = useState([]);
  const [selectedSite, setSelectedSite] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [coordsDict, setCoordsDict] = useState({});
  const [contactDetails, setContactDetails] = useState({});

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [observedData, setObservedData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isImageModalVisible, setImageModalVisible] = useState(false);


  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: 'observed', title: `Observed (${observedData.length})` },
    { key: 'predicted', title: `Predicted (${predictedData.length})` },
  ]);

  const csvToJson = (csv) => {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      let obj = {};
      const currentline = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    return result;
  };

  useEffect(() => {
    const fetchCSVData = async (url) => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        return csvToJson(text);
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };
    const fetchData = async () => {
      const observed = await fetchCSVData('https://enterococcus.today/waf/nowcast/TX/observed.csv');
      const predicted = await fetchCSVData('https://enterococcus.today/waf/nowcast/TX/predicted.csv');

      setObservedData(observed);
      setPredictedData(predicted);
      setTotalCount(observed.length + predicted.length); // Or calculate based on your data structure
    };
    fetchData();
  }, []);

  const ObservedTab = () => (
    <ScrollView>
      {observedData.map((item, idx) => (
        <Text key={idx} style={styles.bulletText}>
          • <Text style={styles.boldText}>{item.site_name} ({item.site_id}) :</Text>
          {' '}The observed count is {item.eCount} cfu/100ml on {item.date} and this count is {' '} 
          <Text style={[styles.levelText, { color: item.level === 'MEDIUM' ? 'orange' : item.level === 'HIGH' ? 'red' : 'black' }]}>
            {item.level}
          </Text>
        </Text>
      ))}
    </ScrollView>
  );

  const PredictedTab = () => (
    <ScrollView>
      {predictedData.map((item, idx) => {
        const level = item.eCount < 104 ? '>35' : '>104';
        return (
          <Text key={idx} style={styles.bulletText}>
            • <Text style={styles.boldText}>{item.site_name} ({item.site_id}) :</Text>
            {' '}The count is predicted by {item.model_id} to be {' '}
            <Text style={{ color: level === '>35' ? 'orange' : 'red' }}>
              {level}
            </Text> cfu/100ml on {item.date}
          </Text>
        );
      })}
    </ScrollView>
  );

  useEffect(() => {
    setRoutes([
      { key: 'observed', title: `Observed (${observedData.length})` },
      { key: 'predicted', title: `Predicted (${predictedData.length})` },
    ]);
  }, [observedData, predictedData]);

  const showDataAlert = () => {
    setIsModalVisible(true);
  };

  const renderScene = SceneMap({
    observed: ObservedTab,
    predicted: PredictedTab,
  });


  useEffect(() => {
    async function fetchSiteOptions() {
      try {
        const response = await fetch('https://enterococcus.today/waf/nowcast/TX/stations.txt');
        const text = await response.text();
        const siteArray = JSON.parse(text);
        if (Array.isArray(siteArray)) {
          setSiteOptions(siteArray);
        } else {
          console.error('Fetched data is not an array:', siteArray);
        }
      } catch (error) {
        console.error('Error fetching site data:', error);
      }
    }

    async function fetchCoords() {
      try {
        const response = await fetch('https://enterococcus.today/waf/nowcast/TX/beach_lat_lon.txt');
        const text = await response.text();
        setCoordsDict(JSON.parse(text));
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }

    const fetchContactDetails = async () => {
      try {
        const response = await fetch('https://enterococcus.today/waf/nowcast/TX/contact_details.json');
        const data = await response.json();
        setContactDetails(data);
      } catch (error) {
        console.error('Error fetching contact details:', error);
      }
    };
    fetchContactDetails();
    fetchSiteOptions();
    fetchCoords();
  }, []);

  useEffect(() => {
    if (selectedSite) {
      const imageSrc = `https://enterococcus.today/waf/nowcast/TX/beach_images/${selectedSite}.jpg`;
      setImageUrl(imageSrc);
    }
  }, [selectedSite]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={showDataAlert} style={styles.alertButton}>
        <Text style={styles.alertText}>({totalCount}) Alert!</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}

          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={{ color: 'white' }}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.pickerAndDotsContainer}>
      <View style={styles.pickerContainer}>
        <Picker
          mode="dropdown"
          selectedValue={selectedSite}
          onValueChange={(itemValue) => setSelectedSite(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}>
          {siteOptions.map((site, index) => (
            <Picker.Item
              style={{ fontSize: 12 }}
              label={site}
              value={site.match(/\(([^)]+)\)/)?.[1]} // Extracts value inside parentheses
              key={index} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity onPress={() => setImageModalVisible(true)} style={styles.dotsButton}>
        <Text>⋮</Text>
      </TouchableOpacity>
      </View>


      <Text style={{ marginTop: 30, fontSize: 14, fontWeight: 'bold' }}>Enterococcus Counts</Text>
      {selectedSite && <GraphView siteId={selectedSite} />}


      <Text style={{ marginTop: 30, fontSize: 14, fontWeight: 'bold' }}>Data</Text>
      <View>
        <ScrollView contentContainerStyle={styles.container_data}>
          {selectedSite && <Data90DaysView siteId={selectedSite} />}
        </ScrollView>
      </View>

      <Text style={{ marginTop: 30, fontSize: 14, fontWeight: 'bold' }}>Location</Text>
      <View style={styles.container_location}>
        {selectedSite && coordsDict[selectedSite] && (
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
            <Text style={{ fontSize: 12 }}>
              <Text style={{ fontWeight: 'bold' }}>Latitude: </Text>
              <Text>{coordsDict[selectedSite].lat}</Text>
            </Text>
            <Text style={{ fontSize: 12, paddingLeft: 50 }}>
              <Text style={{ fontWeight: 'bold' }}>Longitude: </Text>
              <Text>{coordsDict[selectedSite].long}</Text>
            </Text>
          </View>
        )}

        <View style={styles.container_image}>
          {imageUrl && <Image source={{ uri: imageUrl }} style={styles.imageStyle} />}
        </View>
      </View>

      <Text style={{ marginTop: 30, fontSize: 14, fontWeight: 'bold' }}>Contact</Text>
      <View>
        <ScrollView contentContainerStyle={styles.container_contact}>
          {selectedSite && <ContactDetailsView details={contactDetails[selectedSite]} />}
        </ScrollView>
      </View>
            
      <Modal
        animationType="slide"
        transparent={true}
        visible={isImageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Image source={require('../assets/images/map_2.jpg')} style={styles.imageStyle_2} />
          <TouchableOpacity onPress={() => setImageModalVisible(false)} style={styles.closeButton}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </ScrollView>
  );
};

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerStyle: { height: 50 } }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="About..." component={About} />
      <Drawer.Screen name="Texas General Land Office" component={Tglo} />
      {/* <Drawer.Screen name="Harte Research Institute" component={Harte} /> */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return <MyDrawer />;
}
