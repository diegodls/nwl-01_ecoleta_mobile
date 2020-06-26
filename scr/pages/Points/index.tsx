import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import IconFeather from 'react-native-vector-icons/Feather';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import * as RNLocation from 'react-native-location';

import api from '../../services/api';

interface Item {
    id: number,
    title: string,
    image_url: string
}

interface Point {
    id: number,
    image: string,
    name: string,
    latitude: number,
    longitude: number,
}

interface Params{
    uf: string,
    city: string
}


const Points = () => {
    const navigation = useNavigation();
    const route = useRoute();   

    const [items, setItems] = useState<Item[]>([]);
    const [points, setPoints] = useState<Point[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    const routeParams = route.params as Params;

    useEffect(() => { //get Current Position
        async function loadPosition() {

            RNLocation.configure({
                distanceFilter: 5.0
            });

            await RNLocation.checkPermission({
                ios: 'whenInUse', // or 'always'
                android: {
                    detail: 'fine' // or 'coarse'
                }
            }).then(granted => {
                if (granted) {
                    RNLocation.subscribeToLocationUpdates(locations => {
                        setInitialPosition([locations[0].latitude, locations[0].longitude]);
                    });
                }
                else {
                    Alert.alert('Oooops', 'Permissão para localização negada!');
                    navigation.navigate('Splash');
                }
            });
        };
        loadPosition();
    }, [])

    useEffect(() => { //get Items from api
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, [])

    useEffect(() => {
        api.get('points', {
            params: {
                city: routeParams.city,
                uf: routeParams.uf,
                items: selectedItems
            }
        }).then(response => {
            setPoints(response.data);
        })
    }, [selectedItems]);

    function handlerNavigateBack() {
        navigation.goBack();
    }

    function handlerNavigateToDetail(id: number) {
        navigation.navigate('Detail', { point_id: id });
    }

    function handlerSelectItem(id: number) {

        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);

        } else {
            setSelectedItems([...selectedItems, id]);
        }

    }

    return (
        <>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={handlerNavigateBack}>
                    <IconFeather name={'arrow-left'} color={'#34CB79'} size={20} />
                </TouchableWithoutFeedback>
                <Text style={styles.title}>Bem vindo.</Text>
                <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>
                <View style={styles.mapContainer}>
                    {/* {initialPosition[0] !== 0 && ( */}
                    <MapView
                        style={styles.map}
                        loadingEnabled={initialPosition[0] === 0}
                        initialRegion={{
                            latitude: initialPosition[0],
                            longitude: initialPosition[1],
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014
                        }}>
                        {points.map(point => (
                            <Marker
                                key={String(point.id)}
                                style={styles.mapMarker}
                                onPress={() => { handlerNavigateToDetail(point.id) }}
                                coordinate={{
                                    latitude: point.latitude,
                                    longitude: point.longitude,
                                }}
                            >
                                <View style={styles.mapMarkerContainer}>
                                    <Image
                                        style={styles.mapMarkerImage}
                                        source={{ uri: point.image }} />
                                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                                </View>
                            </Marker>
                        ))}
                    </MapView>
                    {/* )} */}
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }} >
                    {items.map(item => (
                        <TouchableOpacity
                            style={[styles.item,
                            selectedItems.includes(item.id) ? styles.selectedItem : {}]}
                            activeOpacity={0.6}
                            key={String(item.id)}
                            onPress={() => { handlerSelectItem(item.id) }}
                        >
                            <SvgUri width={42} height={42} uri={item.image_url} />
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: StatusBar.currentHeight + 20, //não encontrei um fix
    },

    title: {
        fontSize: 20,
        fontFamily: 'UbuntuBold',
        marginTop: 24,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 4,
        fontFamily: 'RobotoRegular',
    },

    mapContainer: {
        flex: 1,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 16,
    },

    map: {
        width: '100%',
        height: '100%',
    },

    mapMarker: {
        width: 90,
        height: 80,
    },

    mapMarkerContainer: {
        width: 90,
        height: 70,
        backgroundColor: '#34CB79',
        flexDirection: 'column',
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center'
    },

    mapMarkerImage: {
        width: 90,
        height: 45,
        resizeMode: 'cover',
    },

    mapMarkerTitle: {
        flex: 1,
        fontFamily: 'RobotoRegular',
        color: '#FFF',
        fontSize: 13,
        lineHeight: 23,
    },

    itemsContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 32,
    },

    item: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#eee',
        height: 120,
        width: 120,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
    },

    selectedItem: {
        borderColor: '#34CB79',
        borderWidth: 2,
    },

    itemTitle: {
        fontFamily: 'RobotoRegular',
        textAlign: 'center',
        fontSize: 13,
    },
});

/* 
OBS-1 = ao fazer o uso deste operador para mostrar o mapa só quando pegar a posição inicial, pode fazer com que a aplicação fique lenta ao transitar entre as telas.
*/

export default Points;