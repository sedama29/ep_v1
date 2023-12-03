import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker';
import { styles } from './style/style_home';

import About from './legend/About';
import Harte from './legend/Harte';
import Tglo from './legend/Tglo';

const Drawer = createDrawerNavigator();

const Home = () => {
  const [siteOptions, setSiteOptions] = useState([]);
  const [selectedSite, setSelectedSite] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [coordsDict, setCoordsDict] = useState({});

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
      <View style={styles.pickerContainer}>
        <Picker
          mode="dropdown"
          selectedValue={selectedSite}
          onValueChange={(itemValue) => setSelectedSite(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}>
          {siteOptions.map((site, index) => (
            <Picker.Item
              style={{ fontSize: 10 }}
              label={site}
              value={site.match(/\(([^)]+)\)/)?.[1]} // Extracts value inside parentheses
              key={index}/>
          ))}
        </Picker>

      </View>
      {selectedSite && coordsDict[selectedSite] && (
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Latitude</Text>
            <Text style={styles.headerText}>Longitude</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.rowText}>{coordsDict[selectedSite].lat}</Text>
            <Text style={styles.rowText}>{coordsDict[selectedSite].long}</Text>
          </View>
        </View>
      )}
      <View style={styles.container_location}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.imageStyle} />}
      </View>
    </ScrollView>
  );
};

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerStyle: { height: 50 } }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Texas General Land Office" component={Tglo} />
      <Drawer.Screen name="Harte Research Institute" component={Harte} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return <MyDrawer />;
}
