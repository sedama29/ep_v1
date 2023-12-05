import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { styles } from './style/style_home'; // Adjust the path as needed

const ContactDetailsView = ({ details }) => {
    if (!details) return <Text>No contact details available.</Text>;

    return (
        <ScrollView>
            <View style={styles.contactContainer}>
                <Text style={styles.sectionHeader}>Entity:</Text>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Name:</Text>
                    <Text style={styles.value_contact}>{details.l_entity_name}</Text>
                </View>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Address:</Text>
                    <Text style={styles.value_contact}>{details.l_entity_address}</Text>
                </View>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Phone:</Text>
                    <Text style={styles.value_contact}>{details.l_entity_phone}</Text>
                </View>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>URL:</Text>
                    <Text style={styles.value_contact}><Text style={styles.linkText} onPress={() => Linking.openURL(details.l_entity_url)}>{details.l_entity_url}</Text></Text>
                </View>

                <Text style={styles.sectionHeader}>Government Contact:</Text>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Name:</Text>
                    <Text style={styles.value_contact}>{details.l_gov_contact1_name}</Text>
                </View>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Email:</Text>
                    <Text style={styles.value_contact}><Text style={styles.linkText} onPress={() => Linking.openURL(`mailto:${details.l_gov_contact1_email}`)}>{details.l_gov_contact1_email}</Text></Text>
                </View>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Address:</Text>
                    <Text style={styles.value_contact}>{details.l_gov_contact1_address}</Text>
                </View>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Phone:</Text>
                    <Text style={styles.value_contact}>{details.l_gov_contact1_phone}</Text>
                </View>

                <Text style={styles.sectionHeader}>Laboratory:</Text>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Office:</Text>
                    <Text style={styles.value_contact}>{details.lab_office}</Text>
                </View>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Email:</Text>
                    <Text style={styles.value_contact}>{details.lab_email ? <Text style={styles.linkText} onPress={() => Linking.openURL(`mailto:${details.lab_email}`)}>{details.lab_email}</Text> : 'N/A'}</Text>
                </View>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Address:</Text>
                    <Text style={styles.value_contact}>{details.lab_address}</Text>
                </View>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Phone:</Text>
                    <Text style={styles.value_contact}>{details.lab_phone}</Text>
                </View>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>URL:</Text>
                    <Text style={styles.value_contact}><Text style={styles.linkText} onPress={() => Linking.openURL(details.lab_url)}>{details.lab_url}</Text></Text>
                </View>

                <Text style={styles.sectionHeader}>Project Manager:</Text>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Name:</Text>
                    <Text style={styles.value_contact}>{details.pm_name}</Text>
                </View>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Position:</Text>
                    <Text style={styles.value_contact}>{details.pm_position}</Text>
                </View>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Division:</Text>
                    <Text style={styles.value_contact}>{details.pm_division ? details.pm_division : 'N/A'}</Text>
                </View>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Office:</Text>
                    <Text style={styles.value_contact}>{details.pm_office}</Text>
                </View>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Address:</Text>
                    <Text style={styles.value_contact}>{details.pm_address ? details.pm_address : 'N/A'}</Text>
                </View>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Phone:</Text>
                    <Text style={styles.value_contact}>{details.pm_phone}</Text>
                </View>
                <View style={styles.row_contact}>
                    <Text style={styles.column_contact}>Email:</Text>
                    <Text style={styles.value_contact}><Text style={styles.linkText} onPress={() => Linking.openURL(`mailto:${details.pm_email}`)}>{details.pm_email}</Text></Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default ContactDetailsView;
