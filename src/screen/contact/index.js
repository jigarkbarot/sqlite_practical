import React, {Component} from 'react';
import {Alert, FlatList, Image, StyleSheet, Text, TextInput, View} from 'react-native';

import imgFilter from '@app/assets/icons/filter.png';
import imgSearch from '@app/assets/icons/search.png';
import imgProfile from '@app/assets/icons/profile.png';
import colors from '@app/common/colors';
import imgEdit from '@app/assets/icons/edit.png';
import imgDelete from '@app/assets/icons/delete.png';
import {deleteContact, getAllContact} from '@app/services/contact';
import {EventRegister} from 'react-native-event-listeners';
import {TouchableWithoutFeedbackEx} from '@app/common/button_helper';

class ContactList extends Component {
    constructor(props) {
        super(props);

        props.navigation.setOptions({
            title: 'Contact List',
            drawerLabel: 'Contact List',
            headerRight: () => <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}>
                <TouchableWithoutFeedbackEx onPress={() => this.props.navigation.push('CategoryModal', {page: 'list'})}>
                    <Image source={imgFilter} style={{height: 20, width: 20, marginHorizontal: 5}}/>
                </TouchableWithoutFeedbackEx>
                <Image source={imgSearch} style={{height: 20, width: 20, marginHorizontal: 5}}/>
            </View>,
        });

        this.state = {
            contactList: [],
        };

        this.initContact = [];
    }

    componentDidMount(): void {
        this.getContact();

        this.event_contact_list = EventRegister.addEventListener('event_contact_list', data => {
            switch (data.type) {
                case 'get_contact':
                    this.getContact();
                    break;
                case 'select_category':
                    let contactList = this.initContact.filter(item => item.category_id === data.item.id);

                    this.setState({
                        contactList,
                    });
                    break;
                case 'clear_cate':
                    this.setState({
                        contactList: this.initContact,
                    });
                    break;
            }
        });
    }

    componentWillUnmount(): void {
        EventRegister.removeEventListener(this.event_contact_list);
    }

    getContact = () => {
        getAllContact()
            .then((res) => {
                this.setState({
                    contactList: res.contact,
                });
                this.initContact = res.contact;
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleItemSelect = (item) => {
        EventRegister.emit('event_add_contact', {type: 'edit_contact', item});
        this.props.navigation.navigate('Add Contact');
    };

    handleDelete = (item) => {
        Alert.alert(
            'Delete',
            'Are you sure you want to delete?',
            [
                {
                    text: 'No', onPress: () => {

                    }, style: 'cancel',
                },
                {
                    text: 'Delete', onPress: () => {
                        deleteContact({id: item.id})
                            .then(res => {
                                this.getContact();
                            });
                    },
                },
            ],
            {cancelable: false},
        );
    };
    handleSearch = (text) => {

        if(Boolean(text)){

            text = text.toLowerCase()
            let filteredName = this.initContact.filter((item) => {
                return item.first_name.toLowerCase().match(text) || item.last_name.toLowerCase().match(text)
            })

            this.setState({
                contactList: filteredName,
                search:text
            })
        }else {
            this.setState({
                contactList: this.initContact,
                search:text
            })
        }
    }

    render() {
        const {contactList, search} = this.state;
        return (
            <View style={styles.container}>
                <TextInput placeholder={'Search name'} value={search}
                           onChangeText={(text)=> this.handleSearch(text)}
                           style={{margin:15, borderWidth:1, borderColor: colors.contactsBorder, borderRadius: 10, padding:10}}

                />
                {
                    contactList.length === 0 ?
                        <Text style={{margin: 15, alignSelf: 'center'}}>Data not found</Text>
                        :
                        <FlatList
                            data={contactList}
                            extraData={this.state}
                            keyExtractor={(item, index) => 'contact_' + index}
                            renderItem={({item, index}) => {
                                return (
                                    <View style={styles.itemView}>
                                        <Image
                                            source={Boolean(item.profile_image) ? {uri: item.profile_image} : imgProfile}
                                            style={styles.imgProfile}
                                        />
                                        <Text style={styles.txtName}>{item.first_name + ' ' + item.last_name}</Text>
                                        <View style={styles.actionContainer}>
                                            <TouchableWithoutFeedbackEx onPress={() => this.handleItemSelect(item)}>
                                                <View>
                                                    <Image source={imgEdit} style={styles.iconAction}/>
                                                </View>
                                            </TouchableWithoutFeedbackEx>
                                            <TouchableWithoutFeedbackEx onPress={() => this.handleDelete(item)}>
                                                <View>
                                                    <Image source={imgDelete} style={styles.iconAction}/>
                                                </View>
                                            </TouchableWithoutFeedbackEx>
                                        </View>
                                    </View>
                                );
                            }}
                            ItemSeparatorComponent={() => <View style={styles.separatorView}/>}
                            contentContainerStyle={{margin: 15}}
                        />
                }
            </View>
        );
    }
}

export default ContactList;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'white',

    },
    separatorView: {
        width: '100%', height: 1, backgroundColor: colors.contactsBorder,
    },
    iconAction: {
        height: 20, width: 20, marginHorizontal: 5,
    },
    itemView: {
        flexDirection: 'row', alignItems: 'center', marginVertical: 15,
    },
    imgProfile: {
        height: 50, width: 50, borderRadius: 25, borderColor: colors.primary, borderWidth: 1,
    },
    txtName: {
        marginHorizontal: 15, flex: 1, color: '#141414',
    },
    actionContainer: {
        flexDirection: 'row', alignItems: 'center',
    },
});
