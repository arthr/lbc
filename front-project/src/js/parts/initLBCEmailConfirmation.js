import { $, tween, $wnd } from './_utility';

function initLBCEmailConfirmation() {
	const self = this;
	const token = self.urlParam('token');

	if (token && location.href.indexOf('email-confirmation.html') > 0) {
		$.get(`${self.options.serverURL}/api/server/status`, function (data) {
			console.log(data);
		});
	} else {
		console.log('Invalid Token');
	}
}

export { initLBCEmailConfirmation };
