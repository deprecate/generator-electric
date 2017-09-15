'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
import Toggler from 'metal-toggler';

import templates from './SocialButton.soy';

class SocialButton extends Component {
    created() {
        this.siteUrl = window.location.origin;
    }
};

Soy.register(SocialButton, templates);

export default SocialButton;