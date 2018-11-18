import { $, tween, $wnd } from './_utility';

function postInitLBCMyAccount() {
	const self = this;

	if(!self.user && location.href.endsWith('my-account.html')){
		location.href = 'index.html';
	}
}

export { postInitLBCMyAccount };
