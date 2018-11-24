import { $, tween, $wnd } from './_utility';

function postInitLBCMyAccountConfigs() {
	const self = this;
	const $accountConfigsForm = $(".account-configs-form");

	if (self.user) {

		let user = self.user;
		let email = user.email;

		//ACP Profile Header / Side Menu
		$accountConfigsForm.find("#conf_email").val(email);

	}

}

export { postInitLBCMyAccountConfigs };
