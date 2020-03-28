import React from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import logo from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;

    const message = `Olá ${incident.name}, estou entrando em contato para ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Um herói para o caso: ${incident.title}`,
            recipients: [`${incident.email}`],
            body: message
        });
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=5511956989144&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.incident}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '40%' }}>
                            <Text style={styles.incidentProperty}>ONG:</Text>
                            <Text style={styles.incidentValue}>
                                {`${incident.name}\n`}
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{`${incident.city} / ${incident.uf}`}</Text>
                            </Text>
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={styles.incidentProperty}>CASO:</Text>
                            <Text style={styles.incidentValue}>{incident.title}</Text>
                        </View>
                    </View>

                    <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
                    <Text style={styles.incidentValue}>{incident.description}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>
                </View>
                <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}>Salve o dia!</Text>
                    <Text style={styles.heroTitle}>Seja o herói desse caso</Text>
                    <Text style={styles.heroDescription}>Entre em contato:</Text>

                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={styles.action}
                            onPress={sendWhatsapp}>
                            <Text style={styles.actionText}>WhatApp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.action}
                            onPress={sendMail}>
                            <Text style={styles.actionText}>E-mail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}