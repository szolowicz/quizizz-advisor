import './overlay.css';

export default class Overlay {
  protected overlay: HTMLElement = null;

  private static readonly APP_PATH = '/join';

  constructor() {
    console.clear();
    console.log(
      '%cquizizz-advisor by Lumm1t & MentolMen\n',
      'background: #222; color: #f00; font-size: 20px;\n',
      'https://github.com/Lumm1t/quizizz-advisor\n\n',
      'https://github.com/Lumm1t\n',
      'https://github.com/MentolMen'
    );

    this.createOverlayElement();
  }
  public setAnswer(answer: string) {
      const isImage = answer.includes("https")
      this.overlay.innerHTML = isImage ? `Answer(s): <img src='${answer}'> </img>` : `Answer(s): ${answer}`;
    }

  private createOverlayElement(): void {
    if (!window.location.pathname.startsWith(Overlay.APP_PATH)) return;

    this.overlay = document.createElement('div');
    this.overlay.id = 'overlay';
    this.overlay.innerText = `Answer(s): -`;

    document.body.appendChild(this.overlay);
  }
}
