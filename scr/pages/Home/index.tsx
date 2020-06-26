import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    StatusBar,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

import { useNavigation } from '@react-navigation/native'
import { RectButton, TextInput } from 'react-native-gesture-handler';
import IconFeather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-community/picker';

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}


const Home = () => {

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    const navigation = useNavigation();

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);

    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        });

    }, [selectedUf]);

    function handlerNavigateToPoints() {
        console.log(ufs, cities);
        

        //navigation.navigate('Points', { selectedUf, selectedCity });
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground
                source={require('../../assets/imgs/home-background.png')}
                imageStyle={{ width: 274, height: 368 }}
                style={styles.container}        >
                <View style={styles.main}>
                    <Image source={require('../../assets/imgs/logo.png')} />
                    <View>
                        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos e coleta de forma eficiênte.</Text>
                    </View>
                    <View style={styles.footer}>
                        {/* <Picker/> */}

                        {/* <RNPickerSelect
                            placeholder={'Selecione o estado...'}
                            onValueChange={(value) => { console.log(value) }}
                            items={[
                                { label: 'teste', value: 'teste' },
                                { label: 'teste1', value: 'teste1' },
                                { label: 'teste2', value: 'teste2' },
                                { label: 'teste3', value: 'teste3' },
                            ]}
                        /> */}
                        {/* <TextInput
                            style={styles.textInput}
                            placeholder={'Digite a UF'}
                            value={uf}
                            maxLength={2}
                            autoCapitalize={'characters'}
                            autoCorrect={false}
                            onChangeText={setUf} />
                        <TextInput
                            style={styles.textInput}
                            placeholder={'Digite a Cidade'}
                            value={city}
                            autoCorrect={false}
                            onChangeText={setCity} /> */}


                    </View>
                    <RectButton style={styles.button} onPress={handlerNavigateToPoints}>
                        <View style={styles.buttonIcon}>
                            <IconFeather name='arrow-right' color={'#FFF'} size={24} />
                        </View>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: StatusBar.currentHeight,
    },
    main: {
        flex: 1,
        justifyContent: 'center',

    },
    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'UbuntuBold',
        maxWidth: 260,
        marginTop: 64,

    },
    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginVertical: 16,
        fontFamily: 'RobotoRegular',
        maxWidth: 260,
        lineHeight: 24,

    },
    footer: {},

    select: {},

    textInput: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
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
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
})

export default Home;