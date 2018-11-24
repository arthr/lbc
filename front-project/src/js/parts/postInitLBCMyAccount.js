import { $, tween, $wnd } from './_utility';

function postInitLBCMyAccount() {
	const self = this;

	if (!self.user && (location.href.indexOf('my-account') > 0 || location.href.indexOf('collaboration.html') > 0)) {
		location.href = 'index.html';
	} else if (self.user) {

		let user = self.user;
		let lastLogin = new Date(user.last_login);
		let premiumDays = 0;
		let premiumMessage = (premiumDays) ? `Você ainda tem <span class="text-main-2"><strong>${premiumDays}</strong></span> dia(s) restante(s) como membro VIP.` : 'Você ainda não é um membro VIP. <a href="collaboration.html">Clique aqui</a> e torne-se um!';
		let gameAccounts = user.game_account;
		let accountTable = $('table#user-game-accounts > tbody');

		$('.nk-social-profile-info .nk-social-profile-info-name').html(user.name);
		$('.nk-social-profile-info .nk-social-profile-info-last-seen').html(`&Uacute;ltimo Acesso: ${lastLogin.getDate()}/${lastLogin.getMonth()}/${lastLogin.getFullYear()} &agrave;s ${lastLogin.getHours()}:${lastLogin.getMinutes()}`);
		$('.nk-social-profile-info .nk-social-profile-info-username.vip-status').html(premiumMessage);
		$('.nk-social-menu #menu-contas span.nk-badge').html(gameAccounts.length);

		if (gameAccounts.length) {
			accountTable.empty();

			gameAccounts.forEach(account => {
				let loginTd = $('<td />').addClass('nk-social-notifications-login').html(account.account);
				let statusTd = $('<td />').addClass('nk-social-notifications-status');

				// last login
				let lastLoginDt = new Date(account.last_login);
				let lastLoginDay = lastLoginDt.getDay() < 10 ? "0" + lastLoginDt.getDay() : lastLoginDt.getDay();
				let lastLoginMonth = lastLoginDt.getMonth() < 10 ? "0" + lastLoginDt.getMonth() : lastLoginDt.getMonth();
				let lastLoginHour = lastLoginDt.getHours() < 10 ? "0" + lastLoginDt.getHours() : lastLoginDt.getHours();
				let lastLoginMin = lastLoginDt.getMinutes() < 10 ? "0" + lastLoginDt.getMinutes() : lastLoginDt.getMinutes();

				let lastLoginDtFormat = lastLoginDay + "/" + lastLoginMonth + "/" + lastLoginDt.getFullYear() + " " + lastLoginHour + ":" + lastLoginMin;
				let lastLoginTd = $('<td />').addClass('nk-social-notifications-since').html(`${lastLoginDtFormat}`);

				// actions btn
				let changePassBtn = $('<a href="#' + account.account + '" />').addClass('change-pass').append($('<span />').addClass('ion-lock-combination').html(' Alterar Senha'));
				let blockAccountBtn = $('<a href="#' + account.account + '" />').addClass('block-account').append($('<span />').addClass('ion-locked').html(' Bloquear'));
				let accountActionsTd = $('<td />').addClass('nk-social-notifications-actions').append(changePassBtn).append(blockAccountBtn);

				account.pay_stat ? statusTd.addClass('text-success').html('Ativa') : statusTd.addClass('text-warning').html('Inativa');

				let accountTr = $('<tr />').data('account', account.account)
					.append(loginTd)
					.append(statusTd)
					.append(lastLoginTd)
					.append(accountActionsTd);

				accountTable.append(accountTr);
			});
		}
	}

}

export { postInitLBCMyAccount };
