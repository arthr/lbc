import { $, tween, $wnd } from './_utility';

function initLBCMyAccountConfigs() {
	const self = this;

	const $accountConfigsForm = $(".account-configs-form");

	self.addValidators();

	$($accountConfigsForm).validate({
		rules: {
			"new_password": {
				required: true,
				minlength: 4,
				maxlength: 14,
				validPass: true
			},
			"password_confirm": {
				equalTo: "#new_password"
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
		submitHandler: function (form) {
			const password = $($accountConfigsForm).find('#conf_new_password').val();
			const passwordConfirm = $($accountConfigsForm).find('#conf_password_confirm').val();

			const data = {
				password: password,
				password_confirmation: passwordConfirm,
			}

			const $responseError = $($accountConfigsForm).find('.nk-form-response-error');
			const $responseSuccess = $($accountConfigsForm).find('.nk-form-response-success');

			$responseError.hide();
			$responseSuccess.hide();

			$.ajax({
				url: `${self.options.serverURL}/api/auth/change-password`,
				data: JSON.stringify(data),
				type: 'POST',
				method: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				headers: {
					"Content-Type": "application/json",
					"X-Requested-With": "XMLHttpRequest",
					"Authorization": `${self.auth.token_type} ${self.auth.access_token}`,
					"Accept": "application/json"
				},
				beforeSend(response) {
					$accountConfigsForm.find("input[type=text], input[type=password]").prop('disabled', true);
					$accountConfigsForm.find("input[type=password]").val("");
				},
				success(response) {
					$responseError.hide();
					$responseSuccess.html("Sua senha foi alterada com sucesso!").show();

					setTimeout(() => {
						$('#new-account-modal').modal('hide');
						$accountConfigsForm.find("input[type=text], input[type=password]").prop('disabled', false).val("");
						$responseSuccess.hide();
					}, 2000);
				},
				error(response) {
					let errors = response.responseJSON.errors;
					let message = "";

					$accountConfigsForm.find("input[type=text], input[type=password]").prop('disabled', false);

					Object.keys(errors).forEach(function (key) {
						errors[key].forEach(msg => {
							message += msg + "<br />";
						});
					});

					$responseSuccess.hide();
					$responseError.html(message).show();
				},
			});
		}
	});
}

export { initLBCMyAccountConfigs };
