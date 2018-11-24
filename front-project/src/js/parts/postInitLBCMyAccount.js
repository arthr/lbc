import { $, tween, $wnd } from './_utility';

function postInitLBCMyAccount() {
	const self = this;

	if (!self.user && location.href.endsWith('my-account.html')) {
		location.href = 'index.html';
	}

	let user = self.user;
	let lastLogin = new Date(user.last_login);
	let premiumDays = 0;
	let premiumMessage = (premiumDays) ? `Você ainda tem <span class="text-main-2"><strong>${premiumDays}</strong></span> dia(s) restante(s) como membro VIP.` : 'Você ainda não é um membro VIP. <a href="collaboration.html">Clique aqui</a> e torne-se um!.';

	let accountTable = $('.nk-social-container table');

	$('.nk-social-profile-info .nk-social-profile-info-name').html(user.name);
	$('.nk-social-profile-info .nk-social-profile-info-last-seen').html(`&Uacute;ltimo Acesso: ${lastLogin.getDate()}/${lastLogin.getMonth()}/${lastLogin.getFullYear()} &agrave;s ${lastLogin.getHours()}:${lastLogin.getMinutes()}`);
	$('.nk-social-profile-info .nk-social-profile-info-username.vip-status').html(premiumMessage);
}

export { postInitLBCMyAccount };
