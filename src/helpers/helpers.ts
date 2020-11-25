// Thanks, https://github.com/EastArctica

export const fixString = (s: string) => s.replace(/&nbsp;/g, ' ').trim();

export const getQuestionType = (question: any) => {
  switch (question.structure.kind) {
    case 'BLANK': // Text input response
      const toResponse = [];

      for (let i = 0; i < question.structure.options.length; i++) toResponse.push(question.structure.options[i].text);

      return toResponse.join(' / ');

    case 'MSQ': // Multiple choice
      const answers = question.structure.answer;
      const answersArray = [];

      for (let i = 0; i < answers.length; i++) {
        if (answers[i].text == '') answersArray.push(question.structure.options[answers[i]].media[0].url);
        else answersArray.push(question.structure.options[answers[i]].text);
      }

      return answersArray.join('');

    case 'MCQ': // Single choice
      const answerNumber = question.structure.answer;
      let answer = question.structure.options[answerNumber].text;
      if (answer == '') answer = question.structure.options[answerNumber].media[0].url;

      return answer;
  }
};
