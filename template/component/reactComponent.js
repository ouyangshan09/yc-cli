import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Styles from './{{/componentName}}.scss';

@CSSModules(Styles)
class {{/componentName}} extends React.PureComponent {
    static displayName = {{/componentName}};

    static propTypes = {
        style: PropTypes.object,
        className: PropTypes.string
    };

    static defaultProps = {};

    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div className='{{/componentName}}' styleName='{{/componentName}}'>
                {{/componentName}}
            </div>
        );
    }
}

export default {{/componentName}};
