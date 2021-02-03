class Popup {
  constructor() {
    this.checkVersion();
  }

  private checkVersion(): void {
    const updateText = document.querySelector('#update');

    if (updateText === null) return;

    const manifestVersion = chrome.runtime.getManifest().version;
    const ghManifestUrl =
      'https://raw.githubusercontent.com/Lumm1t/quizizz-advisor/master/public/manifest.json';

    fetch(ghManifestUrl)
      .then(async (response) => response.json())
      .then((data) => {
        const version: string = data.version;

        updateText.textContent =
          manifestVersion === version
            ? `up to date (${manifestVersion})`
            : `update available (${version})`;
      });
  }
}

export default new Popup();
