import { $, tween, $wnd } from './_utility';

function initLBCEmailConfirmation() {
	const self = this;

	const $recoverForm = $(".recover-pass-form");

	self.addValidators();

	$($recoverForm).validate({
		rules: {
			"recover_password": {
				required: true,
				minlength : 4,
				maxlength: 14,
				validPass: true
			},
			"recover_confirm": {
				equalTo: "#recover_password"
			}
		},
		errorClass: 'nk-error',
		errorElement: 'div',
		errorPlacement(error, element) {
			const $parent = element.parent('.input-group, .nk-form-control-number');
			if ($parent.length) {
				$parent.after(error);
			} else {
				element.after(error);
			}
			self.debounceResize();
		},
		submitHandler:  function(form) {

			const token = self.urlParam('token');
			const email = $($recoverForm).find('#recover_email').val();
			const password = $($recoverForm).find('#recover_password').val();
			const passwordConfirm = $($recoverForm).find('#recover_confirm').val();

			const data = {
				email: email,
				password: password,
				password_confirmation: passwordConfirm,
				token: token
			}

			const $responseError = $($recoverForm).find('.nk-form-response-error');
			const $responseSuccess = $($recoverForm).find('.nk-form-response-success');

			$responseError.hide();
			$responseSuccess.hide();

			$.ajax({
				url: `${self.options.serverURL}/api/password/reset`,
				data: JSON.stringify(data),
				type: 'POST',
				method: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				headers: {
					"Content-Type": "application/json",
					"X-Requested-With": "XMLHttpRequest"
				},
				success(response) {
					$responseError.hide();
					$responseSuccess.html("Sua senha foi altera com sucesso! Favor, realize seu login.").show();
					//TODO Animations?
				},
				error(response) {
					let msg = response.responseJSON.message;
					$responseSuccess.hide();
					$responseError.html(msg).show();
				},
			});
		}
	});
}

export { initLBCEmailConfirmation };
