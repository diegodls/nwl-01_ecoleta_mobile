import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableWithoutFeedback, Image, SafeAreaView, SectionListRenderItemInfo, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';

interface Params {
  point_id: number;
}
interface Data {
  point: {
    image: string,
    name: string,
    email: string,
    whatsapp: string,
    city: string,
    uf: string
  },
  items: {
    title: string
  }[]
}
const Detail = () => {

  const [data, setData] = useState<Data>({} as Data);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => { //recuperar dado do ponto
    api.get(`points/${routeParams.point_id}`).then(response => {
      setData(response.data);
    })
  }, [])

  function handlerNavigateBack() {
    navigation.goBack();
  }

  function handlerComposerMail (){//essa função não funciona no emulador
    const subject = 'Interesse de coleta de resíduos';
    const description = '';
    const recipients = [data.point.email];
    Linking.openURL(`mailto:${recipients}?subject=${subject}&body${description}`)
  }

  function handlerWhatsApp(){ //fazer o tratamento de DDD
    const phoneNumber = `+5516${data.point.whatsapp}`;
    const subject = 'Interesse de coleta de resíduos';
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${subject}`)

  }

  if (!data.point) {// caso não tenha informações, mostrar o caregando ou erro
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handlerNavigateBack}>
          <IconFeather name={'arrow-left'} color={'#34CB79'} size={20} />
        </TouchableWithoutFeedback>

        <Image
          style={styles.pointImage}
          source={{ uri: data.point.image }} />
        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map(item => item.title).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço:</Text>
          <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton
          style={styles.button}
          onPress={handlerWhatsApp}>
          <IconFontAwesome name={'whatsapp'} size={20} color={'#FFF'} />
          <Text style={styles.buttonText}> whatsapp</Text>
        </RectButton>
        <RectButton
          style={styles.button}
          onPress={handlerComposerMail}>
          <IconFeather name={'mail'} size={20} color={'#FFF'} />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: StatusBar.currentHeight + 20, //não encontrei um fix

  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'UbuntuBold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32,
  },

  addressTitle: {
    color: '#322153',
    fontFamily: 'RobotoRegular',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'RobotoRegular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});

export default Detail;