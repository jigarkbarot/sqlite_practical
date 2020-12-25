import React, {Component} from 'react';
import {FlatList, Text, View} from 'react-native';
import {getAllCategory} from '@app/services/category';
import colors from '@app/common/colors';
import {TouchableWithoutFeedbackEx} from '@app/common/button_helper';
import {EventRegister} from 'react-native-event-listeners';

class CategoryList extends Component {

    constructor(props) {
        super(props);

        this.page = props.route.params.page;

        this.state = {
            categoryList: [],
        };

        props.navigation.setOptions({
            headerRight:()=> this.page === 'list'? <TouchableWithoutFeedbackEx onPress={()=>{
                EventRegister.emit('event_contact_list', {type:'clear_cate'})
                this.props.navigation.pop()
            }}>
                <Text style={{marginHorizontal:15, color:'blue'}}>Clear</Text>
            </TouchableWithoutFeedbackEx>:null
        })
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

    render() {
        const {categoryList} = this.state;
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <FlatList
                    data={categoryList}
                    extraData={categoryList}
                    keyExtractor={(item) => 'cate' + item.id}
                    renderItem={({item, index}) => {
                        return (
                            <TouchableWithoutFeedbackEx onPress={()=> {
                                EventRegister.emit(this.page === 'add'? 'event_add_contact':'event_contact_list', {type:'select_category', item})
                                this.props.navigation.pop()
                            }}>
                                <View style={{marginHorizontal: 15, marginVertical: 15}}>
                                    <Text>{item.category_name}</Text>
                                </View>
                            </TouchableWithoutFeedbackEx>
                        );
                    }}
                    ItemSeparatorComponent={() => <View
                        style={{width: '100%', height: 1, backgroundColor: colors.contactsBorder}}/>}
                />

            </View>
        );
    }
}

export default CategoryList;
