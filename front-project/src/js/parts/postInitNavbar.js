import { $, tween, $wnd } from './_utility';

function postInitNavbar() {
	const self = this;

	console.log(self.user);

	if(self.user){
		$('.nk-nav.not-logged-in').hide();
		$('.nk-nav.logged-in').show();
		$('.nk-nav.logged-in span.name').html(self.user.name);

		$('.nk-nav.logged-in .logout').click((e) => {
			e.preventDefault();
			self.logout();
		});
	}



	
}

export { postInitNavbar };