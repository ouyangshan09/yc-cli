import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Styles from './{{/componentName}}.scss';
import ClassNames from 'classnames';

@CSSModules(Styles)
class {{/componentName}} extends React.PureComponent {
    static displayName = '{{/componentName}}';

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
        const wrapProps = {
            className: ClassNames('{{/componentName}}', this.props.className),
            styleName: '{{/componentName}}'
        }
        return (
            <div {...wrapProps}>
                {{/componentName}}
            </div>
        );
    }
}

export default {{/componentName}};
