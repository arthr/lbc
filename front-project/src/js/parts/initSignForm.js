import { $, tween, $wnd, $doc } from './_utility';

/*------------------------------------------------------------------

Init Sign Form

-------------------------------------------------------------------*/
function initSignForm() {
	const self = this;
	const $signForm = $('.nk-sign-form');
	const $signFormContainer = $signForm.find('.nk-sign-form-container');
	const $signToggle = $('.nk-sign-toggle, .nk-contacts-right');
	const $nav = $('.nk-navbar-top');
	let navRect;
	let isOpened;

	// show / hide block with form
	self.toggleSignForm = () => {
		self[`${isOpened ? 'close' : 'open'}SignForm`]();
	};

	// show block with form
	self.openSignForm = () => {
		if (isOpened) {
			return;
		}
		isOpened = 1;

		// active all togglers
		//$signToggle.addClass('active');

		// add form top position
		navRect = $nav[0] ? $nav[0].getBoundingClientRect() : 0;

		// set top position and animate
		tween.set($signForm, {
			paddingTop: navRect ? navRect.bottom : 0,
		});
		tween.set($signFormContainer, {
			y: -10,
			opacity: 0,
		});
		tween.to($signForm, 0.5, {
			opacity: 1,
			display: 'block',
			force3D: true,
		});
		tween.to($signFormContainer, 0.3, {
			y: 0,
			opacity: 1,
			delay: 0.4,
			force3D: true,
		});

		// open form block
		$signForm.addClass('open');

		// prevent body scrolling
		self.bodyOverflow(1);

		// trigger event
		$wnd.trigger('nk-open-sign-form', [$signForm]);
	};

	// hide block with form
	self.closeSignForm = (dontTouchBody) => {
		if (!isOpened) {
			return;
		}
		isOpened = 0;

		// deactive all togglers
		$signToggle.removeClass('active');

		tween.to($signForm, 0.5, {
			opacity: 0,
			display: 'none',
			force3D: true,
			onComplete() {
				if (!dontTouchBody) {
					// restore body scrolling
					self.bodyOverflow(0);
				}
			},
		});

		// open form block
		$signForm.removeClass('open');

		// trigger event
		$wnd.trigger('nk-close-sign-form', [$signForm]);
	};

	$doc.on('click', '.nk-sign-toggle', (e) => {

		// Alterado linha 165
		e.preventDefault();

	});
	$wnd.on('nk-open-full-navbar nk-open-search-block nk-open-cart', () => {
		self.closeSignForm(1);
	});


	// show / hide forms
	const $formLost = $signForm.find('.nk-sign-form-lost');
	const $formLogin = $signForm.find('.nk-sign-form-login');
	const $formRegister = $signForm.find('.nk-sign-form-register');
	const $toggleLost = $(`.${$($signForm).attr('class')}, .nk-contacts-right`).find('.nk-sign-form-lost-toggle');
	const $toggleLogin = $(`.${$($signForm).attr('class')}, .nk-contacts-right`).find('.nk-sign-form-login-toggle');
	const $toggleRegister = $(`.${$($signForm).attr('class')}, .nk-contacts-right`).find('.nk-sign-form-register-toggle');

	function animateForms($showItems, inverse = false) {
		const $hideItems = $formLost.filter('.active').add($formRegister.filter('.active')).add($formLogin.filter('.active'));
		tween.set($hideItems, {
			position: 'absolute',
			display: 'block',
			x: 0,
		});
		tween.set($showItems, {
			position: 'absolute',
			display: 'none',
			x: inverse ? '-60%' : '60%',
		});
		tween.to($hideItems, 0.2, {
			opacity: 0,
			x: inverse ? '60%' : '-60%',
			display: 'none',
			force3D: true,
		});
		tween.to($showItems, 0.2, {
			opacity: 1,
			display: 'block',
			x: '0%',
			force3D: true,
			onComplete() {
				tween.set($showItems, {
					position: 'relative',
				});
			},
		});
		$hideItems.removeClass('active');
		$showItems.addClass('active');
	}
	function showLoginForm() {
		animateForms($formLogin, true);
		$toggleLost.removeClass('active');
		$toggleLogin.addClass('active');
		$toggleRegister.removeClass('active');
	}
	function showLostForm() {
		animateForms($formLost);
		$toggleLost.addClass('active');
		$toggleLogin.removeClass('active');
		$toggleRegister.removeClass('active');
	}
	function showRegisterForm() {
		animateForms($formRegister);
		$toggleLost.removeClass('active');
		$toggleLogin.removeClass('active');
		$toggleRegister.addClass('active');
	}

	function loadUserData(){
		self.loadUser(function(){
			window.location = "/my-account.html";
		}, function(){
			alert('Falha ao obter dados da conta!');
            //location.reload();
		});
	}

	$(`.${$($signForm).attr('class')}, .nk-contacts-right`).on('click', '.nk-sign-form-login-toggle', (e) => {
		e.preventDefault();

		const isToggle = $(e.currentTarget).hasClass('nk-sign-toggle');
		const isActive = $(e.currentTarget).hasClass('active');
		const isOpen = $signForm.hasClass('open');

		if (isActive && isOpen && isToggle || !isActive && !isOpen && isToggle) {
			self.toggleSignForm();
		}
		if(!isActive) showLoginForm();
	});
	$(`.${$($signForm).attr('class')}, .nk-contacts-right`).on('click', '.nk-sign-form-lost-toggle', (e) => {
		e.preventDefault();
		showLostForm();
	});
	$(`.${$($signForm).attr('class')}, .nk-contacts-right`).on('click', '.nk-sign-form-register-toggle', (e) => {
		e.preventDefault();


		const isToggle = $(e.currentTarget).hasClass('nk-sign-toggle');
		const isActive = $(e.currentTarget).hasClass('active');
		const isOpen = $signForm.hasClass('open');

		if (isActive && isOpen && isToggle || !isActive && !isOpen && isToggle) {
			self.toggleSignForm();
		}

		if(!isActive) showRegisterForm();
	});

	$formRegister.find('#btn-register').on('click', (e) => {
	});

	self.addValidators();

	$($formLost).validate({
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
			const email = $($formLost).find('#forgot_email').val();

			const data = {
				email: email
			}

			const $responseError = $($formLost).find('.nk-form-response-error');
			const $responseSuccess = $($formLost).find('.nk-form-response-success');

			$responseError.hide();
			$responseSuccess.hide();

			$.ajax({
				url: `${self.options.serverURL}/api/password/create`,
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
					$responseSuccess.html("Foi enviado um link para seu email com os procedimentos de senha.").show();
					//TODO
				},
				error(response) {
					let msg = response.responseJSON.message;
					$responseSuccess.hide();
					$responseError.html(msg).show();
				},
			});
		}
	});

	$('.nk-sign-form-login').validate({
		rules: {
			"login_password": {
				required: true,
				minlength : 4,
				maxlength: 14,
				validPass: true,
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
			const email = $($formLogin).find('#login_email').val();
			const password = $($formLogin).find('#login_password').val();
			const remember = $($formLogin).find('#login_remember').prop('checked');

			const data = {
				email: email,
				password: password,
				remember_me: remember
			}

			const $responseError = $($formLogin).find('.nk-form-response-error');

			$.ajax({
				url: `${self.options.serverURL}/api/auth/login`,
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
					localStorage.setItem("auth", JSON.stringify(response));
					loadUserData();
				},
				error(response) {
					let msg = response.responseJSON.message;
					let errors = response.responseJSON.errors;
					$responseError.html(msg).show();
				},
			});
		}
	});

	$('.nk-sign-form-register').validate({
		rules: {
			"password": {
				required: true,
				minlength : 4,
				maxlength: 14,
				validPass: true,
			},
			"username": {
				required: true,
				minlength: 4,
				maxlength: 14,
				lettersAndNumbersOnly: true,
			},
			"confirm_password": {
				equalTo: "#password"
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
			const fullName = $($formRegister).find('#name').val();
			const username = $($formRegister).find('#username').val();
			const password = $($formRegister).find('#password').val();
			const confirmPassword = $($formRegister).find('#confirm_password').val();
			const email = $($formRegister).find('#email').val();

			const data = {
				name: fullName,
				login: username,
				email: email,
				password: password,
				password_confirmation: confirmPassword
			}

			const $responseSuccess = $($formRegister).find('.nk-form-response-success');
			const $responseError = $($formRegister).find('.nk-form-response-error');

			$.ajax({
				url: `${self.options.serverURL}/api/auth/signup`,
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
					let msg = response.message;

					$responseError.hide();
					$responseSuccess.html(msg).show();
					self.debounceResize();
				},
				error(response) {
					let msg = response.responseJSON.message;
					let errors = response.responseJSON.errors;

					if (errors) {
						msg = "";
						if(errors.login){
							msg += `<p>${errors.login[0]}</p>`;
						}

						if(errors.email){
							msg += `<p>${errors.email[0]}</p>`;
						}
					}

					if (msg && !errors) {
						$responseError.hide();
						$responseSuccess.html(msg).show();
						form.reset();
					} else {
						$responseSuccess.hide();
						$responseError.html(msg).show();
					}
				},
			});
		}
	});
}

export { initSignForm };
