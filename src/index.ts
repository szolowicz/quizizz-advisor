import Overlay from './Overlay';
import { fixString, getQuestionType } from './helpers/helpers';

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
      console.warn('The script may be out of date. Report the problem on Discord <https://discord.gg/HPecVXeQrF> or on Github issue.');
      return;
    }
  }

  private async getRoomHash() {
    const linkParams = new URLSearchParams(window.location.search);
    let roomCode = linkParams.get('gc');

    if (!roomCode && window.location.pathname.includes(Solver.APP_PATH))
      roomCode = prompt('Enter join code (XXX XXX(X))', '');

    const init = {
      headers: {
        'content-type': 'application/json'
      },
      body: `{"roomCode": "${roomCode}"}`,
      method: 'POST'
    }

    const roomHashResponse = await fetch(Solver.ROOM_HASH_PATH, init);

    const roomHashJson = await roomHashResponse.json();
    const roomHash = roomHashJson?.room?.hash;

    if (!roomHash) return;

    await this.getQuestionsAndAnswers(roomHash);
  }

  private async getQuestionsAndAnswers(roomHash) {
    const aqResponse = await fetch(`${Solver.QUESTIONS_AND_RESPONSES_PATH}${roomHash}`);
    const aqJson = await aqResponse.json();
    const questions = aqJson.data.questions;
    let answers: { q: string, a: string }[] = [];

    questions.forEach(question => {
      const structure = question.structure;

      const question_string = structure.query.text.replace(/(<([^>]+)>)/ig, '');
      const answer_string = getQuestionType(question);

      answers.push({q: question_string, a: answer_string});
    });

    this.setAnswer(answers);
  }

  private setAnswer(answers: { q: string, a: string }[]) {
    let currentQuestion;

    setInterval(() => {
      currentQuestion = document.getElementsByClassName('resizeable question-text-color')[0];
      if (!currentQuestion) return;

      answers.forEach((answer) => {
        if (fixString(answer.q) === fixString(currentQuestion.textContent)) {
          this.overlay.setAnswer(answer.a);
        }
      });
    }, 1000);
  }
}

export default new Solver();
