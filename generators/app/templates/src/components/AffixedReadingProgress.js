'use strict';

import Component from 'metal-component';
import core from 'metal';
import ElectricReadingProgress from 'electric-base-components';
import position from 'metal-position';
import Soy from 'metal-soy';

import templates from './AffixedReadingProgress.soy';

class AffixedReadingProgress extends ElectricReadingProgress {
	
	rendered() {
		var docsNav = document.querySelector('.docs-nav');
		var docsNavContainer = docsNav.parentNode;
		var parentWidth = position.getWidth(docsNavContainer);
		docsNav.style.width = parentWidth + 'px';
	}
};

Soy.register(AffixedReadingProgress, templates);

export default AffixedReadingProgress;