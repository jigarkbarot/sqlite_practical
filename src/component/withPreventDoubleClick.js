import React from 'react';
import lodash from 'lodash';

const withPreventDoubleClick = (WrappedComponent) => {

    class PreventDoubleClick extends React.PureComponent {

        debouncedOnPress = () => {
            this.props.onPress && this.props.onPress();
        }

        onPress = lodash.debounce(this.debouncedOnPress, 500, { leading: true, trailing: false });

        render() {
            return <WrappedComponent hitSlop={{top: 10, left: 10, bottom: 10, right: 10}} {...this.props} onPress={this.onPress} />;
        }
    }

    PreventDoubleClick.displayName = `withPreventDoubleClick(${WrappedComponent.displayName ||WrappedComponent.name})`
    return PreventDoubleClick;
}

export default withPreventDoubleClick;
