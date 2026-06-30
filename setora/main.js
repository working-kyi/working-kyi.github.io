/* =========================================================
   Setora — スクロール演出
   .reveal が付いた要素が画面に入ったら .in を付与して
   フェードアップ／タイムライン描画などのアニメを発火する。
   ページ共通（index.html / 機能ページ 等で読み込み）。
   ========================================================= */
(function () {
  function init() {
    var targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    // IntersectionObserver 非対応環境では即時表示にフォールバック
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
