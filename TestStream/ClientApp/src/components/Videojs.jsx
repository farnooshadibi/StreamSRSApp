import React from 'react';
import videojs from 'video.js'


export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
      this.player = videojs(this.videoNode, this.props, videojs.addLanguage('fa', {
          "Audio Player": "پخش کننده صوت",
          "Video Player": "پخش کننده ویدیو",
          "Play": "پخش",
          "Pause": "توقف",
          "Replay": "پخش مجدد",
          "Current Time": "زمان فعلی",
          "Duration": "مدت",
          "Remaining Time": "زمان باقی‌مانده",
          "Stream Type": "نوع استریم",
          "LIVE": "زنده",
          "Seek to live, currently behind live": "پخش زنده، هم اکنون عقب تر از پخش زنده",
          "Seek to live, currently playing live": "پخش زنده، در حال پخش زنده",
          "Loaded": "بارگیری شده",
          "Progress": "پیشرفت",
          "Progress Bar": "نوار پیشرفت",
          "progress bar timing: currentTime={1} duration={2}": "{1} از {2}",
          "Fullscreen": "تمام‌صفحه",
          "Non-Fullscreen": "غیر تمام‌صفحه",
          "Mute": "بی صدا",
          "Unmute": "صدادار",
          "Playback Rate": "سرعت پخش",
          "Subtitles": "زیرنویس ها",
          "subtitles off": "بدون زیرنویس",
          "Captions": "توضیحات",
          "captions off": "بدون توضیحات",
          "Chapters": "بخش‌ها",
          "Descriptions": "توصیفات",
          "descriptions off": "بدون توصیفات",
          "Audio Track": "ترَک صوتی",
          "Volume Level": "سطح صدا",
          "You aborted the media playback": "شما پخش رسانه را قطع نمودید",
          "A network error caused the media download to fail part-way.": "وقوع مشکلی در شبکه باعث اختلال در دانلود رسانه شد.",
          "The media could not be loaded, either because the server or network failed or because the format is not supported.": "پخش زنده در دسترس نیست، لطفا بعدا تلاش نمایید",
          "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": "پخش  رسانه به علت اشکال در آن یا عدم پشتیبانی مرورگر شما قطع شد.",
          "No compatible source was found for this media.": "هیچ منبع سازگاری برای پخش این رسانه پیدا نشد.",
          "The media is encrypted and we do not have the keys to decrypt it.": "این رسانه رمزنگاری شده است و کلیدهای رمزگشایی آن موجود نیست.",
          "Play Video": "پخش ویدیو",
          "Close": "بستن",
          "Close Modal Dialog": "بستن پنجره",
          "Modal Window": "پنجره محاوره",
          "This is a modal window": "این پنجره قابل بستن است",
          "This modal can be closed by pressing the Escape key or activating the close button.": "این پنجره با کلید Escape یا دکمه بستن قابل بسته شدن میباشد.",
          ", opens captions settings dialog": ", تنظیمات توضیجات را باز میکند",
          ", opens subtitles settings dialog": ", تنظیمات زیرنویس را باز میکند",
          ", opens descriptions settings dialog": ", تنظیمات توصیفات را باز میکند",
          ", selected": "، انتخاب شد",
          "captions settings": "تنظیمات توضیحات",
          "subtitles settings": "تنظیمات زیرنویس",
          "descriptions settings": "تنظیمات توصیفات",
          "Text": "متن",
          "White": "سفید",
          "Black": "سیاه",
          "Red": "قرمز",
          "Green": "سبز",
          "Blue": "آبی",
          "Yellow": "زرد",
          "Magenta": "ارغوانی",
          "Cyan": "فیروزه‌ای",
          "Background": "پس زمینه",
          "Window": "پنجره",
          "Transparent": "شفاف",
          "Semi-Transparent": "نیمه شفاف",
          "Opaque": "مات",
          "Font Size": "اندازه قلم",
          "Text Edge Style": "سبک لبه متن",
          "None": "هیچ",
          "Raised": "برجسته",
          "Depressed": "فرورفته",
          "Uniform": "یکنواخت",
          "Dropshadow": "سایه دار",
          "Font Family": "نوع قلم",
          "Proportional Sans-Serif": "Sans-Serif متناسب",
          "Monospace Sans-Serif": "Sans-Serif هم عرض",
          "Proportional Serif": "Serif متناسب",
          "Monospace Serif": "Serif هم عرض",
          "Casual": "فانتزی",
          "Script": "دست خط",
          "Small Caps": "حروف بزرگ کوچک",
          "Reset": "تنظیم مجدد",
          "restore all settings to the default values": "بازنشانی همه تنظیمات به مقادیر پیش‌فرض",
          "Done": "انجام",
          "Caption Settings Dialog": "پنجره تنظیمات توضیحات",
          "Beginning of dialog window. Escape will cancel and close the window.": "شروع پنجره محاوره‌ای. دکمه Escape عملیات را لغو کرده و پنجره را میبندد.",
          "End of dialog window.": "پایان پنجره محاوره‌ای.",
          "{1} is loading.": "{1} در حال بارگیری است.",
          "Exit Picture-in-Picture": "خروج از حالت تصویر در تصویر",
          "Picture-in-Picture": "تصویر در تصویر"
      }), function onPlayerReady() {
          
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div className="videojsplayer">	
            <div data-vjs-player>
                <video ref={node => this.videoNode = node} className="video-js" data-setup='{"languages":{"fa":{"Play":"اجرا"}}}'></video>
        </div>
      </div>
    )
  }
}