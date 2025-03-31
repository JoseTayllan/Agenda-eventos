import Reac, {useState} from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList,Alert } from "react-native"

import { Participant } from "../../components/Participant";

import { styles } from "./styles"


export function Home() {
   const[participants,setParticipants] = useState<string[]>([]);
   const [ParticipantName, setParticipantName] = useState('');

   

    function handleParticipantAdd() {
        if(participants.includes(ParticipantName)){
           return Alert.alert("Participante Existe","Já existe um participante com esse  nome.")

        }
        //*console.log("Você clicou no botão de adicionar");
        setParticipants( prevState => [...prevState,ParticipantName]);
        setParticipantName('');
        //console.log(participants);
    }

    function handleParticipantRemove(name: string) {
        //return console.log(participants.filter(participant => participant !== name));

        Alert.alert("Remover",`Deseja remover o participante ${name}?`,[
            {
                text: "Sim",
                onPress: ()=> setParticipants(prevState => prevState.filter(participant => participant !== name))
            },
            {
                text: "Não",
                style: "cancel"
                
            }
            ])
    //*console.log(`Você clicou em remover o participante ${name}`);

    }
    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Nome do evento
            </Text>

            <Text style={styles.eventDate}>
                Terça, 11 de Fevereiro de 2025
            </Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor={'#6b6b6b'}
                    //onChangeText={text =>setParticipantName(text)}
                    onChangeText={setParticipantName}
                    value = {ParticipantName}
                   //! onChangeText={text => console.log(text)}

                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <Participant
                    key={item}
                    name={item}
                    onRemove={() => handleParticipantRemove(item)} />

                )}
                showsVerticalScrollIndicator ={false}
                ListEmptyComponent={() => (
                    <Text style ={styles.listEmpyText}> 
                     Ninguém Chegou no evento ainda? Adicione participantes a sua lista de presença! .

                    </Text>
                )}

            />
        </View>
    )
}

//todo  keyboardType="numeric" Manipula o tipo de teclado do campo

//todo expor tdefault abre margem par incinsistencia de nome de variaveis
//! Padronozar a não utilisação de default, vamos usar a expot 
