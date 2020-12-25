import React, {Component} from 'react';
import {Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, View, Keyboard} from 'react-native';
import TextBox from '@app/component/TextBox';
import Button from '@app/component/Button';
import colors from '@app/common/colors';

import imgEdit from '@app/assets/icons/edit.png';
import imgDelete from '@app/assets/icons/delete.png';
import {deleteCategory, getAllCategory, InsertCategory} from '@app/services/category';
import {TouchableWithoutFeedbackEx} from '@app/common/button_helper';

class AddCategory extends Component {

    constructor(props) {
        super(props);

        props.navigation.setOptions({
            title: 'Create and store category',
            drawerLabel: 'Add Category',
        });

        this.state = {
            loading: false,
            categoryName: '',
            categoryList: [],
            selectedCate: null,
        };

    }

    componentDidMount(): void {
        this.getCategory();
    }

    getCategory = () => {
        getAllCategory().then(res => {
            this.setState({
                categoryList: res.categories,
            });
        })
            .catch(error => {
                console.log(error);
            });
    };

    handleItemSelect = (item) => {
        this.setState({
            selectedCate: item.id,
            categoryName: item.category_name,
        });
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
                        deleteCategory({id: item.id})
                            .then(res => {
                                this.getCategory();
                            });
                    },
                },
            ],
            {cancelable: false},
        );
    };

    handleSubmit = () => {
        const {categoryName, selectedCate} = this.state;

        if (Boolean(categoryName)) {
            this.setState({
                loading: true,
            });

            let reqPara = {category_name: categoryName};

            if (Boolean(selectedCate)) {
                reqPara.id = selectedCate;
            }

            InsertCategory(reqPara)
                .then(res => {
                    this.setState({
                        loading: false,
                        categoryName: '',
                        selectedCate: null,
                    });
                    this.getCategory();
                    Keyboard.dismiss()
                })
                .catch(error => {
                    this.setState({
                        loading: false,
                        selectedCate: null,
                    });
                });
        }
    };

    render() {
        const {loading, categoryName, categoryList, selectedCate} = this.state;
        return (
            <SafeAreaView style={styles.container}>

                <TextBox
                    placeholder={'Add Category'}
                    handleChangeText={(categoryName) => this.setState({categoryName})}
                    inputContainer={styles.textInputContainer}
                    itemSpace={30}
                    value={categoryName}
                />

                <Button
                    loading={loading}
                    buttonText={selectedCate ? 'Update' : 'Save'}
                    enabled={Boolean(categoryName) && categoryName.trim()}
                    handleSubmit={this.handleSubmit}
                />

                <FlatList
                    data={categoryList}
                    keyExtractor={(_, index) => 'cate_' + index}
                    renderItem={({item, index}) => {
                        return (

                            <View style={styles.itemView}>
                                <Text style={{flex: 1}}>{item.category_name}</Text>

                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                    contentContainerStyle={styles.listContainer}
                    ItemSeparatorComponent={() => <View style={styles.separatorView}/>}
                />
            </SafeAreaView>
        );
    }
}

export default AddCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1, marginHorizontal: 30,
    },
    textInputContainer: {
        marginVertical: 30, marginHorizontal: 20,
    },
    listContainer: {
        marginTop: 50,
    },
    itemView: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        backgroundColor: colors.categoryBackground,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    separatorView: {
        width: '100%', height: 1, backgroundColor: colors.categoryBorder,
    },
    iconAction: {
        height: 20, width: 20, marginHorizontal: 5,
    },
});
