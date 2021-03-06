import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png';
import api from '../services/api';
import { useState } from 'react';

interface OrphanageView {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export default function OrphanagesMap() {

    const navigation = useNavigation();

    const [orphanages, setOrphanages] = useState<OrphanageView[]>([]);

    useFocusEffect(() => {
        api.get('orphanages').then(response => {
            const orphanages = response.data;
            setOrphanages(orphanages);
        });
    });

    function handleNavigateToOrphanageDetails(id: number) {
        navigation.navigate('OrphanageDetails', { id });
    }

    function handleNavigateToCreateOrphanage() {
        navigation.navigate('SelectMapPosition');
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                initialRegion={{
                    latitude: -15.7400367,
                    longitude: -47.7539027,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008
                }}
            >

                {orphanages.map((orphanage) => {
                    return (
                        <Marker
                            key={orphanage.id}
                            icon={mapMarker}
                            coordinate={{
                                latitude: orphanage.latitude,
                                longitude: orphanage.longitude,
                            }}
                            calloutAnchor={{
                                x: 2.7,
                                y: 0.9,
                            }}
                        >
                            <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText}>
                                        {orphanage.name}
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>
                    );
                })}
            </MapView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    {orphanages.length} Orfanatos encontrados
            </Text>
                <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
                    <Feather name="plus" size={20} color="#fff" />
                </RectButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255, 0.8)',
        borderRadius: 16,
        justifyContent: 'center',

    },
    calloutText: {
        color: '#0089a5',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold'
    },
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,
        paddingLeft: 24,
        height: 56,

        backgroundColor: '#fff',
        borderRadius: 20,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 3,

    },
    footerText: {
        color: '#8fa7b3',
        fontFamily: 'Nunito_700Bold'
    },
    createOrphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center'
    },
});
