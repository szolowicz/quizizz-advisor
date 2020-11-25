class Popup {
  constructor() {
    this.checkVersion();
  }

  private checkVersion(): void {
    const updateText = document.getElementById('update');

    const manifestVersion = chrome.runtime.getManifest().version;
    const ghManifestUrl: string =
      'https://raw.githubusercontent.com/Lumm1t/quizizz-advisor/master/public/manifest.json';

    fetch(ghManifestUrl)
    .then((response) => response.json())
    .then((data) => {
      updateText.innerText =
        manifestVersion === data.version
          ? `up to date (${manifestVersion})`
          : `update available (${data.version})`;
    });
  }
}

export default new Popup();
