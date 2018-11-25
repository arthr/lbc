import { $, tween, $wnd } from './_utility';

function initLBCEmailConfirmation() {
	const self = this;
	const token = self.urlParam('token');

	const $confirmationSuccess = $('.confirmation-success');
	const $confirmationError = $('.confirmation-error');

	$('.confirmation-success, .confirmation-error').hide();

	if (token && location.href.indexOf('email-confirmation.html') > 0) {
		$.get(`${self.options.serverURL}/api/auth/signup/activate/${token}`, function (data) {
			if (data.error) {
				$confirmationError.show();
				return;
			}

			$confirmationSuccess.show();
		});
	} else {
		$confirmationError.show();
		console.log('Invalid Token');
	}
}

export { initLBCEmailConfirmation };
