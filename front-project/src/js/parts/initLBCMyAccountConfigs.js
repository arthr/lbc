import { $, tween, $wnd } from './_utility';

function initLBCMyAccountConfigs() {
	const self = this;

	const $newAccountForm = $(".new-account-form");
	const accountTable = $('table#user-game-accounts > tbody');

	self.addValidators();

	// Desabilitar Opções Table	
	accountTable.on("click", "td.nk-social-notifications-actions a", (e) => {
		e.preventDefault();
		alert("Recurso temporáriamente desabilidado.");
	});

	$($newAccountForm).validate({
		rules: {
			"login": {
				required: true,
				minlength: 4,
				maxlength: 14
			},
			"password": {
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
			const login = $($newAccountForm).find('#new_login').val();
			const password = $($newAccountForm).find('#new_password').val();
			const passwordConfirm = $($newAccountForm).find('#new_password_confirm').val();

			const data = {
				login: login,
				password: password,
				password_confirmation: passwordConfirm,
			}

			const $responseError = $($newAccountForm).find('.nk-form-response-error');
			const $responseSuccess = $($newAccountForm).find('.nk-form-response-success');

			$responseError.hide();
			$responseSuccess.hide();

			$.ajax({
				url: `${self.options.serverURL}/api/account/create`,
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
					$newAccountForm.find("input[type=text], input[type=password]").prop('disabled', true);
					$newAccountForm.find("input[type=password]").val("");
				},
				success(response) {
					$responseError.hide();
					$responseSuccess.html("Sua conta foi criada com sucesso!").show();

					setTimeout(() => {
						$('#new-account-modal').modal('hide');
						$newAccountForm.find("input[type=text], input[type=password]").prop('disabled', false).val("");
						$responseSuccess.hide();
					}, 2000);
				},
				error(response) {
					let errors = response.responseJSON.errors;
					let message = "";

					$newAccountForm.find("input[type=text], input[type=password]").prop('disabled', false);

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
