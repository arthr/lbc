
import { options } from './parts/_options';
import { $wnd, debounceResize, throttleScroll, bodyOverflow, isInViewport, scrollTo } from './parts/_utility';
import { setOptions } from './parts/setOptions';
import { key, initShortcuts } from './parts/shortcuts';
import { initBlog } from './parts/initBlog';
import { initParallaxMouse } from './parts/initParallaxMouse';
import { initPreloader } from './parts/initPreloader';
import { initBackgroundVideo } from './parts/initBackgroundVideo';
import { initBackgroundAudio } from './parts/initBackgroundAudio';
import { initLinkEffects } from './parts/initLinkEffects';
import { initNavbar } from './parts/initNavbar';
import { initNavbarSide } from './parts/initNavbarSide';
import { initNavbarFullscreen } from './parts/initNavbarFullscreen';
import { initNavbarDropEffect1 } from './parts/initNavbarDropEffect1';
import { initSearchBlock } from './parts/initSearchBlock';
import { initCart } from './parts/initCart';
import { initSignForm } from './parts/initSignForm';
import { initHeaderTitle } from './parts/initHeaderTitle';
import { initCounters } from './parts/initCounters';
import { initSideButtons } from './parts/initSideButtons';
import { initActionsLike } from './parts/initActionsLike';
import { initAnchors } from './parts/initAnchors';
import { initLinesForBoxes } from './parts/initLinesForBoxes';
import { initImageBoxes } from './parts/initImageBoxes';
import { initVideoBlocks } from './parts/initVideoBlocks';
import { initGIF } from './parts/initGIF';
import { initInfoBoxes } from './parts/initInfoBoxes';
import { initForms } from './parts/initForms';
import { initFormsMailChimp } from './parts/initFormsMailChimp';
import { initTeamMembers } from './parts/initTeamMembers';
import { initAudioPlayer } from './parts/initAudioPlayer';
import { initFacebook } from './parts/initFacebook';
import { initInstagram } from './parts/initInstagram';
import { initTwitter } from './parts/initTwitter';
import { initCookieAlert } from './parts/initCookieAlert';

/* Plugins */
import { initPluginObjectFitImages } from './parts/initPluginObjectFitImages';
import { initPluginStickySidebar } from './parts/initPluginStickySidebar';
import { initPluginFastClick } from './parts/initPluginFastClick';
import { initPluginNano } from './parts/initPluginNano';
import { initPluginJarallax } from './parts/initPluginJarallax';
import { initPluginFlickity } from './parts/initPluginFlickity';
import { initPluginIsotope } from './parts/initPluginIsotope';
import { initPluginPhotoswipe } from './parts/initPluginPhotoswipe';
import { initPluginTabs } from './parts/initPluginTabs';
import { initPluginAccordions } from './parts/initPluginAccordions';
import { initPluginCountdown } from './parts/initPluginCountdown';
import { initPluginTypedjs } from './parts/initPluginTypedjs';
import { initPluginSummernote } from './parts/initPluginSummernote';

/* LBC */
import { initLBCPasswordRecover } from './parts/initLBCPasswordRecover';
import { initLBCEmailConfirmation } from './parts/initLBCEmailConfirmation';
import { initLBCMyAccount } from './parts/initLBCMyAccount';
import { initLBCMyAccountConfigs } from './parts/initLBCMyAccountConfigs';

import { postInitLBCMyAccount } from './parts/postInitLBCMyAccount';
import { postInitLBCMyAccountConfigs } from './parts/postInitLBCMyAccountConfigs';

import { postInitLBCNavbar } from './parts/postInitLBCNavbar';


/*------------------------------------------------------------------

  GODIKE Class

-------------------------------------------------------------------*/
class GODLIKE {
    constructor() {
        this.options = options;
        this.user = undefined;
        this.auth = undefined;
    }

    init() {
        // prt:sc:dm

        const self = this;
        self.initNavbar();
        self.initNavbarSide();
        self.initNavbarFullscreen();
        self.initNavbarDropEffect1();
        self.initSearchBlock();
        self.initCart();
        self.initSignForm();
        self.initHeaderTitle();
        self.initSideButtons();
        self.initBlog();
        self.initActionsLike();
        self.initBackgroundVideo();
        self.initBackgroundAudio();
        self.initLinkEffects();
        self.initCounters();
        self.initAnchors();
        self.initLinesForBoxes();
        self.initImageBoxes();
        self.initVideoBlocks();
        self.initGIF();
        self.initInfoBoxes();

        self.initFormsMailChimp();
        self.initTeamMembers();
        self.initAudioPlayer();
        self.initFacebook();
        self.initInstagram();
        self.initTwitter();
        self.initShortcuts();
        self.initCookieAlert();

        // init plugins
        self.initPluginObjectFitImages();
        self.initPluginStickySidebar();
        self.initPluginFastClick();
        self.initPluginNano();
        self.initPluginFlickity();
        self.initPluginIsotope();
        self.initPluginPhotoswipe();
        self.initPluginTabs();
        self.initPluginAccordions();
        self.initPluginJarallax();
        self.initPluginCountdown();
        self.initPluginTypedjs();
        self.initPluginSummernote();

        //LBC
        self.initLBCPasswordRecover();
        self.initLBCMyAccount();
        self.initLBCMyAccountConfigs();
        self.initLBCEmailConfirmation();

        //Ativa os validadores de form;
        self.initForms();

        self.initPreloader();

        self.initParallaxMouse();
        $wnd.on('resize scroll load', () => {
            self.initParallaxMouse();
        });

        return self;
    }

    urlParam(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        }
        return decodeURI(results[1]) || 0;
    }

    addValidators() {
        $.validator.addMethod("lettersAndNumbersOnly", function (value, element) {
            return this.optional(element) || /^([a-zA-Z0-9]*)$/i.test(value);
        }, "Insira somente n&uacute;meros e letras");

        $.validator.addMethod("validPass", function (value, element) {
            return this.optional(element) || /^((?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]*)$/i.test(value);
        }, "Insira uma senha v&aacute;lida");
    }

    postInit() {

        const self = this;
        
        self.postInitLBCNavbar();
        self.postInitLBCMyAccount();
        self.postInitLBCMyAccountConfigs();

        return self;
    }

    logout() {
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
        return location.reload();
    }

    loadAuth(onSuccess, onFail) {
        const auth = localStorage.getItem("auth");
        let self = this;
        if (auth) {
            self.loadUser(function (user) {
                self.user = user;
                onSuccess();
            }, function () {
                onFail();
            })
        } else {
            onFail();
        }
    }

    loadUser(onSuccess, onFail) {
        let auth = localStorage.getItem("auth");

        if (!auth) {
            alert('Falha ao obter dados de auth.');
            return location.reload();
        }

        auth = this.auth = JSON.parse(auth);

        $.ajax({
            url: `${this.options.serverURL}/api/auth/user`,
            type: 'GET',
            headers: {
                "Authorization": `${auth.token_type} ${auth.access_token}`,
                "Accept": "application/json"
            },
            success(response) {
                localStorage.setItem("user", JSON.stringify(response));
                onSuccess(response);
            },
            error(response) {
                let msg = response.responseJSON.message;
                if (msg) {
                    localStorage.removeItem("auth");
                    localStorage.removeItem("user");
                    onFail();
                }
            },
        });
    }

    setOptions(newOpts) {
        return setOptions.call(this, newOpts);
    }
    debounceResize(func) {
        return debounceResize.call(this, func);
    }
    throttleScroll(callback) {
        return throttleScroll.call(this, callback);
    }
    bodyOverflow(type) {
        return bodyOverflow.call(this, type);
    }
    isInViewport($item, returnRect) {
        return isInViewport.call(this, $item, returnRect);
    }
    scrollTo($to, callback) {
        return scrollTo.call(this, $to, callback);
    }
    key(name, callback) {
        return key.call(this, name, callback);
    }
    initPreloader() {
        return initPreloader.call(this);
    }
    initParallaxMouse() {
        return initParallaxMouse.call(this);
    }
    initShortcuts() {
        return initShortcuts.call(this);
    }
    initBackgroundVideo() {
        return initBackgroundVideo.call(this);
    }
    initBackgroundAudio() {
        return initBackgroundAudio.call(this);
    }
    initLinkEffects() {
        return initLinkEffects.call(this);
    }
    initHeaderTitle() {
        return initHeaderTitle.call(this);
    }
    initNavbar() {
        return initNavbar.call(this);
    }
    initNavbarSide() {
        return initNavbarSide.call(this);
    }
    initNavbarFullscreen() {
        return initNavbarFullscreen.call(this);
    }
    initNavbarDropEffect1() {
        return initNavbarDropEffect1.call(this);
    }
    initSearchBlock() {
        return initSearchBlock.call(this);
    }
    initCart() {
        return initCart.call(this);
    }
    initSignForm() {
        return initSignForm.call(this);
    }
    initCounters() {
        return initCounters.call(this);
    }
    initSideButtons() {
        return initSideButtons.call(this);
    }
    initActionsLike() {
        return initActionsLike.call(this);
    }
    initBlog() {
        return initBlog.call(this);
    }
    initAnchors() {
        return initAnchors.call(this);
    }
    initLinesForBoxes() {
        return initLinesForBoxes.call(this);
    }
    initImageBoxes() {
        return initImageBoxes.call(this);
    }
    initVideoBlocks() {
        return initVideoBlocks.call(this);
    }
    initGIF() {
        return initGIF.call(this);
    }
    initInfoBoxes() {
        return initInfoBoxes.call(this);
    }
    initForms() {
        return initForms.call(this);
    }
    initFormsMailChimp() {
        return initFormsMailChimp.call(this);
    }
    initTeamMembers() {
        return initTeamMembers.call(this);
    }
    initAudioPlayer() {
        return initAudioPlayer.call(this);
    }
    initFacebook() {
        return initFacebook.call(this);
    }
    initInstagram() {
        return initInstagram.call(this);
    }
    initTwitter() {
        return initTwitter.call(this);
    }
    initCookieAlert() {
        return initCookieAlert.call(this);
    }


    initPluginObjectFitImages() {
        return initPluginObjectFitImages.call(this);
    }
    initPluginStickySidebar() {
        return initPluginStickySidebar.call(this);
    }
    initPluginFastClick() {
        return initPluginFastClick.call(this);
    }
    initPluginNano($context) {
        return initPluginNano.call(this, $context);
    }
    initPluginJarallax($context) {
        return initPluginJarallax.call(this, $context);
    }
    initPluginFlickity($context) {
        return initPluginFlickity.call(this, $context);
    }
    initPluginIsotope($context) {
        return initPluginIsotope.call(this, $context);
    }
    initPluginPhotoswipe($context) {
        return initPluginPhotoswipe.call(this, $context);
    }
    initPluginTabs($context) {
        return initPluginTabs.call(this, $context);
    }
    initPluginAccordions($context) {
        return initPluginAccordions.call(this, $context);
    }
    initPluginCountdown($context) {
        return initPluginCountdown.call(this, $context);
    }
    initPluginTypedjs($context) {
        return initPluginTypedjs.call(this, $context);
    }
    initPluginSummernote($context) {
        return initPluginSummernote.call(this, $context);
    }

    initLBCMyAccount($context) {
        return initLBCMyAccount.call(this, $context);
    }
    postInitLBCMyAccount($context) {
        return postInitLBCMyAccount.call(this, $context);
    }
    initLBCMyAccountConfigs($context) {
        return initLBCMyAccountConfigs.call(this, $context);
    }
    postInitLBCMyAccountConfigs($context) {
        return postInitLBCMyAccountConfigs.call(this, $context);
    }
    initLBCPasswordRecover($context) {
        return initLBCPasswordRecover.call(this, $context);
    }
    postInitLBCNavbar($context) {
        return postInitLBCNavbar.call(this, $context);
    }
    initLBCEmailConfirmation($context) {
        return initLBCEmailConfirmation.call(this, $context);
    }
}


/*------------------------------------------------------------------

  Init Godlike

-------------------------------------------------------------------*/
window.Godlike = new GODLIKE();
