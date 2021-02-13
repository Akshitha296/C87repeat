import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Alert, Image, Modal, ScrollView } from 'react-native';
import MyHeader from '../components/myHeader'
import db from '../config'
import firebase from 'firebase'

export default class SettingsScreen extends React.Component{
    constructor(){
        super();
        this.state = { 
                emailId: '',
                firstName: '',
                lastName: '',
                contact: '',
                address:'',
                docId: '',
        }
    }

    getUserDetails(){
        var user = firebase.auth().currentUser
        var email = user.email
        db.collection('users').where('emailId', '==', email).get().then(
            snapshot => {
                snapshot.forEach(doc => {
                    var data = doc.data()
                    this.setState({
                        emailId: data.emailId,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        address: data.address,
                        contact: data.contact,
                        docId: doc.id,
                    })
                })
            }
        )
    }

    componentDidMount(){
        this.getUserDetails()
    }

    updateUserDetails = () =>{
        db.collection('users').doc(this.state.docId).update({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            address: this.state.address,
            contact: this.state.contact,
        })
        console.log("Updated Successfully")
        Alert.alert("Updated Successfully")
    }

    render(){
        return(
            <View style = {styles.container}>
                <MyHeader
                    title = "Settings"
                    navigation = {this.props.navigation}
                />
                <View style = {styles.formContainer}> 
                    <TextInput
                        placeholder = "First Name"
                        style = {styles.txtInput}
                        onChangeText = {(text) => {
                                                    this.setState({
                                                        firstName: text
                                                    })
                                                }}
                        value = {this.state.firstName}
                    />

                    <TextInput
                        placeholder = "Last Name"
                        style = {styles.txtInput}
                        onChangeText = {(text) => {
                                                    this.setState({
                                                        lastName: text
                                                })
                                                }}
                        value = {this.state.lastName}
                    />

                    <TextInput
                        placeholder = "Phone Number"
                        style = {styles.txtInput}
                        maxLength = {10}
                        keyboardType = {'numeric'}
                        onChangeText = {(text) => {
                                                    this.setState({
                                                        contact: text
                                                    })
                                                }}
                        value = {this.state.contact}
                    />

                    <TextInput
                        placeholder = "Address"
                        style = {styles.txtInput}
                        multiline = {true}
                        onChangeText = {(text) => {
                                                    this.setState({
                                                        address: text
                                                    })
                                                }}
                        value = {this.state.address}
                    />

                    <TouchableOpacity onPress = {() => {
                            this.updateUserDetails()
                        }}
                        style = {styles.saveButton}
                    >
                        <Text style = {styles.buttonText}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    txtInput: {
        width: '75%',
        height: 35,
        alignSelf: 'center',
        borderColor: 'green',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
    },
    container: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: 'green',
        width: '75%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    }
})