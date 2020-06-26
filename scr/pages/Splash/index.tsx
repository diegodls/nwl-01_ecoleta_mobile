import React, { useEffect } from 'react';
import {
    StyleSheet,
    Image,
    ImageBackground,
    StatusBar,
    View,
    Text,
    BackHandler
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import IconFeather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as RNLocation from 'react-native-location';

const Splash = () => {

    useEffect(() => {
        //requestGeoPermission();
        requestLocationPermission();
    }, [])

    const navigation = useNavigation();

    async function requestLocationPermission() {
        RNLocation.requestPermission({
            ios: 'whenInUse', // or 'always'
            android: {
                detail: 'fine', // or 'coarse'
                rationale: {
                    title: "Acesso a localisação",
                    message: "Necessitamos do acesso a Localização apra funcionamento completo do aplicativo",
                    buttonPositive: "OK",
                    buttonNegative: "Cancelar"
                }
            }
        }).then(granted => {
            if (granted) {
                navigation.navigate('Home');
            } else {
                BackHandler.exitApp();
            }
        });
    }

    // async function requestGeoPermission() {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    //             title: 'Localizar Posição',
    //             message: 'Necessário para mostrar os pontos de coleta pertos de você.',
    //             buttonNegative: "Sair",
    //             buttonPositive: "Conceder"
    //         }
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             navigation.navigate('Points');
    //         } else {
    //             BackHandler.exitApp();
    //         }
    //     } catch (error) {
    //         console.warn(error);
    //     }

    // };

    return (
        <>
            <ImageBackground
                source={require('../../assets/imgs/home-background.png')}
                imageStyle={{ width: 274, height: 368 }}
                style={styles.main}>
                <View style={styles.box}>
                    <Image source={require('../../assets/imgs/logo.png')} />

                    <Text style={styles.boxText}>
                        Para o pleno funcionamento deste aplicativo, é necessário que você aceite algumas permissões!
                    </Text>

                    <RectButton style={styles.button} onPress={requestLocationPermission}>
                        <View style={styles.buttonIcon}>
                            <IconFeather name='arrow-right' color={'#FFF'} size={24} />
                        </View>
                        <Text style={styles.buttonText}>Conceder Permissões</Text>
                    </RectButton>

                </View>

            </ImageBackground>

        </>
    )


}

//parei 01:33:00

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: StatusBar.currentHeight,
    },
    box: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#eee',
        maxWidth: 260,
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    boxText: {
        textAlign: 'center',
        color: '#000',
        fontFamily: 'RobotoRegular',
        fontSize: 16,
    },
    button: {
        maxWidth: 260,
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },
    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'RobotoRegular',
        fontSize: 16,
    }
});

export default Splash;