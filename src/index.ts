import { fixString, getQuestionType } from './helpers/helpers';
import Overlay from './overlay';

class Solver {
  private static readonly ROOM_HASH_PATH = '/play-api/v4/checkRoom';
  private static readonly QUESTIONS_AND_RESPONSES_PATH = '/api/main/game/';
  private static readonly APP_PATH = '/join/';

  protected readonly overlay = new Overlay();

  constructor() {
    try {
      this.getRoomHash();
    } catch (error) {
      console.error(error);
      console.warn(
        'The script may be out of date. Report the problem on Discord <https://discord.gg/HPecVXeQrF> or on Github issue.'
      );
    }
  }

  private async getRoomHash(): Promise<void> {
    const linkParams = new URLSearchParams(window.location.search);
    let roomCode = linkParams.get('gc');

    if (roomCode === null && window.location.pathname.includes(Solver.APP_PATH))
      roomCode = prompt('Enter join code (XXX XXX(X))', '');

    /* eslint-disable @typescript-eslint/restrict-template-expressions */
    const init = {
      headers: {
        'content-type': 'application/json',
      },
      body: `{"roomCode": "${roomCode}"}`,
      method: 'POST',
    };

    const roomHashResponse = await fetch(Solver.ROOM_HASH_PATH, init);

    const roomHashJson = await roomHashResponse.json();
    const roomHash = roomHashJson?.room?.hash;

    if (roomHash === undefined) return;

    await this.getQuestionsAndAnswers(roomHash);
  }

  private async getQuestionsAndAnswers(roomHash): Promise<void> {
    const aqResponse = await fetch(
      `${Solver.QUESTIONS_AND_RESPONSES_PATH}${roomHash}`
    );
    const aqJson = await aqResponse.json();
    const questions = aqJson.data.questions;
    const answers: Array<{ q: string; a: string }> = [];

    for (const question of questions) {
      const structure = question.structure;

      const questionString = structure.query.text.replace(/(<([^>]+)>)/gi, '');
      const answerString = getQuestionType(question);

      answers.push({ q: questionString, a: answerString });
    }

    this.setAnswer(answers);
  }

  private setAnswer(answers: Array<{ q: string; a: string }>): void {
    let currentQuestion;

    setInterval(() => {
      currentQuestion = document.querySelectorAll(
        '.resizeable.question-text-color'
      )[0];
      if (currentQuestion === null) return;

      for (const answer of answers) {
        if (fixString(answer.q) === fixString(currentQuestion.textContent)) {
          this.overlay.setAnswer(answer.a);
        }
      }
    }, 1000);
  }
}

export default new Solver();
